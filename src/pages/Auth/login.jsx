import { Box } from "@material-ui/core";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import PurpleButton from "../../components/Button/PurpleButton";
import { useEffect, useState, useCallback } from 'react'
import * as Actions from "../../redux/actions/AuthAction";
import web3connect from '../../utils/web3connect';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = ({ address, setAddress, login, refresh, logout }) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onLogin = () => {
        login(username, password, address);
    }

    const onConnect = async () => {
        setAddress(await web3connect())
    }

    const profile = useCallback(() => navigate('/profile', { replace: true }), [navigate]);

    const checkAddress = async (_address) => {
        try {
            if (_address === 'null')
                return;
            if (address === _address) {
                profile();
            }
            else {
                logout();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    console.log(address);
    useEffect(() => {
        const _id = localStorage.getItem('account');
        if (_id !== 'null') {
            checkAddress(_id)
        }
    }, [refresh])

    return (
        <StyledContainer>
            <section className="bg-mint bg-center bg-cover bg-no-repeat">
                <h1 className="px-5 py-40 text-5xl font-bold text-white">
                    Sign In
                </h1>
            </section>
            <Box maxWidth={'320px'} mx={'auto'} mt={'50px'} display={'flex'} flexDirection={'column'}>
                <Box color={'rgb(200,200,200)'} fontSize={'21px'} textAlign={'left'} mb={'10px'}>
                    Login using an existing account or create a new account <Link to={'/register'} style={{ color: 'tomato' }}>here.</Link>
                </Box>
                {address ? <Box color={'rgb(200,200,200)'} fontSize={'14px'} textAlign={'center'} mb={'10px'} fontWeight={600}>
                    Account : {address}
                </Box> : ''}
                <StyledInput value={username} onChange={(e) => setUserName(e.target.value)} placeholder={'username'} />
                <StyledInput
                    type={'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'password'}
                />
                <Box mt={'20px'}>
                    {!address ? <PurpleButton onClick={() => onConnect()}>
                        Connect Wallet
                    </PurpleButton> : ''}
                </Box>
                <Box mt={'10px'} mb={'20px'}>
                    <PurpleButton onClick={() => onLogin()}>
                        Submit
                    </PurpleButton>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} fontSize={'18px'} color={'white'} mb={'30px'}>
                    <Box>Login with :</Box>
                    <Box color={'tomato'} style={{ cursor: 'pointer' }}>Facebook</Box>
                    <Box color={'tomato'} style={{ cursor: 'pointer' }}>Google</Box>
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

const fromStore = (store) => {
    return {
        refresh: store.NotificationReducer.refresh,
    }
}
export default connect(fromStore, Actions)(Login)