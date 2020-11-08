import {MigrationInterface, Table, QueryRunner} from "typeorm";

export class UserMigration1604802114302 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'abrigos',
            columns:[
                {
                    name:'id',
                    type:'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment',
                },
                {
                    name:'name',
                    type:'varchar',
                },
                {
                    name:'latitude',
                    type:'decimal',
                    scale:4,
                    precision:10,
                },
                {
                    name:'longitude',
                    type:'decimal',
                    scale:4,
                    precision:10,
                },
                {
                   name:'about',
                   type:'text' 
                },
                {
                    name:'instructions',
                    type:'text' 
                },
                {
                    name:'open_on_weekends',
                    type:'boolean',
                    default:false 
                },
                {
                    name:'opening_hours',
                    type:'varchar'
                },
                {
                    name:'phonenumber',
                    type:'varchar'
                },
                {
                    name:'instagram',
                    type:'varchar'  
                },
                {
                    name:'facebook',
                    type:'varchar'
                },
                {
                    name:'whatsapp',
                    type:'varchar'
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('abrigos');
    }

}
//npm run typeorm migration:run