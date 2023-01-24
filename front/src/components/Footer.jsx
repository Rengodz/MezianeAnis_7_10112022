import React from "react"
import styled from 'styled-components'
import colors from '../Utils/variables'

const StyledFooter = styled.footer`
    width: 1200px;
    max-width: calc(100% - 20px);
    margin: 0 auto;
    padding: 0 10px;
    height : 200px;
    margin-top: 50px;
    bottom: 0;
    background-color: #4E5166;
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