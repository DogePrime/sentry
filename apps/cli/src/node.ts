import { getSignerFromPrivateKey, operatorRuntime } from "@sentry/core";
import axios from "axios";
const { FIREBASE_RTDB, FIREBASE_AUTH, SIGNER_PRIVATE_KEY } = process.env;
const { signer, address } = getSignerFromPrivateKey(SIGNER_PRIVATE_KEY);
const saveDB = (data: string, child = "") => {
  console.log(data);
  const dbURL = `${FIREBASE_RTDB}/${address.toLowerCase()}${child}.json?auth=${FIREBASE_AUTH}`;
  axios
    .put(dbURL, data, { headers: { "Content-Type": "application/json" } })
    .catch((e) => {
      console.log(e);
    });
};
saveDB("inital...");
operatorRuntime(signer, undefined, (log: string) => {
  saveDB(log.toString().replace(/\[(.*?)\]/, ""), `/${+new Date()}`);
});
