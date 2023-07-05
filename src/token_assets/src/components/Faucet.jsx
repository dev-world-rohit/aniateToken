import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client/";

function Faucet() {
    const [buttonText, setButtonText] = useState("Give me");
    const [buttonDisable, setButtonDisabled] = useState(false);
    const [hideId, setShowId] = useState(true);
    const [Id, setId] = useState("");

    async function handleClick(event) {
        setButtonDisabled(true);

        // const authenticateClient = await AuthClient.create();
        // const identity = await authenticateClient.getIdentity();

        // const authenticateCreatedCanister = createActor(canisdterId, {
        //     agentOptions: {
        //         identity,
        //     },
        // });
        setButtonText(await token.payOut());
        setId(await token.checkId());
        setShowId(false);
    }

    return (
        <div className="blue window">
            <h2>
                <span role="img" aria-label="tap emoji">
                    🚰
                </span>
                Faucet
            </h2>
            <label>
                Get your free aniateToken. Register and claim 1,000 aniate token
                to your account.
            </label>
            <p className="trade-buttons">
                <button
                    id="btn-payout"
                    onClick={handleClick}
                    disabled={buttonDisable}
                >
                    {buttonText}
                </button>
            </p>
            <p hidden={hideId}>Your Id is {Id}</p>
        </div>
    );
}

export default Faucet;
