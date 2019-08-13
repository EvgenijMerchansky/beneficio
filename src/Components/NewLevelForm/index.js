import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

import Step from "../Step/index";

import './index.css';

export default class Dashboard extends Component {
  render() {
    
    let { 
      handleSubmitAsync,
      validateFieldAsync,
      validateStepAsync,
      deleteStep,
      addStep,
      logoUrl,
      title,
      time,
      description,
      possibleEarnings,
      presentPrice,
      subtitle,
      steps,
      temporaryStep,
      stepValid,
      valid
    } = this.props;
  
    return [
      <h1 key="1" className="Login-title">New level</h1>,
      <div key="2" className="form-wrapper">
        <form onSubmit={(e) => handleSubmitAsync(e)}>
          <FormGroup controlId="text" bsSize="large">
            <p className="form-subtitle">Logo url (Level logotype link):</p>
            <FormControl
              placeholder="Logo url"
              autoFocus
              className="form-control-level"
              type="text"
              name="logoUrl"
              value={logoUrl}
              onChange={e => validateFieldAsync("logoUrl", e.target.value)}
            />
          </FormGroup>
          <div className="multi-column-fields">
            <FormGroup controlId="text" className="multiply-form-group" bsSize="large">
              <p className="form-multiply-subtitle">Title (Level title - max 25 characters!):</p>
              <FormControl
                placeholder="Title"
                autoFocus
                className="form-multiply-control-level"
                type="text"
                name="title"
                value={title}
                onChange={e => validateFieldAsync("title", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="text" className="multiply-form-group" bsSize="large">
              <p className="form-multiply-subtitle">Time (Level passing time):</p>
              <FormControl
                autoFocus
                placeholder="Time"
                className="form-multiply-control-level"
                type="text"
                name="time"
                value={time}
                onChange={e => validateFieldAsync("time", e.target.value)}
              />
            </FormGroup>
          </div>
          <FormGroup controlId="text" bsSize="large">
            <p className="form-subtitle">Description (Short level description):</p>
            <FormControl
              autoFocus
              placeholder="Description"
              className="form-textarea-level"
              type="text"
              as="textarea"
              rows="3"
              name="description"
              value={description}
              onChange={e => validateFieldAsync("description", e.target.value)}
            />
          </FormGroup>
          <div className="multi-column-fields">
            <FormGroup controlId="text" className="multiply-form-group" bsSize="large">
              <p className="form-multiply-subtitle">Possible earnings (USD):</p>
              <FormControl
                placeholder="0.00"
                autoFocus
                className="form-multiply-control-level"
                type="text"
                name="possibleEarnings"
                value={possibleEarnings}
                onChange={e => validateFieldAsync("possibleEarnings", e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="text" className="multiply-form-group" bsSize="large">
              <p className="form-multiply-subtitle">Present price (USD):</p>
              <FormControl
                placeholder="0.00"
                autoFocus
                className="form-multiply-control-level"
                type="text"
                name="presentPrice"
                value={presentPrice}
                onChange={e => validateFieldAsync("presentPrice", e.target.value)}
              />
            </FormGroup>
          </div>
          <FormGroup controlId="text" bsSize="large">
            <p className="form-subtitle">Subtitle (Steps to reproduce):</p>
            <FormControl
              placeholder="Subtitle"
              autoFocus
              className="form-control-level"
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={e => validateFieldAsync("subtitle", e.target.value)}
            />
          </FormGroup>
          <div className="steps-wrapper-container">
            {steps.map((item, index) =>
              <Step key={index+item} item={item} index={index} onDelete={deleteStep}/>)}
          </div>
          <FormGroup controlId="text" bsSize="large">
            <p className="step-subtitle">Steps:</p>
            <FormControl
              placeholder="Step title:"
              autoFocus
              className="form-control-level step-field"
              type="text"
              name="temporaryStep"
              value={temporaryStep.title}
              onChange={e => validateStepAsync("title", e.target.value)}
            />
            <FormControl
              placeholder="Step description (500 characters):"
              autoFocus
              className="form-control-level step-field"
              type="text"
              name="temporaryStep"
              value={temporaryStep.description}
              onChange={e => validateStepAsync("description", e.target.value)}
            />
            <FormControl
              placeholder="Step image url (optional):"
              autoFocus
              className="form-control-level step-field"
              type="text"
              name="temporaryStep"
              value={temporaryStep.imageUrl}
              onChange={e => validateStepAsync("imageUrl", e.target.value)}
            />
            <Button
              block
              bsSize="large"
              className={stepValid ? "step-add-button" : "step-add-button-invalid"}
              disabled={!stepValid}
              onClick={value => addStep(temporaryStep)}
            >
              Add step
            </Button>
          </FormGroup>
          <Button
            block
            bsSize="large"
            className={!valid ? "submit-btn-error" : "submit-btn"}
            disabled={!valid}
            type="submit"
          >
            Create level
          </Button>
        </form>
      </div>
    ]
  }
}