import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import LoaderWrapper from '../../Components/Loader/index';
import { CREATE_LEVEL, REFRESH_TOKEN } from '../../constants/index';

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

const errorMessage = "Something was wrong:\n1. Server error.\nPlease, try again";

const temporaryStepReseter = {
  title: "",
  description: "",
  imageUrl: "",
};

const globalReseter = {
  logoUrl: {
    value: "",
    isValid: false
  },
  title:  {
    value: "",
    isValid: false
  },
  time:  {
    value: "",
    isValid: false
  },
  possibleEarnings:  {
    value: "",
    isValid: false
  },
  description:  {
    value: "",
    isValid: false
  },
  subtitle:  {
    value: "",
    isValid: false
  },
  steps: [],
  presentPrice:  {
    value: "",
    isValid: false
  },
  
  temporaryStep: {
    title: "",
    description: "",
    imageUrl: "",
  },
  
  stepValid: false,
  loading: false
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      logoUrl: {
        value: "",
        isValid: false
      },
      title:  {
        value: "",
        isValid: false
      },
      time:  {
        value: "",
        isValid: false
      },
      possibleEarnings:  {
        value: "",
        isValid: false
      },
      description:  {
        value: "",
        isValid: false
      },
      subtitle:  {
        value: "",
        isValid: false
      },
      steps: [],
      presentPrice:  {
        value: "",
        isValid: false
      },
      temporaryStep: {
        title: "",
        description: "",
        imageUrl: "",
      },
      stepValid: false,
      loading: false,
      creeds: {
        accessToken: "",
        refreshToken: "",
        expires: ""
      }
    };
  }
  
  componentWillUnmount() {
    
    //localStorage.removeItem('info');
  }
  
  componentWillMount() {
    this.setState(state => ({ ...state, creeds: { ...this.props.history.creeds} }));
  
    if (this.props.history.creeds === undefined ||
        this.props.history.creeds === null ||
        Object.keys(this.props.history.creeds).length === 0) {
      this.props.history.push('/');
    }
  }
  
  logOutAsync = async () => {
    let confirmation = window.confirm("Do you really want to leave?");
    
    if (!confirmation) {
      return false;
    }
    
    this.setState(state => ({ ...state, loading: true}));
    
    localStorage.removeItem('info');
  
    this.props.history.push('/');
    
    this.setState(state => ({ ...state, loading: false }));
  };
  
  refreshTokenFuncAsync = async () => {
  
    let { userId } = JSON.parse(localStorage.getItem("info"));
    
    const refreshTokenBody = {
      refreshToken: this.state.creeds.refreshToken
    };
    
    const refreshTokenSettings = {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'userId': userId,
      },
      body: JSON.stringify(refreshTokenBody)
    };
    
    let refreshed = await fetch(REFRESH_TOKEN, refreshTokenSettings);
    const content = await refreshed.json();
  
    this.setState(state => ({ ...state, creeds: { ...content }}));
  };
  
  handleSubmitAsync = async (e) => {
    e.preventDefault();
  
    this.setState(state => ({ ...state, loading: true }));
    
    let confirm = window.confirm("Do you really want create this level ?");
    
    if (!confirm) {
      return false;
    }
  
    let { email, password } = JSON.parse(localStorage.getItem("info"));
    
    const body = {
      logoUrl: this.state.logoUrl.value,
      title: this.state.title.value,
      time: this.state.time.value,
      possibleEarnings: this.state.possibleEarnings.value,
      description: this.state.description.value,
      subtitle: this.state.subtitle.value,
      steps: this.state.steps,
      percentPrice: this.state.presentPrice.value,
      injection: {
        email: email,
        password: password
      }
    };
  
    const settings = {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.creeds.accessToken}`
      },
      body: JSON.stringify(body)
    };
  
    (async () => {
      const rawResponse = await fetch(CREATE_LEVEL, settings);
    
      if (rawResponse.status > 205 && rawResponse.status < 500) {
  
        await this.refreshTokenFuncAsync();
  
        const newSettings = {
          method: "POST",
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.creeds.accessToken}`
          },
          body: JSON.stringify(body)
        };
        
        await fetch(CREATE_LEVEL, newSettings);
  
        this.setState(state => ({
          ...state,
          ...globalReseter,
          loading: false
        }));
  
        window.alert("Level successfully created!");
        
        return false;
      } else {
        this.setState(state => ({
          ...state,
          ...globalReseter,
          loading: false
        }));
  
        window.alert("Level successfully created!");
      }
    })();
  };
  
  validateFieldAsync = async (name, value) => {
    if (value === '' || value === null || value === " ") {
      this.setState(state => ({ ...state, [name]: { value: value, isValid: false } }));
      
      return false;
    }
  
    this.setState(state => ({ ...state, [name]: { value: value, isValid: true } }))
  };
  
  validateStepAsync = async (subTopic, value) => {
  
    if (value === '' || value === null || value === " ") {
      this.setState(state => ({
        ...state,
        temporaryStep: {
          ...this.state.temporaryStep,
          [subTopic]: value,
        }
      }));
      
      return false;
    }
    
    this.setState(state => ({
      ...state,
      temporaryStep: {
        ...this.state.temporaryStep,
        [subTopic]: value,
      }
    }));
  
    let values = Object.values(this.state.temporaryStep);
  
    if (values[0] !== "" && values[1] !== "" && values[2] !== "") {
      this.setState(state => ({ ...state, stepValid: true }));
    }
  };
  
  addStep = value => {
    this.setState(state => ({
      ...state,
      steps: [...this.state.steps, value],
      temporaryStep: {
        ...temporaryStepReseter
      },
      stepValid: false
    }));
  };
  
  deleteStep = (index) => {
  
    let newSteps = this.state.steps.filter((item, elemIndex) => elemIndex != index);
  
    this.setState(state => ({ ...state, steps: [ ...newSteps ] }));
  };
  
  render() {
  
    let {
      logoUrl,
      title,
      time,
      possibleEarnings,
      description,
      subtitle,
      presentPrice,
      steps
    } = this.state;
    
    let valid =
      logoUrl.isValid &&
      title.isValid &&
      time.isValid &&
      possibleEarnings.isValid &&
      description.isValid &&
      subtitle.isValid &&
      presentPrice.isValid &&
      steps.length > 0;
  
    return (
      <div className="Dashboard">
        {this.state.loading ? <LoaderWrapper/> :
          [<h1 key="1" className="Login-title">New level</h1>,
            <div key="2" className="form-wrapper">
              <form onSubmit={(e) => this.handleSubmitAsync(e)}>
                <FormGroup controlId="text" bsSize="large">
                  <p className="form-subtitle">Logo url (Level logotype link):</p>
                  <FormControl
                    placeholder="Logo url"
                    autoFocus
                    className="form-control-level"
                    type="text"
                    name="logoUrl"
                    value={this.state.logoUrl.value}
                    onChange={e => this.validateFieldAsync("logoUrl", e.target.value)}
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
                      value={this.state.title.value}
                      onChange={e => this.validateFieldAsync("title", e.target.value)}
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
                      value={this.state.time.value}
                      onChange={e => this.validateFieldAsync("time", e.target.value)}
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
                    value={this.state.description.value}
                    onChange={e => this.validateFieldAsync("description", e.target.value)}
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
                      value={this.state.possibleEarnings.value}
                      onChange={e => this.validateFieldAsync("possibleEarnings", e.target.value)}
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
                      value={this.state.presentPrice.value}
                      onChange={e => this.validateFieldAsync("presentPrice", e.target.value)}
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
                    value={this.state.subtitle.value}
                    onChange={e => this.validateFieldAsync("subtitle", e.target.value)}
                  />
                </FormGroup>
                <div className="steps-wrapper-container">
                  {this.state.steps.map((item, index) =>
                    <Step key={index+item} item={item} index={index} onDelete={this.deleteStep}/>)}
                </div>
                <FormGroup controlId="text" bsSize="large">
                  <p className="step-subtitle">Steps:</p>
                  <FormControl
                    placeholder="Step title:"
                    autoFocus
                    className="form-control-level step-field"
                    type="text"
                    name="temporaryStep"
                    value={this.state.temporaryStep.title}
                    onChange={e => this.validateStepAsync("title", e.target.value)}
                  />
                  <FormControl
                    placeholder="Step description:"
                    autoFocus
                    className="form-control-level step-field"
                    type="text"
                    name="temporaryStep"
                    value={this.state.temporaryStep.description}
                    onChange={e => this.validateStepAsync("description", e.target.value)}
                  />
                  <FormControl
                    placeholder="Step image url (optional):"
                    autoFocus
                    className="form-control-level step-field"
                    type="text"
                    name="temporaryStep"
                    value={this.state.temporaryStep.imageUrl}
                    onChange={e => this.validateStepAsync("imageUrl", e.target.value)}
                  />
                  <Button
                    block
                    bsSize="large"
                    className={this.state.stepValid ? "step-add-button" : "step-add-button-invalid"}
                    disabled={!this.state.stepValid}
                    onClick={value => this.addStep(this.state.temporaryStep)}
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
              <Button
                key="2"
                block
                bsSize="large"
                className="log-out-btn"
                onClick={() => this.logOutAsync()}
              >
                Log out
              </Button>
            </div>
          ]}
      </div>
    );
  }
}