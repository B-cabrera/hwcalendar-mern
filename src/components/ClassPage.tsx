import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import NavBar from "./NavBar";
import AddAssignmentForm from "./AddAssignmentForm";
import { handleCreateAssignment, handleGetAssignmentByClassID } from "../handlers/assignmentHandler";
import UpdatableRow from "./UpdatableRow";
import { validateString } from "../App";

export default function ClassPage() {
  const [assignments, setAssignments] = useState<THW[] | null>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [hwName, setHwName] = useState('');
  const [hwDate, setHwDate] = useState<Date>();
  const [isValid, setIsValid] = useState(true);
  const { id } = useParams();
  const {state} = useLocation();

  useEffect(() => {
    async function getAssignments() {
      const hws = await handleGetAssignmentByClassID(id);

      setAssignments(hws);
    }

    getAssignments();
  }, [updated])

  function reset() {
    setUpdated(!updated);
    setIsAddingAssignment(false);
    setIsValid(true);
    setHwDate(undefined);
    setHwName('');
  }

  function updateHWName(event: ChangeEvent<HTMLInputElement>) {
    setHwName(event.target.value);
  }

  function updateHWDate(event: ChangeEvent<HTMLInputElement>) {
    setHwDate(new Date(event.target.value));
  }

  async function addHW(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateString(hwName)) {
      setIsValid(false)
      return
    }

    const createdHW = await handleCreateAssignment(hwName, hwDate, id);
    createdHW ? reset() : setIsValid(false);

  }

  function changeAddAssigment() {
    if (!isAddingAssignment) setIsAddingAssignment(true);
  }


  return (
    <div id='page'>
      <NavBar />
      <h1 id="nameOfClass">{state.className}</h1>
      {!isAddingAssignment &&
        <button
          onClick={changeAddAssigment}>
          Add HW
        </button>}
      <div id="hws">
        {
          assignments?.map((assignment) => (
            <UpdatableRow
              key={assignment._id}
              hw={assignment}
              classID={id!}
              update={() => setUpdated(!updated)}
            />
          ))
        }
      </div>
      <AddAssignmentForm
        showForm={isAddingAssignment}
        onChange={updateHWName}
        onDateChange={updateHWDate}
        onSubmit={addHW}
        value={hwName}
      />
      {!isValid && <h2 id="warning">Input Invalid</h2>}
    </div>
  )
}