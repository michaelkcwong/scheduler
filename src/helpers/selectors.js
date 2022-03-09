/**
 *
 * @param {object} state - contains days and appointments
 * @param {string} day
 * @returns - an array of appointments details for the specific day
 */

export function getAppointmentsForDay(state, day) {
  const appointmentDay = state.days.filter((obj) => obj.name === day);

  if (appointmentDay.length < 1) {
    return [];
  }

  const appointmentIDArr = appointmentDay[0].appointments;
  const result = appointmentIDArr.map((id) => state.appointments[id]);

  return result;
}

/**
 *
 * @param {object} state - contains interviewers
 * @param {object} interview - contain student name & interviewer ID
 * @returns - a new object with existing studen info and add interviewer detail
 */

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviews = Object.values(state.interviewers);
  const interview = interviewers.filter(
    (obj) => obj.id === interview.interviewer
  );
  const interviewResult = { ...interview, interviewer: interviewer[0] };

  return interviewResult;
}