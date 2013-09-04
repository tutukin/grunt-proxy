var	listen = {
		host : 'listen host',
		port : '1234',
		defaultPort: 9000
	},
	config = {
		host : 'target host',
		port : 'target port',

		router : 'routing table',
		https : {
			key : 'contents of server.key file',
			cert :'contents of server.crt'
		},
		changeOrigin : true
	};

module.exports = [{

	title	: 'should correctly process options{port,target}',
	options	: {
		port : listen.port,
		target : {
			host : config.host,
			port : config.port
		}
	},
	createServer : [{
		target : {
			host : config.host,
			port : config.port
		}
	}],
	listen : [listen.port]

}, {

	title : 'should correctly process options{port,router}',
	options : {
		port : listen.port,
		router : config.router
	},
	createServer : [{router:config.router}],
	listen : [listen.port]

}, {

	title	: 'should correctly process options{port,host,router}',
	options : {
		port : listen.port,
		host : listen.host,
		router : config.router
	},
	createServer : [{router:config.router}],
	listen : [listen.port,listen.host]

}, {

	title	: 'should correctly pass additional config options {https, changeOrigin}',
	options : {
		port : listen.port,
		router : config.router,
		https : config.https,
		changeOrigin: config.changeOrigin
	},
	createServer : [{
		router : config.router,
		https : config.https,
		changeOrigin : config.changeOrigin}],
	listen : [listen.port]

}, {

	title	: 'should default port to 9000 when not supplied',
	options	: {
		target : {
			host : config.host,
			port : config.port
		}
	},
	createServer	: [{
		target : {
			host : config.host,
			port : config.port
		}}
	],
	listen : [listen.defaultPort]
}, {

	title	: 'should default port to 9000 when invalid port supplied',
	options	: {
		port: "bad port",
		target : {
			host : config.host,
			port : config.port
		}
	},
	createServer	: [{
		target : {
			host : config.host,
			port : config.port
		}}
	],
	listen : [listen.defaultPort]
}];
