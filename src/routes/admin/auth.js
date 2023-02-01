const express = require('express');
const { requireSignin } = require('../../common-middleware/index');
const { signup, signin, signout } = require('../../controllers/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validator/auth');
const router = express.Router();

const app = express();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.post('/admin/signout', requireSignin, signout);
// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: "profile" })
// })

module.exports = router;
