import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class HeaderComponentBeforeWrap extends Component {

    componentWillMount() {
        if (this.props.navigation && Object.keys(this.props.navigation).length > 0) {
            return;
        }
        this.props.getData();
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        {
                            (this.props.navigation && this.props.navigation.pages) &&
                            this.props.navigation.pages.map(page => 
                                <li key={page.url}>
                                    <NavLink to={page.url}>{page.displayName}</NavLink>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        navigation: state.navigation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => {
            dispatch((_, getState) => {
                //todo: we should probably add this to the list of promises to wait for...
                axios.get('https://dev05-store-ganni.demandware.net/on/demandware.store/Sites-ganni-Site/en/ReactApp-Nav?format=ajax').then(navigationInfo => {
                    dispatch({
                        type: 'NAVIGATION_RESPONDED',
                        payload: navigationInfo.data
                    });
                });
            });
        }
    }
}

export const HeaderComponent = connect(mapStateToProps, mapDispatchToProps)(HeaderComponentBeforeWrap);