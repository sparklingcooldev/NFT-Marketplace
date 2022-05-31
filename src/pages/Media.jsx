import styled from 'styled-components';
import { Box, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi'
import { loadMedia, setAsk } from '../redux/actions/MediaAction';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import { createBid, loadBid, acceptBid } from '../redux/actions/BidAction';
import { setNotification } from '../redux/actions/UserAction';

import { KET_ADDRESS, MEDIA_ADDRESS, MARKET_ADDRESS, CHAIN_IDS } from '../config';
import MediaABI from '../services/abis/Media.json';
import MarketABI from '../services/abis/Market.json';
import TokenABI from '../services/abis/ERC20.json';
import { MdClose } from 'react-icons/md'

const customStyles = {
    content: {
        top: 'calc(50% )',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        height: 'fit-content',
        width: '100%',
        maxWidth: '500px',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
        borderRadius: '0.3rem',
        background: '#212428',
        color: 'white',
        border: 'none',
    },
};


const Media = ({ loadMedia, media, address, setAddress, createBid, user, notification, loadBid, bids, acceptBid, setAsk, setNotification, chainId }) => {

    const { id } = useParams();
    const [viewtype, setViewType] = useState(1);

    const [bidmodalopen, setBidModalOpen] = useState(false);
    const [bidamount, setBidAmount] = useState(0);

    const [askmodalopen, setAskModalOpen] = useState(false);
    const [askamount, setAskAmount] = useState(0);
    const currency = { 97: 'BNB', 4: 'ETH', 80001: 'MATIC', 43113: 'AVAX' };
    const currencylogo = { 97: 'bnb.png', 4: 'eth.svg', 80001: 'polygon.png', 43113: 'avax.png' };
    useEffect(() => {
        if (id) {
            loadMedia(id);
        }
    }, [id, notification]);

    useEffect(() => {
        if (media) {
            loadBid(media._id);
        }
    }, [media])
    if (!media) return;

    const approveToken = async () => {
        if (!CHAIN_IDS.includes(Number(chainId))) {
            setNotification({ title: 'Failed', detail: "Incorrect network", type: 'error' });
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(KET_ADDRESS[chainId], TokenABI, signer);
        const tx = await tokenContract.approve(MARKET_ADDRESS[chainId], '115792089237316195423570985008687907853269984665640564039457584007913129639935');
        await tx.wait();
    };

    const onBid = async (bidamount) => {
        if (!CHAIN_IDS.includes(Number(chainId))) {
            setNotification({ title: 'Failed', detail: "Incorrect network", type: 'error' });
            return;
        }
        if (!Number(bidamount))
            return;
        await approveToken();
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const mediaContract = new ethers.Contract(MEDIA_ADDRESS[chainId], MediaABI, signer);
        const tx = await mediaContract.setBid(
            media.media_id,
            {
                amount: ethers.utils.parseEther(Number(bidamount).toString()),
                currency: KET_ADDRESS[chainId],
                bidder: address,
                recipient: address,
                sellOnShare: { value: 0 },
            }
        );
        await tx.wait();

        createBid({
            _mid: id,
            bidder: user._id,
            price: bidamount,
            type: Number(bidamount) >= Number(media.metadata.price)
        })

    }

    const onAcceptBid = async (_bid) => {
        if (!CHAIN_IDS.includes(Number(chainId))) {
            setNotification({ title: 'Failed', detail: "Incorrect network", type: 'error' });
            return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const mediaContract = new ethers.Contract(MEDIA_ADDRESS[chainId], MediaABI, signer);
        console.log(_bid.price);
        const tx = await mediaContract.acceptBid(
            media.media_id,
            {
                amount: ethers.utils.parseEther(Number(_bid.price).toString()),
                currency: KET_ADDRESS[chainId],
                bidder: _bid.bidder.address,
                recipient: _bid.bidder.address,
                sellOnShare: { value: 0 },
            }
        );
        await tx.wait();
        acceptBid({ _mid: id, bidder: _bid.bidder._id, price: _bid.price, _bidid: _bid._id });
    }

    const onSetAsk = async () => {
        if (!CHAIN_IDS.includes(Number(chainId))) {
            setNotification({ title: 'Failed', detail: "Incorrect network", type: 'error' });
            return;
        }
        if (!Number(askamount))
            return;
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();
        const mediaContract = new ethers.Contract(MEDIA_ADDRESS[chainId], MediaABI, signer);
        const tx = await mediaContract.setAsk(
            media.media_id,
            {
                amount: '0x' + (Math.pow(10, 18) * askamount).toString(16),
                currency: KET_ADDRESS[chainId],
            }
        );
        await tx.wait();
        setAsk({ _mid: media._id, price: askamount });
    }
    return (
        <StyledContainer>
            <Modal
                isOpen={bidmodalopen}
                onRequestClose={() => setBidModalOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box textAlign={'left'} padding={'15px'}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box fontSize={'22px'} fontWeight={'700'}>Place a Bid</Box>
                        <MdClose color={'rgb(150,150,150'} fontSize={'24px'} cursor={'pointer'} onClick={() => setBidModalOpen(false)} />
                    </Box>
                    <Box mt={'20px'} color={'rgb(162,162,162)'}>You are about to place a bid for <span style={{ color: 'white', fontWeight: 'bold' }}>{media.metadata.title}</span> from <span style={{ color: 'white', fontWeight: 'bold' }}>{media.owner_address.username}</span></Box>
                    <Box fontWeight={'bold'} mt={'20px'}>Your Bid</Box>
                    <StyledInput placeholder="Enter Bid" value={bidamount} onChange={(e) => setBidAmount(e.target.value)} />
                    <Box width={'100%'}>
                        <button className="mt-10 mr-5 w-full py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                            onClick={() => onBid(bidamount)}
                        >
                            Place a Bid
                        </button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                isOpen={askmodalopen}
                onRequestClose={() => setAskModalOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box textAlign={'left'} padding={'15px'}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Box fontSize={'22px'} fontWeight={'700'}>Set Ask</Box>
                        <MdClose color={'rgb(150,150,150'} fontSize={'24px'} cursor={'pointer'} onClick={() => setAskModalOpen(false)} />
                    </Box>
                    <Box mt={'20px'} color={'rgb(162,162,162)'}>You set ask for <span style={{ color: 'white', fontWeight: 'bold' }}>{media.metadata.title}</span> </Box>
                    <Box fontWeight={'bold'} mt={'20px'}>Your Ask</Box>
                    <StyledInput placeholder="Enter Bid" value={askamount} onChange={(e) => setAskAmount(e.target.value)} />
                    <Box width={'100%'}>
                        <button className="mt-10 mr-5 w-full py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                            onClick={() => onSetAsk()}
                        >
                            Set Ask
                        </button>
                    </Box>
                </Box>
            </Modal>
            <ImagePanel>
                <img src={media.media_url} width={'100%'} alt={'media_url'} />
            </ImagePanel>
            <InfoPanel>
                <Box fontWeight={'bold'} fontSize={'36px'}>
                    {media.metadata.title} #{media.media_id}
                </Box>
                <Box color={'#bbb'} mt={'10px'}>
                    {media.metadata.description}
                </Box>
                <Box display={'flex'} mt={'20px'}>
                    <Box>
                        <Box fontWeight={'bold'}>Creator</Box>
                        <Box display={'flex'} alignItems={'center'} mt={'10px'}>
                            <img src={media.creator_address.avatar} width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} />
                            <Box ml={'10px'} fontWeight={'bold'}>{media.creator_address.username}</Box>
                        </Box>
                    </Box>
                    <Box ml={'50px'}>
                        <Box fontWeight={'bold'}>Owner</Box>
                        <Box display={'flex'} alignItems={'center'} mt={'10px'}>
                            <img src={media.owner_address.avatar} width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} />
                            <Box ml={'10px'} fontWeight={'bold'}>{media.owner_address.username}</Box>
                        </Box>
                    </Box>
                </Box>
                <ViewType mt={'20px'} active={viewtype}>
                    <Box onClick={() => setViewType(1)}>Bids</Box>
                    <Box onClick={() => setViewType(2)}>History</Box>
                </ViewType>
                <Box mt={'30px'}>
                    {bids && bids.map(data => {
                        if (viewtype === 1 && data.isAccepted !== 0) return;
                        return <Bid>
                            <Box>
                                <img src={data.bidder.avatar} />
                                <Box ml={'20px'} color={'rgb(160,160,160)'}>
                                    <Box>Bid {data.isAccepted === 2 ? 'accepted' : ''} <span style={{ color: 'white', fontWeight: 'bold' }}>{Number(data.price).toFixed(3)} {currency[chainId]}</span></Box>
                                    <Box>by <span style={{ color: 'white', fontWeight: 'bold' }}>{data.bidder.username}</span> at {new Date(data.updatedAt).toLocaleDateString()} {new Date(data.updatedAt).toLocaleTimeString()}</Box>
                                </Box>
                            </Box>
                            {viewtype === 1 && user && user._id === media.owner_address._id ? <Box display={'flex'} justifyContent={'end'}>
                                <button style={{ fontSize: '14px' }} className="mt-3 mr-5 py-1 px-6 bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                                    onClick={() => onAcceptBid(data)}
                                >
                                    Accept
                                </button>
                            </Box> : ''}
                        </Bid>
                    })}
                </Box>
                <BidPanel mt={'40px'}>
                    <Box>Price</Box>
                    <Box display={'flex'} alignItems={'center'}>
                        <img src={'/' + currencylogo[chainId]} width={'24px'} height={'24px'} />
                        <Box ml={'10px'} fontSize={'32px'} fontWeight={'bold'}>{media.metadata.price}</Box>
                    </Box>
                    {
                        user && user._id !== media.owner_address._id && !media.isApproved ? <Box display={'flex'}>
                            <button className="mt-10 mr-5 py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                                onClick={() => onBid(media.metadata.price)}
                            >
                                Buy Now
                            </button>
                            <button className="mt-10 py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                                onClick={() => setBidModalOpen(true)}
                            >
                                Place a Bid
                            </button>
                        </Box> : ''
                    }
                    {
                        user && user._id === media.owner_address._id && media.isApproved ?
                            <button className="mt-10 py-2 px-6 font-medium bg-gradient-to-r from-purpleR to-purple-700 hover:shadow-md hover:shadow-purple-800 rounded-full text-white"
                                onClick={() => setAskModalOpen(true)}
                            >
                                Set Ask
                            </button> : ''
                    }
                </BidPanel>
            </InfoPanel>
        </StyledContainer>
    );
};

const Bid = styled(Box)`
    
    margin-top : 20px;
    margin-bottom : 20px;
    >div{
        display : flex;
    align-items : center;
    }
    >div>img{
        width : 50px;
        height : 50px;
        border-radius : 50%;
    }
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


const BidPanel = styled(Box)`

`;
const ViewType = styled(Box)`
    >div{
        border : solid 1px rgba(255, 255, 255, .1);
        min-width : 80px;
        height : 44px;
        display : flex;
        justify-content : center;
        align-items : center;
        margin-right : 10px;
        font-weight : 600;
        font-size : 16px;
        padding : 20px;
        cursor : pointer;
        color : rgb(150,150,150);
        border-radius : 3px;
    }
    >div:nth-child(${({ active }) => active}){
        color : white;
    }
    display : flex;
`;

const ImagePanel = styled(Box)`
    width : 47%;
    >img{
        border-radius : 5px;
    }
`;

const InfoPanel = styled(Box)`
    width : 47%;
    text-align : left;
`;
const StyledContainer = styled(Box)`
    min-height : 100vh;
    background-color : #1A1A25;
    color : white;
    padding : 0 150px;
    display : flex;
    padding-top : 150px;
    padding-bottom : 50px;
    justify-content : space-between;
`;

const fromStore = (store) => {
    return {
        media: store.MediaReducer.media,
        notification: store.NotificationReducer.notification,
        bids: store.BidReducer.bids,
    }
}

export default connect(fromStore, { loadMedia, createBid, loadBid, acceptBid, setAsk, setNotification })(Media);
