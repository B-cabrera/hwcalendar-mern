import { ChangeEvent, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar';



function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [className, setClassName] = useState('');

  function changeAdd() {
    if (!isAdding) setIsAdding(true);
  }


  return (
    <div className='App'>
      <NavBar />
      <div id='content'>
        <div id="top">
          {!isAdding &&
          <button
            id='classbtn'
            onClick={changeAdd}>
            Add Class
          </button>}
        </div>
        <div id='rest'>
          <div id='middle'>
            {className}
          </div>

          <div id="bottom">
            {isAdding &&
              <form>
                <label htmlFor="classinput">Enter the Class Name</label>
                <input 
                  id="classinput"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    event.preventDefault();
                    setClassName(event.target.value)  
                  }} />
                <button id="submitbtn">Enter</button>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
