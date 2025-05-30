import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUser, getCurrentUserProfile, updateCurrentProfile, deleteUserById, getUserById, updateUserById } from '../controllers/userController.js'
import { authenticated, authorizeAdmin } from '../middleware/authMiddleWare.js'
const router = express.Router();

router.route("/").post(createUser).get(authenticated, authorizeAdmin, getAllUser)
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)



router.route('/profile').get(authenticated, getCurrentUserProfile).put(authenticated, updateCurrentProfile);
router.route('/:id').get(authenticated, authorizeAdmin, deleteUserById).get(authenticated, authorizeAdmin, getUserById).put(authenticated, authorizeAdmin, updateUserById);
export default router