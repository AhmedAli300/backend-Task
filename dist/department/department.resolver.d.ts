import { DepartmentService } from './department.service';
export declare class LocalizationType {
    name: string;
    description?: string;
}
export declare class ParentDepartmentType {
    id: number;
    name: string;
}
export declare class DepartmentType {
    id: number;
    name: string;
    employees: number;
    description?: string;
    localization?: LocalizationType;
    code?: number;
    manager?: string;
    location?: string;
    employeesNumber?: number;
    status?: boolean;
    parentDepartment?: ParentDepartmentType | null;
    createdAt?: string;
}
export declare class DepartmentInput {
    name: string;
    employees: number;
}
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    private formatDepartment;
    departments(): DepartmentType[];
    department(id: string): DepartmentType | null;
    createDepartment(data: DepartmentInput): DepartmentType;
    updateDepartment(id: string, data: DepartmentInput): DepartmentType | null;
    deleteDepartment(id: string): boolean;
}
