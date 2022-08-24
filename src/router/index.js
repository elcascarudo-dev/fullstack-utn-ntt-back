const { Router } = require('express');
const router = new Router();

router.use( '/listas',  require('./lists.router') );
router.use( '/elementos',  require('./items.router') );


module.exports = router;