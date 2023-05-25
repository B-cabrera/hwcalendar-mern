import { useEffect, useState } from 'react'
import '../styles/LandingPage.css'
import { useNavigate } from 'react-router-dom';
import { handleInitAuth } from '../handlers/clientHandler';

export default function LandingPage() {
  const [googleClient, setGoogleClient] = useState<google.accounts.oauth2.CodeClient>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4008/api/auth/googleClient").then((res) => {
      return res.json()
    }).then((json) => {
      setGoogleClient(google.accounts.oauth2.initCodeClient({
        client_id: json.GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar email',
        ux_mode: 'popup',
        callback: (response) => {
          handleInitAuth(response).then((data) => {
            sessionStorage.setItem('token', data.token);
            navigate('/')
          })
        }
      }))

    })


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
      <span id='mainmessage'>
        <button id="loginbtn" onClick={getAccessToken}>Login</button>
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