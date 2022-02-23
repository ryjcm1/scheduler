export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  //state contains day, days, appointments
  
  //grab appointments array from days
  const days = state.days;
  let focusAppointmentId;

  for (let specificDay of days) {
    if(specificDay.name === day){
      focusAppointmentId =  specificDay.appointments;
    }
  }

  //grab all appointments with id from last array
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


/*

///////state
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  },
    "3": {
    "id": 3,
    "name": "Mildred Nazir",
    "avatar": "https://i.imgur.com/T2WwVfS.png"
  }
}

////interview
{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": 1
  }
}


///////output

{
  "id":1,
  "time":"12pm",
  "interview": {
    "student": "Lydia Miller-Jones",
    "interviewer": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    }
  }
}


*/