//import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
{/* Hooks */ }
import { useEffect, useState } from 'react';
import './App.css'
import Grid from '@mui/material/Grid2'
import IndicatorWeather from './components/IndicatorWeather'
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';

interface Indicator {
   title?: String;
   subtitle?: String;
   value?: String;
}

function App() {
   //const [count, setCount] = useState(0)

   {/* Variable de estado y función de actualización */ }
   let [indicators, setIndicators] = useState<Indicator[]>([])

   {/* Hook: useEffect */ }
   useEffect(() => {
      let request = async () => {
         {/* Request */ }
         let API_KEY = "ad655bd73162581d52d762d5e28c8076"
         let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
         let savedTextXML = await response.text();

         {/* XML Parser */ }
         const parser = new DOMParser();
         const xml = parser.parseFromString(savedTextXML, "application/xml");

         {/* Arreglo para agregar los resultados */ }

         let dataToIndicators: Indicator[] = new Array<Indicator>();

         {/* 
              Análisis, extracción y almacenamiento del contenido del XML 
              en el arreglo de resultados
          */}

         let name = xml.getElementsByTagName("name")[0].innerHTML || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

         let location = xml.getElementsByTagName("location")[1]

         let latitude = location.getAttribute("latitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

         let longitude = location.getAttribute("longitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

         let altitude = location.getAttribute("altitude") || ""
         dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

         //console.log(dataToIndicators)

         {/* Modificación de la variable de estado mediante la función de actualización */ }
         setIndicators(dataToIndicators)
      }

      request();
   }, [])

   return (
      <Grid container spacing={5}>

         {/* Indicadores */}
         {/*<Grid size={{ xs: 12, sm: 3 }}>
            <IndicatorWeather title={'Indicator 1'} subtitle={'Unidad 1'} value={"1.23"} />
         </Grid>
         <Grid size={{ xs: 12, sm: 3 }}>
            <IndicatorWeather title={'Indicator 2'} subtitle={'Unidad 2'} value={"3.12"} />
         </Grid>
         <Grid size={{ xs: 12, sm: 3 }}>
            <IndicatorWeather title={'Indicator 3'} subtitle={'Unidad 3'} value={"2.31"} />
         </Grid>
         <Grid size={{ xs: 12, sm: 3 }}>
            <IndicatorWeather title={'Indicator 4'} subtitle={'Unidad 4'} value={"3.21"} />
         </Grid>*/}

         {
            indicators
               .map(
                  (indicator, idx) => (
                     <Grid key={idx} size={{ xs: 12, sm: 3 }}>
                        <IndicatorWeather
                           title={indicator["title"]}
                           subtitle={indicator["subtitle"]}
                           value={indicator["value"]} />
                     </Grid>
                  )
               )
         }

         {/* Tabla */}
         <Grid size={{ xs: 12, sm: 8 }}>
            {/* Grid Anidado */}
            <Grid container spacing={2}>
               <Grid size={{ xs: 12, sm: 3 }}>
                  <ControlWeather />
               </Grid>
               <Grid size={{ xs: 12, sm: 9 }}>
                  <TableWeather />
               </Grid>
            </Grid>

         </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, sm: 4 }}>
            <LineChartWeather />
         </Grid>

      </Grid>
   )
}

export default App