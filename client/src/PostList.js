import React, { useEffect, useState } from 'react'
import axios from 'axios'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default () => {

    const [postList, setPostList] = useState([])

    useEffect(() => {
        fetchPostList()
    }, [])

    const fetchPostList = async () => {
        try {
            const res = await axios.get('http://localhost:4002/posts')
            if (!!res && !!res.status) {
                const { data } = res
                setPostList(Object.values(data))
            }
        } catch (e) {
            console.log('Something went wrong while fetching the posts!')
        }
    }

    return (
        postList && !!postList.length ?
            <div className="post-list-cards d-flex flex-wrap">
                {
                    postList.map(post => (
                        <div key={post.id} className="card">
                            <div className="card-body">
                                <h3>{post.postTitle}</h3>
                                <CommentList commentList={post.comments} />
                                <CommentCreate postId={post.id} />
                            </div>
                        </div>
                    ))
                }
            </div>
            :
            <p>Currently there are no posts</p>
    )
}