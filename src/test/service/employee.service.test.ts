import { when } from "jest-when";
import { EmployeeRepository } from "../../repository/employee.repository";
import DepartmentRepository from "../../repository/department.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import Address from "../../entity/address.entity";
import Department from "../../entity/department.entity";
import { Role } from "../../utils/role.enum";
describe
("Employee Service", () => 
    {
  let employeeRepository: EmployeeRepository;
  let departmentRepository: DepartmentRepository;
  let employeeService: EmployeeService;
  let dummyEmployees: Employee[];
  let dummyAddresses: Address[];
  let dummyDepartments: Department[];  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository( dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;  
      departmentRepository = new DepartmentRepository(dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;  
    
    employeeService = new EmployeeService(
    employeeRepository, departmentRepository );  
    
    dummyAddresses = [
      {
        id: 1,
        line1: "line1",
        pincode: "123",
        employee: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        line1: "line2",
        pincode: "456",
        employee: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];    dummyDepartments = [
      {
        id: 1,
        name: "HR",
        employee: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        name: "Engineering",
        employee: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];    dummyEmployees = [
      {
        id: 1,
        name: "test1",
        email: "test1@gmail.com",
        age: 20,
        role: Role.HR,
        password: "123",
        address: dummyAddresses[0],
        department: dummyDepartments[0],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        name: "test2",
        email: "tes21@gmail.com",
        age: 21,
        role: Role.DEVELOPER,
        password: "1234",
        address: dummyAddresses[1],
        department: dummyDepartments[1],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
  });  
  
  
  
  it("should return allEmployees", async () => 
    {
    const mock = jest
      .fn(employeeRepository.find)
      .mockResolvedValue(dummyEmployees);
    employeeRepository.find = mock;    
    const users = await employeeService.getAllEmployees();
    expect(users).toEqual(dummyEmployees);
    expect(mock).toHaveBeenCalledTimes(1);
  });  
  
  it("should return employee with id", async () => 
    {
    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue(dummyEmployees[0])
      .calledWith({ id: 2 })
      .mockResolvedValue(dummyEmployees[1]);
    employeeRepository.findOneby = mock;   
     const users = await employeeService.getEmployeeById(1);
    expect(users.name).toEqual("test1");
    expect(users.address.line1).toEqual("line1");
    expect(mock).toHaveBeenCalledTimes(1);   

    const users2 = await employeeService.getEmployeeById(2);
    expect(users2.name).toEqual("test2");
    expect(users2.department.name).toEqual("Engineering");
    expect(mock).toHaveBeenCalledTimes(2);
  }); 

    })
 
    

    /*checking whether the value returned is as same as the dummy values provided*/