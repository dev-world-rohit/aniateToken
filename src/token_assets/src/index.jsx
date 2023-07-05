import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client/";

const init = async () => {
    const authenticateClient = await AuthClient.create();

    if (await authenticateClient.isAuthenticated()) {
        handleAuthentication(authenticateClient);
    } else {
        await authenticateClient.login({
            identityProvider: "https://identity.ic0.app/#authorize",
            onSuccess: () => {
                handleAuthentication(authenticateClient);
            },
        });
    }
};

async function handleAuthentication(authenticateClient) {
    ReactDOM.render(<App />, document.getElementById("root"));
}

init();
