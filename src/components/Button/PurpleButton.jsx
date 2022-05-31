import { Box } from "@material-ui/core";
import styled from 'styled-components'

const PurpleButton = ({ onClick, children, disabled }) => {

    return (

        <StyledButton
            className="py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
            onClick={() => onClick()}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    :disabled{
        cursor : not-allowed;
        box-shadow : none;
        background: #67398f;
        color : rgb(200,200,200);
    }
    width : 100%;
`;

export default PurpleButton