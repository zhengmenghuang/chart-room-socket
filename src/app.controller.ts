import { Controller, Get, Render, Response } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  @Render('index')
  root(@Response() res) {
    // res.sendFile(join(__dirname, '../views', '/index.hbs'));
  }
}
