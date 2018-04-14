const connect = require('connect');

function setup(format) {
	const regexp = /:(\w+)/g;

	return function createLogger(req, res, next) {
		const str = format.replace(regexp, (match, property) => {
			return req[property];
		});
		console.log(str);
		next();
	}
}
module.exports = setup;

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}

const app = connect()
	.use(logger)
        .use(setup(':method :url'))
	.use(hello)
	.listen(3000);

