import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewListItem(props) {
  const itemClass = classNames({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={itemClass} key={props.id} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
