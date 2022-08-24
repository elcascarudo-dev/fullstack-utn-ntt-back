const { Router } = require( 'express' );
const router = new Router();

const {
  newItem,
  getItemsById,
  deleteItemsById,
  completedItem,
} = require( '../controllers/items.controller' );

router.post( '/', async ( req, res ) => {

  try {
    const result = await newItem( req.body );
  
    res.json({ ok: true, data: result[0] });

  } catch (error) { res.json({ ok: false, data: error }) }
  
})


router.get( '/', async ( req, res ) => {

  const id =  req.body.id;

  try {
    const result = await getItemsById( id );
  
    res.json({ ok: true, data: result });

  } catch (error) { res.json({ ok: false, data: error }) }
  
})


router.delete( '/', async ( req, res ) => {

  const id =  req.body.id;
  
  try {
    
    const resp = await deleteItemsById( id );

    res.json({ ok: true, data: resp });
  
  } catch (error) { res.json({ ok: false, data: error }) }


})

router.post( '/cambio', async ( req, res ) => {

  const id =  req.body.id;
  const estado =  req.body.estado;
  
  try {
    
    const resp = await completedItem( id, estado );

    res.json({ ok: true, data: resp });
  
  } catch (error) { res.json({ ok: false, data: error }) }


})



module.exports = router;