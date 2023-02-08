import TFormProps from "../types/TFormProps";


export default function AddAssignmentForm({ showForm, onChange, onSubmit, value, onDateChange }: TFormProps) {


  return (
    <div>
      {showForm &&
        <form onSubmit={onSubmit}>
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
            max='2100-12-31'
          />
          <button id="submitbtn">Enter</button>
        </form>}
    </div>
  )
}