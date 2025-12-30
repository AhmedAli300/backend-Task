import { Module } from '@nestjs/common';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  controllers: [DepartmentController], // هنا
  providers: [DepartmentResolver, DepartmentService], // هنا
})
export class DepartmentModule {}
