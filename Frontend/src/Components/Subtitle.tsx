import React from 'react'

export type Props = {
    children?: React.ReactNode;
    font? : string;
}

export default function Subtitle({children,font = '14px'} : Props ) : JSX.Element {
    return (
        <div style = {{color : '#878787', fontSize : font}}>
        {children}
        </div>
    )
}
