import { inject, Injectable } from '@angular/core';
import { LogAppender, LOG_APPENDERS } from './log.appender';
import { LOG_FORMATTER } from './log.formatter';
import { LogLevelEnum } from './log-level.enum';
import { LoggerConfig } from './logger.config';

@Injectable()
export class LoggerService {
  private appenders = inject(LOG_APPENDERS);
  private formatter = inject(LOG_FORMATTER);
  private config = inject(LoggerConfig);

  private parentLogger = inject(LoggerService, {
    optional: true,
    skipSelf: true,
  });

  readonly categories: Record<string, LogAppender> = {};

  log(level: LogLevelEnum, category: string, msg: string): void {
    if (level < this.config.level) {
      return;
    }

    const formatted = this.formatter(level, category, msg);
    const catAppender = this.categories[category];

    if (catAppender) {
      catAppender.append(level, category, formatted);
    }

    for (const a of this.appenders) {
      a.append(level, category, formatted);
    }

    if (this.config.chaining && this.parentLogger) {
      this.parentLogger.log(level, category, msg);
    }
  }

  error(category: string, msg: string): void {
    this.log(LogLevelEnum.ERROR, category, msg);
  }

  info(category: string, msg: string): void {
    this.log(LogLevelEnum.INFO, category, msg);
  }

  debug(category: string, msg: string): void {
    this.log(LogLevelEnum.DEBUG, category, msg);
  }
}
