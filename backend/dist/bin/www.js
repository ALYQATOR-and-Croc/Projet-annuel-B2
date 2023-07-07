"use strict";
// #!/usr/bin/env node
// /**
//  * Module dependencies.
//  */
// import { App } from '../app';
// import debug = require('debug'); // ('backend:server');
// import http = require('http');
// import { AddressInfo } from 'net';
// const app = new App();
// /**
//  * Get port from environment and store in Express.
//  */
// const port = normalizePort(process.env.PORT || '3000');
// app.app().getApp().set('port', port);
// /**
//  * Create HTTP server.
//  */
// const server = http.createServer(app.app());
// /**
//  * Listen on provided port, on all network interfaces.
//  */
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
// /**
//  * Normalize a port into a number, string, or false.
//  */
// function normalizePort(val: string): boolean | string | number {
//   const portNorm: number = parseInt(val, 10);
//   if (isNaN(portNorm)) {
//     // named pipe
//     return val;
//   }
//   if (portNorm >= 0) {
//     // port number
//     return port;
//   }
//   return false;
// }
// /**
//  * Event listener for HTTP server "error" event.
//  */
// function onError(error: { syscall: string; code: any }) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//   const bind: string =
//     typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
// /**
//  * Event listener for HTTP server "listening" event.
//  */
// function onListening() {
//   const addr: string | AddressInfo | null = server.address();
//   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr!.port;
//   debug('Listening on ' + bind);
// }
//# sourceMappingURL=www.js.map