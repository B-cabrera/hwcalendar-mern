import { toast } from "react-hot-toast"
import { handleCreateEvent } from "../handlers/clientHandler"

interface GoogleCalendarButtonProps {
  eventName: string,
  eventDate: string
}

// () => handleCreateEvent(eventName, eventDate)


export default function GoogleCalendarButton({eventName, eventDate}: GoogleCalendarButtonProps) {
  

  return (
    <button onClick={() => toast.promise(handleCreateEvent(eventName, eventDate),{
      loading: 'Creating Event',
      success: `Event Created`,
      error: 'Creation Failed'
    } ,{
      style: {
        fontFamily: 'Raleway',
        fontWeight: 900,
        color: 'white',
        backgroundColor: '#474747f3',
        
      }
    })}>Create GC Event</button>
  )
}