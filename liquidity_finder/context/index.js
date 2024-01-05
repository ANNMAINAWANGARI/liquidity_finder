import React,{useState} from 'react';
import {ethers,Contract} from 'ethers';
import axios from 'axios';
import UniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import toast from 'react-hot-toast';

//INTERNAL IMPORT

import {FACTORY_ABI, FACTORY_ADDRESS} from './constants';
import {} from '../utils/shortaddress';

export const CONTEXT = React.createContext();

export const CONTEXT_PROVIDER = ({children})=>{
    const DAPP_NAME = 'LIQUIDITY_FINDER';
    const [loader,setLoader] = useState(false);

    const notifyError = (msg)=> toast.error(msg, {duration:4000})
    return <CONTEXT.Provider value={{}}>
        {childern}
    </CONTEXT.Provider>
}

