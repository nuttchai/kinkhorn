import React from 'react'

type Props = {
    color : string;
    height? : number
}

export default function ColorLine({color, height=5}: Props ): JSX.Element {
    return (
        <hr
        style={{
            color : color,
            height: 1,
            width: '-moz-available',
            margin : '6px 16px'
        }}
    />
    )
}
