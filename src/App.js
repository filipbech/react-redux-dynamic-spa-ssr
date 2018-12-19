import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';


import { GenericPageComponent } from './GenericPageComponent'

import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <HeaderComponent></HeaderComponent>

                <Route path="*" component={GenericPageComponent} />             

                <FooterComponent></FooterComponent>
            </div>
        );
    }
}

export default withRouter(
    connect()(App)
);
