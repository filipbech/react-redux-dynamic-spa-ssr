import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { changePage } from './pages/change-page.action';

import RootPage from './pages/PageDefault';
import BasePage from './pages/PageAnother';
import Page404 from './pages/Page404';

const Pages = {
    'rootPage': RootPage,
    'basePage': BasePage,
    '404page': Page404
};

class GenericPageComponentBeforeWrap extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.changePage(this.props.location.pathname);
        }
    }

    componentWillMount() {
        this.props.changePage(this.props.location.pathname, true, this.props.staticContext);
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
                    : <div>SSR doesn't work or in dev-mode!</div>
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
        changePage: changePage(dispatch)
    }
}

export const GenericPageComponent = connect(mapStateToProps, mapDispatchToProps)(GenericPageComponentBeforeWrap);