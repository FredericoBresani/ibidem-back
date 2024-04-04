import { Injectable } from '@nestjs/common';

@Injectable()
export class IbidemConfigService {
  constructor() {
    /* empty */
  }

  public path(): string {
    let environment = '';
    if (
      process.env.npm_lifecycle_event &&
      process.env.npm_lifecycle_event == 'start:dev'
    ) {
      environment = 'development';
    } else {
      environment = 'production';
    }

    return `${process.cwd()}/environments/${environment}.env`;
  }
}
