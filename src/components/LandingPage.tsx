import '../styles/LandingPage.css'


export default function LandingPage() {
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
        <p>HwCalendar: A platform where you can track homework due dates and classes!</p>
        <button>Login</button>
      </span>
      <div id='description'>
        <p>You can create a class with a collection of homework's by just pressing 'Add Class'!</p>
        <img className='exampleimg' src="/src/assets/add-class.png" />
        <p>When you are inside the class page, you can add homework's with the date that it is due.</p>
        <img className='exampleimg' src="/src/assets/add-hw.png" />
        <p>Homeworks are now stored and can be toggled finished or not finished by just pressing the checkbox!</p>
        <img className='exampleimg' src="/src/assets/toggle-finish.png" />
        <p>Homeworks are sorted by unfinished first, and finished last to ensure your most
          important ones are always at the top!</p>
        <img className='exampleimg' src="/src/assets/sorted-hw.png" />
      </div>

    </>
  )
}