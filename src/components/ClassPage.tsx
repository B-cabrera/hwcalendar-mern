import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import CheckBox from "./CheckBox";
import NavBar from "./NavBar";
import AddAssignmentForm from "./AddAssignmentForm";
import { handleCreateAssignment, handleDeleteAssignment, handleGetAssignmentByClassID, handleToggleAssignment, handleUpdateAssignment } from "../handlers/assignmentHandler";
import UpdateField from "./UpdateField";
import UpdatableRow from "./UpdatableRow";

export default function ClassPage() {
  const [assignments, setAssignments] = useState<THW[] | null>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [hwName, setHwName] = useState('');
  const [hwDate, setHwDate] = useState<Date>();
  const [isValid, setIsValid] = useState(true);
  const { id } = useParams()

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

    const createdHW = await handleCreateAssignment(hwName, hwDate, id);
    createdHW ? reset() : setIsValid(false);

  }

  function changeAddAssigment() {
    if (!isAddingAssignment) setIsAddingAssignment(true);
  }

  return (
    <div id='page'>
      <NavBar />
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
      {!isValid && <h2 id="warning">Please fill out all fields</h2>}
    </div>
  )
}