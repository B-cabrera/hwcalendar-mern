import THW from "../types/THW";

export async function handleGetAssignmentByClassID(id: string | undefined) {
  const response = await fetch(`http://localhost:4008/api/${id}`);
  const classAssignments = response.status == 404 ? null : await response.json() as [THW];


  return classAssignments;
}


export async function handleToggleAssignment(classID: string | undefined, hwID: number, updatedToggle: boolean) {
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
  const newToggleValue = response.status == 500 ? null : await response.json() as boolean;


  return newToggleValue;

}

export async function handleCreateAssignment(nameOfHW: string, dateOfHW: Date | undefined, classID: string | undefined) {

  if (!nameOfHW || !dateOfHW) return null;

  const newHW: THW = {
    name: nameOfHW,
    dueDate: dateOfHW!,
    finished: false
  }


  const response = await fetch('http://localhost:4008/api/assignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newHW,
      classID: classID,
    }),
  })

  const createdAssignment = response.status == 400 ? null : newHW;


  return createdAssignment;


}



export async function handleDeleteAssignment(hwID: number | undefined, classID: string | undefined) {
  const response = await fetch(`http://localhost:4008/api/assignment/${hwID}/${classID}`, {
    method: "DELETE",
  })

  const didDelete = response.status != 500;

  return didDelete;
}



export async function handleUpdateAssignment(name: string, date: string, assignmentID: number, classID: string) {
  
  const response = await fetch(`http://localhost:4008/api/assignment/${assignmentID}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      classID,
      name,
      date: new Date(date),
    })
  })


  const didUpdate = response.status == 200;

  return didUpdate;
}