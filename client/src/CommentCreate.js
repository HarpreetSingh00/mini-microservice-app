import React, { useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {

    const [content, setContent] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`,
                { content },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

            setContent('')
        } catch (e) {
            console.log('Error while commenting', e)
        }
    }

    return (
        <div className="" >
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Post Comment</button>
            </form>
        </div>
    )
}