import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { generatePath, useNavigate, useParams } from "react-router-dom"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import NavBar from "./NavBar";
import AddAssignmentForm from "./AddAssignmentForm";
import { handleCreateAssignment, handleGetAssignmentByClassID } from "../handlers/assignmentHandler";
import UpdatableRow from "./UpdatableRow";
import { validateString } from "../App";
import UpdateField from "./UpdateField";
import { handleUpdateClassName } from "../handlers/classHandler";
import toast from "react-hot-toast";

export default function ClassPage() {
  const [assignments, setAssignments] = useState<THW[] | null>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [hwName, setHwName] = useState('');
  const [hwDate, setHwDate] = useState<Date>();
  const { id, className } = useParams();
  const [currentClass, setCurrentClassName] = useState(className!);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAssignments() {
      const hws = await handleGetAssignmentByClassID(id);

      hws instanceof Error && navigate('/login');
      setAssignments(hws);
    }

    getAssignments();
  }, [updated])

  function reset() {
    setUpdated(!updated);
    setIsAddingAssignment(false);
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
      toast.error('Invalid Input', {
        duration: 1000,
        id: 'THIS IS THE ID',
        style: {
          fontFamily: 'Raleway',
          fontWeight: 900,
          color: 'white',
          backgroundColor: '#474747f3',
          
        }
      })
      return
    }

    const createdHW = await handleCreateAssignment(hwName, hwDate, id);


    createdHW instanceof Error && navigate('/login');

    createdHW ? reset() : toast.error('Invalid Input', {
      duration: 1000,
      id: 'THIS IS THE ID',
      style: {
        fontFamily: 'Raleway',
        fontWeight: 900,
        color: 'white',
        backgroundColor: '#474747f3',
        
      }
    });

  }
  function updateClassName(event: ChangeEvent<HTMLInputElement>) {
    setCurrentClassName(event.target.value);
  }

  async function changeClassName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!validateString(currentClass)) {
      toast.error('Invalid Input', {
        duration: 1000,
        id: 'THIS IS THE ID',
        style: {
          fontFamily: 'Raleway',
          fontWeight: 900,
          color: 'white',
          backgroundColor: '#474747f3',
          
        }
      })
      return
    }

    const updatedClasses = await handleUpdateClassName(id!, currentClass)

    updatedClasses instanceof Error && navigate('/login');


    if (updatedClasses) {
      const newPath = generatePath('/:name/:id', { name: currentClass, id: id! });
      navigate(newPath)
      window.location.reload()
    } else {
      toast.error('Invalid Input', {
        duration: 1000,
        id: 'THIS IS THE ID',
        style: {
          fontFamily: 'Raleway',
          fontWeight: 900,
          color: 'white',
          backgroundColor: '#474747f3',
          
        }
      })
    }



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
        changer={() => setIsAddingAssignment(false)}
      />
    </div>
  )
}