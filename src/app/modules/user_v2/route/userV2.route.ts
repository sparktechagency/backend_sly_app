import express from 'express';
import { getOwnDataOfUserController } from '../controller/getOwnData.controller';
import { getNumberOfTotalUserController2 } from '../controller/getTotalNumberOfUser.controller';
import { getDataOfUsersController } from '../controller/getDataOfUsers.controller';
import { populateUserController } from '../controller/populateUser.controller';
import { banUserController } from '../controller/banUser.controller';
import { unbanUserController } from '../../admin-v2/controller/unbanUser.controller';
import { unBanUserController3 } from '../controller/unbanUser.controller';
import { searchUserController } from '../controller/searchUser.controller';
import { populateUserController2 } from '../controller/populateUser2.controller';
import { addSuperAdminController } from '../controller/addSuperAdmin.controller';
import { getDataOfUsersController2 } from '../controller/getDataOfUsers2.controller';
import { getDataOfSingleUserController } from '../controller/getDataOfSingleUser.controller';

const userRouterV2 = express.Router();

userRouterV2.get('/get-own-data', getOwnDataOfUserController);
userRouterV2.get('/get-total-number-of-user', getNumberOfTotalUserController2);
userRouterV2.get('/get-data-of-users', getDataOfUsersController2);
userRouterV2.get('/get-data-of-single-user/:id', getDataOfSingleUserController);
userRouterV2.post('/populate-user', populateUserController2);
userRouterV2.post('/ban-user', banUserController);
userRouterV2.post('/unban-user', unBanUserController3);
userRouterV2.get('/search-user/text/:search_text', searchUserController);
userRouterV2.post('/add-super-admin-poqwe', addSuperAdminController);
export { userRouterV2 };
