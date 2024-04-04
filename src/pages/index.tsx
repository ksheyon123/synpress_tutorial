import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";

export default function Home() {
  const [web3Provider, setWeb3Provider] = useState<any>();
  const [account, setAccount] = useState<string>("");
  const getProvider = async () => {
    const provider = await detectEthereumProvider();
    setWeb3Provider(provider);
  };

  useEffect(() => {
    getProvider();
  }, []);

  const connectTo = async () => {
    console.log(web3Provider);
    const accounts = await web3Provider // Or window.ethereum if you don't support EIP-6963.
      .request({ method: "eth_requestAccounts" })
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error.
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    const account = accounts[0];
    setAccount(account);
  };

  return (
    <main>
      <div className="App">
        <div></div>
        <h1>Synpress + Cypress + React</h1>
        <div className="card">
          <button id="disconnect-btn" onClick={() => {}}>
            Disconnect
          </button>
          <button
            id="connect-btn"
            onClick={() => {
              connectTo();
            }}
          >
            Connect
          </button>
          <p id="address">Address: {account || "??"}</p>
          <p>
            Edit <code>cypress/e2e/example.cy.ts</code> and save
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Synpress and Cypress logos to learn more
        </p>
      </div>
    </main>
  );
}
