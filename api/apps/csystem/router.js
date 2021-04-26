const csystem = require("./csystem");
const csErroHandler = require("./errors");
const to = require('await-to-js').to;

class router {
	constructor() {

	}

	defaults(req, res, next) {
		req.params.app === undefined ? req.params.app = "csystem" : false;
		req.params.method === undefined ? req.params.method = "main" : false;
		next();
	}

	async loadpage(config_, req, res, next) {
		let config = config_.siteapi
		config.extras = config_
		let self = this;
		let appname = req.params.app
		let func = req.params.method || 'main',
			newfunc
		let appnameforApi = func
		let funcforApi = req.params.v1 === undefined ? func : req.params.v1
		let app;
		let [err, care, dontcare] = [];

		// console.log('loading page...')
		// console.log(appname, func, app)

		try {
			// console.log(__dirname + '/../' + appname)
			console.log('llllllllllll')
			console.log('llllllllllll')
			console.log('llllllllllll')
			console.log('llllllllllll')
			console.log('llllllllllll')
			
			app = (new (require(__dirname + '/../' + appname))(config))// /api/users/uid;
			console.log('PPPPPPPPPPP')
			console.log('PPPPPPPPPPP')
			console.log('PPPPPPPPPPP')
			console.log('PPPPPPPPPPP')
			console.log('PPPPPPPPPPP')
			if (app === undefined) throw ({ code: "MODULE_NOT_FOUND" }); //what type of error is this?
			// console.log(app)
			// console.log(JSON.stringify(app))
			// console.log(app.main)
			if (app[func] === undefined) throw ({ code: "NOT FUNCTION OF MODULE", status: 404 }); //what type of error is this?
		} catch (error) {
			console.log('aaaaaaaaaaaaaa')
			console.log(error)
			if (error.code === "MODULE_NOT_FOUND") { //the app does not exist /{app}/method/etc
				self.errorHandler(req, res, error, next)
				return;
			}

			if (error.code === "NOT FUNCTION OF MODULE") {
				try {
					// console.log('BBBBBBBBBBBBBBBBBB');
					// console.log(__dirname + `/../${appname}/${func}`)
					// console.log(require(__dirname + `/../${appname}/${func}`))
					// console.log(new require(__dirname + `/../${appname}/${func}`))
					// /app/module/index.js
					// app = (new (require(__dirname+`/../${appname}/${func}`)))
					// (new (
					// require(__dirname+'/../'+appname))(config)
					//)
					// console.log('ppppppp', __dirname + `/../${appname}/${func}`)
					let tmp = require(__dirname + `/../${appname}/${func}`);
					// console.log('ppppppp')
					// console.log('-----------')
					// console.log('-----------')
					// console.log('-----------', __dirname + `/../${appname}/${func}`)
					// console.log(tmp.auth)
					// console.log(typeof tmp)
					// console.log(require(__dirname + '/../' + appname))
					// console.log(require(`/var/www/html/csycms/SITE1/api/apps/api/auth`))
					// app = new (require(__dirname + `/../${appname}/${func}`))(config)
					try{
						app = new tmp(config)
					}catch(err){
						app = new tmp[func](config)
					}
					
					func = self.defaultMethod(req.params.v1)
				} catch (err) {
					console.log(err)
					// console.log(err.message)
					// console.log('CCCCCCCCCCCCCCCCCC')
					if (err.message !== "require(...) is not a constructor") { //the app does not exist /{app}/method/etc
						error.message = "Not found"
						self.errorHandler(req, res, error, next)
						return;
					}

					// /app/module/index.js[module]
					// console.log(`${appname}/${func}`)
					try {
						app = (new (require(__dirname + `/../${appname}/${func}`))[func])
						func = self.defaultMethod(req.params.v1)
					} catch (err) {
						self.errorHandler(req, res, error, next)
						return;
					}
				}
			}
		}

		// console.log(app)
		console.log('ahisop')
		// console.log(app)
			;[err, dontcare] = await to(app.setup(req, res, next))
		try {
			;[err, dontcare] = await to(app[func](req, res, next));
			if (err) throw (err)			//if func is a param instead of a function, or func does not exist
		} catch (error) {
			console.log(error)
			if (error.name === "TypeError")
				try {
					;[err, dontcare] = await to(app["main"](req, res, next))
					if (err) throw (err)
				} catch (err) {
					self.errorHandler(req, res, err, next)
				}

			else self.errorHandler(req, res, error, next)


		}
	}

	errorHandler(req, res, error, next) {
		// console.log(error)
		error = error.code !== undefined || error.message !== undefined ? error : error + ''
		error.code === "MODULE_NOT_FOUND" ? csErroHandler.error404(req, res) : csErroHandler.error500(req, res, error, next)
		next();
	}

	defaultMethod(method) {
		return method === undefined ? "main" : method;
	}

}


module.exports = new router