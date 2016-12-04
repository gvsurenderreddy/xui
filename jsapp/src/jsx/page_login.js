/*
 * HTML5 GUI Framework for FreeSWITCH - XUI
 * Copyright (C) 2015-2016, Seven Du <dujinfang@x-y-t.cn>
 *
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is XUI - GUI for FreeSWITCH
 *
 * The Initial Developer of the Original Code is
 * Seven Du <dujinfang@x-y-t.cn>
 * Portions created by the Initial Developer are Copyright (C)
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Seven Du <dujinfang@x-y-t.cn>
 *
 *
 */

import React from 'react'
import T from 'i18n-react';
import ReactDOM from 'react-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Router, Route, IndexRoute, Link, hashHistory, Redirect } from 'react-router'
import MainMenu from './main-menu';
import Languages from "./languages";
import Footer from "./footer";
import { Home } from "./index.jsx";

const LoginPage = React.createClass({
	render() {
		var menus = [{id: "MM_LOGIN", description: <T.span text={{ key: "Login"}} />, data: '/'}];
		return <div><MainMenu menus = {menus} rmenus = {[]}/>
			<div id='main'>{this.props.children}</div>
			<Footer/>
		</div>
	}
})

const LoginBox = React.createClass({
	getInitialState: function() {
		return {login_err: false};
	},

	handleClick: function() {
		let username = $('#username').val();
		let password = $('#password').val();
		localStorage.setItem('username', username);
		localStorage.setItem('password', password);
		verto.loginData(verto_params());
		verto.login();
	},

	componentDidMount: function() {
		window.addEventListener("verto-login", this.handleVertoLogin);
		window.addEventListener("verto-login-error", this.handleVertoLoginError);
	},

	componentWillUnmount: function() {
		window.removeEventListener("verto-login", this.handleVertoLogin);
		window.removeEventListener("verto-login-error", this.handleVertoLoginError);
	},

	handleVertoLogin: function(e) {
		ReactDOM.render(<Home/>, document.getElementById('body'))
	},

	handleVertoLoginError: function(e) {
		this.setState({login_err: true});
	},

	render() {
		var errmsg = this.state.login_err ? "Invalid username or password" : "";
		return <div id='loginbox'>
			<br/><T.span text={errmsg} className="danger"/>
			<h1><T.span text="Login with username and password"/></h1>
			<p><input id='username' name='username' placeholder='username'/></p>
			<p><input id='password' name='password' type='password' placeholder='password'/></p>
			<Button bsStyle="primary" onClick={this.handleClick}><T.span text={{ key:"Login"}}/></Button>
		</div>
	}
})

const Login = React.createClass({
	render() {
		return <Router history={hashHistory}>
			<Route path="/" component={LoginPage}>
				<IndexRoute component={LoginBox}/>
				<Redirect from="/logout" to="/"/>
				<Route path="/:any" component={LoginBox}/>
				<Route path="/:any/:more" component={LoginBox}/>
				<Route path="/:any/:more/:more" component={LoginBox}/>
			</Route>
		</Router>
	}
});

export { Login, LoginBox };