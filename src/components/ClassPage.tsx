import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { handleGetAssignmentByClassID } from "../handlers/classHandler"
import THW from "../types/THW";
import "../styles/ClassPage.css"

export default function ClassPage () {
    const [assignments, setAssignments] = useState<THW[] | null>();
    const { id } = useParams()

    useEffect(() => {
        async function getAssignments() {
            const hws = await handleGetAssignmentByClassID(id);
            
            setAssignments(hws);
        }

        getAssignments();
    })
 
    return (

        <div id="hws">

            <table>
                
                    {
                        assignments?.map((assignment) => (
                            <tr>
                                <td>{assignment.name.toUpperCase()}</td>
                                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    }
                
            </table>
        </div>
    )
}