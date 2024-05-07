import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardRickMorty } from './components/CardRickMorty'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const position = ({lat:-25.4249717, lng: -49.272306})

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
 
  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if(!response.data.results){
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if(error.response.status === 404){
        console.log("Esta pagina nao contem este personagem")
      }
      console.error(error)
    })
  }, [page])

  return (
    <>
    <div className={style.wrapBtns}>
      <button onClick={() => setShow("prod")}>Produtos</button>
      <button onClick={() => setShow("api")}>API</button>
      <button onClick={() => setShow("map")}>Mapa</button>
    </div>
    <div  className={style.wrapPage}>
      <h1>Exercícios de manutenção</h1>
     {show === "prod" &&
        <>
          <h2>Showroom de produtos</h2>
            <div className={style.cards}>
            {produtos.map((item) => {
              return(
                <Card name={item.name} desc={item.desc} categ={item.categ} status={item.status} value={item.value} image={item.image} key={item.id}/>
              )
             })}
            </div>
        </>
      }
     {show === "api" &&
        <>
          <h2>Rick and Morty API</h2>
            <div>
               <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)}/>
            </div>
            <div className={style.cards}>
            {data.map((item) => { 
             return(
              <div key={item.id}>
                <CardRickMorty name={item.name} desc={item.species} value={item.gender} image={item.image} />
                {/* <button onClick={() => {}}>Info</button> */}
              </div>
              )
           })}
            </div>
       </>
      }
     {show === "map" &&
        <>
      <h2>Mapa</h2>
          <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={style.mapa}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <a href={`https://www.google.com/maps/place/Sistema+Fiep+-+Unidade+Centro/@${position.lat},${position.lng},17z/data=!4m10!1m2!2m1!1ssenai+centro+celso!3m6!1s0x94dce41197a84179:0x142fc7abe5169a05!8m2!3d-25.4249717!4d-49.272306!15sChJzZW5haSBjZW50cm8gY2Vsc28iA4gBAZIBF2VkdWNhdGlvbmFsX2luc3RpdHV0aW9u4AEA!16s%2Fg%2F1ptznr269?entry=ttu`}>Google Maps</a>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
         </>
      }
    </div>
    </>
  )
}

export default App
