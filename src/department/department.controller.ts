import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentService.findOne(Number(id));
  }

  @Post()
  create(@Body() body) {
    return this.departmentService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.departmentService.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.departmentService.remove(Number(id));
  }
}
