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

        const request = axios.get(`https://umbraco-connector.herokuapp.com/api/page/url?url=${url}`)
            .then(pageinfo => {
                dispatch({
                    type: 'PAGE_RESPONDED',
                    payload: pageinfo.data
                });
                return 200;
            }).catch(e => {   
                dispatch({
                    type: 'PAGE_RESPONDED',
                    payload: { Template: '404page', Name: '404' }
                });
                // todo: send the right error - not always 404
                return 404;
            });

        // if we are on the server, attach the request-promise to context, 
        // so SSR waits for ext. server-response before renderToString
        if (serverContext) {
            serverContext.pageInfo = request.then(status => {
                if(status === 404) {
                    serverContext.is404 = true; 
                }
            });
        }
    });
}