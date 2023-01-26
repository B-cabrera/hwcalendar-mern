import { Request, Response } from "express";
import ClassHW from "../model/Classes";

export async function getAllClasses(req: Request, res: Response ) {

    try {
        const allClasses = await ClassHW.find();

        res.status(200);
        res.json(allClasses);
    } catch (error) {
        res.status(500);
        res.send(error);
    }
}