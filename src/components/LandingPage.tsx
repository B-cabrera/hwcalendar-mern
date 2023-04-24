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