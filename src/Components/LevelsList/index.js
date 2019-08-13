import React, { Component } from "react";
import Level from "../Level/index";

import './index.css';

export default class LevelsList extends Component {
  render() {
    let { levels, levelsAmount, onLevelDelete } = this.props;
    
    return[
      <h1 className="Login-title">Levels list ({levelsAmount})</h1>,
      <div className="container">
        {
          levels.map(item =>
            <Level
              onDelete={() => onLevelDelete(item.id)}
              logoUrl={item.logoUrl}
              title={item.title}
              possibleEarnings={item.possibleEarnings}
              percentPrice={item.percentPrice}
              time={item.time}
            />)
        }
      </div>
    ]
  }
}