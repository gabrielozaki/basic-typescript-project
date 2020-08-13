import { createLogger, format, transports } from 'winston';
import { DEBUG, NODE_ENV } from '../config';

let logFormat = format.simple();

const loglevel = DEBUG === 'true' ? 'debug' : 'info';

if (NODE_ENV === 'development' || NODE_ENV === 'test') {

  logFormat = format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  );
}

export default createLogger({
  level: loglevel,
  format: logFormat,
  transports: [new transports.Console()],
});
