import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './index.css';

export default class Level extends Component {
  render() {
    
    let { id, logoUrl, percentPrice, possibleEarnings, time, title, onDelete } = this.props;
    
    return(
      <div key={id+title} className="container-level">
        <img className="level-img" src={logoUrl}/>
        <div className="info-wrapper">
          <p className="level-info-subtitle"><span className="subtitle-wrapper">Title:</span> {title}</p>
          <p className="level-info-subtitle"><span className="subtitle-wrapper">Possible earnings:</span> ${possibleEarnings}</p>
          <p className="level-info-subtitle"><span className="subtitle-wrapper">Precent price:</span> ${percentPrice}</p>
          <p className="level-info-subtitle"><span className="subtitle-wrapper">Time:</span> {time}</p>
        </div>
        <div className="delete-level-wrapper">
          <Button className="delete-level-button" onClick={() => onDelete()}>x</Button>
        </div>
      </div>
    )
  }
}