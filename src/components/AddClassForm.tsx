import { ChangeEvent, FormEvent, useState } from "react";
import FormProps from "../types/FormProps";


export default function AddClassForm({showForm} : FormProps): JSX.Element {
    const[nameOfClass, setNameOfClass] = useState('');

    function addClass(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // API Work Here
        console.log(nameOfClass)
    }

    return (
        <div id="bottom">
            {showForm && 
            <form onSubmit={addClass}>
                <label htmlFor="classinput">Enter the Class Name</label>
                <input
                    id="classinput"
                    value={nameOfClass}
                    onChange={(e) => setNameOfClass(e.target.value)}/>
                <button id="submitbtn">Enter</button>
            </form>}

        </div>
    )
}