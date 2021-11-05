import { useEffect, useReducer } from 'react';

import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {
        ...state,
        day: action.day
      };
    }
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    }
    case SET_INTERVIEW: {
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
    }
    default: {
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
    }
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
      axios.get('/api/interviewers'),
      new WebSocket(process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001')
    ])
      .then((all) => {
        all[3].onmessage = event => {
          const data = JSON.parse(event.data);

          if (data.type === SET_INTERVIEW) {
            const id = data.id;
            const interview = data.interview;
            const appointments = all[1].data;

            const currentDays = all[0].data;

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

            if (appointments[id].interview === null && interview) {
              currentDays[dayToUpdateSpots].spots--;
              appointments[id].interview = interview;
            }

            if (appointments[id].interview && interview) {
              appointments[id].interview = interview;
            }

            if (interview === null) {
              currentDays[dayToUpdateSpots].spots++;
              appointments[id].interview = null;
            }

            dispatch({
              type: SET_INTERVIEW,
              currentDays,
              id,
              interview
            });
          }
        };

        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
  }, []);

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id) {
    return axios
      .delete(`/api/appointments/${id}`);
  }

  return { state, setDay, bookInterview, cancelInterview };
}