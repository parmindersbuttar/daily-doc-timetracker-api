import styled from 'styled-components';
import theme from "../theme";

const Input = styled.input`
  margin: 10px 5px;
  border-radius: 3px;
  border: ${props => props.error ? `1px solid ${theme.forms.errorColor}` : '1px solid #e6e6e6'};
  color: ${props => props.error ? theme.forms.errorColor : '#A6AFB6'};
  box-sizing: border-box;
  width: 100%;
  background: none;
  background-color: #FFFFFF !important;
  box-shadow: 0px 14px 21px #DCE5EE, 0px 0px 9px rgba(152, 180, 197, 0.19788);
  padding: 15px;
`;

export default Input