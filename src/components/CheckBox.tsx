import { MouseEvent} from 'react'
import '../styles/CheckBox.css'


export default function CheckBox(props: {checked: boolean, onClick: (event: MouseEvent<HTMLDivElement>) => void}) {



    return(
        <div id="outer" onClick={props.onClick}>
            {props.checked && <div id="inner"></div>}
        </div>
    )
}