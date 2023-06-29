import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './styles/App.css'
import AddClassForm from './components/AddClassForm';
import NavBar from './components/NavBar';
import BookShelf from './components/BookShelf';
import { handleCreateClass } from './handlers/classHandler';
import TClassHW from './types/TClassHW';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function validateString(data: string) {
  if (data.length <= 0 ||
    data.includes('$') ||
    data.includes('{') ||
    data.includes('}') ||
    data.includes(':') ||
    data.includes('/') ||
    data.includes('\\')
  ) return false


  return true
}

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [nameOfClass, setNameOfClass] = useState('');
  const [latestClass, setLatestClass] = useState<TClassHW>();
  const navigate = useNavigate();

  function changeAdd() {
    if (!isAdding) setIsAdding(true);
  }

  function updateClass(event: ChangeEvent<HTMLInputElement>) {
    setNameOfClass(event.target.value);
  }

  function reset() {
    setNameOfClass('');
    setIsAdding(false);
  }

  async function createClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateString(nameOfClass)) {
      toastError()
      return
    }

    
    const createdClass = await handleCreateClass(event, nameOfClass);
    createdClass instanceof Error && navigate('/login')

    createdClass ? (setLatestClass(createdClass), reset()) : toastError();
  }

  function toastError() {
    toast.error('Invalid Class', {
      duration: 1000,
      id: 'THIS IS THE ID',
      style: {
        fontFamily: 'Raleway',
        fontWeight: 900,
        color: 'white',
        backgroundColor: '#474747f3',
        
      }
    })
  }

  return (
    <div className='App'>
      <NavBar />
      <div id='content'>
        <div id='top'>
          {!isAdding &&
            <button
              onClick={changeAdd}>
              Add Class
            </button>}
        </div>
        <BookShelf latestClass={latestClass} />
        <AddClassForm
          showForm={isAdding}
          onChange={updateClass}
          onSubmit={createClass}
          value={nameOfClass}
          changer={() => {
            setIsAdding(false)
          }} />
      </div>
    </div>
  )
}

export default App;
