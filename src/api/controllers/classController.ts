import { Request, Response } from "express";
import TClassHW from "../../types/TClassHW";
import ClassHW from "../model/Classes";

export async function getAllClassNames(req: Request, res: Response) {

    try {
        const allClasses = await ClassHW.find() as TClassHW[];

        const nameList = allClasses.map(({class: name}) => name);

        res.status(200);
        res.json(nameList);
    } catch (error) {
        res.status(500);
        res.send("No no no");
    }
}

export async function createNewClass(req: Request, res: Response ) {
    try {
        const initialized = await ClassHW.syncIndexes();
        const newClass = new ClassHW({
            class: req.body.class,
            assignments: req.body.assignments,
        })

        const insertedClass = await newClass.save();

        res.status(201)
        res.json(insertedClass);
    } catch (error) {
        res.status(400);
        res.send("No no no");
    }
}