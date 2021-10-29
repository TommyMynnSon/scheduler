import React, { useState } from 'react';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import "components/Appointment/styles.scss"

const Appointment = props => {
  const { id, time, interview } = props;

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
      {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    </article>
  );
};

export default Appointment;