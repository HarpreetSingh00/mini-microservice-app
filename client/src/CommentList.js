import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ postId }) => {

    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
            if (!!res && !!res.status) {
                const { data } = res
                setCommentList(Object.values(data))
            }
        } catch (e) {
            console.log('Something went wrong while fetching the posts!')
        }
    }

    return (
        <div className="comments-list">
            {
                commentList && !!commentList.length &&
                <ul className="comment-list-cards">
                    {
                        commentList.map(comment => (
                            <li key={comment.id} className="">{comment.content}</li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}
