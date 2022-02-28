import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.payload}
    case SET_APPLICATION_DATA:
      return {...state, days:action.payload.days, appointments:action.payload.appointments, interviewers:action.payload.interviewers}
    case SET_INTERVIEW: {
      return {...state, appointments:action.payload.appointments}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer,{
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const bookInterview = (id, interview) => {

    //when appointment is not null, changes that will be applied should not effect spots
    const isEdit = state.appointments[id].interview ? true : false;
    // console.log("Editing status is : ", isEdit);

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
      if(!isEdit){
        updateSpots(id)
      }
      // setState({...state, appointments:appointments});
      dispatch({type: SET_INTERVIEW, payload:{appointments:appointments}})
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
      // setState({...state, appointments:appointments});
      dispatch({type: SET_INTERVIEW, payload: {appointments:appointments}})

    })

  }
  
  // const setDay = day => setState({ ...state, day });
  const setDay = day => dispatch({type: SET_DAY, payload: day});

  //updates the number of interview spots in the day corresponding to a specific appointment id
  const updateSpots = (id, increase = false) => {
    // return state.days.map(day => {
    //   const increment = increase ? 1 : -1;

    //   if(day.appointments.includes(id)){
    //     day.spots += increment
    //   }
    // })

    state.days.forEach(day => {

      const increment = increase ? 1 : -1;

      if(day.appointments.includes(id)){
        day.spots += increment
      }

    })
    
  }

  
  useEffect(()=>{
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      const [days, appointments, interviewers] = all;
      // setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
      dispatch({type: SET_APPLICATION_DATA, payload: {days: days.data, appointments: appointments.data, interviewers: interviewers.data}})


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