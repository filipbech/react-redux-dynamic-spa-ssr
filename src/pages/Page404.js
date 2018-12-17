import React from 'react';

export default (state) => {
    //TODO: should set response-type:404 on server
    return (
        <div>
            <h1 style={{color:'red'}}>{state.page.Name}</h1>
            <p>This is for another page.</p>
        </div>
    );
}
