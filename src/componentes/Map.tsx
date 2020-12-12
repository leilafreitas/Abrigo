import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import{TileLayer,Marker,Popup,MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/pages/map.css';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import DogIcon from '../images/dog.png';
import bandeira from '../images/bandeira_rn.png';
import api from '../services/api';
import MapIcon from '../utils/mapIcon';
interface Shelter {
    id:number,
    latitude:number,
    longitude:number,
    name:string
}
function PetsMap(){

        let [abrigo,setAbrigo]=useState<Shelter[]>([]);
    
        useEffect(()=>{
            api.get('abrigos').then(response=>{
                setAbrigo(response.data);
                console.log(abrigo);
            })
        }    
        ,[]);
    return(
        <div className="page-map">
            <aside>
                <header>
                    <img src={DogIcon} alt=""/>
                    <h2>Escolha um abrigo no mapa</h2>
                    <p>Muitos pets estão esperando por um lar </p>

                </header>
                <footer>
                    <div className="infoState">
                        <strong>Rio Grande do Norte</strong>
                        <span>São Miguel</span>
                    </div>
                    <img src={bandeira} alt='RN'/>
                </footer>
            </aside>
            <MapContainer  
            center={[-6.2141753,-38.4958464]}
            zoom={15}
            style={{width:'100%',height:'100%'}}
            className='map-container'
            >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                {abrigo.map(abrigo =>{
                    return (
                            <Marker
                                icon={MapIcon}
                                position={[abrigo.latitude, abrigo.longitude]}
                                key={abrigo.id}
                            >
                                <Popup closeButton={false} minWidth={248} maxWidth={240} className='map-popup'>
                                    {abrigo.name}
                                    <Link to={`/shelter/${abrigo.id}`}>
                                        <FiArrowRight size={20} color='FFF'/>
                                    </Link>
                                </Popup>
                            </Marker>
                            
                    )
                })}
                
            </MapContainer>
            <Link to="/shelter/add" className="create-shelter">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}
export default PetsMap;