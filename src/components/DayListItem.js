import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames("day-list", {
    "day-list_item--selected":props.selected,
  "day-list_item--full":props.spots === 0,
});

const formatSpots = (spot) => {
  if (spot === 0) {
    return <h3 className="text--light">no spots remaining</h3>;
  } else if (spot === 1) {
    return <h3 className="text--light">{spot} spot remaining</h3>;
  } else {
    return <h3 className="text--light">{spot} spots remaining</h3>;
  }
};

  return (
    <li className={dayClass}>
      <h2 onClick={() => props.setDay(props.name)} className="text--regular">{props.name}</h2> 
      {formatSpots(props.spots)}
    </li>
  );
}