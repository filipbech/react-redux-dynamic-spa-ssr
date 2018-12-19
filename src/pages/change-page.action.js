import axios from 'axios';

export const changePage = dispatch => (location, first, serverContext) => {
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
        const url = `https://dev05-store-ganni.demandware.net${location.pathname + location.search}${location.search ? '&' : '?'}format=ajax`;
        const request = axios.get(url)
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
                console.warn('error',url,  e);
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