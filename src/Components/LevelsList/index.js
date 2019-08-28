import React, { Component } from "react";
import Level from "../Level/index";
import LoaderWrapper from '../../Components/Loader/index';
import LevelTypeTabs from '../../Components/LevelTypeTabs/index';

import './index.css';

export default class LevelsList extends Component {
  
  state = {
    levels: {
      activeLevelsList: [],
      completedLevelsList: [],
      activeDropsList: [],
      completedDropsList: [],
      activeLevelsCount: 0,
      completedLevelsCount: 0,
      activeDropsCount: 0,
      completedDropsCount: 0,
      timeToNextLongOpening: 0,
      timeToNextShortOpening: 0
    },
    levelsSwitcher: 1,
    loading: false
  };
  
  componentDidMount() {
    this.setState(state => ({ ...state, loading: true }));
    
    this.props.onGetLevelsList()
      .then(data =>
        this.setState(state => ({ ...state, levels: { ...data }, loading: false })));
  }
  
  switchLevelType = (levelType) => this.setState(state => ({ ...state, levelsSwitcher: levelType }));
  
  render() {
    let { onLevelDelete } = this.props;
  
    if (this.state.loading) {
      return <LoaderWrapper/>;
    }
    
    return[
      <h1 className="Login-title">
        {this.state.levelsSwitcher === 1 ? "Levels" : "Drops"} list ({this.state.levelsSwitcher === 1 ? this.state.levels.activeLevelsList.length : this.state.levels.activeDropsList.length})
      </h1>,
      <div className="container">
        {
          this.props.activeTab === "levels" &&
          <LevelTypeTabs
            onChangeLevelType={this.switchLevelType}
            levelType={this.state.levelsSwitcher}
            leftTitle="Levels"
            rightTitle="Drops"
          />
        }
        {
          this.state.levelsSwitcher === 1 ? this.state.levels.activeLevelsList.map(item =>
            <Level
              key={item.id+item.percentPrice}
              onDelete={() => onLevelDelete(item.id, 1)}
              logoUrl={item.logoUrl}
              title={item.title}
              possibleEarnings={item.possibleEarnings}
              percentPrice={item.percentPrice}
              time={item.time}
            />
          ) :
            this.state.levels.activeDropsList.map(item => {
              return (
                <Level
                  key={item.id+item.percentPrice}
                  onDelete={() => onLevelDelete(item.id, 2)}
                  logoUrl={item.logoUrl}
                  title={item.title}
                  possibleEarnings={item.possibleEarnings}
                  percentPrice={item.percentPrice}
                  time={item.time}
                />
              )
            }
              
            )
        }
      </div>
    ]
  }
}