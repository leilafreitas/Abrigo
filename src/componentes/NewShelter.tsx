import React,{useState} from 'react';
import { MapContainer, Marker, TileLayer,useMapEvents} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import '../styles/pages/newshelter.css';
import 'leaflet/dist/leaflet.css';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function NewShelter(){
    const history=useHistory();
    const[position,setPosition]=useState({latitude:0,longitude:0});
    const[name,setName]=useState('');
    const[about,setAbout]=useState('');
    const[open_on_weekends,setOpen_on_weekends]=useState(false);
    const[opening_hours, setOpen_hours]=useState('');
    const[intagram,setInstagram]=useState('');
    const[twitter,setTwitter]=useState('');
    const[facebook,setFacebook]=useState('');
    const[phonenumber,setPhoneNumber]=useState('');
    function Map(){

    }

    function LocationMarker() {
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            const{lat,lng}=e.latlng;
            setPosition({latitude:lat,longitude:lng})
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        return position.latitude === 0 ? null:(
            <Marker interactive={false} position={[position.latitude,position.longitude]}/>     
        ) 
    }
    return(
        <div id="conteiner">
            <ArrowBackIcon className='Back' />
            <main>
                <form className="create-shelter-form">
                    <fieldset>
                        <legend>Dados do Abrigo</legend>
                        <MapContainer
                            center={[-6.2141753,-38.4958464]} 
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            className='leafleat-map'
                            
                        >
                        <TileLayer 
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker/>                            
                        </MapContainer>


                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id="name" maxLength={300} value={about} onChange={e=>setAbout(e.target.value)} />
                        </div>
                        <div className="input-block">
                        <label htmlFor="opening_hours">Horário de Funcionamento</label>
                        <input id="opening_hours" value={opening_hours} onChange={e=>setOpen_hours(e.target.value)} />
                        </div>

                        <div className="input-block">
                        <label htmlFor="open_on_weekends">Atende fim de semana</label>

                        <div className="button-select">
                            <button type="button" className={open_on_weekends? "active":''} onClick={()=>setOpen_on_weekends(true)}>Sim</button>
                            <button type="button" className={!open_on_weekends? "active":''} onClick={()=>setOpen_on_weekends(false)}>Não</button>
                        </div>
                        </div>
                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de Funcionamento</label>
                            <input id="opening_hours" value={opening_hours} onChange={e=>setOpen_hours(e.target.value)} />
                        </div>



                    </fieldset>                    
                </form>
            </main>
        </div>
    );
}
