import { Injectable } from '@nestjs/common';

const raw = require('../data/department.json');

export interface Department {
  id: number;
  name: string;
  employees?: any;
  description?: string;
  localization?: any;
  code?: any;
  manager?: string;
  location?: string;
  employeesNumber?: number;
  status?: boolean;
  parentDepartment?: any;
  createdAt?: string;
}

@Injectable()
export class DepartmentService {
  private departments: Department[];

  constructor() {
    const rawData: any[] = Array.isArray(raw)
      ? raw
      : raw && Array.isArray(raw.default)
      ? raw.default
      : raw && raw.department
      ? [raw]
      : raw && raw.default
      ? [raw.default]
      : [raw];

    this.departments = rawData.map((item: any, index: number) => {
      const dept = item.department || item;
      return {
        id: dept.id ?? index + 1,
        name: dept.name ?? '',
        employees: Array.isArray(dept.employees) ? dept.employees : undefined,
        description: dept.description,
        localization: dept.localization,
        code: dept.code,
        manager: dept.manager,
        location: dept.location,
        employeesNumber:
        Array.isArray(dept.employees) ? dept.employees.length : dept.employeesNumber ?? 0,
        status: typeof dept.status === 'boolean' ? dept.status : dept.status ?? null,
        parentDepartment: dept.parentDepartment ?? null,
        createdAt: dept.createdAt ?? null,
      } as Department;
    });
  }

  findAll(): Department[] {
    return this.departments;
  }

  findOne(id: number): Department | null {
    return this.departments.find(dep => dep.id === id) || null;
  }

  create(department: Partial<Department>): Department {
    const dept: Department = {
      id: this.departments.length + 1,
      name: department.name ?? '',
      employees: department.employees ?? [],
      description: department.description,
      localization: department.localization,
      code: department.code,
      manager: department.manager,
      location: department.location,
      employeesNumber: department.employeesNumber ?? (Array.isArray(department.employees) ? department.employees.length : 0),
      status: department.status,
      parentDepartment: department.parentDepartment ?? null,
      createdAt: department.createdAt,
    };
    this.departments.push(dept);
    return dept;
  }

  update(id: number, updated: Partial<Department>): Department | null {
    const dep = this.findOne(id);
    if (!dep) return null;
    Object.assign(dep, updated);
    return dep; 
  }

  remove(id: number): boolean {
    const index = this.departments.findIndex(dep => dep.id === id);
    if (index === -1) return false;
    this.departments.splice(index, 1);
    return true;
  }
}
