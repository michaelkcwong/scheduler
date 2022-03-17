import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
 
    /**
   * Promise to get days, appointments and interviewers info from the API
   */
     useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ]).then((all) =>
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }))
      );
    }, []);
  
    const setDay = (day) => setState((prev) => ({ ...prev, day }));

    /**
   * Function to update spots when user book new appointmnent or cancel existing one
   * @param {number} num
   * @returns state days with the updated spots
   */

  function updateSpots(num) {
    state.days.forEach((day) => {
      if (day.name === state.day) {
        day.spots -= num;
      }
    });
    return state.days;
  }

    /**
   * Function to book new interview
   * @param {number} id - interview/appointment ID
   * @param {object} interview - include student name and interviewer ID
   * @returns
   */

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      if (!state.appointments[id].interview) {
        const days = updateSpots(1);
        setState((prev) => ({ ...prev, appointments, days }));
      } else {
        setState((prev) => ({ ...prev, appointments }));
      }
    });
  }

    /**
   * Function to cancel/delete exisiting interview
   * @param {number} id - interview/appointment ID
   * @returns
   */

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

   return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      const days = updateSpots(-1);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }


return { state, setDay, bookInterview, cancelInterview};
}