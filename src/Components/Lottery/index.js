import React, { Component } from "react";

import './index.css';

const Ticket = ({ lotteryTicket, onLotteryFinish }) => {
  return (
    <div className="lottery-ticket-container">
      <div className="lottery-ticket-content">
        <h4 className="lottery-ticket-name">{lotteryTicket.name}</h4>
        <p className="lottery-ticket-paragraph lottery-ticket-paragraph-description">
          Description: <b>{lotteryTicket.description}</b>
        </p>
        <p className="lottery-ticket-paragraph">Finish at:
          <span className="lottery-ticket-paragraph-span">
          <b>{` ${lotteryTicket.finishDate}`}</b>
        </span>
        </p>
        <p className="lottery-ticket-paragraph">Price:
          <span className="lottery-ticket-paragraph-span">
          <b>{` $${lotteryTicket.price}`}</b>
        </span>
        </p>
        <p className="lottery-ticket-paragraph">Prize:
          <span className="lottery-ticket-paragraph-span">
          <b>{` $${lotteryTicket.prize}`}</b>
        </span>
        </p>
      </div>
      <div className="lottery-ticket-delete-block">
        <button
          className="delete-lottery-button"
          onClick={() => onLotteryFinish()}
        >
          Excel
        </button>
      </div>
    </div>
  )
};

const Form = ({ onLotteryTicketCreate }) => {
  return (
    <div className="lottery-ticket-form-wrapper">
      <form
        className="lottery-ticket-form"
        onSubmit={e => onLotteryTicketCreate(e)}
      >
        <input
          onChange={() => {}}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery name"
          value={''}
        />
        <textarea
          onChange={() => {}}
          className="lottery-ticket-form-field lottery-ticket-form-field-text-area"
          placeholder="Enter lottery description"
          value={''}
        />
        <input
          onChange={() => {}}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery finish date like (02.11.2019 18:00):"
          value={''}
        />
        <input
          onChange={() => {}}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery prize amount"
          value={''}
        />
        <input
          onChange={() => {}}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery price for user"
          value={''}
        />
        <button
          disabled={true} // dynamic
          type="submit"
          className="lottery-ticket-form-submit" // dynamic disable/enable classes
        >
          Create lottery ticket!
        </button>
      </form>
    </div>
  )
};

export default class Lottery extends Component {
  componentDidMount() {

  }
  
  render() {
    
    let {
      lotteryTicket,
      onLotteryFinish,
      onLotteryTicketCreate
    } = this.props;
    
    return [
      <h1 key="1" className="Login-title">Lottery:</h1>,
      <div key="2" className="container-lottery">
        {
          this.props.lotteryTicketExists ?
            <Ticket lotteryTicket={lotteryTicket} onLotteryFinish={onLotteryFinish}/> :
            <Form onLotteryTicketCreate={onLotteryTicketCreate}/>
        }
      </div>
    ]
  }
}