import { Inter } from "next/font/google";

export default function Home() {
  const address = "";

  return (
    <main>
      <div className="App">
        <div></div>
        <h1>Synpress + Cypress + React</h1>
        <div className="card">
          <button id="disconnect-btn" onClick={() => {}}>
            Disconnect
          </button>
          <button id="connect-btn" onClick={() => {}}>
            Connect
          </button>
          <p id="address">Address: {address || "??"}</p>
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
