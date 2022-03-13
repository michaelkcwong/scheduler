import React, { Fragment } from 'react'

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";
import Status from './Status';

export default function Appointment(props) {
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
;
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);
  props.bookInterview(props.id, interview).then(() => transition(SHOW));
}

function deleteInterview(id) {
  transition(DELETING);
  props.cancelInterview(id).then(() => transition(EMPTY));
}

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
        interview={props.interview}
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteInterview(props.id)}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
    </article>
  );
}

