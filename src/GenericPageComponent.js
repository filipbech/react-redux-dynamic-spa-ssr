import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import axios from 'axios';

import RootPage from './pages/PageDefault';
import BasePage from './pages/PageAnother';
import Page404 from './pages/Page404';

const Pages = {
    'rootPage': RootPage,
    'basePage': BasePage,
    '404page': Page404
};

//TODO: put some helmet stuff inhere
class GenericPageComponentBeforeWrap extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.changePage(this.props.location.pathname);
        }
    }

    componentWillMount() {
        if(this.props.staticContext) {
            // on the server
            return this.props.staticContext.pageInfo = new Promise(resolve => {
                this.props.changePage(this.props.location.pathname, true, resolve, this.props.staticContext);
            });
        }        
        this.props.changePage(this.props.location.pathname, true);
    }

    render() {
        return (
            <div className={this.props && this.props.loading ? 'loading' : ''}>
                <h1>Home {this.props.location.pathname}</h1>
                {(this.props && this.props.page) ?
                    (() => {
                        const Page = Pages[this.props.page.Template];
                        if (Page) {
                            return (
                                <div>
                                    <Helmet>
                                        <title>{this.props.page.Name}</title>
                                    </Helmet>
                                    <Page page={this.props.page}></Page>
                                </div>
                            );
                        }
                    })()
                    : <div>loading... <br/>(should never happen in prod in browser because SSR!)</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        page: state.routing.page,
        loading: state.routing.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePage: (url, first, resolve, context) => {

            dispatch({
                type: 'PAGE_REQUESTED'
            });

            return dispatch((doDispatch, getState) => {
                if(first && resolve === undefined && getState().routing.page) {
                    // its the first view, in the browser and we already have the page in state
                    return dispatch({
                        type: 'PAGE_RESPONDED',
                        payload: getState().routing.page
                    })
                }

                axios.get(`https://umbraco-connector.herokuapp.com/api/page/url?url=${url}`).then(pageinfo => {
                    dispatch({
                        type: 'PAGE_RESPONDED',
                        payload: pageinfo.data
                    });

                    //let the server know the data is ready
                    if(typeof resolve === 'function') {
                        resolve();
                    }
                }).catch(e => {
                    console.warn(e);
                    if(context) {
                        context.is404 = true;   
                    }                 
                    dispatch({
                        type: 'PAGE_RESPONDED',
                        payload: { Template: '404page', Name: '404' }
                    })
                });

            });
        }
    }
}


export const GenericPageComponent = connect(mapStateToProps, mapDispatchToProps)(GenericPageComponentBeforeWrap);