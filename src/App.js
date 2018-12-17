import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';

import { GenericPageComponent } from './GenericPageComponent'

import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header>HEADER...</header>
               
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/en/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/da/om-fisk/">Om fisk</NavLink>
                        </li>
                        <li>
                            <NavLink to="/da/om-fisk/laksen">Laksen</NavLink>
                        </li>
                        <li>
                            <NavLink to="/da/kontakt/">Kontakt</NavLink>
                        </li>
                    </ul>
                </nav>

                <Route path="*" component={GenericPageComponent} />             
          
                <footer>FOOTER!</footer>
            </div>
        );
    }
}

export default withRouter(
    connect()(App)
);
