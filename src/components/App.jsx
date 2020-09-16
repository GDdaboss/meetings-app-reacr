import React from 'react';
import {Route} from 'react-router-dom'
import NavBar from './NavBar'
import Login from './Login/Login'
import Calendar from './Calendar/Calendar'
import Meetings from './Meetings/Meetings'


function App(props) {
    return (
        <>
            <NavBar />  
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/meetings">
                <Meetings />
            </Route>
            <Route path="/calendar">
                <Calendar />
            </Route>
        </>
    );
}

export default App;