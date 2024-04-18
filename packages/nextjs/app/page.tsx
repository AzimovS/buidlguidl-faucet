"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [isSending, setIsSending] = useState<boolean>(false);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: userBalance } = useBalance({
    address: connectedAddress,
    watch: true,
  });

  const { data: withdrawHistory } = useScaffoldEventHistory({
    contractName: "Faucet",
    eventName: "Withdrawal",
    blockData: true,
    fromBlock: BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK || "0"),
    watch: true,
  });

  const { data: contractBalance } = useBalance({
    address: process.env.NEXT_PUBLIC_FAUCET_CONTRACT_ADDRESS,
    watch: true,
  });

  const isBalanceEligible = userBalance && Number(userBalance.formatted) < 0.2 ? true : false;

  const withdrawETH = async (address: string) => {
    try {
      setIsSending(true);
      const data = new FormData();
      data.append("address", address);
      const res = await fetch("/api/withdraw", {
        method: "POST",
        body: JSON.stringify({ address }),
      });
      const resData = await res.json();
      if (resData.success) {
        notification.success("ETH was sent");
      } else {
        notification.error(resData?.error?.reason);
      }
    } catch (e) {
      console.log(e);
      notification.error("Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
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
              <p className="text-center mb-0">Enter you address</p>
              <div className="p-5">
                <AddressInput
                  value={connectedAddress ?? ""}
                  placeholder={connectedAddress}
                  onChange={() => ({})}
                  disabled={true}
                />
                <div className="text-right mt-5">
                  {!isBalanceEligible && (
                    <p className={`text-left mb-0 text-red-500`}>Your balance should be less than 0.2 ETH</p>
                  )}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => withdrawETH(connectedAddress)}
                    disabled={isSending || !isBalanceEligible}
                  >
                    {isSending && <span className="loading loading-spinner loading-xs"></span>}
                    Send 0.1 Sepolia ETH
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ConnectButton />
        )}

        <h1 className="text-center mt-10">
          <span className="block text-2xl mb-2">Withdraw History</span>
        </h1>
        <ul>
          {withdrawHistory &&
            withdrawHistory.map((transaction, index) => (
              <li key={index} className="mt-2">
                <div className="flex justify-center items-center space-x-2">
                  {formatEther(transaction?.args?.[1]).toString()} ETH was sent to &nbsp;
                  <Address address={transaction?.args?.[0]} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
