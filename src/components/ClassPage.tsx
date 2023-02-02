import { MouseEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { handleGetAssignmentByClassID, handleToggleAssignment } from "../handlers/classHandler"
import THW from "../types/THW";
import "../styles/ClassPage.css"
import CheckBox from "./CheckBox";
import NavBar from "./NavBar";

export default function ClassPage () {
    const [assignments, setAssignments] = useState<THW[] | null>();
    const [updated, setUpdated] = useState<boolean>(false);
    const { id } = useParams()

    useEffect(() => {
        async function getAssignments() {
            const hws = await handleGetAssignmentByClassID(id);
            
            setAssignments(hws);
        }

        getAssignments();
    },[updated])
    function toggleCheckBox(event: MouseEvent<HTMLDivElement>, oldValue: boolean, assignmentID: number) {
        const value = !oldValue;
        
        handleToggleAssignment(id, assignmentID, value).then((toggledValue) => {
            setUpdated(!updated);
        })

    }
 
    return (
        <>
            <NavBar />
            <div id="hws">
                <table>
                    {
                        assignments?.map((assignment, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td><CheckBox 
                                    checked={assignment.finished}
                                    onClick={(event: MouseEvent<HTMLDivElement>) => 
                                        toggleCheckBox(event, assignment.finished, assignment._id)
                                    }/></td>
                                    <td>{assignment.name.toUpperCase()}</td>
                                    <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </>
    )
}