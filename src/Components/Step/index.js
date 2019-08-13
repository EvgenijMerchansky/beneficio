import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './index.css';

const Step = ({ item, index, onDelete }) => (
  <div className="completed-step-item">
    <div className="step-header">
      <div className="step-index">
        Step {index + 1}.
      </div>
      <div className="step-delete">
        <Button
          className="step-delete-btn"
          onClick={() => onDelete(index) }
        >
          Delete
        </Button>
      </div>
    </div>
    <div className="step-body">
      <div className="step-body-title" alt={item.title}>
        Title: {item.title}
      </div>
      <div className="step-body-description" alt={item.description}>
        Description: {item.description}
      </div>
      <div className="step-body-imgUrl" alt={item.imageUrl}>
        Image link: {item.imageUrl}
      </div>
    </div>
  </div>
);

export default Step;