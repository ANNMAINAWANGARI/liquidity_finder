import React from "react";

const Networks = ({setActiveComponent,activeNetwork, setActiveNetwork}) => {

  const networks = [
    {
    name:"Ethereum",
    rpc:"https://rpc.ankr.com/eth",
    logo:"assets/images/ethereum.png",
    },
    {
      name:"Polygon Mumbai",
      rpc:"https://rpc.ankr.com/polygon_mumbai",
      logo:"assets/images/polygon.png",
      
    },
    {
      name:"Polygon",
      rpc:"https://rpc.ankr.com/polygon",
      logo:"assets/images/polygon.png",
      },
      {
        name:"Goerli",
        rpc:"https://rpc.ankr.com/eth_goerli",
        logo:"assets/images/ethereum.png",
        },
        {
          name:"Sepolia",
          rpc:"https://rpc.ankr.com/eth_sepolia",
          logo:"assets/images/ethereum.png",
          }
  ]

  const selectNetwork = (network)=>{
    setActiveComponent('Networks');
    setActiveNetwork(network.name)
    localStorage.setItem('activeNetwork',JSON.stringify(network))
  }
  return (
    <section id='generator' className="py-14">
      <div className="container z-10">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-20">{
          networks?.map((network,index)=>(
            <div key={index+1} onClick={()=>selectNetwork(network)}>
              <div className={`group p-8 rounded-xl bg-default-950/40 transition-all duration-0 hover:-translate-y-2 hover:bg-primary/40 ${activeNetwork ==network.name ?"bg-primary/40":""}`}>
                <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-primary text-primary group-hover:bg-white/20 group-hover:text-white">
                  <img src={network.logo} alt='' className="h-10"/>
                </div>
                <h3 className="text-xl font-medium text-default-200 mt-8">{network.name}</h3>
                <p className="text-base font-normal text-default-300 mt-4">By utilizing the selected network <strong>{network.name}</strong>, you can be able to find and get access of the details for getting the pool, address and liquidity</p>
              </div>
            </div>
          ))
        }</div>
      </div>
    </section>
  )
};

export default Networks;
