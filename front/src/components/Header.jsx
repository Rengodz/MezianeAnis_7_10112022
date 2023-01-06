import React from "react"
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom"
import colors from '../Utils/variables'

const StyledHeader = styled.header`
	display: flex;
	max-width: 1240px;
	margin: auto;
	padding: 40px 20px 40px 20px;
	flex-direction: row;
	align-items: center;
	height: 68px;
	justify-content: space-between;
`

const StyledLink = styled(Link)`
	display: inline-block;
	font-family: 'Montserrat', sans-serif;
	font-weight: 500;
	font-size: 24px;
	padding-left: 50px;
	text-decoration: none;
	color: ${colors.primary};	
`


export default function Header() {
	const location = useLocation()
    return (
        <StyledHeader>
            <nav>
                <StyledLink style={ location.pathname === '/' ? {textDecoration: 'none'}: {textDecoration: 'none'}} to="/">Accueil</StyledLink>
                <StyledLink style={ location.pathname === '/about' ? {textDecoration: 'none'}: {textDecoration: 'none'}} to="/about">A Propos</StyledLink>
            </nav>
        </StyledHeader>
    )
}