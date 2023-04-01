import React from "react"
import styled from 'styled-components'
import colors from '../Utils/variables'

const StyledFooter = styled.footer`
    width: 100%;
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
    margin: 80px 0 30px 0;
    color: white;
    text-align: center;
`

export default function Footer() {
    return (
        <StyledFooter>
            <StyledP >© 2023 Groupomania. All rights reserved</StyledP >
        </StyledFooter>
    )
}