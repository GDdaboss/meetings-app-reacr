import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCalendar } from '../../services/calendar';

class Calendar extends React.Component {
    state = {
        status: Calendar.LOADED_CALENDAR,
        selectedDate: new Date().toISOString().substr( 0, 10 ),
        meetings: null,
        error: null
    };

    setSelectedDate = (event) => {
        this.setState({
            selectedDate: event.target.value
        });
    }

    render() {
        // - input type="date" onChange = setSelectedDate
        // - map through meetings and display as per requirement (display: flex, position: relative / absolute) - to start off display the meetings in a plain list view
        const { status, selectedDate, meetings, error } = this.state;
        let el;

        switch( status ) {
            case Calendar.Status.LOADING_CALENDAR:
                el = <div>Loading meetings for selected date</div>
                break;
            case Calendar.Status.LOADED_CALENDAR:
                // el = (
                //     <ul className="list-group">{meetings.map( meeting => <li className="list-item">{meeting.name}, {meeting.startTime.hours}:{meeting.startTime.minutes} to {meeting.endTime.hours}:{meeting.endTime.minutes} </li> )}</ul>
                // );
                el = (
                    <div className="container">
                        {
                            meetings.map(
                                meeting => (
                                    <div className="card" style={{margin: "0.5rem 0rem"}}>
                                        <h5 className="card-header">{meeting.name}</h5>
                                        <div className="card-body">
                                            <h6 className="card-title">Timing: {meeting.startTime.hours}:{meeting.startTime.minutes} to {meeting.endTime.hours}:{meeting.endTime.minutes} </h6>
                                            <p className="card-text">{meeting.description}</p>
                                            <button class="btn btn-danger" style={{margin: "0.5rem 0rem"}}>Excuse Yourself</button>
                                            <form>
                                                <div class="form-group">
                                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Add participants" />
                                                    <small id="emailHelp" class="form-text text-muted">Enter comma seperated email IDs</small>
                                                    <button type="submit" class="btn btn-primary">Add</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )
                            )
                        }
                        
                        
                    </div>
                )
                break;
            case Calendar.Status.ERROR_LOADING_CALENDAR:
                el = <div>{error.message}</div>
                break;
            default:
                el = null;
        }

        return (
            <>
                <div className="container">
                    <h1>
                        Calendar
                    </h1>
                    <hr />
                    <div className="float-right">
                        <input type="date" id="calendar-date" value={selectedDate} onChange={this.setSelectedDate} />
                    </div>
                    {el}
                </div>
            </>

        );
    }
    
    makeCalendarAPICall() {
        getCalendar( this.state.selectedDate )
            .then(meetings => {
                this.setState({
                    meetings,
                    status: Calendar.Status.LOADED_CALENDAR
                });
            })
            .catch(error => {
                this.setState({
                    error,
                    status: Calendar.Status.ERROR_LOADING_CALENDAR
                });
            });
    }
    // - Lifecycle methods
    //     - componentDidMount() - fetch the meetings for selected date, and set state with meetings
    //         - service method must be defined and called
    componentDidMount() {
        this.makeCalendarAPICall();
    }

    componentDidUpdate(oldProps, oldState) {
        // - same service method must called - BE CAREFUL TO PUT THE CALL TO SERVICE WITHIN an if() that checks that it is selectedDate that has changed (else we end up with recursive calls to componentDidUpdate)
        if( oldState.selectedDate !== this.state.selectedDate ) { // i.e. if selectedDate has changed...
            // console.log(`im here ${this.state.selectedDate}`)
            this.makeCalendarAPICall();
        }
    }
}

Calendar.Status = {
    LOADING_CALENDAR: 'LOADING_CALENDAR',
    LOADED_CALENDAR: 'LOADED_CALENDAR',
    ERROR_LOADING_CALENDAR: 'ERROR_LOADING_CALENDAR'
};


export default Calendar;