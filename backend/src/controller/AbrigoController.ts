import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import Abrigo from "../entity/Abrigo";
import * as Yup from 'yup';
import AbrigoView from "../views/AbrigoView";

export default {

    async create(req:Request,res:Response){
       console.log('AQUI');
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_on_weekends,
            opening_hours, 
            phonenumber,
            instagram,
            facebook,
            whatsapp
        }= req.body;
        const requentImages= req.files as Express.Multer.File[];
        const images= requentImages.map(image=>{
            return {path:image.filename}
        })
        const data ={
            name,
            latitude,
            longitude,
            about,
            instructions,
            open_on_weekends: open_on_weekends === "true" ,
            opening_hours, 
            phonenumber,
            instagram,
            facebook,
            whatsapp,
            images
        }
        console.log('Antes do schema AQUI');
        const schema = Yup.object().shape({
            name:Yup.string().required(),
            latitude:Yup.number().required(),
            longitude:Yup.number().required(),
            about:Yup.string().required().max(300),
            instructions:Yup.string().required(),
            open_on_weekends:Yup.boolean().required(),
            opening_hours:Yup.string().required(), 
            phonenumber:Yup.string(),
            instagram:Yup.string(),
            facebook:Yup.string(),
            whatsapp:Yup.string(),
            images:Yup.array(
                Yup.object().shape({
                    path:Yup.string().required()
            })
            )
        });
        await schema.validate(data,{
            abortEarly:false,

        });
        console.log('ger repository');
        const abrigoRepository = getRepository(Abrigo)
        const abrigo = abrigoRepository.create(data);
        console.log('depois do create data ');
        await this.abrigoRepository.save(abrigo);
        
        return res.json(abrigo)
    },
    async findOne(req:Request,res:Response){
        const abrigoRepository = getRepository(Abrigo)
        const result=await abrigoRepository.findOneOrFail(req.params.id,{relations:['images']} );
        return res.json(AbrigoView.render(result));
    }

}