#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http from 'http';
import app from '../app';
import config from '../config';
import { Logger } from 'tslog';

const logger = new Logger({ name: 'ob:server' });

/**
 * Normalize a port into a number, string, or false.
 */

export const normalizePort = (val: string) => {
  return parseInt(val, 10);
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port);
app.set('port', port);

/**
 * Event listener for HTTP server 'error' event.
 */
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const onError = (error: any) => {
  let errorData = '';
  if (error.code === 'EACCES') {
    errorData = `requires elevated privileges`;
  } else {
    errorData = `is already in use`;
  }
  return errorData;
};

/**
 * Event listener for HTTP server 'listening' event.
 */

const onListening = () => {
  const addr = www.address();
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  logger.silly(`Listening on port ${(addr as any).port}`);
};

/**
 * Create HTTP server.
 */

export const www = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

www.listen(port);
www.on('error', onError);
www.on('listening', onListening);
