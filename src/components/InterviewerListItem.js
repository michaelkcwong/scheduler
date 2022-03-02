import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewListItem(props) {
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected':props.selected,
  });

  const imgClass = classNames('interviewers__item', {
    'interviewers__item-image':props.avatar,
  });

  return (
    <li
      onClick={() => props.setInterviewer(props.id)}
      className={interviewerClass}>
       <img className={imgClass} src={props.avatar} alt={props.name} />
        {props.selected ? props.name : ''}
        </li>
  );
}