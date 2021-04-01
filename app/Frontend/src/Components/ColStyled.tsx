import React from 'react'
import { Col } from 'react-grid-system'
export type Props = {
    children?: React.ReactNode;
    margin? : string;
}
export default function ColStyled({children,margin='8px'} : Props ) : JSX.Element {
    return (
        <Col style = {{margin : margin}}>
        {children}
        </Col>
    )
}
