import React, { Children } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { ManageMovie, ManageUser, ScheduleMovie, SellTicket, PickSeat} from '../_components/content';
import { PrivateRoute } from '../_components';
import { Home } from '../_components/content';
import { LoginPage } from '../_components/content';
import { RegisterPage } from '../_components/content';
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
                                            <Route path="/UserManagement" component={ManageUser} />
                                            <Route path="/MovieManagement" component={ManageMovie} />
                                            <Route path="/MovieSchedule" component={ScheduleMovie} />
                                            <Route path="/SellTicket" component={SellTicket} />
                                            <Route path="/PickSeat" component={PickSeat} />
                                            <Route path="/ManageDataReact" component={ParentComponent} />
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

class ParentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageParent: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            messageParent: e.target.value
        })
    }
    render() {
        return (
            <div>
                <p>PARENT COMPONENT</p>
                <div >
                    <label>Message: </label>
                    <input 
                        type="text" 
                        onChange={this.handleChange}
                        name="message"
                    />
                </div>
                <br/>
                <ChildrenComponent message={this.state.messageParent}/>
            </div>
        );
    }
}
class ChildrenComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <p>CHILDREN COMPONENT</p>
                <p>Message from Parent: <i>{this.props.message}</i></p>
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