require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    zeta: {
        url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
        accounts: [process.env.PRIVATE_KEY],
    },
    
},
etherscan: {
  apiKey: {
      alfajores: process.env.CELOSCAN_API_KEY,
      celo: process.env.CELOSCAN_API_KEY,
  },
  customChains: [
      // {
      //     network: "alfajores",
      //     chainId: 44787,
      //     urls: {
      //         apiURL: "https://api-alfajores.celoscan.io/api",
      //         browserURL: "https://alfajores.celoscan.io",
      //     },
      // },
      // {
      //     network: "celo",
      //     chainId: 42220,
      //     urls: {
      //         apiURL: "https://api.celoscan.io/api",
      //         browserURL: "https://celoscan.io/",
      //     },
      // },
  ],
},
};
