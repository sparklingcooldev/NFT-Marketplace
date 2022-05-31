import { Box } from "@material-ui/core";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import PurpleButton from "../components/Button/PurpleButton";
import { useEffect, useState, useCallback } from 'react'
import { setNotification, updateUser } from "../redux/actions/UserAction";
import web3connect from '../utils/web3connect';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { getFileBuffer } from "../utils";
import { create } from 'ipfs-http-client';

const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const Login = ({ user, setNotification, updateUser }) => {

    const [username, setUsername] = useState(user?.username);
    const [bio, setBIO] = useState(user?.bio);
    const [email, setEmail] = useState(user?.email);
    const [site, setSite] = useState(user?.site);
    const [twitter, setTwitter] = useState(user?.twitter);
    const [instagram, setInstagram] = useState(user?.instagram);
    const [avatar, setAvatar] = useState(user?.avatar);
    const [fileUrl, setFileUrl] = useState(user?.avatar);
    const [curimg, setCurImg] = useState(null);
    const [file, setFile] = useState();

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setBIO(user.bio);
            setEmail(user.email);
            setSite(user.site);
            setTwitter(user.twitter);
            setInstagram(user.instagram);
            setAvatar(user.avatar);
            setFileUrl(user.avatar);
        }
    }, [user])
    const dropHandler = useCallback(
        async (acceptedFiles) => {
            console.log(acceptedFiles);
            const [File] = acceptedFiles;
            const fileName = File.name;
            // setValue('media', File);
            console.log(URL.createObjectURL(File));
            setFile(File);
            // setValue('token_name', fileName);
            fetchUploadImage(File);
        },
        [],
    );

    async function fetchUploadImage(file) {
        const buffer = await getFileBuffer(file);
        let added = await client.add(buffer)
        const fileUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
        setFileUrl(fileUrl);
        setAvatar(fileUrl);
    }
    const onUpdate = async () => {
        if (!username.length) {
            setNotification({
                title: 'Failed',
                detail: 'Please Input Correct Username',
                type: 'error',
            })
            return;
        }
        if (!email.length || !email.includes('@')) {
            setNotification({
                title: 'Failed',
                detail: 'Please Input Correct Email',
                type: 'error',
            })
            return;
        }

        updateUser(user._id, username, bio, email, site, twitter, instagram, fileUrl);
    }
    return (
        <StyledContainer>
            <section className="bg-mint bg-center bg-cover bg-no-repeat">
                <h1 className="px-5 py-40 text-5xl font-bold text-white">
                    Profile
                </h1>
            </section>
            <InputPanel>
                <Box width={'60%'}>
                    <Box fontWeight={'bold'} fontSize={'20px'}>
                        Username*
                    </Box>
                    <StyledInput placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <Box mt = {'30px'} fontWeight={'bold'} fontSize={'20px'}>
                        BIO
                    </Box>
                    <StyledInput placeholder="Tell the world who you are" value={bio} onChange={(e) => setBIO(e.target.value)} />
                    <Box mt = {'30px'} fontWeight={'bold'} fontSize={'20px'}>
                        Email Address*
                    </Box>
                    <StyledInput placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Box mt = {'30px'} fontWeight={'bold'} fontSize={'20px'}>
                        Your Site
                    </Box>
                    <StyledInput placeholder="Enter Website URL" value={site} onChange={(e) => setSite(e.target.value)} />
                    <Box mt = {'30px'} fontWeight={'bold'} fontSize={'20px'}>
                        Twitter username
                    </Box>
                    <StyledInput placeholder="Enter Twitter username" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                    <Box mt = {'30px'} fontWeight={'bold'} fontSize={'20px'}>
                        Instagram username
                    </Box>
                    <StyledInput placeholder="Enter Instagram username" value={instagram} onChange={(e) => setInstagram(e.target.value)} />

                    <button className="mt-10 py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                        onClick={() => onUpdate()}
                    >
                        Update Profile
                    </button>
                </Box>
                <Box width={'30%'} mt={'50px'}>
                    <Box fontWeight={'bold'} fontSize={'21px'} mb={'20px'}>Profile Image</Box>
                    <Dropzone
                        maxFiles={1}
                        accept={[
                            'image/png',
                            'image/jpeg',
                            'image/gif',
                            'video/mp4',
                            'video/quicktime',
                            'audio/mpeg',
                            'audio/wav',
                            'audio/mp3',
                        ]}
                        onDrop={acceptedFiles => dropHandler(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                            <StyledDropZone {...getRootProps()}>
                                <input {...getInputProps()} />

                                {avatar ? <img src={avatar} width='100%' height='100%' alt={avatar} /> :
                                    <Box mx={'10px'} textAlign={'center'}>
                                        <Box fontSize='20px' color='white' fontWeight={600} mt='48px' >
                                            JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                                        </Box>

                                        <Box fontSize='12px' color='white' fontWeight={600} mt='28px'>Drag and Drop File </Box>
                                        <Box fontSize='12px' color='white' mt='4px' >
                                            or
                                            <span style={{ fontWeight: 600, marginLeft: '4px' }}>browse media on your device</span>
                                        </Box>
                                    </Box>
                                }
                            </StyledDropZone>
                        )}
                    </Dropzone>
                </Box>
            </InputPanel>
        </StyledContainer >
    );
}

const StyledDropZone = styled(Box)`
    cursor: pointer;
    background: #2d2e36;
    /* White */
    border: 1px dashed #ffffff;
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width : 250px;
    height : 250px;
    overflow : hidden;
    >img{
        width : 100%;
        height : 100%;
    }
`;

const InputPanel = styled(Box)`
    max-width : 700px;
    margin : 0 auto;
    padding : 50px 0;
    display : flex;
    text-align : left;
    font-size : 18px;
    justify-content : space-between;
`;

const StyledContainer = styled(Box)`
    min-height : 100vh;
    background-color : #1A1A25;
    color : white;
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
    width : 100%;
`;

export default connect(null, { setNotification, updateUser })(Login);