import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const bookInterview = (interview) => {
    //when appointment is not null, changes that will be applied should not effect spots
    const isEdit = state.appointments[id].interview ? true : false;
    // console.log("Editing status is : ", isEdit);

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
        return setState({
          ...state,
          days: updateSpots(id),
          appointments: appointments,
        });
      }
      return setState({ ...state, appointments: appointments });
    });
  };

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

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (id, increase = false) => {
    const updatedDays = state.days.map((day) => {
      const increment = increase ? 1 : -1;

      if (day.appointments.includes(id)) {
        day.spots += increment;
      }
      return day;
    });
    return updatedDays;
  };

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
