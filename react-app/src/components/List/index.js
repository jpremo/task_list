import React, { useState } from 'react'
import Collapse from '../CollapseContent'
import Task from '../Task'
//This component wraps information to allow for it to be collapsible
const List = ({ listData }) => {
    return (
        <Collapse title={listData.title} collapsedInit={false} largerText={true} displayStatus={false}>
            {listData.tasks.map(task => {
                return(
                    <Task taskData={task} key={task.id}/>
                )
            })}
        </Collapse>
    )
}

export default List
