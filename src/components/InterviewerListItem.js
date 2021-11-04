import React from 'react';

import classNames from 'classnames';

import "components/InterviewerListItem.scss"

const InterviewerListItem = (props) => {
  const { name, avatar, setInterviewer, selected } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  const getNameIfSelected = () => {
    if (selected) {
      return name;
    }
  }

  return (
    <li className={interviewerClass} onClick={() => { setInterviewer() }}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {getNameIfSelected()}
    </li>);
};

export default InterviewerListItem;