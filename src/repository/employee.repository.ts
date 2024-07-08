import { DataSource, Repository } from "typeorm";
import dataSource from "../db/data-source.db";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";

export class EmployeeRepository
{

    // private dataSource: DataSource;
    constructor(private employeeRepository:Repository <Employee>)
    {
        // this.dataSource=dataSource; 
    }

//get
public find=async():Promise<Employee[]>=>{
    //const employeeRepository= this.dataSource.getRepository(Employee);
    return this.employeeRepository.find({relations:["address","department"]});}

public findOneby=async(filter:Partial<Employee>):Promise<Employee>=>
{
    // const employeeRepository=this.dataSource.getRepository(Employee);
        const employee = this.employeeRepository.findOne({where:filter,relations:["address","department"]})
        
        return employee;
}

//findOneby is expecting some parameters for filter, and the partial filter sugest that atleast one of the attributes i sonly required to be passed.


//post
public save=async(newEmployee:Employee):Promise<Employee>=>
 {
    // const employeeRepository= this.dataSource.getRepository(Employee);
    const savedEmployee = await this.employeeRepository.save(newEmployee);
    return savedEmployee;

}

//put
public update=async(employee:Partial<Employee>):Promise<Employee>=>
{
    // const employeeRepository= this.dataSource.getRepository(Employee);
    const updatedEmployee = await this.employeeRepository.save(employee);
return updatedEmployee;
    
}


//delete
public delete=async(id:number):Promise<void>=>
{
    // const employeeRepository= this.dataSource.getRepository(Employee);
    await this.employeeRepository.delete({id});

}
public softremove=async(id:number):Promise<void>=>
    { const findemployee=this.findOneby({id});
        // const employeeRepository= this.dataSource.getRepository(Employee);
        await this.employeeRepository.softRemove({id});
    
    }
}

