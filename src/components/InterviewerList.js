import React, { useState } from 'react';

import InterviewerListItem from './InterviewerListItem';

import 'components/InterviewerList.scss';

const InterviewerList = props => {
  const { interviewers, value, onChange } = props;

  const interviewerListItems = interviewers.map(i => {
    return (
      <InterviewerListItem
        key={i.id}
        name={i.name}
        avatar={i.avatar}
        selected={i.id === value}
        setInterviewer={() => { onChange(i.id) }}
      >

      </InterviewerListItem>
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
};

export default InterviewerList;