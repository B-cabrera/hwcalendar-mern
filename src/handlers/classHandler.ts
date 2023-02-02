import { FormEvent } from "react";
import TClassHW from "../types/TClassHW";
import THW from "../types/THW";

export async function handleCreateClass(event: FormEvent<HTMLFormElement>, nameOfClass: string): 
Promise<{created: TClassHW | null}>{
    event.preventDefault();

    const newClass: TClassHW = {
        class: nameOfClass,
        assignments: []
    }

    const response = await fetch('http://localhost:4008/api/class', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass),
    })
    
   const createdClass = response.status == 400 ? null: await response.json() as TClassHW;

    return {created: createdClass}


}


export async function handleGetAllClasses(): Promise<TClassHW[] | null> {
    const response = await fetch('http://localhost:4008/api');

    const allClasses = response.status == 500 ? null : await response.json() as TClassHW[];


    return allClasses;
}

export async function handleGetAssignmentByClassID(id: string | undefined) {
    const response = await fetch(`http://localhost:4008/api/${id}`);
    const classAssignments = response.status == 404 ? null : await response.json() as [THW];


    return classAssignments;
}


export async function handleToggleAssignment(classID: string | undefined,hwID: number, updatedToggle: boolean) {
    const response = await fetch("http://localhost:4008/api/assignment", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classID: classID,
            hwID: hwID,
            finished: updatedToggle,
        })
    });
    const newToggleValue = response.status == 500 ? null: await response.json() as boolean;


    return newToggleValue;

}