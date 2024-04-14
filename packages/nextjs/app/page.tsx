"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [inputAddress, setInputAddress] = useState<AddressType>();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">BuidlGuidl Sepolia Faucet</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Receive 0.1 ETH per request</p>
          </div>
        </div>

        <div className="w-4/12">
          <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-2 relative">
            <p className="text-center mb-0">Enter you address</p>
            <div className="p-5 divide-y divide-base-300">
              <AddressInput
                value={inputAddress ?? ""}
                placeholder={connectedAddress}
                onChange={value => setInputAddress(value as AddressType)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
