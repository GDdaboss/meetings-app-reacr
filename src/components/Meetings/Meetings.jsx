import React from 'react';
import AddMeetings from './AddMeetings'
import MeetingsList from './MeetingsList'
import {Switch, Route} from 'react-router-dom'

function Meetings(props) {
    return (
        <>
            <Switch>
                <Route path="/meetings/add">
                    <AddMeetings />
                </Route>
                <Route path="/meetings">
                    <MeetingsList />
                </Route>
            </Switch>
        </>
    );
}

export default Meetings;