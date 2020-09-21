import React from 'react'

export default ({ commentList }) => {

    return (
        <div className="comments-list">
            {
                commentList && !!commentList.length &&
                <ul className="comment-list-cards">
                    {
                        commentList.map(comment => {
                            let comentStatus
                            if (comment.status === 'pending') {
                                comentStatus = 'Your comment is under review !'
                            } else if (comment.status === 'rejected') {
                                comentStatus = 'Your comment has been rejected'
                            } else {
                                comentStatus = comment.content
                            }
                            return <li key={comment.id} className="">{comentStatus}</li>
                        })
                    }
                </ul>
            }
        </div>
    )
}
