import { Request, Response } from "express";
import TClassHW from "../../types/TClassHW";
import THW from "../../types/THW";
import ClassHW from "../model/Classes";

export async function getAllClassNames(req: Request, res: Response) {

  try {
    const allClasses = await ClassHW.aggregate([
      { $project: { "class": 1, "class_length": { $strLenCP: "$class" } } },
      { $sort: { "class_length": 1 } }
    ]) as TClassHW[];


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
    res.send("Invalid Class");
  }
}



export async function deleteClass(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const deleted = await ClassHW.deleteOne({_id: id});

    res.status(204);
    res.send("Deletion Success");
  } catch (err) {
    res.status(500)
    res.send("Deletion failed");
  }
}


export async function updateClassName(req: Request, res: Response) {
  const id = req.params.id;
  const newName = req.body.newName;
  const search = await ClassHW.aggregate([{
    $match: {class: newName}
  }]);

  try {
    if (search.length > 0) {
      res.status(400)
      res.send('Class Exists')
      return
    }
    
    const theClass = await ClassHW.findByIdAndUpdate(id, {
      class: newName
    })

    res.status(200)
    res.send("Updated Succesfully")
  } catch(err) {
    res.status(400)
    res.send("Couldn't update");
  }
}