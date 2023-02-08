import { MouseEvent } from 'react'
import '../styles/CheckBox.css'


export default function CheckBox(props: { checked: boolean, onClick: (event: MouseEvent<HTMLButtonElement>) => void }) {



  return (
    <button onClick={props.onClick} id='access-button'>
      <div id="outer">
        {props.checked && <div id="inner"></div>}
      </div>
    </button>
  )
}