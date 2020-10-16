import {Router} from 'express';
import multer from 'multer';

import OrphanagesController from './controllers/OrphanagesController';
import uploadConfig from '../src/config/upload';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/orphanages',upload.array('images'),OrphanagesController.create); 
routes.get('/orphanages',OrphanagesController.index);
routes.get('/orphanages/:id',OrphanagesController.show);
 
export default routes;