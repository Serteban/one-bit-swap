import { Columna, Estados, TipoColumna, Token } from '@/types.d'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useCallback, useContext, useState } from 'react'
import NuevoModificaToken from './NuevoModificaToken'
import { BlockchainContext } from '@/context/BlockchainContext'

export const EsNuevoContext = React.createContext<Token | undefined>(undefined)

export default function VistaToken() {
  const [getIncluyeBajas, setIncluyeBajas] = useState<boolean>(true)
  const [getTextoBusqueda, setTextoBusqueda] = useState<string>('')

  const { state, actions } = useContext(BlockchainContext)
  const { tokens } = state
  const { cargarTokens, activarToken, suspenderToken } = actions

  // no esta funcionando bien el filtro conjunto de text y ck¿heck
  const handleBuscar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextoBusqueda(event.target.value.trim())
  }

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncluyeBajas(event.target.checked)
  }

  const handleClicRecargar = () => {
    cargarTokens(getIncluyeBajas)
  }

  const cambiarEstado = useCallback(
    (t: Token) => {
      if (t.estado == Estados.activo) {
        activarToken(t.ticker)
      } else {
        suspenderToken(t.ticker)
      }
    },
    [activarToken, suspenderToken]
  )

  const listarTokens = useCallback(() => {
    return tokens.datos
      .filter((t: Token) => {
        ;(t.ticker.toLowerCase().includes(getTextoBusqueda) ||
          getTextoBusqueda == '') &&
          (getIncluyeBajas ? t.estado == Estados.activo : true)
      })
      .map((row: Token) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={Math.random() * 1000}
          >
            <TableCell key={row.ticker} align="left">
              {row.ticker}
            </TableCell>
            <TableCell key={row.contrato} align="left">
              {row.contrato}
            </TableCell>
            <TableCell key={row.contrato + row.estado} align="left">
              {row.estado}
            </TableCell>
            <TableCell key={row.contrato + row.ticker} align="left">
              <Button variant="contained" onClick={() => cambiarEstado(row)}>
                {row.estado == Estados.activo ? 'Suspender' : 'Activar'}
              </Button>
              {row.estado == Estados.suspendido && (
                <EsNuevoContext.Provider value={row}>
                  <NuevoModificaToken />
                </EsNuevoContext.Provider>
              )}
            </TableCell>
          </TableRow>
        )
      })
  }, [cambiarEstado, getIncluyeBajas, getTextoBusqueda, tokens.datos])

  const columnas: Columna[] = [
    {
      id: TipoColumna.ticker,
      label: TipoColumna.ticker,
      minWidth: 50,
      align: 'left',
    },
    {
      id: TipoColumna.contrato,
      label: TipoColumna.contrato,
      minWidth: 50,
      align: 'left',
    },
    {
      id: TipoColumna.estado,
      label: TipoColumna.estado,
      minWidth: 50,
      align: 'left',
    },
    {
      id: TipoColumna.acciones,
      label: TipoColumna.acciones,
      minWidth: 50,
      align: 'left',
    },
  ]

  return (
    <>
      <EsNuevoContext.Provider value={undefined}>
        <NuevoModificaToken />
      </EsNuevoContext.Provider>

      <TextField
        id="txt-busqueda"
        label={''}
        variant="outlined"
        onChange={handleBuscar}
      />

      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={true}
            value={getIncluyeBajas}
            onChange={handleCheckBox}
          />
        }
        label="Incluye Bajas"
      />

      <Button variant="contained" onClick={handleClicRecargar}>
        Recargar
      </Button>

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnas.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, minWidth: column.minWidth }}
                  >
                    {column.label == TipoColumna.acciones ? '' : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{listarTokens()}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}
