//  import express from "express";
//  import {Request, Response}from "express";

//  import Employee from './src/entity/employee.entity';
// import dataSource from "./src/db/data-source.db";

// const employeeRouter= express.Router() ;// routs and https methods
// const userRouter=express.Router();
 
// const employees:Employee[]=
// [
//     {id :1, email:"employee1@gmail.com",name : "Employee1", createdAt:new Date(), updatedAt:new Date(), deletedAt:new Date()},
//     {id :2, email:"employee2@gmail.com",name : "Employee1", createdAt:new Date(), updatedAt:new Date(),deletedAt:new Date()}
// ];

// //interface profile
// {
//  //   age:number,
//   //  name:String
//   }
  
//   //interface Data{
//   //  profile:profile}

 
  
// /*mployeeRouter.get("/",async (req:Request,res:Response)=>{
//     const employeeRepository =dataSource.getRepository(Employee);
//     const employees= await employeeRepository.find();*/
// //OBJECTINDE ULLILE ETHELUM 
//      /* res.status(200).send(employees);
//   });
//   employeeRouter.get("/",async (req:Request,res:Response)=>{
//     const employeeRepository =dataSource.getRepository(Employee);
//     const employees= await employeeRepository.findOneBy({id: Number (req.params.id)});
//     res.status(200).send(employees);
//   });

//   employeeRouter.get("/:id",(req:Request,res:Response)=>{*/
//     //let data: Data={
//      // profile:{
//     //    name:"Harsha",
//    //     age:21,
//   //    },
// //    };
//    /* console.log(req.params['id']);
//     const employee = employees.find((record) => record.id == Number(req.params.id));
//     //console.log(data.profile.name);
//       res.status(200).send(employee);
//   });*/

//   employeeRouter.get("/",async (req:Request,res:Response)=>{
//     const employeeRepository =dataSource.getRepository(Employee);
//     const employees= await employeeRepository.find();
//     res.status(200).send(employees);
//   });

//   employeeRouter.get("/:id", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const employee = await employeeRepository.findOneBy({ id: Number(req.params.id) })
//     res.status(200).send(employee);
//   });

  
// employeeRouter.post("/", async (req, res) => {
//     const employeeRepository = dataSource.getRepository(Employee);
//     const newEmployee = new Employee();
//     newEmployee.email = req.body.email;
//     newEmployee.name = req.body.name;
//     const savedEmployee = await employeeRepository.save(newEmployee);
//     res.status(200).send(savedEmployee);
//   });
//   /*employeeRouter.post("/",async(req:Request,res:Response)=>
//     {
// const employeeRepository=dataSource.getRepository(Employee);
// const newEmployee= new Employee();
// newEmployee.email=req.body.email;
// newEmployee.name=req.body.name;
// const saveEmployee= await employeeRepository.save(newEmployee);*/


//         //create an object and for that use the "new" keyword
//         //const employ =new Employee();
//         //employ.id=req.body.id;
//         //employ.email=req.body.email;
//         //employ.name=req.body.name;

//  // console.log(req.body['id']);
//   //const employee = employees.push(req.body)
//     //in post we have a content as the request body
//     //post is to add a new employee
//     // we accept it using req.body and push it using "push"


//    /* employeeRouter.put("/:id",(req:Request,res:Response)=>
//       {
//     const employee = employees.find((record) => record.id == Number(req.params.Id));
// employee.name=req.body.name;
// employee.email=req.body.email;
 
//         res.status(201).send("Update method$(id)");
//       });*/
//     //we need to update the exciting id with the modified one.
//     // to get each field values use , req.body.name or req.body.email
//     // take it using the abov comment and then map to employee. name, employee.email.
//     employeeRouter.put("/:id", async (req: Request, res: Response) => {
//         const { id } = req.params;
//         const employeeRepositry = dataSource.getRepository(Employee);
//         const employee = await employeeRepositry.findOne({
//             //ethu employee ahnu update akkandenu findONe use akki kandupidikka
//             where: { id: Number(id) },
//         });
//         employee.name = req.body.name;
//         employee.email = req.body.email;
//         const updatedEmployee= await employeeRepositry.save(employee);
//         //employee has an id field which means that there is an entry in the db
//         res.status(201).send(`Updated employee info with id -> ${id} \n ${updatedEmployee}`);
//     });


//      /* employeeRouter.delete("/:id",(req:Request,res:Response)=>
//         {
//             console.log(req.url); 
//             const index= employees.findIndex((record)=> record.id==Number(req.params.id));
//             const remItems = employees.splice(index, 1);
//       res.status(204).send("Delete method");
//         });*/
//       //FIndINdex returns the index of the first element satisfying the condition
// employeeRouter.delete("/:id", async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const employeeRepositry = dataSource.getRepository(Employee);
//     const response = await employeeRepositry.softDelete({ id: Number(id) });
//     res.status(200).send(`Employee with id -> ${id} deleted \n ${response}`);
// });
// //using delete all the values in a row get deleted but with softdelete the previous deleted datas will be present in the data base
//         export default employeeRouter;

//         export{
//             employeeRouter,userRouter

//         }