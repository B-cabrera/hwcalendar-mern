import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import CheckBox from "./CheckBox";
import NavBar from "./NavBar";
import AddAssignmentForm from "./AddAssignmentForm";
import { handleCreateAssignment, handleGetAssignmentByClassID, handleToggleAssignment } from "../handlers/assignmentHandler";

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

  function toggleCheckBox(event: MouseEvent<HTMLButtonElement>, oldValue: boolean, assignmentID: number) {
    const value = !oldValue;

    handleToggleAssignment(id, assignmentID, value).then((toggledValue) => {
      setUpdated(!updated);
    })

  }
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
        <table>
          {
            assignments?.map((assignment, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <CheckBox
                      checked={assignment.finished}
                      onClick={(event: MouseEvent<HTMLButtonElement>) =>
                        toggleCheckBox(event, assignment.finished, assignment._id!)
                      } />
                  </td>
                  <td>{assignment.name.toUpperCase()}</td>
                  <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                </tr>
              </tbody>
            ))
          }
        </table>
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