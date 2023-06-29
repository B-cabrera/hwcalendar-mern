import TFormProps from "../types/TFormProps";
import '../styles/AddAssignmentForm.css';


export default function AddAssignmentForm({ showForm, onChange, onSubmit, value, onDateChange, changer }: TFormProps) {


  return (
    <div>
      {showForm &&
        <form id="addform" onSubmit={onSubmit}>
          <label htmlFor="hwinput">Assignment Name</label>
          <input
            id="hwinput"
            value={value}
            onChange={onChange}
            style={{ marginRight: '20px' }}
            autoComplete='off'
          />
          <input
            type="date"
            onChange={onDateChange}
            min={new Date(Date.now()).toISOString().split('T')[0]}
            max='3100-12-31'
          />
          <button id="submitbtn">Enter</button>
          <button 
          type="button" 
          id="cancel"
          onClick={() => changer!()}>Cancel</button>
        </form>}
    </div>
  )
}