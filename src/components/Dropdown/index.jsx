import { Box } from "@material-ui/core";
import styled from 'styled-components'

const PurpleButton = ({  children }) => {

    return (
        <StyledContainer>
            {children}
        </StyledContainer>
        
    );
}

const StyledContainer = styled(Box)`
    position : absolute;
    
`;

export default PurpleButton