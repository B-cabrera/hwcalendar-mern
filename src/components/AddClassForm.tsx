import FormProps from "../types/TFormProps";


export default function AddClassForm({showForm, onChange, onSubmit, value} : FormProps): JSX.Element {

    return (
        <div id="bottom">
            {showForm && 
            <form onSubmit={onSubmit}>
                <label htmlFor="classinput">Enter the Class Name</label>
                <input
                    id="classinput"
                    value={value}
                    onChange={onChange}
                    autoComplete="off"/>
                <button id="submitbtn">Enter</button>
            </form>}

        </div>
    )
}