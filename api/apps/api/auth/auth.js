'use strict'

const { resolve, reject } = require('bluebird');
const { hash } = require('bcrypt');

const to = require('await-to-js').to
const csystem = require(__dirname + "/../../csystem").csystem;
// const etc = require('node-etc')
// const path = require('path');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

let sequelize;


class auth extends csystem {

	constructor(config) {
		super(config);
	}

	login_ = async (req, res, next) => { // for some unknown reason login fails
		return new Promise(async (resolve, reject) => {
			let body = req.body;
			//comparePassword
			let { email, password } = body
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.password,
						},
					]
			};
			let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { email } }, associated)));
			if (!care) {
				return reject({ status: 401, message: "Wrong email or password" })
			}
			if(!care.dataValues.enabled){
				return reject({ status: 401, message: `Account belonging to ${email} has been diabled` })
			}
			let user = care.dataValues
			let hash = care.password.dataValues.password
				;[err, care] = await to(this.comparePassword(password, hash))
			if (!care) {
				return reject({ status: 401, message: "Wrong email or password" })
			}
			// createToken
			let tmpUser = {};
			for (let i in user) {
				if ('object' !== typeof user[i]) {
					tmpUser[i] = user[i]
				}
			}
			let { userId, authority, firstName, lastName } = user;
			tmpUser = Object.assign({}, { userId, email, authority, firstName, lastName })
			let token = this.token(tmpUser);
			return resolve({ token })
		})
	}

	logout_ = async (req, res, next) => { // for some unknown reason login fails
		return new Promise(async (resolve, reject) => {
			resolve()
		})
	}

	changePassword_ = async (req, res, next) => { // for some unknown reason login fails
		return new Promise(async (resolve, reject) => {
			let {password, oldpassword} = req.body;
			let [err, care] = await to (this.isAuthenticated(req, res, next))
			if(err)return reject(err);
			let userId = care.userId;
			;[err, care] = await to(this.sequelize.models.users.findOne({where:{userId}}));
			if(err)return reject(err);
			let email = care.dataValues.email;
			let tmpReq = {
				body:{email, password: oldpassword}
			}
			;[err, care] = await to(this.login_(tmpReq, res, next));
			if(err)return reject({status: 422, message: "wrong password"});
			let associated = {
				include:
					[
						{
							model: this.sequelize.models.password,
							// where: { code: passwordToken }
						},
					]
			};
			; [err, care] = await to(this.sequelize.models.users.findOne(
				Object.assign({where:{userId}}, associated))
			);
			let passwordObj = care.password
				;[err, care] = await to(this.hashPassword(password))
			let hashedPassword = care;
			;[err, care] = await to(passwordObj.update({ password: hashedPassword }))
			return resolve()
		})
	}

	// /** Set path for it */
	// activateUser = (req) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let code = req.query.activateToken;
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.activationCode,
	// 						where: { code }
	// 					},
	// 				]
	// 		}
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			Object.assign({}, associated))
	// 		);
	// 		if (!care) {
	// 			return reject({ code: 409, message: "Account had been activated" })
	// 		}
	// 		let userId = care.dataValues.userId;
	// 		await to(this.sequelize.models.users.update({ isActive: true }, { where: { userId } }))
	// 		await to(care.activationCode.destroy())
	// 			;[err, care] = await to(this.createPasswordCode(userId))
	// 		resolve(care)

	// 	})
	// }
	// createPasswordCode = async (userId) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.passwordCode,
	// 					},
	// 				]
	// 		};
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		if (!care.passwordCode) {
	// 			await to(this.sequelize.models.passwordCode.create({ userUserId: userId, code: '' }))
	// 				;[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		}
	// 		await to(care.passwordCode.update({ code: care.passwordCode.dataValues.codeId }))
	// 		resolve({ code: care.passwordCode.dataValues.codeId })
	// 	})
	// }

	// createPassword = async (req) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let { passwordToken, password } = req.body;
	// 		let associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.passwordCode,
	// 						where: { code: passwordToken }
	// 					},
	// 				]
	// 		};
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			Object.assign({}, associated))
	// 		);
	// 		if (!care) {
	// 			return reject({ code: 422, message: `Not Account found matching ${passwordToken}` })
	// 		}
	// 		let passwordCode = care.passwordCode
	// 		let userId = care.dataValues.userId
	// 			;[err, care] = await to(this.hashPassword(password))
	// 		let hashedPassword = care
	// 		associated = {
	// 			include:
	// 				[
	// 					{
	// 						model: this.sequelize.models.password,
	// 					},
	// 				]
	// 		};
	// 		[err, care] = await to(this.sequelize.models.users.findOne(Object.assign({ where: { userId } }, associated)));
	// 		if (!care.password) {
	// 			await to(this.sequelize.models.password.create({ userUserId: userId, password: hashedPassword }))
	// 		}
	// 		else {
	// 			[err, care] = await to(care.password.update({ password: hashedPassword }))
	// 		}
	// 		resolve()
	// 		await to(passwordCode.destroy())
	// 		return;

	// 	})
	// }
	// getPasswordResetCode = async (req, res, next) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		let { sendActivationMail, email } = req.query;
	// 		let [err, care] = await to(this.sequelize.models.users.findOne(
	// 			{ where: { email } }
	// 		));
	// 		if (!care) {
	// 			return reject({ code: 422, message: `${email} not found` })
	// 		}
	// 		let userId = care.dataValues.userId;
	// 		;[err, care] = await to(this.createPasswordCode(userId))
	// 		let code = care.code;
	// 		resolve({ passwordToken: code })
	// 		let tmpsendActivationMail = sendActivationMail
	// 		switch (tmpsendActivationMail) {
	// 			case true:
	// 				sendActivationMail = true;
	// 				break;
	// 			case false:
	// 				sendActivationMail = false;
	// 				break;
	// 			case "true":
	// 				sendActivationMail = true;
	// 				break;
	// 			case "false":
	// 				sendActivationMail = false;
	// 				break;
	// 			default:
	// 				sendActivationMail = true;
	// 		}
	// 		if (sendActivationMail) {
	// 			let config = this.config
	// 			let accountActivation = require(path.join(__dirname, '../../../', 'emailTemplates/resetPassword'))
	// 			accountActivation = accountActivation.replace(/{{system}}/g, config.extras.site.title)
	// 				.replace(/{{api}}/g, config.extras.scheme + '://' + config.extras.domain)
	// 				.replace(/{{token}}/g, code)
	// 				.replace(/{{logo_url}}/g, config.extras.logo)
	// 				.replace(/{{copyright_name}}/g, config.extras.copyright.name)
	// 				.replace(/{{site}}/g, config.extras.copyright.url)

	// 				;[err, care] = await to(this.sendEmail({
	// 					subject: `${config.extras.site.title} Reset Password`,
	// 					to: email,
	// 					fromName: `Accounts`,
	// 					html: accountActivation,
	// 				}))
	// 		}
	// 	})
	// }


	functionsMap = () => {
		return {
			"api/auth/login": {
				'POST': {
					func: this.login_, // for some unknown reason login fails
					"tags": [
						"auth-controller"
					],
					"summary": "login",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"email": { type: "string" },
										"password": { type: "string" },
									}
								}
							}
						}
					},
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
			"api/auth/changePassword": {
				'POST': {
					func: this.changePassword_,
					"tags": [
						"auth-controller"
					],
					"summary": "changePassword",
					"requestBody": {
						"required": true,
						"content": {
							"application/json": {
								"schema": {
									"properties": {
										"oldpassword": { type: "string" },
										"password": { type: "string" }
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
			"api/auth/logout": {
				'GET': {
					func: this.logout_, // for some unknown reason login fails
					"tags": [
						"auth-controller"
					],
					"summary": "logout",
					"responses": {
						"200": {
							"description": "OK",
							"content": {
								"application/json": {
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
					]
				}
			},

		}
	}

	tagsMap = () => {
		return [
			{
				"name": "user-controller",
				"description": "User Controller"
			}
		]
	}

	async main(req, res, next) {
		return new Promise(async (resolve, reject) => {
			// let func = this.pathExists(req)
			let {func, requiresAdmin, doForAnother} =  this.pathExists(req)
			if (!func) {
				return reject({ code: 404, message: "Path not allowed" })
			}
			let [err, care] = await to(func(req, res, next));
			if (err) {
				return reject(err)
			}
			res.send(care)
		})
	}


}

module.exports = auth