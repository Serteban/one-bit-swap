import { NavMenu } from '@/types.d'
import { Box, Tab, Tabs } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useState } from 'react'
import VistaBilleteras from './VistaBilleteras'
import VistaBilleterasSuspendidas from './VistaBilleterasSuspendidas'
import VistaConfiguracion from './VistaConfiguracion'
import VistaTokens from './VistaTokens'

/******************************************************************************/

interface TabPanelProps {
  children?: React.ReactNode
  index: NavMenu
  value: NavMenu
}

const NAV_ITEMS = [
  'Configuración',
  'Administradores',
  'Billeteras Suspendidas',
  'Tokens',
]

/******************************************************************************/

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ padding: 3, width: '100%', flexGrow: 1 }}
      {...other}
    >
      {value === index && children}
    </Box>
  )
}

/******************************************************************************/

export default function VistaAdminsitrador() {
  const [getTabValue, setTabValue] = useState(NavMenu.configuracion)

  const handleCambiarNavMenu = (
    event: React.SyntheticEvent,
    nuevoValor: NavMenu
  ) => {
    setTabValue(nuevoValor)
  }

  /****************************************************************************/

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'primary.dark',
          color: 'common.white',
        }}
      >
        <Tabs
          value={getTabValue}
          onChange={handleCambiarNavMenu}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {NAV_ITEMS.map((item, index) => (
            <Tab
              key={index}
              sx={{
                color: 'common.white',
                '&.Mui-selected': {
                  backgroundColor: blue[200],
                  color: 'common.white',
                  fontWeight: 'bold',
                },
              }}
              label={item}
              value={item}
            />
          ))}
        </Tabs>
      </Box>

      <TabPanel value={getTabValue} index={NavMenu.configuracion}>
        <VistaConfiguracion />
      </TabPanel>

      <TabPanel value={getTabValue} index={NavMenu.administradores}>
        <VistaBilleteras />
      </TabPanel>

      <TabPanel value={getTabValue} index={NavMenu.billeterasSuspendidas}>
        <VistaBilleterasSuspendidas />
      </TabPanel>

      <TabPanel value={getTabValue} index={NavMenu.tokens}>
        <VistaTokens />
      </TabPanel>
    </>
  )
}
