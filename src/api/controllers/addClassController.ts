import { Request, Response } from "express";
import ClassHW from "../model/Classes";

export async function addClass(req: Request, res: Response) {
    const newClass = new ClassHW({
        class: "Wow",
        assignments: [{
            name: "Wow",
        }],
    });

    newClass.save().then((data) => {
        res.status(201);
        res.json(data);
    }).catch((err: Error) => {
        res.status(400);
        res.send(err.message)
    })

}