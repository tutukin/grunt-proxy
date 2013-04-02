var	expect	= require('expect.js'),
	sinon	= require('sinon'),
	mock	= require('mock'),
	Server	= {
		listen		: sinon.spy()
	},
	Proxy	= {
		createServer: sinon.stub().returns(Server)
	},
	task,
	Grunt	= {
		registerMultiTask: sinon.spy()
	},
	Context	= {
		options		: sinon.stub()
	},
	optests = require('./optests.js');

task = mock(__dirname+"/../tasks/proxy.js",{
	'http-proxy'	: Proxy
});

describe('grunt-proxy task', function() {
	
	beforeEach(function(done) {
		
		Server.listen.reset();
		Proxy.createServer.reset();
		Grunt.registerMultiTask.reset();
		Context.options.reset();
		
		done();
	});
	
	it('should be a function', function(done) {
		expect(task).to.be.a('function');
		done();
	});
	
	it('should execute grunt.registerMultiTask(name,description,callback)', function(done) {
		var call;
		task(Grunt);
		expect(Grunt.registerMultiTask.calledOnce).to.equal(true);
		
		call = Grunt.registerMultiTask.firstCall;
		
		expect(call.args[0]).to.equal('proxy');
		expect(call.args[1]).to.be.a('string');
		expect(call.args[2]).to.be.a('function');
		
		done();
	});
	
	describe('callback to registerMultiTask', function() {
		var	host	= 'a host',
			port	= 'a port',
			listenPort = 'listener port',
			router	= 'router config',
			targetOptions, routerOptions, callback;
		
		beforeEach(function(done) {
			targetOptions = {
				port : listenPort,
				target : {
					host : host,
					port : port
				}
			};
			
			routerOptions = {
				port : listenPort,
				router : router
			};
			
			task(Grunt);
			callback = Grunt.registerMultiTask.firstCall.args[2];		
			done();
		});
		
		it('should call this.options()', function(done) {
			Context.options.returns({});
			callback.call(Context);
			expect(Context.options.calledOnce).to.equal(true);
			done();
		});
		
		optests.forEach( function (t) {
			it(t.title, function (done) {
				Context.options.returns(t.options);
				callback.call(Context);
				expect(Proxy.createServer.calledOnce).to.equal(true);
				expect(Proxy.createServer.firstCall.args).to.eql(t.createServer);
				expect(Server.listen.calledOnce).to.equal(true);
				expect(Server.listen.firstCall.args).to.eql(t.listen);
				done();
			} );
		} );
	});
});