import { getSignerFromPrivateKey, operatorRuntime } from "@sentry/core";
const { signer } = getSignerFromPrivateKey(process.env.SIGNER_PRIVATE_KEY as string);
operatorRuntime(signer, undefined, (log) =>
  console.log(log)
);
