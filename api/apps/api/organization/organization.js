'use strict'

const { resolve, reject } = require('bluebird');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
const etc = require('node-etc')
const path = require('path');
const helpers_ = require('../helpers').helpers
let helpers;
let sequelize, Familyfe;


class authority extends csystem {

	constructor(config) {
		super(config);
		helpers = new helpers_(this)
	}

	isSysAdmin = async (user) => {
		return new Promise(async (resolve, reject) => {
			resolve(user.authority === 'SYS_ADMIN' ? true : false)
		});
	}

	saveOrganization = async (req, res, next) => {
		return new Promise(async (resolve, reject) => {
			// let [err, care] = await to(this.isAuthenticated(req, res, next))
			// if (err) return reject(err)
			// let body = Object.assign({}, req.body);
			// let isAuthenticated  = care
			// let isSysAdmin = this.
			// // isAuthenticated;
			// let [err, care] = await to(this.sequelize.users.findOne())
			let {userId, organizationName} = req.body;
			console.log({userId, organizationName})
			let [err, care] = await to(this.sequelize.models.organizations.create({ userUserId: userId, organizationName}))
			console.log({userId, organizationName})
			if(err)return reject(err)
			resolve(care.dataValues);
		})
	}



	functionsMap = () => {
		return {
			"api/organization": {
				'POST': {
					func: this.saveOrganization,
					requiresLogin: true,
					requiresAdmin: false,
					doForAnother: false,
					"tags": [
						"organization-controller"
					],
					"summary": "saveOrganization",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"userId": { "type":  "string", required: true },
										"organizationName": { type: "string", required: true },
									}
								}
							}
						}
					},
					"parameters": [
						{
							"name": "X-Authorization",
							"in": "header",
							"description": "bearer token",
							"required": true,
							"type": "string"
						}
					],
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
								}
							}
						}
					}
				}
			},
		}
	}

	tagsMap = () => {
		return [
			{
				"name": "organization-controller",
				"description": "Organization Controller"
			}
		]
	}

	async main(req, res, next) {
		return new Promise(async (resolve, reject) => {
			let [err, care]= await to (helpers.processRequirements(req, res, next));
			if(err){
				return reject(err)
			}
			let func = care.func;
			// let {func, requiresAdmin, doForAnother} =  this.pathExists(req)
			// if (!func) {
			// 	return reject({ code: 404, message: "Path not allowed" })
			// }
			// ;[err, care]= await to (helpers.processRequirements(req));
			;[err, care] = await to(func(req, res, next));
			if (err) {
				return reject(err)
			}
			res.send(care)
		})
	}
}

module.exports = authority