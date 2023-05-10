import { Type } from '@angular/core';
import { DefaultLogAppender, LogAppender } from './log.appender';
import { defaultLogFormatFn, LogFormatFn } from './log.formatter';
import { LogLevelEnum } from './log-level.enum';

export abstract class LoggerConfig {
  abstract level: LogLevelEnum;
  abstract chaining: boolean;
  abstract formatter: LogFormatFn;
  abstract appenders: Type<LogAppender>[];
}

export const defaultConfig: LoggerConfig = {
  level: LogLevelEnum.DEBUG,
  chaining: false,
  formatter: defaultLogFormatFn,
  appenders: [DefaultLogAppender],
};
