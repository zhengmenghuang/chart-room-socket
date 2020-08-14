import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {

  @Get()
  test(): string {
    return 'Hello World'
  }
}
