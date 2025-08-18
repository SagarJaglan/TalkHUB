import express from 'express';
import { register, login, getProfile, logout, getOtherUsers, searchUsers } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout',logout)
router.get('/get-profile',isAuthenticated,getProfile);
router.get('/other-users', isAuthenticated, getOtherUsers);
router.get('/search', isAuthenticated,searchUsers )


export default router;