import React, { Fragment } from 'react'

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const confirmMsg = "Are you sure you would like to delete?";
const errSaveMsg = "Something went wrong. Unable to save appointment";
const errDeleteMsg = "Something went wrong. Unable to delete appointment";

export default function Appointment(props) {

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

 /**
   * Function to save student name and interviewer ID as interview info
   * @param {string} name - student's name for the appointment
   * @param {number} interviewer - interviewer ID
   */

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

  /**
   * Function to delete an existing interview
   * @param {number} id - interview ID
   */
  
function deleteInterview(id) {
  transition(DELETING, true);
  props
  .cancelInterview(id)
  .then(() => transition(EMPTY))
  .catch((err) => transition(ERROR_DELETE, true));
}

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
        interview={props.interview}
        interviewers={props.interviewers}
        onCancel={() => transition(EMPTY)}
        onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === CONFIRM && (
        <Confirm
        message={confirmMsg}
        onCancel={() => back()}
        onConfirm={() => deleteInterview(props.id)}
        />
      )}
      {mode === EDIT && (
        <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={errSaveMsg} onClose ={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={errDeleteMsg} onClose={() => back()} />
      )}
    </article>
  );
}

