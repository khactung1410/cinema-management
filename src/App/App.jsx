import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { ManageMovie, ScheduleMovie, SellTicket, PickSeat} from '../_components/content';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { Home } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {LeftMenu} from '../_components/layout/LeftMenu'
import {HeaderMenu} from '../_components/layout/HeaderMenu'

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
        this.state = {
            showMenu: true
        }
    }

    handleToggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        const { alert } = this.props;

        const showMenu = this.state.showMenu ? "" : "toggled"
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="*" component={localStorage.getItem('user') ? () => 
                            <div className={"d-flex " + showMenu} id="wrapper">
                                <LeftMenu/>
                                <div id="page-content-wrapper">
                                    <HeaderMenu handleToggleMenu={this.handleToggleMenu}/>
                                    <div className="container-fluid">
                                        <Switch>
                                            <PrivateRoute exact path="/" component={Home} />
                                            <Route path="/MovieManagement" component={ManageMovie} />
                                            <Route path="/MovieSchedule" component={ScheduleMovie} />
                                            <Route path="/SellTicket" component={SellTicket} />
                                            <Route path="/PickSeat" component={PickSeat} />
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        : LoginPage} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };