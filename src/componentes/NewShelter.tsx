import React,{useState,FormEvent,ChangeEvent} from 'react';
import { MapContainer, Marker, TileLayer,useMapEvents} from 'react-leaflet';
import '../styles/pages/newshelter.css';
import 'leaflet/dist/leaflet.css';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import iconMarker from '../utils/mapIcon';
import {ReactComponent as Instagram} from '../images/instagram.svg';
import {ReactComponent as Facebook} from '../images/facebook.svg';
import {ReactComponent as Phone} from '../images/phone.svg';
import {ReactComponent as WhatsApp} from '../images/whatsapp.svg';
import {ReactComponent as Photo} from '../images/photo.svg';

export default function NewShelter(){
    const history=useHistory();
    const[position,setPosition]=useState({latitude:0,longitude:0});
    const[name,setName]=useState('');
    const[about,setAbout]=useState('');
    const[instructions,setInstructions]=useState('');
    const[open_on_weekends,setOpen_on_weekends]=useState(false);
    const[opening_hours, setOpen_hours]=useState('');
    const[intagram,setInstagram]=useState('');
    const[twitter,setTwitter]=useState('');
    const[facebook,setFacebook]=useState('');
    const[phonenumber,setPhoneNumber]=useState('');
    const[whats,setWhats]=useState('');
    const[images,setFiles]=useState<File[]>([]);
    const[previewImages,setPreview]=useState<string[]>([]);
    function LocationMarker() {
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            console.log(e.latlng);
            const{lat,lng}=e.latlng;
            setPosition({latitude:lat,longitude:lng})
            map.flyTo(e.latlng, map.getZoom())
          },
        })
        return position.latitude === 0 ? null:(
            <Marker interactive={false} icon ={iconMarker} position={[position.latitude,position.longitude]}/>     
        ) 
    }
    function handleSelectImages(event:ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
          return;
        }
        const selectedImages=Array.from(event.target.files);
        setFiles(selectedImages);
        const selectedImagesPreviw= selectedImages.map(image =>{
          return URL.createObjectURL(image);
        })
        setPreview(selectedImagesPreviw);
    
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
                            <label htmlFor="instructions">Informações Complementares de Endereço</label>
                            <input id="instructions" value={instructions} onChange={e=>setInstructions(e.target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="about">Descrição <span>Máximo de 300 caracteres</span></label>
                            <textarea id="name" maxLength={300} value={about} onChange={e=>setAbout(e.target.value)} />
                        </div>
                        <div className="input-block">
                        <label htmlFor="images">Fotos</label>
                        <div className="images-container">
                            {
                            previewImages.map(image=>{
                                return (
                                <img src={image} alt="" key={image}/>
                                )
                            })
                            }
                        <label htmlFor='image[]' className="new-image">
                            <Photo style={{height:'40px',width:'40px'}}/>
                        </label>
                        
                        </div>
                        <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Dados para Contato</legend>
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
                        <div className="input-social-block">
                            <Phone  style={{height:'65px',width:'65px'}} className='social'/>
                            <input type='number' pattern="^[0-9]{11}$"  title="You can only enter numbers, with  11 characters."  placeholder='Telefone com o DDD' id="phonenumber" value={phonenumber} onChange={e=>setPhoneNumber(e.target.value)} />   
                        </div>
                        <div className="input-social-block">
                            <Instagram style={{height:'65px',width:'65px'}} className='social'/>
                            <input id="intagram" value={intagram} placeholder='Link para o Instagram' onChange={e=>setInstagram(e.target.value)} />   
                        </div>
                        <div className="input-social-block">
                            <Facebook style={{height:'65px',width:'65px'}} className='social'/>
                            <input id="facebook" value={facebook} placeholder='Link para o Facebook' onChange={e=>setFacebook(e.target.value)} />   
                        </div>
                        <div className="input-social-block">
                            <WhatsApp style={{height:'65px',width:'65px'}} className='social'/>
                            <input type='number' id="whats" pattern="^[0-9]{11}$"  title="You can only enter numbers, with  11 characters." placeholder='WhatsApp com o DDD' value={whats} onChange={e=>setWhats(e.target.value)} />   
                        </div>
                    </fieldset> 
                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>                   
                </form>
            </main>
        </div>
    );
}
