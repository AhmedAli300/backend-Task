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
export declare class DepartmentService {
    private departments;
    constructor();
    findAll(): Department[];
    findOne(id: number): Department | null;
    create(department: Partial<Department>): Department;
    update(id: number, updated: Partial<Department>): Department | null;
    remove(id: number): boolean;
}
