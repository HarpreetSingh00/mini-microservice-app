import React from 'react'

export default ({ commentList }) => {

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
