import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      name: 'LUMEN Backend',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

