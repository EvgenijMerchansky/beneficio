import React, { Component } from "react";
import Loader from 'react-loader-spinner'

import './index.css';

export default class LoaderWrapper extends Component {
  render() {
    return(
      <div className="Loader-wrapper">
        <Loader
          type="Oval"
          color="#282c34ba"
          height="100"
          width="100"
        />
      </div>
    )
  }
}