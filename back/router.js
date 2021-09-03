const
    express = require('express'),
    router = express.Router();

const homeController = require('./controllers/homeController');

router.route('/')
    .get(homeController.getHome)

router.route('/sendTX')
    .post(homeController.sendTX)

router.route('/getNewAddress')
    .post(homeController.getNewAddress)

router.route('/startMining')
    .post(homeController.startMining)


router.route('/stopMining')
    .post(homeController.stopMining)

router.route('/connect')
    .post(homeController.connect)




module.exports = router;