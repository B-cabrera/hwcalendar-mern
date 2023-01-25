import { ChangeEvent, FormEvent, useState } from 'react'
import './styles/App.css'
import AddForm from './components/AddClassForm';
import NavBar from './components/NavBar';
import BookShelf from './components/BookShelf';



function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [nameOfClass, setNameOfClass] = useState('');

  function changeAdd() {
    if (!isAdding) setIsAdding(true);
  }

  function updateClass(event: ChangeEvent<HTMLInputElement>) {
    setNameOfClass(event.target.value);
  }

  function addClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(nameOfClass);
    setNameOfClass('');
    setIsAdding(false);
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
          <BookShelf />
          <AddForm 
          showForm={isAdding}
          onChange={updateClass}
          onSubmit={addClass}
          value={nameOfClass} />

      </div>
    </div>
  )
}

export default App;
