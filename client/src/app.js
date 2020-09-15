import React from 'react'
import PostCreate from './PostCreate.js'

import 'bootstrap/dist/css/bootstrap.min.css';

export default () => {

    return (
        <div className="container">
            <h2>Create Post</h2>
            <PostCreate />
        </div>
    )
}