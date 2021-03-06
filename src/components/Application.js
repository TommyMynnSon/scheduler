import React from "react";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import useApplicationData from 'hooks/useApplicationData';

import "components/Application.scss";

const Application = () => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentsInSchedule = dailyAppointments.map(a => {
    const interview = getInterview(state, a.interview);

    return <Appointment key={a.id} id={a.id} time={a.time} interview={interview} interviewers={dailyInterviewers} bookInterview={bookInterview} cancelInterview={cancelInterview} />
  });

  appointmentsInSchedule.push(<Appointment key="last" time={appointmentsInSchedule.length + "pm"} />)

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsInSchedule}
      </section>
    </main>
  );
};

export default Application;