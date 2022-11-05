export const getErc20Assets = async (address, chain = 97) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_50ec160ceaa64f999d9d8e83eec`
  );
  const data = await res.json();
  const items = JSON.parse(JSON.stringify(data))?.data?.items;
  return items;
};
export const getErc20AssetsParticular = async (address, chain = 97, token) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_50ec160ceaa64f999d9d8e83eec`
  );
  const data = await res.json();
  const items = JSON.parse(JSON.stringify(data)).data.items;
  for (var i = 0; i < items.length; i++) {
    if (items[i].contract_address === token) {
      console.log(
        (items[i].balance * 10 ** -items[i].contract_decimals).toFixed(3)
      );
      return (items[i].balance * 10 ** -items[i].contract_decimals).toFixed(3);
    }
  }
};

export const getBlockHeight = async (chain) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_50ec160ceaa64f999d9d8e83eec`
  );

  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).data.items[0].height;
};

export const getNativeBalance = async (
  address,
  chain,
  paticularTokenaddress
) => {
  const res = await fetch(
    `https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_50ec160ceaa64f999d9d8e83eec`
  );
  const data = await res.json();
  const tokenBalance = JSON.parse(JSON.stringify(data)).data.items;

  for (var i = 0; i < tokenBalance.length; i++) {
    if (
      tokenBalance[i].contract_address.toString().toLowerCase() ===
      paticularTokenaddress.toString().toLowerCase()
    ) {
      return tokenBalance[i].balance;
    }
  }
  return 0;
};

export const getTransactions = async (address, chain) => {
  const res = await fetch(
    ` https://api.covalenthq.com/v1/${chain}/address/${address}/transactions_v2/?key=ckey_50ec160ceaa64f999d9d8e83eec`
  );
  const data = await res.json();
  const items = JSON.parse(JSON.stringify(data)).data.items;

  return items;
};
