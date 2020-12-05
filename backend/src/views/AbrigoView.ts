import Abrigo from "../entity/Abrigo";
import imagesView from "./ImageView";
import * as Yup from 'yup';

export default{
    render(abrigo:Abrigo){
        return{
            id:abrigo.id,
            name:abrigo.name,
            latitude:abrigo.latitude,
            longitude:abrigo.longitude,
            about:abrigo.about,
            instructions:abrigo.instructions,
            open_on_weekends:abrigo.open_on_weekends,
            opening_hours:abrigo.opening_hours, 
            phonenumber:abrigo.phonenumber,
            instagram:abrigo.instagram,
            facebook:abrigo.facebook,
            whatsapp:abrigo.whatsapp,
            image:imagesView.renderMany(abrigo.images)
        }
    },
    renderMany(abrigos:Abrigo[]){
        return abrigos.map(orphanage=> this.render(orphanage))
    }
}