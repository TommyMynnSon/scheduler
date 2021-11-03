import React, { useState, useEffect } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = props => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const { interviewers, onCancel, save } = props;

  const updateStudent = (value) => {
    setStudent(value);
  };

  const reset = () => {
    setStudent(() => setStudent(""));
    setInterviewer(() => setInterviewer(null));
  };

  const cancel = () => {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => updateStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={() => cancel()} danger>Cancel</Button>
          <Button onClick={() => save(student, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;