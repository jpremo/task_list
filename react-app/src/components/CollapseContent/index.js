import React, { useState } from 'react'
import './CollapseContent.css'

//This component wraps information to allow for it to be collapsible
const Collapse = ({ collapsedInit = true, largerText = false, displayStatus = true,
    status = false, title, children }) => {
    const [collapsed, setCollapsed] = useState(collapsedInit)

    return (
        <div className={'collapse-wrapper'}>
            <div className={largerText ? 'collapse-header-large' : 'collapse-header'}>
                <div onMouseUp={() => setCollapsed(!collapsed)}>
                    {collapsed &&
                        <i className="fas fa-plus collapse-button" ></i>
                    }
                    {!collapsed &&
                        <i className="fas fa-minus collapse-button"></i>

                    }
                </div>
                <h3>{title}</h3>
                {displayStatus &&
                    <div className={status ? 'circle complete' : 'circle incomplete'}></div>
                }
            </div>

            {!collapsed &&
                <>
                    {children}
                </>
            }
        </div>
    )
}

export default Collapse
