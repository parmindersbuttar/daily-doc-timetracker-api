import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useStateValue } from '../state';
import { logout } from '../state/auth/actions';
import history from '../utils/history';

import Button from './button'

const Nav = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;    
  position: ${props => props.fixed ? 'fixed' : 'relative'};
  z-index: 99
`;

const Right = styled.nav`
  flex: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  color: #000;
  font-size: 35px;
`;
const Menu = styled.ul`
  list-style: none;
  display: flex;
`;

const MenuItem = styled.li`
  display: inline-block;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  border-bottom: ${props => props.active ? '4px solid #4BBAFB;' : 0};
  color: ${props => props.active ? '#4BBAFB' : '#7E8594'};
  padding: 5px 10px;
  &:hover {
    color: #4BBAFB;
  }
`;

const Header = (props) => {
  const [{ auth }, dispatch] = useStateValue();
  const { pathname } = history.location

  const handleLogout = async () => {
    await dispatch(logout())
  }
  console.log(pathname)

  return (
    <Nav>
      <Title>DailyDoc</Title>
      <Right>
        <Menu>
          <MenuItem>
            <StyledLink to="/" active={pathname === '/'}>Home</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/features" active={pathname === '/features'}>Features</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/sign-in">Sign In</StyledLink>
          </MenuItem>
        </Menu>
        <Button color="primary" onClick={() => { }}>Try for Free</Button>
         {
        //   auth.logged && <Button gradient onClick={() => handleLogout()}>Logout</Button>
        }
      </Right>
    </Nav>
  )
}


export default Header