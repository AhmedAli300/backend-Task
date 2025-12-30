"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const raw = require('../data/department.json');
let DepartmentService = class DepartmentService {
    departments;
    constructor() {
        const rawData = Array.isArray(raw)
            ? raw
            : raw && Array.isArray(raw.default)
                ? raw.default
                : raw && raw.department
                    ? [raw]
                    : raw && raw.default
                        ? [raw.default]
                        : [raw];
        this.departments = rawData.map((item, index) => {
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
                employeesNumber: Array.isArray(dept.employees) ? dept.employees.length : dept.employeesNumber ?? 0,
                status: typeof dept.status === 'boolean' ? dept.status : dept.status ?? null,
                parentDepartment: dept.parentDepartment ?? null,
                createdAt: dept.createdAt ?? null,
            };
        });
    }
    findAll() {
        return this.departments;
    }
    findOne(id) {
        return this.departments.find(dep => dep.id === id) || null;
    }
    create(department) {
        const dept = {
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
    update(id, updated) {
        const dep = this.findOne(id);
        if (!dep)
            return null;
        Object.assign(dep, updated);
        return dep;
    }
    remove(id) {
        const index = this.departments.findIndex(dep => dep.id === id);
        if (index === -1)
            return false;
        this.departments.splice(index, 1);
        return true;
    }
};
exports.DepartmentService = DepartmentService;
exports.DepartmentService = DepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DepartmentService);
//# sourceMappingURL=department.service.js.map