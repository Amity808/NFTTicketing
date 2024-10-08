import "./tasks/interact";
import "./tasks/deploy";
import "@nomicfoundation/hardhat-toolbox";
import "@zetachain/toolkit/tasks";
import "@nomicfoundation/hardhat-verify";


import { getHardhatConfigNetworks } from "@zetachain/networks";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    ...getHardhatConfigNetworks(),
  },
  solidity: {
    compilers: [
      { version: "0.5.16" /** For uniswap v2 core*/ },
      { version: "0.8.7" },
      { version: "0.8.20" },
    ],
  },
  etherscan: {
apiKey: ""
  }
};

export default config;
