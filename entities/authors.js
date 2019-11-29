const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "satish",
  port: 5432,
  database: "postgres"
});
client
  .connect()
  .then(() => console.log("connected"))
  .catch(err => console.log("error while connection:- ", err.stack));

function getAuthors(){
        
  const query={
    text:`select * from authors`
  } 
return client.query(query);

//.then(res=>res.rows)

// .catch((err)=>console.log("error while displaying :- ",err.stack))

// .then(() => client.end())
//   .then(() =>
//     console.log("client has disconnected"))
//     .catch(err => console.error("error during disconnection", err.stack));
}
module.exports.getAuthors = getAuthors;

function getAuthorById(id) {
  const query = {
    text: `select * from authors where id=$1`,
    values: [id]
  };
  
  return client.query(query)
    // .then(res => console.table(res.rows))
    // .catch(err =>
    //   console.error("went wrong in getAuthorById function ", err.stack)
    // );
}
module.exports.getAuthorById=getAuthorById

//getAuthorById('63-682-9570')

function addAuthor(id, full_name, email, gender, dob) {
  const query = {
    text: `insert into authors (id, full_name, email, gender, dob) values($1,$2,$3,$4,$5)`,
    values: [id, full_name, email, gender, dob]
  };
return addAuthor= client.query(query);
  //  .then(()=>console.log("successfully added"))
  //  .catch((err)=>console.error("wrong while posting".err.stack))
}
module.exports.addAuthor = addAuthor;
// .then(() => console.log("successfully inserted"))
// .catch(err => console.error("went wrong in addAuthor function", err.stack));
//}
//addAuthor()
function updateAuthor(updatedname, id) {
  const query = {
    text: `update authors set full_name=$1 where id=$2`,
    values: [updatedname, id]
  };
  return client.query(query)
    // .then(() => console.log("updated in updateAuthor function"))
    // .catch(err => console.error("went wrong in updateAuther", err.stack));
}
module.exports.updateAuthor=updateAuthor 

function deleteAuthorById(id) {
  const query = {
    text: `delete from authors where id=$1`,
    values: [id]
  };
  
  return client.query(query)
    .then(() => console.log("author deleted"))
    .catch(err => console.error("error in deleteAuthorById", err.stack));
}

module.exports.deleteAuthorById=deleteAuthorById
//deleteAuthorById('63-682-9570')

//getAuthors()
//client.query("select * from authors").then((a)=>console.table(a.rows))
//module.exports.authors=authors
