import styled from 'styled-components';
import { Box, Select, MenuItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi'
import { loadAllMedia } from '../redux/actions/MediaAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Explore = ({ loadAllMedia, medias, chainId }) => {
    const [criteria, setCriteria] = useState('');
    const currency = { 97: 'BNB', 4: 'ETH', 80001: 'MATIC', 43113: 'AVAX' };
    useEffect(() => {
        loadAllMedia(chainId, criteria);
    }, [chainId, criteria])
    return (
        <StyledContainer>
            <section className="bg-mint bg-center bg-cover bg-no-repeat">
                <h1 className="px-5 py-40 text-5xl font-bold text-white">
                    Explore NFTS
                </h1>
            </section>
            <Box width={'100%'} maxWidth={'1050px'} margin={'0px auto'} py={'50px'}>
                <Box display={'flex'}>
                    <SearchBox mr={'20px'}>
                        <input type={'text'} placeholder={'Search Item here'} value={criteria} onChange={(e) => setCriteria(e.target.value)} />
                        <Box>
                            <BiSearchAlt2 />
                        </Box>
                    </SearchBox>
                </Box>
                <Box mt={'20px'} display={'flex'} flexWrap={'wrap'}>
                    {medias && medias.map(data => {
                        return <Link to={`/media/${data._id}`}>
                            <Media>
                                <img src={data.owner_address.avatar} alt={'logo'} />
                                <Box>
                                    <img src={data.media_url} />
                                </Box>
                                <Box mt={'10px'} fontWeight={'bold'}>{data.metadata.title}</Box>
                                <Box mt={'5px'} fontWeight={'bold'} color={'rgb(150,150,150)'}>{data.metadata.price} {currency[chainId]}</Box>
                            </Media>
                        </Link>
                    })}

                </Box>
            </Box>
        </StyledContainer>
    );
};

const Media = styled(Box)`
    margin-right : 20px;
    margin-bottom : 20px;
    box-shadow : 0px 0px 8px 0px rgb(0 0 0 / 30%);
    border-radius : 15px;
    background-color : rgba(255, 255, 255, .025);
    border-top : solid 1px rgba(255, 255, 255, .1);
    padding : 20px;
    width : 240px;
    text-align : left;
    cursor : pointer;
    >img{
        border-radius : 50%;
        width : 50px;
        height : 50px;
        position : relative;
    }
    >div>img{
        border-radius : 15px;
        width : 195px;
        height : 195px;
        transition : all 0.6s;
    }
    >div:nth-child(2){
        width : 200px;
        height : 200px;
        display : flex;
        justify-content : center;
        align-items : center;
        margin-top : -25px;
        :hover{
                >img{
                width : 200px;
                height : 200px;
            }
        }
    }
`;

const SearchBox = styled(Box)`
    display : flex;
    width : 100%;
    >input{
        width : calc(100% - 60px);
        font-size : 16px;
        box-shadow : 2px 2px 20px 0px rgb(20 20 20 / 5%);
        padding : 8px 12px;
        border-radius : 5px 0 0 5px;
        border : solid 1px rgb(100,100,100);
        background : transparent;
        outline : none;
        border-right : none;
    }
    >div{
        width : 60px;
        padding : 13px 0;
        border-radius : 0 5px 5px 0;
        color  :white;
        font-size : 24px;
        background-color :#961e80;
        display :flex;
        justify-content : center;
        align-items : center;
        cursor : pointer;
        transition : all 0.3s;
        :hover{
            opacity : 0.6;
        }
    }
`;
const StyledContainer = styled(Box)`
    min-height : 100vh;
    background-color : #1A1A25;
    color : white;
`;

const fromStore = (store) => {
    return {
        medias: store.MediaReducer.medias,
    }
}

export default connect(fromStore, { loadAllMedia })(Explore);
