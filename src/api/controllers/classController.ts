import { Request, Response } from "express";
import TClassHW from "../../types/TClassHW";
import THW from "../../types/THW";
import ClassHW from "../model/Classes";

export async function getAllClassNames(req: Request, res: Response) {

  try {
    const allClasses = await ClassHW.find() as TClassHW[];


    res.status(200);
    res.json(allClasses);
  } catch (error) {
    res.status(500);
    res.send("No no no");
  }
}

export async function createNewClass(req: Request, res: Response) {

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

export async function getAssignmentsByClassID(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const theClass = await ClassHW.findById(id) as TClassHW;
    const theAssignments = theClass.assignments;

    res.status(200);
    res.json(theAssignments);
  } catch (error) {
    res.status(404)
    res.send(`No class with id: ${id}`)
  }


}
