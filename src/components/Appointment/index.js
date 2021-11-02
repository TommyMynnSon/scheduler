import React, { useState } from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';

import useVisualMode from 'hooks/useVisualMode';

import "components/Appointment/styles.scss"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = props => {
  const { id, time, interview, interviewers, bookInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview);

    transition(SHOW);
  }

  const getAppointment = (time) => {
    if (time) {
      return `${time}`;
    }

    return 'No Appointments';
  };

  return (
    <article className="appointment">
      {time ? <Header /> : <></>}
      {getAppointment(time)}
      {mode === EMPTY && <Empty onAdd={() => { transition(CREATE) }} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={() => back(EMPTY)} save={save} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
};

export default Appointment;