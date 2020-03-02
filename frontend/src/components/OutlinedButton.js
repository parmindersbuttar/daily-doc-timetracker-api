import styled from 'styled-components'
import theme from "./theme";

const OutlinedButton = styled.button`
    transition: all .3s ease;
    text-transform: ${props => props.upper ? 'uppercase' : 'none'};
    color: ${theme.colors.default};
    font-size: 16px;
    padding: 13px;
    margin: 1px;
    border: 3px solid #FFFFFF;;
    border-radius: 4px;
    cursor: pointer;
    background: transparent;
    width: ${props => props.large ? '100%' : 'auto'};
    &:hover {
        opacity: .7;
    }
`;

export default OutlinedButton