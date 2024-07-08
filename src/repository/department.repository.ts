import { Repository } from "typeorm";
import Department from "../entity/department.entity";

export default class DepartmentRepository {
  constructor(private departmentRepository: Repository<Department>) {
    this.departmentRepository = departmentRepository;
  }

  find = async () => await this.departmentRepository.find();

  findOneBy = async (filter: Partial<Department>, relations?: string[]) =>
    await this.departmentRepository.findOne({
      where: filter,
      relations,
    });

  save = async (department: Department) =>
    await this.departmentRepository.save(department);

  update = async (id: number, department: Partial<Department>) =>
    // await this.employeeRepository.save({id,...employee});
    await this.departmentRepository.update({ id }, department);

  remove = async (department: Department) =>
    await this.departmentRepository.softRemove(department);
}