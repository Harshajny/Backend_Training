import { NextFunction, Response } from "express";
import { JWT_SECRET } from "../utils/constants";
import {verify} from "jsonwebtoken"
import { jwtPayload } from "../utils/jwtPayload";
import { RequestWithUser } from "../utils/requestWithUser";

const authorize = async(
    req:RequestWithUser,
    res:Response,
    next:NextFunction,

) =>    {

        try{
            const token=getTokenFromRequestHeader(req);
            console.log("token",token)
            const payload= verify(token, JWT_SECRET);
            req.name=(payload as jwtPayload).name;
            req.email=(payload as jwtPayload).email;
            req.role=(payload as jwtPayload).role;

            return next();
        }
        catch(error)
        {
            return next(error);
        }


        }

        const getTokenFromRequestHeader=(req:RequestWithUser) =>
            {
                const bearerToken=req.header("Authorization");
                console.log("Token >>>>> " + bearerToken);
                const token=bearerToken? bearerToken.replace("Bearer ",""):"";
                console.log("Token >>>>> " + token);
                return token;
            }
export default authorize;
 