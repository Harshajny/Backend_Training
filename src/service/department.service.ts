import HttpException from "../exceptions/http.exceptions";
import DepartmentRepository from "../repository/department.repository";
import Department from "../entity/department.entity";
export class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {
    this.departmentRepository = departmentRepository;
  }

  public getAllDepartments = async () => this.departmentRepository.find();

  public getDepartmentById = async (id: number) =>
    this.departmentRepository.findOneBy({ id }, ["employee"]);

  public createNewDepartment = async (name: string) => {
    const newDepartment = new Department();
    newDepartment.name = name;
    await this.departmentRepository.save(newDepartment);
  };

  public updateDepartment = async (
    id: number,
    department: Partial<Department>
  ) => {
    const departmentData = await this.getDepartmentById(id);
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    await this.departmentRepository.update(id, department);
  };

  public deleteDepartment = async (id: number) => {
    const departmentData = await this.getDepartmentById(id);
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    if (departmentData.employee.length) {
      throw new HttpException(403, "Department has employees");
    }
    this.departmentRepository.remove(departmentData);
  };
}