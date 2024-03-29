import { useEffect, useState, MouseEvent } from "react";
import "../styles/BookShelf.css"
import { handleDeleteClass, handleGetAllClasses } from "../handlers/classHandler";
import { TBookShelfProps } from "../types/TBookShelfProps";
import { Link, useNavigate } from "react-router-dom";
import TClassHW from "../types/TClassHW";


export default function BookShelf({ latestClass }: TBookShelfProps) {
  const [classes, setClasses] = useState<TClassHW[] | null>();
  const [changed, setChanged] = useState(false);
  const navigate  = useNavigate();


  async function deleteClass(event: MouseEvent<HTMLButtonElement>, id: number | undefined) {
    event.preventDefault()

    const deleted = await handleDeleteClass(id!);

    deleted instanceof Error && navigate('/login');

    
    setChanged(!changed);

  }

  useEffect(() => {
    async function getClasses() {
      const allClasses = await handleGetAllClasses();

      allClasses instanceof Error && navigate('/login');

      setClasses(allClasses);
    }

    getClasses();
  }, [latestClass, changed])
  
  return (
    <ul id="books">
      {
        classes?.map((aClass) => (
          <Link
            to={`/${aClass.class}/${aClass._id}`}
            key={aClass._id}
          >
            {aClass.class}
            <button
              id="delete"
              onClick={(e) => deleteClass(e, aClass._id)}
            >x</button>
          </Link>
        ))
      }
    </ul>
  );
}


