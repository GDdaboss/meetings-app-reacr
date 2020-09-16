import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMeetings } from '../../services/meetings';
import Meetings from './Meetings';

class MeetingsList extends React.Component {

    state = {
        status: MeetingsList.LOADED_MEETINGS,
        dateFilter: 'ALL',
        searchparams: '',
        meetings: null,
        error: null
    };

    setDateFilter = (event) => {
        // console.log(event.target.value)
        this.setState({
            dateFilter: event.target.value
        });
    }

    setSearchparams= (event) => {
        this.setState({
            searchparams: event.target.value
        })
    }

    render() {
        // console.log("render")
        const { status, dateFilter, meetings, error } = this.state;

        let el;

        switch( status ) {
            case MeetingsList.Status.LOADING_MEETINGS:
                el = <div>Loading meetings for selected date</div>
                break;
            case MeetingsList.Status.LOADED_MEETINGS:
                el = (
                    <ul className="list-group">{meetings.map( meeting => <li className="list-item">{meeting.name}, {meeting.startTime.hours}:{meeting.startTime.minutes} to {meeting.endTime.hours}:{meeting.endTime.minutes} </li> )}</ul>
                );
                break;
            case MeetingsList.Status.ERROR_LOADING_MEETINGS:
                el = <div>{error.message}</div>
                break;
            default:
                el = null;
        }

        return (
            <>
                <div className="container">
                    <h1>
                        Meetings
                    </h1>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <label className="input-group-text">Filter</label>
                        </div>
                        <select className="custom-select" id="inputGroupSelect01" onChange={this.setDateFilter}>
                            <option value="ALL">ALL</option>
                            <option value="TODAY">TODAY</option>
                            <option value="PAST">PAST</option>
                            <option value="UPCOMING">UPCOMING</option>
                        </select>
                    </div>
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.setSearchparams}/>
                    {el}

                </div>
            </>
        );

    }
    makeMeetingsAPICall() {
        getMeetings( this.state.dateFilter, this.state.searchparams)
            .then(meetings => {
                // console.log(this.state.dateFilter)
                // console.log(meetings)
                this.setState({
                    meetings,
                    status: MeetingsList.Status.LOADED_MEETINGS
                });
            })
            .catch(error => {
                this.setState({
                    error,
                    status: MeetingsList.Status.ERROR_LOADING_MEETINGS
                });
            });
    }

    componentDidMount(){
        // console.log("mount")

        this.makeMeetingsAPICall()
    }

    componentDidUpdate(oldProps, oldState) {
        // console.log("update")

        if( oldState.dateFilter !== this.state.dateFilter ) {
            this.makeMeetingsAPICall();
        }
        if( oldState.searchparams !== this.state.searchparams ) {
            this.makeMeetingsAPICall();
        }
    }
}


MeetingsList.Status = {
    LOADING_MEETINGS: 'LOADING_MEETINGS',
    LOADED_MEETINGS: 'LOADED_MEETINGS',
    ERROR_LOADING_MEETINGS: 'ERROR_LOADING_MEETINGS'
};

export default MeetingsList;