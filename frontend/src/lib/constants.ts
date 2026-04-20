export const CELO_CHAIN_ID = 42220;
export const ALFAJORES_CHAIN_ID = 44787;

export const BLOCK_EXPLORER_URL = "https://celoscan.io";
export const BLOCK_EXPLORER_TX_URL = `${BLOCK_EXPLORER_URL}/tx`;
export const BLOCK_EXPLORER_ADDRESS_URL = `${BLOCK_EXPLORER_URL}/address`;

export const CELO_DECIMALS = 18;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

export const APP_NAME = "cnMarket";
export const APP_DESCRIPTION = "Mint and trade NFTs with 3 rarity levels on Celo";
export const APP_URL = "https://cnmarket.vercel.app";

export const SOCIAL_LINKS = {
  github: "https://github.com/phessophissy/cnMarket",
  celoscan: "https://celoscan.io",
} as const;
