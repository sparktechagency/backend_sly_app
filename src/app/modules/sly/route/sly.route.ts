import express from 'express';
import { buySlyController } from '../controller/buySly.controller';
import { addSlyPackagesController } from '../controller/addSlyPackages.controller';
import { updateSlyPackageController } from '../controller/updateSlyPackage.controller';
import { deleteSlyPackageController } from '../controller/deleteSlyPackage.controller';
import { getSlyPackagesController } from '../controller/getSlyPackages.controller';

const router = express.Router();

router.get('/sly-package/get', getSlyPackagesController);
router.post('/sly-package/add', addSlyPackagesController);
router.post('/sly-package/update', updateSlyPackageController);
router.post('/sly-package/delete', deleteSlyPackageController);
router.post('/buy', buySlyController);

export const slyRouter = router;
