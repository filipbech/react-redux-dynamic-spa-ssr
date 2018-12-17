import axios from 'axios';

export const changePage = dispatch => (url, first, serverContext) => {
    dispatch({
        type: 'PAGE_REQUESTED'
    });

    return dispatch((doDispatch, getState) => {
        if (first && serverContext === undefined && getState().routing.page) {
            // if we already have the data (from SSR) just use that for first page
            return dispatch({
                type: 'PAGE_RESPONDED',
                payload: getState().routing.page
            })
        }

        // if we are on the server, attach a promise to context, 
        // so SSR waits for ext. server-response before renderToString
        let resolve;
        if(serverContext) {
            serverContext.pageInfo = new Promise(res => {
                resolve = res;
            });
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
            if(serverContext) {
                serverContext.is404 = true;   
            }                 
            dispatch({
                type: 'PAGE_RESPONDED',
                payload: { Template: '404page', Name: '404' }
            })
        });

    });
}