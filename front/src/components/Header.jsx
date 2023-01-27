import React from "react"
import styled from 'styled-components'
import { Link, useLocation } from "react-router-dom"
import colors from '../Utils/variables'


const logo = require('./logo.png');
const userIcon = require('./user.png');
const homeIcon = require('./home.png');
const logoutIcon = require('./logout.png');




const StyledHeader = styled.header`
	display: flex;
	width: 100%;
	margin: auto;
	margin-bottom: 50px;
	padding: 40px 20px 40px 20px;
	flex-direction: row;
	align-items: center;
	height: 68px;
	justify-content: space-between;
	background-color: #4E5166;
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
			<img src={logo} />
			<br/>
            <nav>
                <StyledLink style={ location.pathname === '/' ? {textDecoration: 'none'}: {textDecoration: 'none'}} to="/">Accueil<img className='homeicn' src={homeIcon} /></StyledLink>
				<StyledLink style={ location.pathname === '/profile' ? {textDecoration: 'none'}: {textDecoration: 'none'}} to="/profile">Profil<img className='usericn' src={userIcon} /></StyledLink>
				<StyledLink style={ location.pathname === '/logout' ? {textDecoration: 'none'}: {textDecoration: 'none'}} to="/logout">Se deconnecter<img className='logicn' src={logoutIcon} /></StyledLink>
            </nav>
        </StyledHeader>
    )
}