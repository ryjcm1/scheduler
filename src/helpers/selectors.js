

  //... returns an array of appointments for the specific day day
export function getAppointmentsForDay(state, day) {

  if (!state.days || !state.appointments) return [];

  const days = state.days;
  let focusAppointmentId;

  for (let specificDay of days) {
    if (specificDay.name === day) {
      focusAppointmentId = specificDay.appointments;
    }
  }

  //when day is not found
  if (!focusAppointmentId) return [];

  let focusAppointments = [];
  const appts = state.appointments;

  for (const appt of Object.values(appts)) {
    if (focusAppointmentId.includes(appt.id)) {
      focusAppointments.push(appt);
    }
  }

  return focusAppointments;
}


//returns updated appointment where interviewer information is added onto the interview property
export function getInterview(state, interview) {
  if (interview === null) return null;

  const interviewerId = interview.interviewer;
  const interviewerProfile = state.interviewers[interviewerId];

  return { ...interview, interviewer: interviewerProfile };
}


//retrieves all interviewers for a specific day
export function getInterviewersForDay(state, day) {
  if (!state.days || !state.interviewers) return [];

  const days = state.days;

  //holds all appointment IDs for a given day
  let interviewerIds;

  for (let specificDay of days) {
    if (specificDay.name === day) {
      interviewerIds = specificDay.interviewers;
    }
  }

  //when day is not found
  if (!interviewerIds) return [];

  let interviewersForDay = [];
  const interviewers = state.interviewers;

  for (const interviewer of Object.values(interviewers)) {
    if (interviewerIds.includes(interviewer.id)) {
      interviewersForDay.push(interviewer);
    }
  }

  return interviewersForDay;
}
