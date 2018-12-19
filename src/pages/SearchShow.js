import React from 'react';
import { Helmet } from 'react-helmet';

export default (props) => {
    return (
        <div>
            <Helmet>
                <title>{props.page.productSearch.category.name}</title>
            </Helmet>
            <h1>{props.page.productSearch.category.name}</h1>
            <p>This page has {props.page.productSearch.products.length} products...</p>
        </div>
    );
}