import { handleDeleteAssignment, handleToggleAssignment, handleUpdateAssignment } from "../handlers/assignmentHandler";
import THW from "../types/THW";
import CheckBox from "./CheckBox";
import UpdateField from "./UpdateField";
import { ChangeEvent, FormEvent, useState } from "react";
import '../styles/UpdatableRow.css';
import { validateString } from "../App";
import { useNavigate } from "react-router-dom";

interface UpdatableRowProps {
  hw: THW,
  classID: string,
  update: () => void;
}

export default function UpdatableRow({ hw, classID: id, update }: UpdatableRowProps) {
  const [date, setDate] = useState(formatDate(hw.dueDate));
  const [title, setTitle] = useState(hw.name.toUpperCase());
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  async function toggleCheckBox(oldValue: boolean, assignmentID: number) {
    const value = !oldValue;

    const result = await handleToggleAssignment(id, assignmentID, value)

    result instanceof Error && navigate('/login');

    update();

  }

  function formatDate(date: Date): string {
    const unwantedFormat = new Date(date).toISOString().split('T')[0].split('-');

    return `${unwantedFormat[1]}/${unwantedFormat[2]}/${unwantedFormat[0]}`
  }

  async function deleteAssignment(hwID: number | undefined) {
    const deleted = await handleDeleteAssignment(hwID, id);

    if (deleted) update();
  }

  function validateDate() {
    const theDate = new Date(date);
    const minDate = new Date(Date.now());
    const maxDate = new Date('2100-12-31')

    if (theDate.toString() == 'Invalid Date' ||
      theDate.getTime() < minDate.getTime() ||
      theDate.getTime() > maxDate.getTime()) return false;


    return true;
  }

  async function submitData(event: FormEvent<HTMLFormElement>) {


    if (!validateString(title) || !validateDate()) {
      event.preventDefault();
      setError(true)
      return
    }

    setError(false);

    const updated = await handleUpdateAssignment(title, date, hw._id!, id);


    if (updated) {
      update();
    }
    else setError(true)
  }

  function updateTitle(event: ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  function updateDate(event: ChangeEvent<HTMLInputElement>): void {
    setDate(event.target.value);
  }

  return (
    <div id="row">
      <CheckBox
        checked={hw.finished}
        onClick={() =>
          toggleCheckBox(hw.finished, hw._id!)
        } />
      <UpdateField
        initialValue={title}
        onChange={updateTitle}
        onSubmit={submitData}
      />
      <UpdateField
        initialValue={date}
        onChange={updateDate}
        onSubmit={submitData}
      />
      <button id="remove" onClick={() => deleteAssignment(hw._id)}>x</button>
      {error && <p id="error">BAD INPUT</p>}
    </div>
  )
}