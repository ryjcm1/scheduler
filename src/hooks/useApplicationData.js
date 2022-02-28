import { useState, useEffect } from "react";
import axios from "axios";


const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(()=>{
      updateSpots(id)
      setState({...state, appointments:appointments});
    })

  }


  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(()=>{
      updateSpots(id, true)
      setState({...state, appointments:appointments});
    })

  }
  

  const setDay = day => setState({ ...state, day });

  const updateSpots = (id, decrease = false) => {
    state.days.forEach(day => {
      if(day.appointments.includes(id) && !decrease){
        day.spots ++

      }else if(day.appointments.includes(id) && decrease){
        day.spots --
      }
    })
  }

  
  useEffect(()=>{
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      const [first, second, third] = all;
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}))

    })
    .catch(err => console.log(err.message))

  },[])


  return{
    state,
    setDay,
    bookInterview,
    cancelInterview
  }


}

export default useApplicationData;