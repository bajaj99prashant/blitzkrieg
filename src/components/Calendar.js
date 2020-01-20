import React from 'react';
import Calendar from 'react-pure-calendar';
// import '../css/createForm.css';

class cal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          inputDate: ""
        };
      }
      onDateSelect = date => {
        this.setState({ inputDate: date, show: false });
        this.props.dateSelected(this.state.inputDate);
      }
      render() {
        return (
          <React.Fragment>
            <input
              readOnly
              className="textbox"
              value={this.state.inputDate}
              placeholder="Click here to Select Date"
              onFocus={() => this.setState({ show: true })}
            />
            <div
              className={
                this.state.show ? "calendarContainer show" : "calendarContainer"
              }
            >
              <Calendar
                format="DD-MMM-YYYY"
                defaultDate="20181109"
                disabledDays={[]}
                minDate=""
                maxDate=""
                currDateClass=""
                selectedDateClass=""
                showToday={true}
                onSelect={this.onDateSelect}
              />
            </div>
          </React.Fragment>
        );
      }
    }

    export default cal;