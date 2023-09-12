import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'Xbox Series S/X'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Terror',
    imagem: '',
    plataformas: ['Xbox Series S/X', 'Windows'],
    preco: 50.0,
    precoAntigo: 150.0,
    titulo: 'Texas'
  },
  {
    id: 4,
    categoria: 'Horror',
    imagem: '',
    plataformas: ['Windows', 'PS5'],
    preco: 100,
    precoAntigo: 299.9,
    titulo: 'Dead by the light'
  }
]

const server = setupServer(
  rest.get('http://localhost:4000', (requisicao, resposta, contexto) => {
    return resposta(contexto.json(mocks))
  })
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  beforeAll(() => server.close())

  test('Deve renderizar corretamente com o texto de carregando', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando..')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
    })
  })
})
