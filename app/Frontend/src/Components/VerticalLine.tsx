import React from 'react'

export type Props = {
    children?: React.ReactNode;
    height : string;
    color? : string;
}

export default function VerticalLine({children,height,color} : Props ) : JSX.Element {
    return (
        <div style = {{height : height, borderLeft : '4px solid '+color, marginLeft : '10px'}}></div>
    )
}
