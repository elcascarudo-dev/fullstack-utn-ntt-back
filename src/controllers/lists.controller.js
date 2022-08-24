const { client } = require('../helpers/posgres_connect');


const getLists = async () => {

  const result = await client.query('select * from lists');

  return result.rows ;
   
}


const getListById = async ( id ) => {

  const result = await client.query(`select * from lists where id = $1`, [ id ]);

  return result.rows;
   
}

const newList = async ( listName ) => {


  const consulta = 'insert into lists (title, finished) values ($1, $2) RETURNING *';
  const values = [ listName, 'false' ];

  const { rows } = await client.query(consulta, values);

  return rows;
}

const deleteList = async ( id ) => {

  const values = [ id ];
  
  const consulta_listas     = 'delete from lists  where id = $1';
  const consulta_elementos  = 'delete from items  where id_list = $1';

  await client.query(consulta_elementos, values);
  await client.query(consulta_listas, values);

  return { ok: true };
}


module.exports = {
  getLists,
  getListById,
  newList,
  deleteList,
}