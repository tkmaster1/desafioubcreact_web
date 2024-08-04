import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Outlet } from "react-router-dom";
import 'admin-lte/dist/css/adminlte.min.css';

import AppHeader from '../components/Header';
import AppHome from '../components/Home';
import Dashboard from "../pages/Dashboard";
import Studants from "../pages/Studants";
import Form from "../pages/Form";

const Main = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={AppHome}></Route>
                <Route exact path={"/studants"} component={Studants}></Route>
                <Route exact path={"/Form"} component={Form}></Route>
            </Switch>
        </Router>
    );
}

export default Main;