import React from 'react';
import ReactDOM from 'react-dom';
import LikeButton from './LikeButton';

const Client = () => {
    return (
        <React.StrictMode>
            <LikeButton />
        </React.StrictMode>
    );
};

ReactDOM.render(<Client />, document.getElementById('root'));

export default Client;
