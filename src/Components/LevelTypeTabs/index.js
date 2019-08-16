import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './index.css';

export default class LevelTypeTabs extends Component {
  render() {
    
    let { onChangeLevelType, levelType, leftTitle, rightTitle } = this.props;
    
    return(
      <div className="level-type-container">
        <Button
          className={levelType === 1 ? "level-type-active-level-btn" : "level-type-level-btn"}
          value="1"
          onClick={e => onChangeLevelType(+e.target.value)}
        >
          {leftTitle}
        </Button>
        <Button
          className={levelType === 2 ? "level-type-active-drop-btn" : "level-type-drop-btn"}
          value="2"
          onClick={e => onChangeLevelType(+e.target.value)}
        >
          {rightTitle}
        </Button>
      </div>
    )
  }
}