export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  if(!state.days || !state.appointments) return [];

  const days = state.days;
  let focusAppointmentId;

  for (let specificDay of days) {
    if(specificDay.name === day){
      focusAppointmentId =  specificDay.appointments;
    }
  }
  
  //when day is not found
  if(!focusAppointmentId) return [];

  let focusAppointments = [];
  const appts = state.appointments;

  for(const appt of Object.values(appts)){
    if(focusAppointmentId.includes(appt.id)){
      focusAppointments.push(appt)
    }
  }

  return focusAppointments;
}



export function getInterview(state, interview) {
  if(interview === null) return null;

  const interviewerId = interview.interviewer;
  const interviewerProfile = state.interviewers[interviewerId];

  return {...interview, interviewer: interviewerProfile};

}


export function getInterviewersForDay(state, day) {
  if(!state.days || !state.interviewers) return [];

  const days = state.days;

  //holds all appointment IDs for a given day
  let focusAppointmentId;

  for (let specificDay of days) {
    if(specificDay.name === day){
      focusAppointmentId =  specificDay.appointments;
    }
  }

  //when day is not found
  if(!focusAppointmentId) return [];

  //hold all interview IDs for a specific day
  let interviewerIDs = [];

  const appts = state.appointments;

  for(const appt of Object.values(appts)){
    if(appt.interview && focusAppointmentId.includes(appt.id)){
      interviewerIDs.push(appt.interview.interviewer)
    }
  }

  //will be populated with interviewer objects
  let interviewersForDay = [];

  const interviewers = state.interviewers;
  for(const interviewer of Object.values(interviewers)){
    if(interviewerIDs.includes(interviewer.id)){
      interviewersForDay.push(interviewer)
    }
  }

  return interviewersForDay;

}