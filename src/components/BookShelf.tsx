import { useEffect, useState } from "react";
import TClassHW from "../types/TClassHW";
import "../styles/BookShelf.css"
import { handleGetAllClasses } from "../handlers/classHandler";
import { TBookShelfProps } from "../types/TBookShelfProps";


export default function BookShelf({latestClass}: TBookShelfProps) {
    const [classes, setClasses] = useState<String[] | null>();
    
    useEffect(() => {
        async function getClasses() {
            setClasses(await handleGetAllClasses());
        }

        getClasses();
    }, [latestClass])
    return (
        <ul id="books">
            {
                classes?.map((name, index)=> (
                   <li key={index}>{name}</li>
                ))
            }
        </ul>
    );
}


