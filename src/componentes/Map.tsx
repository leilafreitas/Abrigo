import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import{TileLayer,Marker,Popup,MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/pages/map.css';
import {FiPlus,FiArrowRight} from 'react-icons/fi';
import DogIcon from '../images/dog.png';
import bandeira from '../images/bandeira_rn.png';

function PetsMap(){

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
  
                
            </MapContainer>
            <Link to="/shelter/add" className="create-shelter">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}
export default PetsMap;