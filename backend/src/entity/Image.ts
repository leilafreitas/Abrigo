
import {Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm';
import Abrigo from './Abrigo';
@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    path:string; 
    @ManyToOne(()=>Abrigo, abrigo=> abrigo.images)
    @JoinColumn({name:'abrigo_id'})
    abrigo:Abrigo;
}