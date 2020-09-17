import React from 'react'
import PostCreate from './PostCreate.js'
import PostList from './PostList.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

export default () => {

    return (
        <div className="container">
            <h2>Create Post</h2>
            <PostCreate />
            <hr />
            <h2>Posts</h2>
            <PostList />
        </div>
    )
}