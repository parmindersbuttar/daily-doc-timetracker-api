import { createGlobalStyle  } from 'styled-components'
import reset from 'styled-reset'

const BaseStyles = createGlobalStyle`
    ${reset}
    body { margin: 0, padding: 0 };
    html { font-family: 'Montserrat', sans-serif; }
    * { box-sizing: border-box; outline: none };
    a {
        text-decoration: none;
        color: #7E8594
    }
`;

export default BaseStyles