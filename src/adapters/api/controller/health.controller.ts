import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorator/public.decorator';

@Controller('/health')
export class HealthController {
  constructor() {}

  @Public()
  @Get()
  checkHealth(): string {
    return 'Up!';
  }
}
