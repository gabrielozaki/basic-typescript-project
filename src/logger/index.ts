import { createLogger, format, transports } from 'winston';
import { DEBUG } from '../config';

let loglevel = 'info';
let logFormat = format.simple();

if (DEBUG === 'TRUE') {
  loglevel = 'debug';

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
