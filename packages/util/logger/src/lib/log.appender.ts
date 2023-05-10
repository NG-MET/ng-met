import { inject, Injectable, InjectionToken } from '@angular/core';
import { ColorService } from './color.service';
import { LogLevelEnum } from './log-level.enum';

export abstract class LogAppender {
  abstract append(level: LogLevelEnum, category: string, msg: string): void;
}

@Injectable()
export class DefaultLogAppender implements LogAppender {
  colorService = inject(ColorService, { optional: true, self: true });

  append(level: LogLevelEnum, category: string, msg: string): void {
    if (this.colorService) {
      msg = this.colorService.apply(level, msg);
    }
    console.log(msg);
  }
}

export const LOG_APPENDERS = new InjectionToken<LogAppender[]>('LOG_APPENDERS');
