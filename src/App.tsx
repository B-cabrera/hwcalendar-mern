import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import './styles/App.css'
import AddClassForm from './components/AddClassForm';
import NavBar from './components/NavBar';
import BookShelf from './components/BookShelf';
import { handleCreateClass, handleGetAllClasses } from './handlers/classHandler';
import TClassHW from './types/TClassHW';

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
  const [error, setError] = useState(false);
  const [latestClass, setLatestClass] = useState<TClassHW>();

  function changeAdd() {
    if (!isAdding) setIsAdding(true);
  }

  function updateClass(event: ChangeEvent<HTMLInputElement>) {
    setNameOfClass(event.target.value);
  }

  function reset() {
    setNameOfClass('');
    setError(false);
    setIsAdding(false);
  }

  async function createClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateString(nameOfClass)) {
      setError(true);
      return
    }

    const { created: createdClass } = await handleCreateClass(event, nameOfClass);

    createdClass ? (setLatestClass(createdClass), reset()) : setError(true);
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
          value={nameOfClass} />
        {error && <p id='warning'>Please enter a valid class</p>}
      </div>
    </div>
  )
}

export default App;
