import { FormEvent } from "react";
import TClassHW from "../types/TClassHW";
import THW from "../types/THW";

export async function handleCreateClass(event: FormEvent<HTMLFormElement>, nameOfClass: string) {
  event.preventDefault();

  // validating before fetching
  if (!nameOfClass || nameOfClass.trim().length == 0) return null;

  const newClass: TClassHW = {
    class: nameOfClass,
    assignments: []
  }

  const response = await fetch('http://localhost:4008/api/class', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(newClass),
  })

  const createdClass = response.status == 400 ? null : await response.json() as TClassHW;

  return createdClass


}


export async function handleGetAllClasses() {
  const response = await fetch('http://localhost:4008/api', {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });

  // NEED TO HANDLE 401 STATUS
  return response.status == 401 ? new Error() : response.json();
}


export async function handleDeleteClass(classID: number) {
  const response = await fetch(`http://localhost:4008/api/class/${classID}`, {
    method: "DELETE"
  })

  const didDelete = response.status != 500 


  return didDelete;
}



export async function handleUpdateClassName(classID: string, newName: string) {
  const response = await fetch(`http://localhost:4008/api/class/${classID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newName
    })
  })


  const didUpdate = response.status == 200;

  return didUpdate;
}