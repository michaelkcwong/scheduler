import Appointment from "./Appointment";
import "components/Application.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from "./DayList";
import { 
  getAppointmentsForDay, 
  getInterview, 
  getInterviewersForDay
} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
    .put(`/api/appointments/${id}`, appointment)
    .then(() =>
    setState({
      ...state,
      appointments,
    })
  );
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null,
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  }

  return axios
  .delete(`/api/appointments/${id}`, appointment)
  .then(() => setState({
     ...state, 
     appointments
     })
  );

}

  const appointmentArr = dailyAppointments.map((obj) => {
 
      const interview = getInterview(state, obj.interview);

      return (
        <Appointment
          key={obj.id}
          id={obj.id}
          time={obj.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) =>
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    );
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
