import React,{useEffect, useState} from 'react';
import {ethers,Contract} from 'ethers';
import axios from 'axios';
import UniswapV3Pool from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import toast from 'react-hot-toast';
import {parseErrorMsg, shortenAddress} from '../utils/shortaddress'

//INTERNAL IMPORT

import {FACTORY_ABI, FACTORY_ADDRESS} from './constants';
import {} from '../utils/shortaddress';

export const CONTEXT = React.createContext();

export const CONTEXT_PROVIDER = ({children})=>{
    const DAPP_NAME = 'LIQUIDITY_FINDER';
    const [loader,setLoader] = useState(false);

    const notifyError = (msg)=> toast.error(msg, {duration:4000})
    const notifySuccess = (msg)=> toast.success(msg, {duration:4000})


    let poolArray = [];

    //GET POOL ADDRESS
    const GET_POOL_ADDRESS = async(liquidity,selectedNetwork)=>{
        try{
            setLoader(true);
            const PROVIDER = new ethers.providers.JsonRpcProvider(selectedNetwork.rpc);
            const FACTORY_CONTRACT = new ethers.Contract(FACTORY_ADDRESS,FACTORY_ABI,PROVIDER);
            
            const POOL_ADDRESS = await FACTORY_CONTRACT.functions.getPool(
                liquidity.token_A,
                liquidity.token_B,
                Number(liquidity.fee),
            )
            const POOL_HISTORY = {
                token_A:liquidity.token_A,
                token_B:liquidity.token_B,
                fee:liquidity.fee,
                network:selectedNetwork.name,
                poolAddress:POOL_ADDRESS
            }
            
            
            const POOL_LIST = localStorage.getItem('poolHistory') ;
            if(POOL_LIST){
                poolArray = JSON.parse(localStorage.getItem('poolHistory'));
                poolArray.push(POOL_HISTORY);
                localStorage.setItem('poolHistory',JSON.stringify(poolArray))
            }else{
                poolArray.push(POOL_HISTORY);
                localStorage.setItem('poolHistory',JSON.stringify(poolArray))
            }
            setLoader(false);
            notifySuccess('Successfully Completed')
            return POOL_ADDRESS
        }catch(error){
            const errorMessage = parseErrorMsg(error)
            setLoader(false);
            notifyError('Error:',errorMessage)
        }
    }

    //GET POOL DATA
    async function GET_POOL_DATA(poolContract,selectedNetwork,poolAddress){
        const [liquidity,fee,token0,token1] = await Promise.all([
            poolContract.liquidity(),
            poolContract.fee(),
            poolContract.token0(),
            poolContract.token1()
        ])
        return {
            liquidity: liquidity.toString(),
            fee: fee,
            token_A: token0,
            token_B: token1,
            network: selectedNetwork.name,
            poolAddress: poolAddress
        }
    }

    const GET_POOL_DETAILS = async(poolAddress, selectedNetwork)=>{
        try{
            setLoader(true);
            const PROVIDER = new ethers.providers.JsonRpcProvider(selectedNetwork.rpc);
            const poolContract = new Contract(poolAddress,UniswapV3Pool.abi,PROVIDER);

            const  poolData = await GET_POOL_DATA(poolContract,selectedNetwork,poolAddress)
            let liquidityArray = [];
            const LIQUIDITY_LIST = localStorage.getItem('liquidityHistory') ;
            if(LIQUIDITY_LIST){
                liquidityArray = JSON.parse(localStorage.getItem('liquidityHistory'));
                liquidityArray.push(poolData);
                localStorage.setItem('liquidityHistory',JSON.stringify(liquidityArray))
            }else{
                liquidityArray.push(poolData);
                localStorage.setItem('liquidityHistory',JSON.stringify(liquidityArray))
            }

            setLoader(false);
            notifySuccess('Successfully Completed')
            return poolData
        }catch(error){
            const errorMessage = parseErrorMsg(error)
            setLoader(false);
            notifyError('Error:',errorMessage)
        }
    }

    

    
    return <CONTEXT.Provider value={{DAPP_NAME, GET_POOL_ADDRESS, GET_POOL_DETAILS, loader}}>
        {children}
    </CONTEXT.Provider>
}

