import CrearOrden from '@components/Ordenes/crearOrden'
import VistaAdminsitrador from '@components/vistaAdminsitrador'
import { Box, Grid } from '@mui/material'
import { grey } from '@mui/material/colors'
import styles from '@styles/layout.module.scss'
import ContractConnect from '../components/ContractConnect'
import ListaOrdenes from '../components/ListaOrdenes'
const sxProps = {
  mx: 2,
  my: 5,
  p: 5,
  borderRadius: 2,
  backgroundColor: grey[400],
}

export default function Home() {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Box sx={sxProps} className={styles.base}>
          {/* <Componente del gsus> */}
          <h1>Ordenes Abiertas y demas</h1>
          <ListaOrdenes></ListaOrdenes>
          <VistaAdminsitrador></VistaAdminsitrador>
          <ContractConnect />
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={sxProps} className={styles.base}>
          <h1>Ordenes compra/Venta e intercambio</h1>
          <CrearOrden />
        </Box>
      </Grid>
    </Grid>
  )
}
