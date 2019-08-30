import React, { Component } from "react";

import './index.css';

const Ticket = ({
  lotteryTicket,
  onLotteryFinish
}) => {
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

const Form = ({
  onLotteryTicketCreate,
  onValidateTicketField,
  ticketName,
  ticketDescription,
  ticketFinishDate,
  ticketPrize,
  ticketPrice,
  ticketIsValid
}) => {
  return (
    <div className="lottery-ticket-form-wrapper">
      <form
        className="lottery-ticket-form"
        onSubmit={e => onLotteryTicketCreate(e)}
      >
        <input
          onChange={e => onValidateTicketField("ticketName", e.target.value, 14)}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery name"
          value={ticketName}
        />
        <input
          onChange={e => onValidateTicketField("ticketDescription", e.target.value, 14)}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery description"
          value={ticketDescription}
        />
        <input
          onChange={e => onValidateTicketField("ticketFinishDate", e.target.value, 16)}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery finish date like (02.11.2019 18:00):"
          value={ticketFinishDate}
        />
        <input
          onChange={e => onValidateTicketField("ticketPrize", e.target.value, 20)}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery prize amount like: 150.00"
          value={ticketPrize}
        />
        <input
          onChange={e => onValidateTicketField("ticketPrice", e.target.value, 20)}
          className="lottery-ticket-form-field"
          placeholder="Enter lottery price for user like: 5.00"
          value={ticketPrice}
        />
        <button
          disabled={!ticketIsValid}
          type="submit"
          className={ticketIsValid ? "lottery-ticket-form-submit" : "lottery-ticket-form-submit-disable"} // dynamic disable/enable classes
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
      onLotteryTicketCreate,
      onValidateTicketField,
      ticketName,
      ticketDescription,
      ticketFinishDate,
      ticketPrize,
      ticketPrice,
      ticketIsValid
    } = this.props;
    
    return [
      <h1 key="1" className="Login-title">Lottery:</h1>,
      <p className="lottery-subtitle">
        *after pushing on "Excel" button, lottery will be stopped and you will get excel file with users list*
      </p>,
      <div key="2" className="container-lottery">
        {
          this.props.lotteryTicketExists ?
            <Ticket lotteryTicket={lotteryTicket} onLotteryFinish={onLotteryFinish}/> :
            <Form
              onLotteryTicketCreate={onLotteryTicketCreate}
              onValidateTicketField={onValidateTicketField}
              ticketName={ticketName}
              ticketDescription={ticketDescription}
              ticketFinishDate={ticketFinishDate}
              ticketPrize={ticketPrize}
              ticketPrice={ticketPrice}
              ticketIsValid={ticketIsValid}
            />
        }
      </div>
    ]
  }
}