import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FooterComponentBeforeWrap extends Component {

    componentWillMount() {
        if (this.props.settings && Object.keys(this.props.settings).length > 0) {
            return;
        }
        this.props.getData();
    }

    render() {
        return (
            <footer>
                This is the footer - from labels: {this.props.settings.action}      
            </footer>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => {
            dispatch(() => {
                //todo: we should probably add this to the list of promises to wait for...
                axios.get('https://dev05-store-ganni.demandware.net/on/demandware.store/Sites-ganni-Site/en/ReactApp-Labels?format=ajax').then(settingsInfo => {
                    dispatch({
                        type: 'SETTINGS_RESPONDED',
                        payload: settingsInfo.data
                    });
                });
            });
        }
    }
}

export const FooterComponent = connect(mapStateToProps, mapDispatchToProps)(FooterComponentBeforeWrap);