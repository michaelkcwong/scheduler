
import Appointment from './Appointment';
import "components/Application.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DayList from './DayList';
import { getAppointmentsForDay } from 'helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  const setDay = (day) => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentArr = dailyAppointments.map((obj) => {
    return <Appointment key={obj.id} {...obj} />;
  });

  Promise.all([axios.get('/api/days'), axios.get('/api/appointments')]).then(
    (all) =>
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
    }))
  );

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
        <Appointment key='last' time='5pm' />
      </section>
    </main>
  );
}
