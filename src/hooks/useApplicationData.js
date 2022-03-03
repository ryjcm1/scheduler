import { useState, useEffect } from "react";
import axios from "axios";



const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  const bookInterview = (id, interview) => {
    //when appointment is not null, changes that will be applied should not effect spots
    const isEdit = state.appointments[id].interview ? true : false;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      if (!isEdit) {
        //update spot number when the action is for booking and interview
        return setState({
          ...state,
          days: updateSpots(id),
          appointments: appointments,
        });
      }
      return setState({ ...state, appointments: appointments });
    });
  };


  //deletes specified interview and updates spot accordingly
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        days: updateSpots(id, true),
        appointments: appointments,
      });
    });
  };


  //changes the selected day
  const setDay = (day) => setState({ ...state, day });


  //used from booking interviews and deleteing interviews
  //creates a new days object and increments spots accordingly to appointment id
  const updateSpots = (id, increase = false) => {
    const updatedDays = state.days.map((day) => {
      const increment = increase ? 1 : -1;

      if (day.appointments.includes(id)) {
        let newSpots = day.spots + increment;
        return {...day, spots: newSpots}
      }
      return {...day};
    });
    return updatedDays;
  };



  //on first run, retrieves all api data and sets state accordingly
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        const [days, appointments, interviewers] = all;
        setState((prev) => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        }));
      })
      .catch((err) => console.log(err.message));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
