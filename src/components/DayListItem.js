import React from "react";
import classNames from "classnames";
import "./DayListItem.scss";

export default function DayListItem(props) {

  //displays different spot text 
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    }

    if (spots === 1) {
      return "1 spot remaining";
    }

    return `${spots} spots remaining`;
  };

  let dayListItemClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayListItemClass}
      key={props.id}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
