import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {UserService} from './user.service';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Post('add')
  add(@Body() user: User) {
    return this.userService.add(user);
  }

  @Delete('delete/:id')
  delete(@Param() params: {id: string}) {
    return this.userService.delete(params.id)
  }

  @Get('getAll')
  getAll() {
    return this.userService.findAll();
  }

  @Get('getOne/:id')
  getOne(@Param() params: {id: string}) {
    return this.userService.findOne(params.id);
  }
}
