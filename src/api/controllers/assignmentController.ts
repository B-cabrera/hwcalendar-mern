import { Request, Response } from "express";
import TClassHW from "../../types/TClassHW";
import ClassHW from "../model/Classes";
import User from "../model/User";

export async function toggleAssignment(req: Request, res: Response) {
  const hwID = req.body.hwID;
  const classID = req.body.classID;
  const changedValue = req.body.finished;


  try {
    const theClass = await ClassHW.findById(classID);
    const theAssignment = await theClass?.assignments.id(hwID);

    if (theAssignment) theAssignment.finished = changedValue;

    await theClass?.save();

    res.status(200);
    res.send(changedValue);
  } catch (err) {
    res.status(500);
    res.send("Couldn't update");
  }
}


export async function createNewAssignment(req: Request, res: Response) {
  const classID = req.body.classID;
  const hwName = req.body.newHW.name;
  const hwDate = req.body.newHW.dueDate;
  const newFinished = req.body.newHW.finished;

  try {
    const theClass = await ClassHW.findById(classID);

    const theAssignment = await theClass?.assignments.push({
      name: hwName,
      dueDate: hwDate,
      finished: newFinished,
    });

    await theClass?.save();

    res.status(201)
    res.send("Created");
  } catch (err) {
    res.status(400);
    res.send("Couldn't create assignment");
  }
}

export async function getAssignmentsByClassID(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const theClass = await ClassHW.findById(id) as TClassHW;
    const theAssignments = theClass.assignments.sort((a, b) => Number(a?.finished) - Number(b?.finished));

    res.status(200);
    res.json(theAssignments);
  } catch (error) {
    res.status(404)
    res.send(`No class with id: ${id}`)
  }

}


export async function deleteAssignment(req: Request, res: Response) {
  const idOfHW = req.params.hwID;
  const idOfClass = req.params.classID;

  try {
    const theClass = await ClassHW.findById(idOfClass);

    await theClass?.assignments.remove({ _id: idOfHW });

    await theClass?.save();

    res.status(204);
    res.send("Deletion Success");
  } catch (error) {
    res.status(500);
    res.send("Deletion Failed");
  }
}


export async function updateAssignment(req: Request, res: Response) {
  const hwID = req.params.id;
  const idOfClass = req.body.classID;
  const newName = req.body.name;
  const newDate = req.body.date;


  try {
    const theClass = await ClassHW.findById(idOfClass);
    const theAssignment = await theClass?.assignments.id(hwID);

    if (theAssignment) {
      theAssignment.name = newName;
      theAssignment.dueDate = newDate;
    }

    await theClass?.save();

    res.status(200);
    res.send('Updated Successfuly');
  } catch (err) {
    res.status(500);
    res.send("Couldn't update");
  }



}