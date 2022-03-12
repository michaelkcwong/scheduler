/*
 *
 * @param {object} state - contains days and appointments
 * @param {string} day
 * @returns - an array of appointments details for the specific day
 */
//Function to get appointments for a day
export function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.filter((obj) => obj.name === day);

  if (appointmentDay.length < 1) {
    return [];
  }

  const appointmentIDArr = appointmentDay[0].appointments;
  const appointmentsResult = appointmentIDArr.map(
    (id) => state.appointments[id]
  );

  return appointmentsResult;
}

/**
 *
 * @param {object} state - contains interviewers
 * @param {object} interview - contain student name & interviewer ID
 * @returns - a new object with existing studen info and add interviewer detail
 */

//Function to get interview information
 export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewers = Object.values(state.interviewers);
  const interviewer = interviewers.filter(
    (obj) => obj.id === interview.interviewer
  );
  const interviewResult = { ...interview, interviewer: interviewer[0] };

  return interviewResult;
}

/*
 *
 * @param {object} state - contains days and appointments
 * @param {string} day
 * @returns - an array of interview details for the specific day
 */
//Function to get Interviewers for a day
export function getInterviewersForDay(state, day) {
  const appointmentDay = state.days.filter((obj) => obj.name === day);

  if (appointmentDay.length < 1) {
    return [];
  }

  const interviewessIDArr = appointmentDay[0].interviewers;
  const interviewersResult = interviewessIDArr.map(
    (id) => state.interviewers[id]
  );

  return interviewersResult;
}