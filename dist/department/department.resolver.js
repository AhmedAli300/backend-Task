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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentResolver = exports.DepartmentInput = exports.DepartmentType = exports.ParentDepartmentType = exports.LocalizationType = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_service_1 = require("./department.service");
const graphql_2 = require("@nestjs/graphql");
let LocalizationType = class LocalizationType {
    name;
    description;
};
exports.LocalizationType = LocalizationType;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], LocalizationType.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], LocalizationType.prototype, "description", void 0);
exports.LocalizationType = LocalizationType = __decorate([
    (0, graphql_2.ObjectType)()
], LocalizationType);
let ParentDepartmentType = class ParentDepartmentType {
    id;
    name;
};
exports.ParentDepartmentType = ParentDepartmentType;
__decorate([
    (0, graphql_2.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], ParentDepartmentType.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], ParentDepartmentType.prototype, "name", void 0);
exports.ParentDepartmentType = ParentDepartmentType = __decorate([
    (0, graphql_2.ObjectType)()
], ParentDepartmentType);
let DepartmentType = class DepartmentType {
    id;
    name;
    employees;
    description;
    localization;
    code;
    manager;
    location;
    employeesNumber;
    status;
    parentDepartment;
    createdAt;
};
exports.DepartmentType = DepartmentType;
__decorate([
    (0, graphql_2.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], DepartmentType.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], DepartmentType.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DepartmentType.prototype, "employees", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentType.prototype, "description", void 0);
__decorate([
    (0, graphql_2.Field)(() => LocalizationType, { nullable: true }),
    __metadata("design:type", LocalizationType)
], DepartmentType.prototype, "localization", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", Number)
], DepartmentType.prototype, "code", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentType.prototype, "manager", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentType.prototype, "location", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], DepartmentType.prototype, "employeesNumber", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], DepartmentType.prototype, "status", void 0);
__decorate([
    (0, graphql_2.Field)(() => ParentDepartmentType, { nullable: true }),
    __metadata("design:type", Object)
], DepartmentType.prototype, "parentDepartment", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], DepartmentType.prototype, "createdAt", void 0);
exports.DepartmentType = DepartmentType = __decorate([
    (0, graphql_2.ObjectType)()
], DepartmentType);
let DepartmentInput = class DepartmentInput {
    name;
    employees;
};
exports.DepartmentInput = DepartmentInput;
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], DepartmentInput.prototype, "name", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DepartmentInput.prototype, "employees", void 0);
exports.DepartmentInput = DepartmentInput = __decorate([
    (0, graphql_2.InputType)()
], DepartmentInput);
let DepartmentResolver = class DepartmentResolver {
    departmentService;
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    formatDepartment(dep) {
        if (!dep)
            return null;
        const deptType = new DepartmentType();
        deptType.id = dep.id;
        deptType.name = dep.name;
        deptType.employees = dep.employees?.length ?? 0;
        deptType.description = dep.description ?? undefined;
        deptType.localization = dep.localization ?? undefined;
        deptType.code = dep.code ?? undefined;
        deptType.manager = dep.manager ?? undefined;
        deptType.location = dep.location ?? undefined;
        deptType.employeesNumber = dep.employeesNumber ?? 0;
        deptType.status = dep.status ?? undefined;
        deptType.parentDepartment = dep.parentDepartment ?? undefined;
        deptType.createdAt = dep.createdAt ?? undefined;
        return deptType;
    }
    departments() {
        return this.departmentService.findAll().map(dep => this.formatDepartment(dep));
    }
    department(id) {
        const dep = this.departmentService.findOne(Number(id));
        return this.formatDepartment(dep);
    }
    createDepartment(data) {
        const deptToCreate = {
            name: data.name,
            employees: [],
            employeesNumber: data.employees ?? 0,
        };
        const created = this.departmentService.create(deptToCreate);
        return this.formatDepartment(created);
    }
    updateDepartment(id, data) {
        const updatedData = {
            name: data.name,
            employeesNumber: data.employees ?? 0,
        };
        const updated = this.departmentService.update(Number(id), updatedData);
        return this.formatDepartment(updated);
    }
    deleteDepartment(id) {
        return this.departmentService.remove(Number(id));
    }
};
exports.DepartmentResolver = DepartmentResolver;
__decorate([
    (0, graphql_1.Query)(() => [DepartmentType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], DepartmentResolver.prototype, "departments", null);
__decorate([
    (0, graphql_1.Query)(() => DepartmentType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentResolver.prototype, "department", null);
__decorate([
    (0, graphql_1.Mutation)(() => DepartmentType),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DepartmentInput]),
    __metadata("design:returntype", void 0)
], DepartmentResolver.prototype, "createDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => DepartmentType, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, DepartmentInput]),
    __metadata("design:returntype", void 0)
], DepartmentResolver.prototype, "updateDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DepartmentResolver.prototype, "deleteDepartment", null);
exports.DepartmentResolver = DepartmentResolver = __decorate([
    (0, graphql_1.Resolver)(() => DepartmentType),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentResolver);
//# sourceMappingURL=department.resolver.js.map