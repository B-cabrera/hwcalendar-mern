import { ChangeEvent, FormEvent, useState } from "react"
import "../styles/UpdateField.css";



interface UpdateFieldProps {
  initialValue: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  className?: string,
}


export default function UpdateField({ initialValue, onSubmit, onChange, className }: UpdateFieldProps) {
  const [isChanging, setIsChanging] = useState(false);


  function startUpdating() {
    setIsChanging(true)
  }


  return (
    <>
      {isChanging ?
        <>
          <form className="inputs" onSubmit={onSubmit}>
            <input
              value={initialValue}
              onChange={onChange}
            >
            </input>
            <button
            id="submitbtn"
          >
            Enter
          </button>
          <button
            type="button"
            id="cancel"
            onClick={(e) => {
              e.preventDefault();
              setIsChanging(false);
            }}
          >
            Cancel
          </button>
          </form>
        </>
        : <button
          id="editable-text"
          className={className ? className : ""}
          onClick={startUpdating}
        >{initialValue}</button>}
    </>
  )
}
