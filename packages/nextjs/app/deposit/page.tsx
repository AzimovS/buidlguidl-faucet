"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Deposit: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [depositValue, setDepositValue] = useState<string>("0");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { writeAsync: deposit, isLoading: isDepositLoading } = useScaffoldContractWrite({
    contractName: "Faucet",
    functionName: "deposit",
    value: parseEther(depositValue),
  });

  const { data: contractBalance } = useBalance({
    address: process.env.NEXT_PUBLIC_FAUCET_CONTRACT_ADDRESS,
    watch: true,
  });

  const fund = async () => {
    const res = await deposit();
    if (res) {
      notification.success("Thank you for you contribution!");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">BuidlGuidl Sepolia Faucet</span>
          </h1>
        </div>

        <div className="justify-center ">
          <p className="my-2 font-medium">
            {isClient && `Current contract balance: ${contractBalance?.formatted} ETH`}{" "}
          </p>
          <p className="my-2 font-medium">Here you can deposit to our Faucet</p>
        </div>

        {connectedAddress ? (
          <div className="w-5/12">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-2 relative">
              <p className="text-center mb-0">Enter amount of ETH you want to deposit</p>
              <div className="p-5">
                <EtherInput value={depositValue} onChange={val => setDepositValue(val)} usdMode={false} />
                <div className="text-right mt-5">
                  <button className="btn btn-secondary btn-sm" onClick={fund} disabled={isDepositLoading}>
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </>
  );
};

export default Deposit;
