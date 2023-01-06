import React from "react"
import styled from 'styled-components'
import colors from '../Utils/variables'

const StyledFooter = styled.footer`
    width: 100%;
    height : 200px;
    margin: auto;
    margin-top: 50px;
    bottom: 0;
    background-color: ${colors.secondary};
`

const StyledP = styled.p`
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 22px;
    margin: 20px 0 30px 0;
    color: white;
`

export default function Footer() {
    return (
        <StyledFooter>
            <StyledP >© 2020 Groupomania. All rights reserved</StyledP >
        </StyledFooter>
    )
}