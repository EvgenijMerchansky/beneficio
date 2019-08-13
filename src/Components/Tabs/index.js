import React, { Component } from "react";
import { Button } from "react-bootstrap";

import './index.css';

export default class Tabs extends Component {
  render() {
    
    let { switchTab, activeTab } = this.props;
    
    return(
      <div className="navigation">
        <div className="navigation-tabs">
          <Button
            onClick={e => switchTab(e.target.value)}
            className={`nav-tab navigation-tabs-levels ${activeTab === "levels" ? "active-tab" : "common-tab"}`}
            value="levels"
          >
            Levels
          </Button>
          <Button
            onClick={e => switchTab(e.target.value)}
            className={`nav-tab navigation-tabs-create ${activeTab === "create" ? "active-tab" : "common-tab"}`}
            value="create"
          >
            Create
          </Button>
          <Button
            onClick={e => switchTab(e.target.value)}
            className={`nav-tab navigation-tabs-metrics ${activeTab === "metrics" ? "active-tab" : "common-tab"}`}
            value="metrics"
          >
            Metrics
          </Button>
        </div>
      </div>
    )
  }
}