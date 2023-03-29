import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { generatePath, redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import NavBar from "./NavBar";
import AddAssignmentForm from "./AddAssignmentForm";
import { handleCreateAssignment, handleGetAssignmentByClassID } from "../handlers/assignmentHandler";
import UpdatableRow from "./UpdatableRow";
import { validateString } from "../App";
import UpdateField from "./UpdateField";
import { handleUpdateClassName } from "../handlers/classHandler";

export default function ClassPage() {
  const [assignments, setAssignments] = useState<THW[] | null>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [hwName, setHwName] = useState('');
  const [hwDate, setHwDate] = useState<Date>();
  const [isValid, setIsValid] = useState(true);
  const { id, className } = useParams();
  const [currentClass, setCurrentClassName] = useState(className!);
  const navigate = useNavigate();

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
  function updateClassName(event: ChangeEvent<HTMLInputElement>) {
    setCurrentClassName(event.target.value);
  }

  async function changeClassName(event: FormEvent<HTMLFormElement>) {

    if (!validateString(currentClass)) {
      event.preventDefault()
      setIsValid(false)
      return
    }

    const status = handleUpdateClassName(id!, currentClass);
    const newPath = generatePath('/:name/:id', {name: currentClass, id: id!});

    !status ? setIsValid(false) : setIsValid(true);
    navigate(newPath);
  

  }

  function changeAddAssigment() {
    if (!isAddingAssignment) setIsAddingAssignment(true);
  }


  return (
    <div id='page'>
      <NavBar />
      <UpdateField
        className="titlefield"
        initialValue={currentClass}
        onSubmit={changeClassName}
        onChange={updateClassName}
      />
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
        changer = {() => setIsAddingAssignment(false)}
      />
      {!isValid && <h2 id="warning">Input Invalid</h2>}
    </div>
  )
}