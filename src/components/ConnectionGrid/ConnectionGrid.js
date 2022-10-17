import React from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import Button from "../Button/Button";
import ConnectionGridBtn from "./ConnectionGridBtn";

const ConnectionGrid = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  /*const image = [
    "https://gateway.pinata.cloud/ipfs/QmPgxeRnkq8UGrsxzUEsowBcUnwnQPd7Dia2v19u6atsHa",
    "https://gateway.pinata.cloud/ipfs/QmYFeCsLXNz4orNpMAvgTfGp6ubEMjsU9okv6QsCg8V4ef",
    "https://gateway.pinata.cloud/ipfs/QmYsEGVGHdWMA4TzKmHz5CcK3HaTf65C7j3WdSMvzSDQBh",
    "",
  ]; */
  const image = ["1", "2", "3", "4"];
  if (isConnected) {
    console.log(connector);
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName} (${address})` : address}</div>
        {connector ? <div>Connected to {connector.name}</div> : <></>}
        <br />
        <Button title={"Disconnect"} clickFunction={disconnect}></Button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector, index) => (
        <ConnectionGridBtn
          title={connector.name}
          disabled={!connector.ready}
          key={connector.id}
          clickFunction={() => connect({ connector })}
          image={image[index]}
        >
          {console.log(index)}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </ConnectionGridBtn>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ConnectionGrid;
