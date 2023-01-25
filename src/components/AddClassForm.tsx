import FormProps from "../types/FormProps";


export default function AddClassForm({showForm, onChange, onSubmit, value} : FormProps): JSX.Element {

    return (
        <div id="bottom">
            {showForm && 
            <form onSubmit={onSubmit}>
                <label htmlFor="classinput">Enter the Class Name</label>
                <input
                    id="classinput"
                    value={value}
                    onChange={onChange}/>
                <button id="submitbtn">Enter</button>
            </form>}

        </div>
    )
}