import { InjectionToken } from '@angular/core';
import { LogLevelEnum } from './log-level.enum';

export const LOG_FORMATTER = new InjectionToken<LogFormatFn>('LOG_FORMATTER');

export type LogFormatFn = (
  level: LogLevelEnum,
  category: string,
  msg: string
) => string;

export const defaultLogFormatFn: LogFormatFn = (level, category, msg) => {
  const levelString = LogLevelEnum[level].padEnd(5);
  return `[${levelString}] ${category.toUpperCase()} ${msg}`;
};
