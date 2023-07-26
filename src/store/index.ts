import { configureStore } from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'

import api from '../services/api'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>

/*
A Store é o cofre que guarda o estado completo da aplicação
Dispatcher encaminha as ações para os redutores corretos, as Actions são os bilhetes de mudança
Action Creators são assistentes que criam esses bilhetes para você
RootReducer é o gerente geral que combina os Reducers
Selectors são inspetores que trazem informações específicas da Store.
Payload é a parte da Action que carrega os dados ou informações relevantes
sobre a mudança que você deseja fazer no estado da aplicação.
*/
