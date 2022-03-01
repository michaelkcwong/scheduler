import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let dayClass = classNames("day-list", {
    "day-list_item--selected":props.selected,
  "day-list_item--full":props.spots === 0,
});

  return (
    <li className={dayClass}>
      <h2 onClick={() => props.setDay(props.name)} className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}