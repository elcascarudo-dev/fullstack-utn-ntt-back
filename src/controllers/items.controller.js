const { client } = require('../helpers/posgres_connect');


const getItemsById = async ( id ) => {
  
  const result = await client.query(`select * from items where id_list = $1`, [ id ]);

  return result.rows;

}

const newItem = async ({ id_list, item }) => {

  const consulta = 'insert into items  (id_list, item, finished) values ($1, $2, $3 ) RETURNING *';
  const values = [ id_list, item, 'false' ];

  const { rows } = await client.query(consulta, values);

  return rows;
}


const deleteItemsById = async ( id ) => {
  
  const values = [ id ];
  
  const consulta_elementos  = 'delete from items  where id = $1';

  await client.query(consulta_elementos, values);

  return { ok: true };


}


const completedItem = async ( id, estado ) => {
  
  const values = [ id, estado ];
  
  const consulta_elementos  = 'update items set finished=$2 where id = $1';

  await client.query(consulta_elementos, values);

  return { ok: true };


}


module.exports = {
  getItemsById,
  newItem,
  deleteItemsById,
  completedItem,
}