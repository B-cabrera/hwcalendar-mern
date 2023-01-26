import { useEffect, useState } from "react";
import "../styles/BookShelf.css"
import TClassHW from "../types/TClassHW";

// possibly sort class names by length to be more aesthetically
// let classes = [
//     "Discrete Math",
//     "Intro to Business",
//     "American Short Fiction",
//     "Computer Organization & Architecture"
// ];

// const classList = classes.map((className, index) => {
//     return (<li key={index}>{className}</li>);
// })

export default function BookShelf() {
    const [classes, setClasses] = useState<TClassHW[]>();
    
    useEffect(() => {
        fetch('http://localhost:4008/api').then((res: Response) => {
            return res.json();
        }).then((data: TClassHW[]) => {
            setClasses(data);
        }).catch((err: Error) => {
            throw err;
        })
    }, [classes])

    return (
        <ul id="books">
            {
                classes?.map((aClass, index)=> (
                   <li key={index}>{aClass.class}</li>
                ))
            }
        </ul>
    );
}


