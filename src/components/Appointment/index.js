import React from "react";
import "./styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
 

export default function Appointment(props){
  const {mode , transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(()=>{
      transition(SHOW);
    })
    .catch(()=>{
      transition(ERROR_SAVE, true)
    })
  }

  const deleteAppointment = (id) => {
    transition(DELETING, true);

    props.cancelInterview(id)
    .then(()=>{
      transition(EMPTY);
    })
  }


  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you like to delete?" onCancel={back} onConfirm={()=> deleteAppointment(props.id)}/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === EDIT && (<Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save}/>)}
      {mode === ERROR_SAVE && <Error message="Error occurred while saving!" onClose={back}/>}


    </article>
  )
}