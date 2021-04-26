'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');


class helpers extends csystem {

	constructor(main) {
		super(main.config);
		this.main = main
	}

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}

	/**
	 * check if requirements are met. From headers, query, body, and authorization & permissions(USER_AUTHORITY)
	 * @param {Object} req 
	 */
	processRequirements = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			let { func, requiresAdmin, doForAnother, requiresLogin, swaggerObject } = this.pathExists(req)

			const validateType = (type, data) => {
				switch (type) {
					case "boolean":
						return this.parseBool(data) === NaN ? false : true;
					case "number":
						// return data.toString().length === parseInt(data).toString().length && data.toString() === 
						return data.toString() === parseInt(data).toString();
					case "string":
						return true;
				}
			}
			// let inheaders, inBody, inQuery;
			/** check for required fields in headers and query */
			for (let i in swaggerObject.parameters) {
				let parameter = swaggerObject.parameters[i];
				let { name, required, type } = parameter;
				let in_ = parameter.in
				let name_
				let checkIn = {}
				if (required) {
					switch (in_) {
						case "header":
							checkIn = req.headers
							break;
						case "query":
							checkIn = req.query
							break;
					}
					let keys = Object.keys(checkIn).map(item => item.toLowerCase())
					name_ = name;
					if (in_ === 'header') name_ = name.toLowerCase();
					if (!keys.includes(name_)) {
						return reject({ status: 422, message: `Missing ${name} in ${in_}`, keys, name_, tmp: req.headers })
					}
				}
				/**
				 * validate type
				 */
				if (!validateType(type, checkIn[name_])) {
					return reject({ status: 422, message: `${name}:${checkIn[name_]} not of type ${type}` })
				}
			}
			if (swaggerObject.requestBody) {
				let content = swaggerObject.requestBody.content
				let keys = Object.keys(req.body).map(item => item/*.toLowerCase()*/)
				for (let contentType in content) {
					let schema = content[contentType].schema || {};
					let properties = schema.properties || {}
					for (let param in properties) {
						let { type, required } = properties[param];
						let name_;
						if (required) {
							name_ = param // .toLowerCase();
							if (!keys.includes(name_)) {
								return reject({ status: 422, message: `Missing ${param} in body` })
							}
						}
						/**
						 * validate type
						 */
						if (!validateType(type, req.body[name_])) {
							return reject({ status: 422, message: `${name_}:${req.body[name_]} not of type ${type}` })
						}
					}
				}
			}

			if (!func) {
				return reject({ code: 404, message: "Path not allowed" })
			}
			let err, care, user, userId;
			if (requiresLogin) {
				[err, care] = await to(this.isAuthenticated(req, res, next))
				if (err) return reject(err);
				user = care;
			}
			userId = user.userId;
			;[err, care] = await to(this.sequelize.models.users.findOne({ where: { userId } }))
			user = care.dataValues;
			let isSysAdmin = user.authority === 'SYS_ADMIN' ? true : false
			if (requiresAdmin) {
				if (!isSysAdmin) {
					return reject({ status: 401, message: `You don't have permission to perform SYS_ADMIN operation` })
				}
			}
			if (!doForAnother) {
				let anotherUserId = req.body.userId || req.query.userId;
				if (anotherUserId) {
					if (anotherUserId !== userId && !isSysAdmin) {
						return reject({ status: 401, message: `You don't have permission to perform operation on another user` })
					}
				}
			}
			// resolve({ care, requiresAdmin, doForAnother, requiresLogin })
			resolve({func})
		});
	}


}

module.exports = helpers