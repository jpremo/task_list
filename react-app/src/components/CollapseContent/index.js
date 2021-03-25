import React, { useState } from 'react'
import './CollapseContent.css'

//This component wraps information to allow for it to be collapsible
const Collapse = ({collapsedInit=true, largerText=false, title, children}) => {
    const [collapsed, setCollapsed] = useState(collapsedInit)

    return (
        <div className={'collapse-wrapper'}>
            <div className={'collapse-header'} onClick={() => setCollapsed(!collapsed)}>
                {collapsed &&
                    <i className="fas fa-plus collapse-button"></i>
                }
                {!collapsed &&
                    <i className="fas fa-minus collapse-button"></i>

                }
                <h3 className={largerText ? 'collapse-title-large' : 'collapse-title'}>{title}</h3>
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
