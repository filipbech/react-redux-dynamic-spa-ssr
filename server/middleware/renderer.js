import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';

// import our main App component
import App from '../../src/App';

// import the manifest generated with the create-react-app build
import manifest from '../../build/asset-manifest.json';
// function to extract js assets from the manifest
const extractAssets = (assets, chunks) => Object.keys(assets)
    .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
    .map(k => assets[k]);


const path = require("path");
const fs = require("fs");


export default (store) => (req, res, next) => {
    // get the html file created with the create-react-app build
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end()
        }

        const modules = [];
        const routerContext = {};

        const bundle = (
            <ReduxProvider store={store}>
                <StaticRouter location={req.originalUrl} context={routerContext}>
                    <App />
                </StaticRouter>
            </ReduxProvider>
        );

        //start the app
        ReactDOMServer.renderToString(bundle);

        const dataPromise = Promise.all([...Object.values(routerContext)]);

        //when all the data is ready (or timeout at 3000ms)
        Promise.race([dataPromise, new Promise(res => setTimeout(res, 3000))]).then(_=> {
            // render the app as a string
            const html = ReactDOMServer.renderToString(bundle);

            // get the stringified state
            const reduxState = JSON.stringify(store.getState());

            // map required assets to script tags
            const extraChunks = extractAssets(manifest, modules)
                .map(c => `<script type="text/javascript" src="/${c}"></script>`);

            // get HTML headers
            const helmet = Helmet.renderStatic();

            if(routerContext.is404) {
                res.status(404);
            }

            // now inject the rendered app into our html and send it to the client
            res.send(
                htmlData
                    // write the React app
                    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
                    // write the string version of our state
                    .replace('__REDUX_STATE__={}', `__REDUX_STATE__=${reduxState}`)
                    // append the extra js assets
                    .replace('</body>', extraChunks.join('') + '</body>')
                    // write the HTML header tags
                    .replace('<title></title>', helmet.title.toString() + helmet.meta.toString())
            );

        });

    });
}
