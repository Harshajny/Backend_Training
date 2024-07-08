import { NextFunction, Router, Response, Request } from "express";
import { DepartmentService } from "../service/department.service";
import authorize from "../middleware/auth.middleware";
import { RequestWithUser } from "../utils/requestWithUser";
import HttpException from "../exceptions/http.exceptions";
import { Role } from "../utils/role.enum";
import { plainToInstance } from "class-transformer";
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,} from "../dto/department.dto";
  
import { validate } from "class-validator";
import { errorFormatter } from "../utils/errorFormatter.util";

export default class DepartmentController {
  public router: Router;

  constructor(private departmentService: DepartmentService) {
    this.router = Router();

    this.router.get("/", authorize, this.getAllDepartments);
    this.router.get("/:id", authorize, this.getDepartmentById);
    this.router.post("/", authorize, this.createDepartment);
    this.router.patch("/", authorize, this.updateDepartment);
    this.router.delete("/:id", authorize, this.deleteDepartment);
  }
  getAllDepartments = async (_, res: Response) => {
    const departments = await this.departmentService.getAllDepartments();
    res.json(departments);
  };

  getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const department = await this.departmentService.getDepartmentById(id);
      if (!department) {
        throw new HttpException(404, "Department not found");
      }
      res.json(plainToInstance(DepartmentResponseDto, department));
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.Ui) {
        throw new HttpException(403, "Invalid Access");
      }
      const departmentDto = plainToInstance(CreateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      const departmentData = await this.departmentService.createNewDepartment(
        departmentDto.name
      );
      console.log(departmentData);

      res.status(201).json({
        success: true,
        message: "Department Created!",
        data: departmentData,
      });
    } catch (error) {
      next(error);
    }
  };

  updateDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.Ui) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.body.id);
      const departmentDto = plainToInstance(UpdateDepartmentDto, req.body);
      const errors = await validate(departmentDto);

      if (errors.length) {
        const formattedError = errorFormatter(errors);
        throw new HttpException(400, "Validation Error", formattedError);
      }

      await this.departmentService.updateDepartment(id, { ...req.body });
      res.json({ sucess: true, message: "Department Updated!" });
    } catch (err) {
      next(err);
    }
  };

  deleteDepartment = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (req.role !== Role.Ui) {
        throw new HttpException(403, "Invalid Access");
      }
      const id = Number(req.params.id);
      await this.departmentService.deleteDepartment(id);
      res.json({ sucess: true, message: "Department Deleted!" });
    } catch (err) {
      next(err);
    }
  };
}