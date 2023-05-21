import { Request, Response } from "express";
import TClassHW from "../../types/TClassHW";
import THW from "../../types/THW";
import ClassHW from "../model/Classes";
import User from "../model/User";

interface tokenData {
  id: string,
}

export async function getAllClassNames(req: Request, res: Response, data: any) {
  const userInfo = req.body as tokenData
  const userID = userInfo.id
  try {
    const classesObj = await User.findById(userID).
    select('classes -_id')
    .populate({
      path: 'classes',
      options: { sort: { title: 1 } },
      populate: {
        path: 'assignments',
      },
    });


    const allClasses = classesObj!.classes

    console.log(allClasses);


    res.status(200);
    res.json(allClasses);
  } catch (error) {
    res.status(500);
    res.send(error);
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