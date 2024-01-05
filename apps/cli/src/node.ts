import { getSignerFromPrivateKey, operatorRuntime } from "@sentry/core";
import axios from "axios";
import { getAddress } from "ethers";
interface ENVS extends NodeJS.ProcessEnv {
  FIREBASE_RTDB?: string;
  FIREBASE_AUTH?: string;
  SIGNER_PRIVATE_KEY?: string;
}
const { FIREBASE_RTDB, FIREBASE_AUTH, SIGNER_PRIVATE_KEY }: ENVS = process.env;
if (FIREBASE_RTDB && FIREBASE_AUTH && SIGNER_PRIVATE_KEY)
{
  const { signer, address } = getSignerFromPrivateKey(SIGNER_PRIVATE_KEY);
  const etherAddress = getAddress(address);
  const saveDB = (data: string, child = "") => {
    console.log(data);
    const dbURL = `${FIREBASE_RTDB}/nodelogs/${etherAddress}${child}.json?auth=${FIREBASE_AUTH}`;
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
}
else
  console.log("Missing ENVs")
