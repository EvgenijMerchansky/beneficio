import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { SIGNIN } from "../../constants/index";
import LoaderWrapper from '../../Components/Loader/index';
import './index.css';

const errorMessage = "Something was wrong:\n1. Invalid credentials\n2. Server error.\nPlease, try again";

const AuthView = () => (
  <div>
    <LoaderWrapper/>
    <p className="subtitle-auth">Authentication...</p>
  </div>
);

class SignIn extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: "",
      password: "",
      accessToken: "",
      refreshToken: "",
      expires: null,
      loading: false
    };
  }
  
  signInAsync = async () => {
    
    this.setState(state => ({ ...state, loading: true }));
  
    let { email, password } = this.state;
  
    const data = {
      email: email,
      password: password
    };
    
    const settings = {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    };
  
    (async () => {
      const rawResponse = await fetch(SIGNIN, settings);
  
      if (rawResponse.status > 205 && rawResponse.status < 500) {
        this.setState(state => ({ loading: false }));
        
        window.alert(errorMessage);
        
        return false;
      }
  
      const content = await rawResponse.json();
      
      localStorage.setItem('info', JSON.stringify({
        accessToken: content.accessToken,
        refreshToken: content.refreshToken,
        expires: content.expires,
        email: email,
        password: password,
      }));
  
      this.setState(state => ({
        ...state,
        accessToken: content.accessToken,
        refreshToken: content.refreshToken,
        expires: content.expires,
        loading: false
      }));
      
      this.props.history.push('/dashboard');
    })();
  };
  
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  
  handleSubmit = async event => {
    
    event.preventDefault();
    
    await this.signInAsync();
  };
  
  render() {
    return (
      <div className="Login-wrapper">
        <div className="Login">
          {this.state.loading ? <AuthView/> :
            [<h1 key="1" className="Login-title">Beneficio</h1>,
              <form key="2" onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                  <p className="subtitle">Email</p>
                  <FormControl
                    placeholder="Email"
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <p className="subtitle">Password</p>
                  <FormControl
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  className={!this.validateForm() ? "submit-btn-error" : "submit-btn"}
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            ]}
        </div>
      </div>
    );
  }
}

export default SignIn;