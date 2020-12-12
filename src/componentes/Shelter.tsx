import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';
import '../styles/pages/shelter.css';
import happyMapIcon from "../utils/mapIcon";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import api from '../services/api';
import {ReactComponent as Instagram} from '../images/instagram.svg';
import {ReactComponent as Facebook} from '../images/facebook.svg';
import {ReactComponent as Phone} from '../images/phone.svg';
import {ReactComponent as WhatsApp} from '../images/whatsapp.svg';
interface Abrigo {
    name:string,
    latitude:number,
    longitude:number,
    about:string,
    instructions:string,
    open_on_weekends:boolean,
    opening_hours:string,
    phonenumber:string,
    instagram:string,
    facebook:string,
    whatsapp:string,
    image:Array<{
      id:number,
      url:string
    }>;
}
interface param{
  id: string;
}
export default function Shelter(){
    const history=useHistory();
    const params = useParams<param>();
    
    let [abrigo,setAbrigo]=useState<Abrigo>();
    const [activeImageIndex,setActiveImageIndex]=useState(0);
    useEffect(()=>{
        api.get(`abrigos/${params.id}`).then(response=>{
          console.log(response.data)
          setAbrigo(response.data)
          
        })
    },[params.id]);

    if(!abrigo){
      return <p>Carregando</p>
    }
    return (
      <div id="page-shelter">
        
        <ArrowBackIcon className='Back' onClick={()=>history.push('/')}/>
        <main>
          <div className="shelter-details">
            {
              abrigo.image.length>0 &&
              <img src={abrigo.image[activeImageIndex].url} alt="Imagens do Abrigo" />
            }
            
  
            <div className="images">
              {
                
                (abrigo.image.length>0) &&
                    abrigo.image.map((image,index)=>{
                    return (
                        <button className={activeImageIndex === index ? 'active':''} type="button" key={image.id} onClick={()=>setActiveImageIndex(index)}>
                        <img src={image.url} alt={abrigo?.name}/>
                        </button>
                    )
                    })
                
              }
  
            </div>
            
            <div className="shelter-details-content">
              <h1>{abrigo.name}</h1>
              <p>{abrigo.about}</p>
  
              <div className="map-container">
                <MapContainer 
                  center={[abrigo.latitude,abrigo.longitude]}
                  zoom={16} 
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer 
                    url={'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                  />
                  <Marker interactive={false} icon={happyMapIcon} position={[abrigo.latitude,abrigo.longitude]} />
                </MapContainer>
  
                <footer>
                  <a target="_blank" rel="nooper noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${abrigo.latitude},${abrigo.longitude}`}>Ver rotas no Google Maps</a>
                </footer>
              </div>
  
              <hr />
  
              <h2>Instruções para visita</h2>
              <p>{abrigo.instructions}</p>
              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#F27405" />
                  Segunda à Sexta <br />
                  {abrigo.open_on_weekends}
                </div>
                {abrigo.open_on_weekends? 
                (<div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              ):(
                <div className="open-on-weekends dont">
                  <FiInfo size={32} color="#FF6690" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
                
              </div>
              {
                abrigo.phonenumber &&
                <div className="phone">
                  <Phone style={{height:'50px',width:'50px',marginRight:'20px'}}/>
                  {abrigo.phonenumber}
                </div>
              }

              <div className="contatos">
                {
                  abrigo.whatsapp && 
                    <a href={`https://web.whatsapp.com/send?phone=55${abrigo.whatsapp}`} target="_blank">
                      <WhatsApp style={{height:'50px',width:'50px'}}/>
                    </a>
                }
                {
                  abrigo.instagram &&
                    <a href={`${abrigo.instagram}`} target="_blank">
                      <Instagram style={{height:'50px',width:'50px'}}/>
                    </a>
                }
                {
                  abrigo.facebook &&
                    <a href={`${abrigo.facebook}`} target="_blank">
                      <Facebook style={{height:'50px',width:'50px'}}/>
                    </a>
                }
                
              </div>
            </div>
          </div>
        </main>
      </div>
    );
}