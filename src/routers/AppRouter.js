// - /login LoginScreen
// - /    Calendar
import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { CalendarScreen } from './../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
            <Router>
                <div>
                <Switch>
                    <Route exact path="/" component={CalendarScreen} />
                    <Redirect to="/"/>
                </Switch>
                </div>
            </Router>
        )
}
                    