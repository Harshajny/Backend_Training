import { validate } from "class-validator";
 import HttpException from "../exceptions/http.exceptions";
import EmployeeService from "../service/employee.service";
import express, { NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import authorize from "../middleware/auth.middleware";
import { CreateEmployeeDto } from "../dto/employee.dto";
import { UpdateEmployeeDto } from "../dto/updateemployee.dto";
import { Role } from "../utils/role.enum";
import { RequestWithUser } from "../utils/requestWithUser";
import { errorFormatter } from "../utils/errorFormatter.util";

class EmployeeController 

{
  public router: express.Router;

  constructor(private employeeService: EmployeeService) {
    this.router = express.Router();
    this.router.get("/", authorize, this.getAllEmployees);
    this.router.get("/:id", authorize, this.getEmployeeById);
    this.router.post("/", authorize, this.createEmployee);
    this.router.put("/:id", authorize, this.updateEmployee);
    this.router.delete("/:id", authorize, this.deleteEmployee);
    this.router.post("/login", this.loginEmployee);//authorisation not required
  }

  //login using post
  public loginEmployee= async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const {email,password}= req.body;
    try
    {

    const token =await this.employeeService.loginEmployee(email, password);
    res.status(200).send({token: token});}
   
     catch(error)
     {
      next(error);
     };
    }

  //get

  public getAllEmployees = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const employees = await this.employeeService.getAllEmployees();
    res.status(200).send(employees);
  };

  public getEmployeeById = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const employee = await this.employeeService.getEmployeeById(
        Number(req.params.id)
      );
      if (!employee) {
         
        const error = new HttpException(404,"No employee found with id:${req.params.id}");
        throw error;
      }
      return res.status
      (200).send(employee);
    } catch (err) {
      next(err);
    }
  };
  //post
//   public createEmployee = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     try{
// const role=req.role;
// if(role!== Role.HR)
//   {
//     throw new HttpException(403,"You are not authorized to create employee");
//   }
//       const  employeeDto=plainToInstance(CreateEmployeeDto,req.body);
//       const errors= await validate(employeeDto)
//       if(errors.length)
//         {
//           console.log(JSON.stringify(errors));
//           throw new HttpException(400, JSON.stringify(errors));
//         }
//       //Error: array of errors that happens due to the error caused in the validation 
//       //ethu class nu again and endinu ahnu
//       // const { email, name, address, age } = req.body;
//       const savedEmployee = await this.employeeService.createEmployee(
//         employeeDto.email,
//         employeeDto.name,
//         employeeDto.age,
//         employeeDto.address,
//         employeeDto.password,
//         employeeDto.role
//       );
//     //dto is the validated object
//       res.status(200).send(savedEmployee);
//     }
//      catch(err){
//       next(err);
//      };
//     }

  

createEmployee = async (
  req: RequestWithUser,
  res: express.Response,
  next: NextFunction
) => {
  try {
    if (req.role !== Role.Ui) {
      throw new HttpException(403, "Invalid Access");
    }
    const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
    const errors = await validate(employeeDto);

    if (errors.length) {
      const formattedError = errorFormatter(errors);
      throw new HttpException(400, "Validation Error", formattedError);
    }

    const employeeData = await this.employeeService.createNewEmployee(
      employeeDto.name,
      employeeDto.email,
      employeeDto.age,
      employeeDto.address,
      employeeDto.password,
      employeeDto.role,
      employeeDto.department
    );
    res.status(201).json({
      success: true,
      message: "Employee Created!",
    });
  } catch (error) {
    next(error);
  }
};  //put
  // public updateEmployee=async(req: express.Request, res:express.Response)=>
  //     {
  //         const id= Number(req.params.id);
  //         const body=req.body;
  //         const updateemployee=this.employeeService.updateEmployee(id,body);
  //         res.status(200).send(updateemployee);
  //     }
  updateEmployee = async (
    req: RequestWithUser,
    res: express.Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.Ui) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.body.id);
      const employeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(employeeDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      await this.employeeService.updateEmployee(id, { ...req.body });
      res.json({ sucess: true, message: "Employee Updated!" });
    } catch (err) {
      next(err);
    }
  };

  public deleteEmployee = async (
    req: express.Request,
    res: express.Response
  ) => {
    const employees = await this.employeeService.deleteEmployee(
      Number(req.params.id)
    );
    res.status(201).send();
  };
}

//delete

// this.router.httpsfunctionname("rout",call the respective method from employee.service)

export default EmployeeController;
