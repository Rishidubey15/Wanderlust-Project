const pino = require('pino');

const logger = pino({
  transport: {
    target: 'pino-pretty', // Pretty output in dev
    options: { colorize: true }
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

module.exports = logger;