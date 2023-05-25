import { Request, Response } from "express";
import ClassHW from "../model/Classes";
import User from "../model/User";
import mongoose from "mongoose";

interface tokenData {
  id: string,
}

export async function getAllClassNames(req: Request, res: Response) {
  try {
    const userInfo = req.body as tokenData
    const userID = userInfo.id
    const classesObj = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userID) } },
      { $lookup: { from: 'classhws', localField: 'classes', foreignField: '_id', as: 'classes' } },
      { $unwind: '$classes' },
      {
        $addFields: {
          class_length: { $strLenCP: '$classes.class' },
        },
      },
      { $sort: { class_length: 1 } },
      {
        $group: {
          _id: '$_id',
          classes: { $push: '$classes' },
        },
      },
    ]);

    
    let allClasses = classesObj[0]?.classes

    allClasses == undefined && (allClasses = []);


    res.status(200);
    res.json(allClasses);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

export async function createNewClass(req: Request, res: Response) {
  try {
    const userInfo = req.body as tokenData
    const userID = userInfo.id

    const initialized = await ClassHW.syncIndexes();


    const newClass = new ClassHW({
      class: req.body.class,
      assignments: req.body.assignments,
    })

    const insertedClass = await newClass.save();

    await User.updateOne(
      { _id: userID },
      { $push: { classes: newClass._id } }
    )

    res.status(201)
    res.json(insertedClass);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}



export async function deleteClass(req: Request, res: Response) {
  const id = req.params.id;
  const userInfo = req.body as tokenData
  const userID = userInfo.id

  try {
    await ClassHW.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userID, { $pull: { classes: id } });

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
    $match: { class: newName }
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
  } catch (err) {
    res.status(400)
    res.send("Couldn't update");
  }
}