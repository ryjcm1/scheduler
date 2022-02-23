import React from "react";
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"


export default function Appointment(props){
  // const appointmentStatus = props.time ? `Appointment at ${props.time}` : "No Appointments"
  const appointmentStatus = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />;

  return(
    <article className="appointment">
      <Header time={props.time} />
      {appointmentStatus}
    </article>
  )
}