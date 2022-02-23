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