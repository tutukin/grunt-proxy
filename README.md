# grunt-proxy

Start proxy server using [http-proxy][].

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][],
install this plugin with the following command:

```bash
npm install grunt-proxy --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-proxy');
```

If the plugin has been installed correctly, running `grunt --help`
at the command line should list the newly-installed plugin's task
or tasks. In addition, the plugin should be listed in package.json
as a `devDependency`, which ensures that it will be installed whenever
the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
[http-proxy]: https://npmjs.org/package/http-proxy

## The "proxy" task

### Overview
In your project's Gruntfile, add a section named `proxy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  proxy: {
    proxy1 : {
    	options : {
    		port : 8050,			// start proxy server, listening to the port 8050
			host : 'localhost',			// bind proxy server to 'localhost' interface
			target : {				// make it forward all the requests to localhost:8011
				host: 'localhost',
				port: 8011
			}
		}
    },
    proxy2 : {
    	options : { // start proxy server, listening to the default port 9000
			router : {		// make it forward requests according to this table
				'localhost/secure'    : 'https://mysecure.server.com:443/subpath',
                'localhost/insecure/' : 'http://127.0.0.1:3000'
			},
			https  : {
				key   : fs.readFileSync( path.join(proxyKeysDir, 'server.key'), 'utf8' ),
                cert  : fs.readFileSync( path.join(proxyKeysDir, 'server.crt'), 'utf8' )
			},
			changeOrigin : true
		}
    }
  },
})
```

### Options

The simple rule is: all options except for `options.port` and `options.host` are passed to
http-proxy's `proxy.createServer(options)` method. The `options.port` and `options.host` are
removed from `options` passed to server's `server.listen(port, host)` method.

#### Listener options

##### options.port
Type: `Integer`
Default value: 9000

A port number to which the proxy server should listen to.

##### options.host
Type: `String`
Default value: none

An optional hostname at which the proxy accepts connections.

#### Proxy options

All options except for the abovementioned are passed to http-proxy's 
`proxy.createServer(options)` method. Please refer to [http-proxy][]
documentation.

Note, if `options.router` is given, `options.target` is ignored.

### Usage Examples

See overview section above and tests

### Tests

grunt test

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code using [grunt][].

## Release History
September ??, 2013. **v. 0.0.3**
	
	- support for additional config options (`https`, `changeOrigin` etc.) options
	- by default proxy listens to the port 9000
	
April 2, 2013. **v. 0.0.2**

	- add `host` option, that is passed to proxy.listen() method
	- some refactorings
	- unit tests

January 5, 2013. **v. 0.0.1**

	- main functionality
