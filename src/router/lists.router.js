const { Router } = require( 'express' );
const router = new Router();

const { 
  getLists,
  getListById,
  newList,
  deleteList,
} = require( '../controllers/lists.controller' );

const {
  getItemsById
} = require( '../controllers/items.controller' );


/************************************************************************
 * Buscar titulos de todas las listas
 */
router.get( '/', async ( _, res ) => {

  let aux = [];
  
  try {

    const listas = await getLists();
    
    for (const lista of listas) {
      const elementos  = await getItemsById( lista.id );

      aux.push({ lista, elementos });
    }

    res.json({ 
      ok: true, 
      data: aux
    });

  } catch (error) { res.json({ ok: false, data: error }) }

});


/************************************************************************
 * Buscar titulo de una Lista
 */
 router.get( '/:id', async (req, res ) => {

  const id = req.params.id;

  try {

    const title = await getListById( id );
    const elements  = await getItemsById( id );
    res.json({ 
      ok: true, 
      data: {
        title,
        elements
      } 
    });

  } catch (error) { res.json({ ok: false, data: error }) }

});

/************************************************************************
 * Guardar titulo de una nueva Lista 
 */
router.post( '/', async ( req, res ) => {

  const title = req.body.title;

  try {

    const result = await newList( title );

    res.json({ ok: true, data: result[0] });
  
  } catch (error) { res.json({ ok: false, data: error }) }

});


router.delete( '/', async ( req, res ) => {

  const id =  req.body.id;
  
  try {
    
    const resp = await deleteList( id );

    res.json({ ok: true, data: resp });
  
  } catch (error) { res.json({ ok: false, data: error }) }


})

module.exports = router;