import type { Logger } from 'winston';
import { createLogger, format, transports } from 'winston';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const isDebug = configService.get<boolean>('DEBUG', false);
const nodeEnv = configService.get<string>('NODE_ENV', 'production');

let logFormat = format.simple();
const loglevel = isDebug ? 'debug' : 'info';

if (nodeEnv === 'development' || nodeEnv === 'test') {
  logFormat = format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  );
}

export const logger: Logger = createLogger({
  level: loglevel,
  format: logFormat,
  transports: [new transports.Console()],
});
