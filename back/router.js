const
    express = require('express'),
    router = express.Router();



const homeController = require('./controllers/homeController');

router.route('/')
    .get(homeController.getHome)

router.route('/getblock')
    .get(homeController.getBlock)













module.exports = router;