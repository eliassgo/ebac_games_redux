import { PreloadedState } from '@reduxjs/toolkit'
import { RootState, AppStore, configuraStore } from '../store'
import { RenderOptions, render } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

// Função para renderizar um documento já com redux
// Podemos passar um estado inicial para o redux
export function renderizaComProvider(
  element: React.ReactElement,
  {
    preloadedState = {},
    store = configuraStore(preloadedState),
    ...opcoesAdicionais
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Encapsulador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    store,
    ...render(element, {
      wrapper: Encapsulador,
      ...opcoesAdicionais
    })
  }
}
