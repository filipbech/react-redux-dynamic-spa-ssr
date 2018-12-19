import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage } from './pages/change-page.action';

import SearchShow from './pages/SearchShow';
import Page404 from './pages/Page404';

const Pages = {
    'Search-Show': SearchShow,
    '404page': Page404
};

class GenericPageComponentBeforeWrap extends Component {

    componentDidUpdate(prevProps) {
        if (!((prevProps.location.pathname === this.props.location.pathname) && (prevProps.location.search === this.props.location.search))) {
            this.props.changePage(this.props.location);
        }
    }

    componentWillMount() {
        this.props.changePage(this.props.location, true, this.props.staticContext);
    }

    render() {
        return (
            <div className={this.props && this.props.loading ? 'loading' : ''}>
                {(this.props && this.props.page) ?
                    (() => {
                        const Page = Pages[this.props.page.action];
                        if (Page) {
                            return (
                                <Page page={this.props.page}></Page>
                            );
                        }
                    })()
                    : <div>SSR doesnt work or in dev-mode!</div>
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