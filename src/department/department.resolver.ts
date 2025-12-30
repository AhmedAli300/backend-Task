import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { DepartmentService, Department } from './department.service';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class LocalizationType {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@ObjectType()
export class ParentDepartmentType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class DepartmentType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  employees: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => LocalizationType, { nullable: true })
  localization?: LocalizationType;

  @Field({ nullable: true })
  code?: number;

  @Field({ nullable: true })
  manager?: string;

  @Field({ nullable: true })
  location?: string;

  @Field(() => Int, { nullable: true })
  employeesNumber?: number;

  @Field({ nullable: true })
  status?: boolean;

  @Field(() => ParentDepartmentType, { nullable: true })
  parentDepartment?: ParentDepartmentType | null;

  @Field({ nullable: true })
  createdAt?: string;
}

@InputType()
export class DepartmentInput {
  @Field()
  name: string;

  @Field(() => Int)
  employees: number;
}

@Resolver(() => DepartmentType)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  private formatDepartment(dep: Department | null): DepartmentType | null {
    if (!dep) return null;

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

  @Query(() => [DepartmentType])
  departments(): DepartmentType[] {
    return this.departmentService.findAll().map(dep => this.formatDepartment(dep)!);
  }

  @Query(() => DepartmentType, { nullable: true })
  department(@Args('id', { type: () => ID }) id: string) {
    const dep = this.departmentService.findOne(Number(id));
    return this.formatDepartment(dep);
  }

  @Mutation(() => DepartmentType)
  createDepartment(@Args('data') data: DepartmentInput) {
    const deptToCreate: Partial<Department> = {
      name: data.name,
      employees: [],
      employeesNumber: data.employees ?? 0,
    };
    const created = this.departmentService.create(deptToCreate);
    return this.formatDepartment(created)!;
  }

  @Mutation(() => DepartmentType, { nullable: true })
  updateDepartment(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: DepartmentInput,
  ) {
    const updatedData: Partial<Department> = {
      name: data.name,
      employeesNumber: data.employees ?? 0,
    };
    const updated = this.departmentService.update(Number(id), updatedData);
    return this.formatDepartment(updated);
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args('id', { type: () => ID }) id: string) {
    return this.departmentService.remove(Number(id));
  }
}
