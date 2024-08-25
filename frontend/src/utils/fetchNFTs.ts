// cm03zwpyzl45701zd4z313iaw

import { getEndpoints } from "@zetachain/networks"
import { ethers } from "ethers"
import { gql, request } from "graphql-request"
import { formatUnits } from "viem"
import { useAccount } from "wagmi"
import { useNFT } from "@/hooks/useNFT"
const GOLDSKY_API = "https://api.goldsky.com/api/public/project_clnujea22c0if34x5965c8c0j/subgraphs/nft-zetachain-testnet/v4/gn"