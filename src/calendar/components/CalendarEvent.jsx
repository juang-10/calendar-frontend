/* eslint-disable react/prop-types */
export const CalendarEvent = ({event}) => {
  console.log("🚀 ~ CalendarEvent ~ event:", event)
  const { title, user } = event;
  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </>
  )
}