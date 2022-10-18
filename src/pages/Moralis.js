export const getNFTBalance = async (address, chain = "eth") => {
  const res = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft?chain=${chain}&format=decimal`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY":
          "IZodKCUBZwtOx9fCMCqYQDJtm5janVIvrF2PT4TkRwYw8r7kvfBJ2XnSl1eMqIhz",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  const data = await res.json();
  return JSON.parse(JSON.stringify(data)).result;
};

export const getMetadataProps = async (url) => {
  const res = await fetch(`${url}`);
  const data = await res.json();
  return JSON.parse(JSON.stringify(data));
};
