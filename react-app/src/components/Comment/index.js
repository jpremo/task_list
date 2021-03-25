import React, { useState } from 'react'

//This component wraps information to allow for it to be collapsible
const Comment = ({ commentData }) => {
    return (
        <div>{commentData.body}</div>
    )
}

export default Comment
