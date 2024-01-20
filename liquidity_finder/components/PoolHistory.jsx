import React,{useState,useEffect} from "react";
import {GoCopy} from 'react-icons/go';
import {shortenAddress} from '../utils/shortaddress';
import { Promo } from '../components/index'

const PoolHistory = ({setActiveComponent}) => {
  const [poolDetails,setPoolDetails] = useState([]);
  useEffect(()=>{
    const pools = JSON.parse(localStorage.getItem("poolHistory"));
    setPoolDetails(pools?.reverse())
  },[])
  return (
    <section className="pt-32" id="price">
      <div className="container">
        {
          poolDetails ?(<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {poolDetails?.map((pool,index)=>(<div>
              <div className="bg-slate-950/40 rounded-xl hover:-translate-y-2 transition-all duration-500">
                <div className="border border-white/10 rounded-xl">
                  <div className="p-6">
                    <a className="flex items-center justify-center gap-2 border border-white/10 text-white py-2 px-6 mt-6 rounded-lg hover:bg-primary-hover transition-all duration-300">{pool.network}</a>
                    <hr className="my-5 border-dashed border-white/10"/>
                    <ul className="mt-3 text-sm text-default-700" role='list'>
                      <li className="flex items-center gap-2 py-2">
                        <i className="inline-block w-5 text-primary" onClick={()=>navigator.clipboard.writeText(pool.token_A)}>
                          <GoCopy/>
                          
                        </i>
                        <span className="text-default-50">Token A:{shortenAddress(pool.token_A)}</span>
                      </li>
                      <li className="flex items-center gap-2 py-2">
                        <i className="inline-block w-5 text-primary" onClick={()=>navigator.clipboard.writeText(pool.token_B)}>
                          <GoCopy/>
                          
                        </i>
                        <span className="text-default-50">Token B:{shortenAddress(pool.token_B)}</span>
                      </li>
                      <li className="flex items-center gap-2 py-2">
                        <i className="inline-block w-5 text-primary" onClick={()=>navigator.clipboard.writeText(pool.fee)}>
                          <GoCopy/>
                          
                        </i>
                        <span className="text-default-50">Fee:{shortenAddress(pool.fee)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>))}
          </div>):(<Promo setActiveComponent={setActiveComponent}/>)
        }
      </div>
    </section>
  )
};

export default PoolHistory;
