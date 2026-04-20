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

export const MINIPAY_DEEP_LINK = "https://minipay.opera.com";
export const MINIPAY_ANDROID_URL = "https://play.google.com/store/apps/details?id=com.opera.minipay";
export const MINIPAY_IOS_URL = "https://apps.apple.com/app/minipay/id6504087257";
export const MINIPAY_SUPPORTED_CHAINS = [42220] as const;
