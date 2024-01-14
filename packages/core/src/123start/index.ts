import axios from "axios";
import { getSignerFromPrivateKey } from "../index.js";
interface ENVS extends NodeJS.ProcessEnv {
  FIREBASE_RTDB?: string;
  FIREBASE_AUTH?: string;
  SIGNER_PRIVATE_KEY?: string;
}
const { FIREBASE_RTDB, FIREBASE_AUTH, SIGNER_PRIVATE_KEY }: ENVS = process.env;

const getAddress = (): string => {
  const { address } = getSignerFromPrivateKey(SIGNER_PRIVATE_KEY || "");
  return address;
};
export const saveChallengeId = (challengeNumber: bigint) => {
  const operatorAddress = getAddress();
  const url = `${FIREBASE_RTDB}/node-cache/xai/${operatorAddress}.json?auth=${FIREBASE_AUTH}`;
  axios
    .put(url, challengeNumber.toString(), {
      headers: { "Content-Type": "application/json" },
    })
    .then(() => {
      console.log(
        `Updated challengeNumber: ${challengeNumber} to node-cache/xai/${operatorAddress}`
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getChallengeIdCache = async () => {
  const operatorAddress = getAddress();
  const url = `${FIREBASE_RTDB}/node-cache/xai/${operatorAddress}.json?auth=${FIREBASE_AUTH}`;
  try
  {
    const { data } = await axios.get(url);
    return data
  }
  catch(e)
  {
    console.log(e);
  }
}

