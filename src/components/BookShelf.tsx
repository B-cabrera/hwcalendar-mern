import { useEffect, useState } from "react";
import "../styles/BookShelf.css"
import { handleGetAllClasses } from "../handlers/classHandler";
import { TBookShelfProps } from "../types/TBookShelfProps";
import { Link } from "react-router-dom";
import TClassHW from "../types/TClassHW";


export default function BookShelf({latestClass}: TBookShelfProps) {
    const [classes, setClasses] = useState<TClassHW[] | null>();
    
    useEffect(() => {
        async function getClasses() {
            setClasses(await handleGetAllClasses());
        }

        getClasses();
    }, [latestClass])
    return (
        <ul id="books">
            {
                classes?.map((aClass)=> (
                    <Link 
                    to={`/${aClass._id}`}
                    key={aClass._id}
                    >{aClass.class}</Link>
                ))
            }
        </ul>
    );
}


