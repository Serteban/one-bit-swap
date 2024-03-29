import Navbar from '@/components/Navbar'
import { AlertProvider } from '@/context/AlertProvider'
import { BlockchainProvider } from '@/context/BlockchainProvider'
import { SessionProvider } from '@/context/SessionProvider'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AlertProvider>
        <BlockchainProvider>
          <SessionProvider>
            <Navbar />
            <Component {...pageProps} />
          </SessionProvider>
        </BlockchainProvider>
      </AlertProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
