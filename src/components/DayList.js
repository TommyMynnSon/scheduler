import React from 'react';

import DayListItem from './DayListItem';

const DayList = (props) => {
  const { days, value, onChange } = props;

  const dayListItems = days.map(d => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        selected={d.name === value}
        setDay={onChange}
      >

      </DayListItem >
    );
  })

  return (
    <ul>
      {dayListItems}
    </ul>
  );
};

export default DayList;