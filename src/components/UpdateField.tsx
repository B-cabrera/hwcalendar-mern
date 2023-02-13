import { ChangeEvent, FormEvent, useState } from "react"
import "../styles/UpdateField.css";



interface UpdateFieldProps {
  initialValue: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}


export default function UpdateField({ initialValue, onSubmit, onChange }: UpdateFieldProps) {
  const [isChanging, setIsChanging] = useState(false);


  function startUpdating() {
    setIsChanging(true)
  }

  return (
    <>
      {isChanging ?
        <form onSubmit={onSubmit}>
          <input
            value={initialValue}
            onChange={onChange}
          >
          </input>
        </form>
        : <button
          id="editable-text"
          onClick={startUpdating}
        >{initialValue}</button>}
    </>
  )
}
