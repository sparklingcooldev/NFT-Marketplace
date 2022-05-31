import { Box } from "@material-ui/core";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../../redux/actions/AuthAction";
import web3connect from '../../utils/web3connect';
import PurpleButton from "../../components/Button/PurpleButton";


const Register = ({ register, setAddress, address }) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [email, setEmail] = useState('');

    const [pending, setPending] = useState(true);

    useEffect(() => {
        if (!address) {
            setPending(true);
            return;
        }
        if (!email.length || !email.includes('@') || !username.length || !password.length) {
            setPending(true);
            return;
        }
        if (password !== repassword) {
            setPending(true);
            return;
        }
        setPending(false);
    }, [username, password, repassword, email, address])

    const onRegister = () => {
        register(username, email, password, address);
    }

    const onConnect = async () => {
        setAddress(await web3connect())
    }
    return (
        <StyledContainer>
            <section className="bg-mint bg-center bg-cover bg-no-repeat">
                <h1 className="px-5 py-40 text-5xl font-bold text-white">
                    Sign Up
                </h1>
            </section>
            <Box maxWidth={'620px'} mx={'auto'} mt={'50px'} display={'flex'} flexDirection={'column'}>
                <Box color={'white'} fontSize={'24px'} textAlign={'center'} mb={'10px'} fontWeight={600}>
                    Don't have an account? Register now or login <Link to={'/login'} style={{ color: 'tomato' }}>here.</Link>
                </Box>
                {address ? <Box color={'white'} fontSize={'18px'} textAlign={'center'} mb={'10px'} fontWeight={600}>
                    Account : {address}
                </Box> : ''}
                <Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}>
                    <StyledInput
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder={'username'}
                    />
                    <StyledInput
                        type={'email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'email'}
                    />
                </Box>

                <Box display={'flex'} justifyContent={'space-between'} flexWrap={'wrap'}>
                    <StyledInput
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'password'}
                    />
                    <StyledInput
                        type={'password'}
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder={'re-password'}
                    />
                </Box>
                <Box display={'flex'} width={'fit-content'} mx={'auto'} mt={'20px'} mb={'40px'}>
                    <Box>
                        {!address ? <PurpleButton onClick={() => onConnect()}>
                            Connect Wallet
                        </PurpleButton> : ''}
                    </Box>
                    <Box mr={'20px'} />
                    <Box>
                        <PurpleButton onClick={() => onRegister()} disabled={pending}>
                            Register Now
                        </PurpleButton>
                    </Box>
                </Box>
            </Box>
        </StyledContainer >
    );
}

const StyledContainer = styled(Box)`
    min-height : 100vh;
    background-color : #1A1A25;
`;

const StyledInput = styled.input`
    margin : 0 auto;
    min-width : 300px;
    margin-top : 10px;
    color : white;
    :focus-visible{
        outline : none;
    }
    background-color : transparent;
    border : 1px solid rgb(150,150,150);
    font-size : 18px;
    padding : 8px 15px;
    border-radius : 5px;
`;

export default connect(null, Actions)(Register)