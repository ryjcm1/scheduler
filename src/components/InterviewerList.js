import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from "prop-types";

function InterviewerList(props) {
  const interviews = props.interviewers.map((interview) => (
    <InterviewerListItem
      key={interview.id}
      id={interview.id}
      name={interview.name}
      avatar={interview.avatar}
      selected={interview.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interview.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviews}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
