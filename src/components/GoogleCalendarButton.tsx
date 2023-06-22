import { handleCreateEvent } from "../handlers/clientHandler"

interface GoogleCalendarButtonProps {
  eventName: string,
  eventDate: string
}


export default function GoogleCalendarButton({eventName, eventDate}: GoogleCalendarButtonProps) {
  

  return (
    <button onClick={() => handleCreateEvent(eventName, eventDate)}>Create GC Event</button>
  )
}