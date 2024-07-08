import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exceptions/http.exceptions";
import { EmployeeRepository } from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken, { JwtPayLoad } from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

export class EmployeeService {
  // private employeeRepository: EmployeeRepository;
  constructor(
    private employeeRepository: EmployeeRepository,
    private departmentRepository: DepartmentRepository
  ) {
    this.employeeRepository = employeeRepository;
    this.departmentRepository = departmentRepository;
  }
  //get

  public getAllEmployees = async (): Promise<Employee[]> => 
    {
    return this.employeeRepository.find();
  };

  getEmployeeById = async (id: number) => {
    const employees = await this.employeeRepository.findOneby({ id });
    if (!employees) {
      throw new HttpException(404, "Employee not found");
    }
    return employees;
  };

  //post
  public createNewEmployee = async (
    name: string,
    email: string,
    age: number,
    address: Address,
    password: string,
    role: Role,
    department: Department
  ) => {    
    const departmentData = await this.departmentRepository.findOneBy({
      name: department.name,
    });
    if (!departmentData) {
      throw new HttpException(404, "Department Not Found");
    }
    const newEmployee = new Employee();
    newEmployee.name = name;
    newEmployee.email = email;
    newEmployee.age = age;
    newEmployee.address = address;
    newEmployee.password = await hash(password, 10);
    newEmployee.role = role;
    newEmployee.department = departmentData;
    return await this.employeeRepository.save(newEmployee);
  };

  //put:update
  // async updateEmployee(id:number,name:string,email:string,age:number, address:any){
  //     const employee=await(this.employeeRepository.findOneby({id}))
  //     employee.name=name;
  //     employee.email=email;
  //     employee.age=age;
  //     employee.address=address;
  //     // employee.age=age;

  //     return this.employeeRepository.save(employee);
  // }

  public updateEmployee = async (id: number, employee: Partial<Employee>) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    if (!employee) {
      employee.id = id;
    }
    await this.employeeRepository.update(employee);
  };

  //delete

  // public deleteEmployee = async (id: number) => {
  //     const employeeData = await this.getEmployeeById(id);
  //     if (!employeeData) {
  //       throw new HttpException(404, "Employee Not Found");
  //     }
  //     this.employeeRepository.softremove(employeeData);
  //   };

  public deleteEmployee = async (id: number) => {
    const employeeData = await this.getEmployeeById(id);
    if (!employeeData) {
      throw new HttpException(404, "Employee Not Found");
    }
    this.employeeRepository.softremove(id);
  };

  //login
  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findOneby({ email });

    if (!employee) {
      throw new HttpException(401, "invalid credentials");
    }
    const result = await bcrypt.compare(password, employee.password);
    if (!result) {
      throw new HttpException(401, "unauthorised");
    }

    const payload: JwtPayLoad = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };
    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    return token;
  };
}
export default EmployeeService;
