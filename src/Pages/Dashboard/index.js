import React, { Component } from "react";
import LoaderWrapper from '../../Components/Loader/index';
import NewLevelForm from '../../Components/NewLevelForm/index';
import LevelsList from '../../Components/LevelsList/index';
import Metrics from '../../Components/Metrics/index';
import { Button } from "react-bootstrap";
import { CREATE_LEVEL, REFRESH_TOKEN, GET_LEVELS_LIST } from '../../constants/index';
import Tabs from "../../Components/Tabs/index";

import './index.css';

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
      },
      levels: {
        activeCount: 0,
        activeList: [],
        completedCount: 0,
        completedList: []
      },
      activeTab: "create"
    };
  }
  
  controller = new AbortController();
  
  componentWillMount() {
    this.setState(state => ({ ...state, creeds: { ...this.props.history.creeds} }));
  
    if (this.props.history.creeds === undefined ||
        this.props.history.creeds === null ||
        Object.keys(this.props.history.creeds).length === 0) {
      this.props.history.push('/');
    }
  }
  
  componentDidMount() {
    this.getAllLevelsAsync();
  }
  
  logOutAsync = async () => {
    let confirmation = window.confirm("Do you really want to LEAVE?");
    
    if (!confirmation) {
      return false;
    }
    
    this.setState(state => ({ ...state, loading: true}));
    
    localStorage.removeItem('info');
  
    this.props.history.push('/');
    
    this.setState(state => ({ ...state, loading: false }));
  };
  
  refreshTokenFuncAsync = async () => {
    
  
    this.setState(state => ({ ...state, loading: true }));
  
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
  
    if (refreshed.status > 205 && refreshed.status < 500) {
      return false;
    }
    
    const content = await refreshed.json();
  
    this.setState(state => ({ ...state, creeds: { ...content }, loading: false }));
  
    window.alert("Refresh token success!");
    
    return true;
  };
  
  handleSubmitAsync = async (e) => {
    e.preventDefault();
  
    this.setState(state => ({ ...state, loading: true }));
    
    let confirm = window.confirm("Do you really want CREATE this level ?");
    
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
  
        let tokenIsRefreshed = await this.refreshTokenFuncAsync();
        
        if (!tokenIsRefreshed) {
          await this.refreshTokenFuncAsync();
        }
  
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
        
        let response = await fetch(CREATE_LEVEL, newSettings);
  
        if (response.status > 205 && response.status < 500) {
          window.alert("Level was not created.");
    
          return false;
        }
  
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
  
  deleteLevelAsync = async (levelId) => {
    
    let confirm = window.confirm("Do you really want DELETE this level ?");
  
    if (!confirm) {
      return false;
    }
    
    // this.setState(state => ({ ...state, loading: true }));
  };
  
  getAllLevelsAsync = async () => {
    this.setState(state => ({ ...state, loading: true }));
  
    let { userId } = JSON.parse(localStorage.getItem("info"));
  
    const settings = {
      method: "GET",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.creeds.accessToken}`,
        'userId': userId
      },
      signal: this.controller.signal
    };
  
    (async () => {
      const rawResponse = await fetch(GET_LEVELS_LIST, settings);
  
      if (rawResponse.status > 205 && rawResponse.status < 500) {
        await this.refreshTokenFuncAsync();

        const newSettings = {
          method: "GET",
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.creeds.accessToken}`,
            'userId': userId
          }
        };
  
        let response = await fetch(GET_LEVELS_LIST, newSettings);
  
        const content = await response.json();
  
        this.setState(state => ({
          ...state,
          levels: {...content},
          loading: false
        }));
  
        return false;
      } else {
        const content = await rawResponse.json();
        
        this.setState(state => ({
          ...state,
          levels: {...content},
          loading: false
        }));
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
  
    let newSteps = this.state.steps.filter((item, elemIndex) => elemIndex !== index);
  
    this.setState(state => ({ ...state, steps: [ ...newSteps ] }));
  };
  
  switchTab = (value) => {
    this.setState(state => ({ ...state, activeTab: value }))
  };
  
  componentWillUnmount() {
    this.controller.abort();
  }
  
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
  
    if (this.state.loading) {
      return <LoaderWrapper/>;
    }
  
    return (
      <div className="Dashboard">
        
        <Tabs
          switchTab={this.switchTab}
          activeTab={this.state.activeTab}
        />
        
        {
          this.state.activeTab === "create" &&
          <NewLevelForm
            handleSubmitAsync={this.handleSubmitAsync}
            validateFieldAsync={this.validateFieldAsync}
            validateStepAsync={this.validateStepAsync}
            deleteStep={this.deleteStep}
            addStep={this.addStep}
            logoUrl={this.state.logoUrl.value}
            title={this.state.title.value}
            time={this.state.time.value}
            description={this.state.description.value}
            possibleEarnings={this.state.possibleEarnings.value}
            presentPrice={this.state.presentPrice.value}
            subtitle={this.state.subtitle.value}
            steps={this.state.steps}
            temporaryStep={this.state.temporaryStep}
            stepValid={this.state.stepValid}
            valid={valid}
          />
        }
        
        {
          this.state.activeTab === "levels" &&
          <LevelsList
            levels={this.state.levels.activeList}
            levelsAmount={this.state.levels.activeCount}
            onLevelDelete={this.deleteLevelAsync}
          />
        }
        
        {
          this.state.activeTab === "metrics" && <Metrics/>
        }
        
        <Button
          className="log-out-btn"
          onClick={() => this.logOutAsync()}
        >
          Exit
        </Button>
      </div>
    );
  }
}