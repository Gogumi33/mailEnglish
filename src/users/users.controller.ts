import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입 API
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // 모든 유저 조회 API
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // 특정 유저 조회 API -> ':id' 제일 앞에 굳이 '/' 안붙여도 됨
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(Number(id));
  }

  // 유저 삭제 API
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}
