import React from 'react'
import { inAppWallet } from 'thirdweb/wallets'
import { ConnectButton } from "thirdweb/react";
import { client } from '@/utils/clients';

type Props = {}

const ConnectBottonModal = (props: Props) => {

    const wallets = [
        inAppWallet({
          auth: {
            options: [
              "apple",
              "email",
              'facebook',
              "google",
              "phone",
              "passkey"
            ]
          }
        }),
      ]
  return (
    <div>

      <ConnectButton wallets={wallets} client={client} />

    </div>
  )
}

export default ConnectBottonModal