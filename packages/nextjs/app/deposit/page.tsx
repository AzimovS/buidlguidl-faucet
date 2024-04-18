"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { AddressInput } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Deposit: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [isSending, setIsSending] = useState<boolean>(false);

  const { data: userBalance } = useBalance({
    address: connectedAddress,
    watch: true,
  });

  const formattedBalance = userBalance ? Number(userBalance.formatted) : 0;

  const fundETH = async (address: string) => {
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
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Receive 0.1 ETH per request</p>
          </div>
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
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => fundETH(connectedAddress)}
                    disabled={isSending}
                  >
                    {isSending && <span className="loading loading-spinner loading-xs"></span>}
                    Send 0.1 Sepolia ETH
                  </button>
                </div>
              </div>
            </div>
            <p className="text-center mt-10 mb-0">Eligibility Criteria</p>
            {formattedBalance && (
              <p className={`text-left mb-0 ${formattedBalance < 0.2 ? "text-green-500" : "text-red-500"}`}>
                Your current balance is less than 0.2 ETH
              </p>
            )}
          </div>
        ) : (
          <ConnectButton />
        )}
      </div>
    </>
  );
};

export default Deposit;
