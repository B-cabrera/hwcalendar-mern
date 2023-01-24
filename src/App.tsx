import { ChangeEvent, FormEvent, useState } from 'react'
import './App.css'
import AddForm from './components/AddClassForm';
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

          <AddForm showForm={isAdding}/>
        </div>
      </div>
    </div>
  )
}

export default App;
