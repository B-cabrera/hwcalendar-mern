import { FormEvent } from "react";
import TClassHW from "../types/TClassHW";
import THW from "../types/THW";

export async function handleCreateClass(event: FormEvent<HTMLFormElement>, nameOfClass: string):
  Promise<{ created: TClassHW | null }> {
  event.preventDefault();

  // validating before fetching
  if (!nameOfClass || nameOfClass.trim().length == 0) return { created: null };

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

  const createdClass = response.status == 400 ? null : await response.json() as TClassHW;

  return { created: createdClass }


}


export async function handleGetAllClasses(): Promise<TClassHW[] | null> {
  const response = await fetch('http://localhost:4008/api');

  const allClasses = response.status == 500 ? null : await response.json() as TClassHW[];


  return allClasses;
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


export async function handleGetAuthURL(): Promise<string> {
  const response = await fetch('http://localhost:4008/api/auth');

  const url = await response.json()

  return url
}

export async function handleSetAuthCode(theCode: string) {
  const response = await fetch('http://localhost:4008/api/auth/code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({theCode})
  })

  return response.ok
}


export async function handleIsLoggedIn() {
  const response = await fetch('http://localhost:4008/api/auth/status')

  const authStatus = await response.json();

  return authStatus as boolean;
}