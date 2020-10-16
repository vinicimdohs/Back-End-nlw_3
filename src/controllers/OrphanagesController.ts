import {request, Request,Response} from 'express';
import {getRepository}from 'typeorm';
import Orphanage from '../model/Orphanage'
import orphanageview from '../views/orphanages_view';

export default {

    async index(req:Request,res:Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return res.status(200).json(orphanageview.renderMany(orphanages));
    },
    async show(req:Request,res:Response){
        const{id}= req.params;
        
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });

        return res.status(200).json(orphanageview.render(orphanage));
    },
    async create(req:Request,res:Response){
        console.log(req.files);
        const {name,
            latitude,
            longitude,
            about,
            instruction,
            opening_hours,
            open_on_weekends} = req.body;
            
            const orphanagesRepository = getRepository(Orphanage);

            const requestImages = req.files as Express.Multer.File[];
            
            const images = requestImages.map(image =>{
                return {path: image.filename}
            })

            const orphanage = orphanagesRepository.create({
                name,
            latitude,
            longitude,
            about,
            instruction,
            opening_hours,
            open_on_weekends,
            images
            });
            
            console.log('chegou aqui');
            await orphanagesRepository.save(orphanage);
            console.log('chegou aqui 222');
            return res.status(201).json(orphanage);
    }
}
