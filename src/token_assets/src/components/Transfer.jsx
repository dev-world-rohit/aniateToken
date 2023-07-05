import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Transfer() {
    const [receiverId, setReceiverId] = useState("");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [hideMessage, setHideMessage] = useState(true);
    const [disableButton, setDisableButton] = useState(false);

    async function handleClick() {
        setHideMessage(true);
        setDisableButton(true);
        const principal = Principal.fromText(receiverId);
        const receivedMessage = await token.transferFunds(
            principal,
            parseInt(amount)
        );
        setMessage(receivedMessage);
        setDisableButton(false);
        setHideMessage(false);
    }

    return (
        <div className="window white">
            <div className="transfer">
                <fieldset>
                    <legend>To Account:</legend>
                    <ul>
                        <li>
                            <input
                                type="text"
                                id="transfer-to-id"
                                onChange={(e) => setReceiverId(e.target.value)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    <legend>Amount:</legend>
                    <ul>
                        <li>
                            <input
                                type="number"
                                id="amount"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </li>
                    </ul>
                </fieldset>
                <p className="trade-buttons">
                    <button
                        id="btn-transfer"
                        onClick={handleClick}
                        disabled={disableButton}
                    >
                        Transfer
                    </button>
                </p>
                <p hidden={hideMessage}>{message}</p>
            </div>
        </div>
    );
}

export default Transfer;
