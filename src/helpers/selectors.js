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