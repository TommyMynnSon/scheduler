import { useState, useEffect, useReducer } from 'react';

import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW:
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return {
        ...state,
        days: action.currentDays,
        appointments: appointments
      };
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  const setDay = day => {
    dispatch({
      type: SET_DAY,
      day
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      });
  }, []);

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const currentDays = [...state.days];

        let dayToUpdateSpots;

        if (id >= 1 && id <= 5) {
          dayToUpdateSpots = 0;
        }

        if (id >= 6 && id <= 10) {
          dayToUpdateSpots = 1;
        }

        if (id >= 11 && id <= 15) {
          dayToUpdateSpots = 2;
        }

        if (id >= 16 && id <= 20) {
          dayToUpdateSpots = 3;
        }

        if (id >= 21 && id <= 25) {
          dayToUpdateSpots = 4;
        }

        if (state.appointments[id].interview === null) {
          currentDays[dayToUpdateSpots].spots--;
        }

        dispatch({
          type: SET_INTERVIEW,
          currentDays,
          id,
          interview
        });
      });
  }

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const currentDays = [...state.days];

        let dayToUpdateSpots;

        if (id >= 1 && id <= 5) {
          dayToUpdateSpots = 0;
        }

        if (id >= 6 && id <= 10) {
          dayToUpdateSpots = 1;
        }

        if (id >= 11 && id <= 15) {
          dayToUpdateSpots = 2;
        }

        if (id >= 16 && id <= 20) {
          dayToUpdateSpots = 3;
        }

        if (id >= 21 && id <= 25) {
          dayToUpdateSpots = 4;
        }

        currentDays[dayToUpdateSpots].spots++;

        dispatch({
          type: SET_INTERVIEW,
          currentDays,
          id,
          interview: null
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}