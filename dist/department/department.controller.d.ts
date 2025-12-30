import { DepartmentService } from './department.service';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    findAll(): import("./department.service").Department[];
    findOne(id: number): import("./department.service").Department | null;
    create(body: any): import("./department.service").Department;
    update(id: number, body: any): import("./department.service").Department | null;
    delete(id: number): boolean;
}
