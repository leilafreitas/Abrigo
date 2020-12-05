import {Entity, Column, PrimaryGeneratedColumn,JoinColumn, OneToMany} from 'typeorm';
import Image from './Image';
@Entity('abrigos')
export default class Abrigo{
    @PrimaryGeneratedColumn('increment')
    id:number;
    @Column()
    name:string;
    @Column()
    latitude:number;
    @Column()
    longitude:number;
    @Column()
    about:string;
    @Column()
    instructions:string;
    @Column()
    open_on_weekends:boolean;
    @Column()
    opening_hours:string;
    @Column()
    phonenumber:string;
    @Column()
    instagram:string;
    @Column()
    facebook:string;
    @Column()
    whatsapp:string;
    @OneToMany(()=>Image,image=>image.abrigo,{
        cascade:['insert','update']
    })
    @JoinColumn({name:'abrigo'})
    images:Image[];

}
