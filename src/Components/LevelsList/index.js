import React, { Component } from "react";
import Level from "../Level/index";
import LoaderWrapper from '../../Components/Loader/index';

import './index.css';

export default class LevelsList extends Component {
  
  state = {
    levels: {
      activeCount: 0,
      activeList: [],
      completedCount: 0,
      completedList: []
    },
    loading: false
  };
  
  componentDidMount() {
    this.setState(state => ({ ...state, loading: true }));
    
    this.props.onGetLevelsList()
      .then(data =>
        this.setState(state => ({ ...state, levels: { ...data }, loading: false })));
  }
  
  render() {
    let { onLevelDelete } = this.props;
  
    if (this.state.loading) {
      return <LoaderWrapper/>;
    }
    
    return[
      <h1 className="Login-title">Levels list ({this.state.levels.activeList.length})</h1>,
      <div className="container">
        {
          this.state.levels.activeList.map(item =>
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