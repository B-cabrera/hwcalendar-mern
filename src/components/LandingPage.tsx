import { useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { handleInitAuth } from '../handlers/clientHandler';

export default function LandingPage() {
  const [googleClient, setGoogleClient] = useState<google.accounts.oauth2.CodeClient>();
  const navigate = useNavigate();

  useEffect(() => {
    setGoogleClient(google.accounts.oauth2.initCodeClient({
      client_id: '839726544026-n3bfad17fmu8gpfb8aa0h7vnisg833ft.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar',
      ux_mode: 'popup',
      callback: (response) => {
        handleInitAuth(response);
        navigate('/')
      }
    }))
  }, [])


  function getAccessToken() {
    googleClient!.requestCode();
  }
  return (
    <>
      <span id='heading'>
        <img
          className='logo'
          src='/src/assets/HwCalendarLogo.png'
        />
        <h1>HwCalendar</h1>
      </span>
      <button onClick={getAccessToken}>Login</button>
      <span id='mainmessage'>
        <p>HwCalendar: A platform where you can track homework due dates and classes!</p>
      </span>
      <div id='description'>
        <p><u>You can create a class with a collection of homework's by just pressing 'Add Class'!</u></p>
        <img className='exampleimg' src="/src/assets/add-class.png" />
        <p><u>When you are inside the class page, you can add homework's with the date that it is due.</u></p>
        <img className='exampleimg' src="/src/assets/add-hw.png" />
        <p><u>Homeworks are now stored and can be toggled finished or not finished by just pressing the checkbox!</u></p>
        <img className='exampleimg' src="/src/assets/toggle-finish.png" />
        <p><u>Homeworks are sorted by unfinished first, and finished last to ensure your most
          important ones are always at the top!</u></p>
        <img className='exampleimg' src="/src/assets/sorted-hw.png" />
      </div>

    </>
  )
}