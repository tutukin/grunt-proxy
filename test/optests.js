var	listen	= {
		host	: 'listen host',
		port	: 'listen port'
	},
	config	= {
		host	: 'target host',
		port	: 'target port',
		router	: 'routing table',
		config	: 'a config'
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
	createServer	: [{target : {
		host	: config.host,
		port	: config.port
	}}],
	listen			: [listen.port]
	
}, {
	
	title	: 'should correctly process options{port,router}',
	options	: {
		port	: listen.port,
		router	: config.router
	},
	createServer	: [{router:config.router}],
	listen			: [listen.port]
	
}, {
	
	title	: 'should correctly process options{port,host,router}',
	options	: {
		port	: listen.port,
		host	: listen.host,
		router	: config.router
	},
	createServer	: [{router:config.router}],
	listen			: [listen.port,listen.host]
	
}];