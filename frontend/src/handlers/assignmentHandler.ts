import { API_BASE_URL } from "../main";
import THW from "../types/THW";

export async function handleGetAssignmentByClassID(id: string | undefined) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  });

  if (response.status == 404)
    return null
  else if (response.status == 401)
    return new Error()
  else
    return response.json();
}


export async function handleToggleAssignment(classID: string | undefined, hwID: number, updatedToggle: boolean) {
  const response = await fetch(`${API_BASE_URL}/assignment`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      classID: classID,
      hwID: hwID,
      finished: updatedToggle,
    })
  });

  if (response.status == 500)
    return null
  else if (response.status == 401)
    return new Error()
  else {
    const newVal = await response.json() as boolean
    return newVal
  }

}

export async function handleCreateAssignment(nameOfHW: string, dateOfHW: Date | undefined, classID: string | undefined) {

  if (!nameOfHW || !dateOfHW) return null;

  const newHW: THW = {
    name: nameOfHW,
    dueDate: dateOfHW!,
    finished: false
  }


  const response = await fetch(`${API_BASE_URL}/assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      newHW,
      classID: classID,
    }),
  })

  if (response.status == 400)
    return null
  else if (response.status == 401)
    return new Error()
  else
    return newHW

}



export async function handleDeleteAssignment(hwID: number | undefined, classID: string | undefined) {
  const response = await fetch(`${API_BASE_URL}/assignment/${hwID}/${classID}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    }
  })

  if (response.status == 500)
    return false
  else if (response.status == 401)
    return new Error()
  else
    return true

}



export async function handleUpdateAssignment(name: string, date: string, assignmentID: number, classID: string) {

  const response = await fetch(`${API_BASE_URL}/assignment/${assignmentID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    },
    body: JSON.stringify({
      classID,
      name,
      date: new Date(date),
    })
  })

  if (response.status == 500)
    return false
  else if (response.status == 401)
    return new Error()
  else
    return true
}