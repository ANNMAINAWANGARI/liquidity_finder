import React,{useState,useContext,useEffect} from 'react';
import {
  Header,
  Home,
  Action,
  GetPool,
  Networks,
  LiqudityHistory,
  PoolHistory,
  Promo,
  Loader,
  IconOne,
  IconTwo,
} from '../components/index';
import {CONTEXT}from '../context/index'

const index = () => {

  const {DAPP_NAME} = useContext(CONTEXT);
  return (
    <div>{DAPP_NAME}</div>
  )
}

export default index
