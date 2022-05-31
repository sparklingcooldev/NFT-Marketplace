import { Box } from "@material-ui/core";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import PurpleButton from "../components/Button/PurpleButton";
import { useEffect, useState, useCallback } from 'react'
import { setNotification, updateUser } from "../redux/actions/UserAction";
import { createMedia } from "../redux/actions/MediaAction";
import web3connect from '../utils/web3connect';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { getFileBuffer, getTokenId } from "../utils";
import { create } from 'ipfs-http-client';
import { ethers } from "ethers";

import MediaABI from '../services/abis/Media.json';
import { MEDIA_ADDRESS, KET_ADDRESS, CHAIN_IDS } from '../config';
import axios from "axios";
import CryptoJS from 'crypto-js'
import Buffer from 'buffer'

const client = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const instance = axios.create({ baseURL: 'http://localhost:4000' })
const Create = ({ user, createMedia, chainId, setNotification }) => {

    const currency = { 97: 'BNB', 4: 'ETH', 80001: 'MATIC', 43113: 'AVAX' };
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');

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
    }

    const onCreate = async () => {
        console.log(chainId);
        if (!CHAIN_IDS.includes(Number(chainId))) {
            setNotification({ title: 'Failed', detail: "Incorrect network", type: 'error' });
            return;
        }
        if (!file || !price || !title.length || !description.length) {
            setNotification({ title: 'Failed', detail: "Input Correct Info", type: 'error' });
            return;
        }
        try {
            const metadataJSON = JSON.stringify({
                description: description ? description : '',
                mimeType: file.type,
                title,
                price
            });

            const buffer = await getFileBuffer(file);
            const _contentHash = CryptoJS.SHA256(Buffer.Buffer.from(buffer).toString());
            const contentHash = '0x' + _contentHash.toString(CryptoJS.enc.Hex, 16)
            const _metadataHash = CryptoJS.SHA256(metadataJSON)
            const metadataHash = '0x' + _metadataHash.toString(CryptoJS.enc.Hex, 16)
            let added = await client.add(metadataJSON);
            const metadataUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
            // Construct mediaData object
            const mediaData = {
                tokenURI: fileUrl,
                metadataURI: metadataUrl,
                contentHash,
                metadataHash,
            };

            const shares = {
                creator: { value: ethers.utils.parseEther(Number(0).toFixed(4)) }, // Creator share
                owner: { value: ethers.utils.parseEther(Number(100 - parseFloat(0)).toFixed(4)) }, // Owner share
                prevOwner: { value: ethers.utils.parseEther(Number(parseFloat(0)).toFixed(4)) }, // Previous owner share
            };

            // Make transaction
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const signer = provider.getSigner();

            const mediaContract = new ethers.Contract(MEDIA_ADDRESS[chainId], MediaABI, signer);
            console.log(ethers.utils.parseEther(price), mediaData, shares);
            let transaction = await mediaContract.mint(mediaData, shares, { amount: ethers.utils.parseEther(price), currency: KET_ADDRESS[chainId] });
            transaction = await transaction.wait();
            console.log(transaction);

            let tokenId = getTokenId(transaction);
            console.log(tokenId);
            createMedia(
                {
                    title,
                    description,
                    price: parseFloat(price),
                    media_url: fileUrl,
                    metadata_url: metadataUrl,
                    mimeType: file.type,
                    creator: user._id,
                    contentHash,
                    metadataHash,
                    tokenId,
                    chainId
                },
            );
        }
        catch (error) {
            setNotification({ title: 'Failed', detail: error.data.message, type: 'error' });
            console.log(error.data.message);
        }
    }
    return (
        <StyledContainer>
            <section className="bg-mint bg-center bg-cover bg-no-repeat">
                <h1 className="px-5 py-40 text-5xl font-bold text-white">
                    Create NFT
                </h1>
            </section>
            <InputPanel>
                <Box width={'70%'}>
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
                                <Box mx={'10px'} textAlign={'center'}>
                                    <Box fontSize='20px' color='white' fontWeight={600} >
                                        JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                                    </Box>

                                    <button className="mt-5 py-2 px-12 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white">
                                        Browse
                                    </button>
                                </Box>

                            </StyledDropZone>
                        )}
                    </Dropzone>
                    <Box mt={'25px'} fontWeight={'bold'} fontSize={'20px'}>
                        Price
                    </Box>
                    <StyledInput placeholder="Enter price for one item" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <Box mt={'25px'} fontWeight={'bold'} fontSize={'20px'}>
                        Title
                    </Box>
                    <StyledInput placeholder="e.g.Crypto Funk" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Box mt={'25px'} fontWeight={'bold'} fontSize={'20px'}>
                        Description
                    </Box>
                    <StyledInput placeholder="e.g.'This is very limited item'" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <button className="mt-10 py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                        onClick={() => onCreate()}
                    >
                        Create Item
                    </button>
                </Box>
                <Box width={'25%'} mt={'50px'}>
                    <Preview>
                        <img src={fileUrl} width='100%' height='100%' alt={fileUrl} />
                        <Box fontSize={'21px'} mt={'10px'}>{title}</Box>
                        <Box color={'rgb(150,150,150)'} fontSize={'18px'} mt={'10px'}>{price} {currency[chainId]}</Box>
                    </Preview>
                </Box>
            </InputPanel>
        </StyledContainer >
    );
}
const Preview = styled(Box)`
    padding : 20px;
    border-radius : 10px;
    background : rgba(255, 255, 255, .025);
    box-shadow : 0px 0px 8px 0px rgb(0 0 0 / 30%);
    min-height : 200px;
    >img{
        border-radius : 20px;
    }
`;
const StyledDropZone = styled(Box)`
    cursor: pointer;
    background: #2d2e36;
    /* White */
    border: 1px dashed #ffffff;
    box-sizing: border-box;
    display: flex;
    justify-content : center;
    border-radius : 10px;
    flex-direction: column;
    align-items: center;
    width : 100%;
    height : 200px;
    >img{
        width : 100%;
        height : 100%;
    }
`;

const InputPanel = styled(Box)`
    max-width : 900px;
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

export default connect(null, { setNotification, updateUser, createMedia })(Create);