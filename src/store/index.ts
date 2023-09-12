import {
  combineReducers,
  configureStore,
  PreloadedState
} from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

const rootReducer = combineReducers({
  carrinho: carrinhoReducer,
  [api.reducerPath]: api.reducer
})

export function configuraStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof configuraStore>

/*
A Store é o cofre que guarda o estado completo da aplicação
Dispatcher encaminha as ações para os redutores corretos, as Actions são os bilhetes de mudança
Action Creators são assistentes que criam esses bilhetes para você
RootReducer é o gerente geral que combina os Reducers
Selectors são inspetores que trazem informações específicas da Store.
Payload é a parte da Action que carrega os dados ou informações relevantes
sobre a mudança que você deseja fazer no estado da aplicação.
*/
