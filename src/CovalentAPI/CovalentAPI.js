import axios from "axios";
export async function getErc20Assets(chain, address) {
  try {
    // chain = 97 for bsc testnet
    const response = await axios.get(
      `
      https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_e22bfa8a9c734c1e816244b1529`
    );

    /*    for (let index = 0; index < response.length; index++) {
        const element = array[index];
        
    }
    */
    // ckey_e22bfa8a9c734c1e816244b1529
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
