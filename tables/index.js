const { Client } = require("pg");
var fs = require("fs");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "satish",
  port: 5432,
  database: "postgres"
});
client
  .connect()
  .then(() => console.log("successfully connected"))
      
  .catch(err => console.error("connection error", err.stack));

function dropTables(){
    client
    .query("drop table if exists authors")
    .then(() => console.log("successfully authors table deleted"))
    .catch(res => console.error("went wrong while authors deleting", res.stack));
  
  client
    .query("drop table if exists books")
    .then(() => console.log("successfully books table deleted"))
    .catch(res => console.error("went wrong while books deleting", res.stack));
  
}
dropTables()

function createTables(){


client
  .query(
    "create table authors (id varchar(30),full_name varchar(30), email varchar(30), gender varchar(7), dob varchar(15))"
  )
  .then(() => console.log("successfully authors table created"))
  .catch(err => console.error("went wrong something", err.stack));

client
  .query(
    "create table books (title varchar(36),isbn varchar(36),author varchar(36), author_id varchar(16),publish_date varchar(16))"
  )
  .then(() => console.log("successfully books table created"))
  .catch(err =>
    console.error("went wrong something while creating books table", err.stack)
  );
}

createTables()

function insertData(){


const authors = JSON.parse(fs.readFileSync("./datasets/authors.json").toString());

Object.values(authors).forEach(el => {
  
   const query={
     text:`insert into authors (id,full_name,email,gender,dob) values($1,$2,$3,$4,$5)`,
     values:[el.id,el.full_name,el.email,el.gender,el.birth_date]
   }
   client.query(query)
   //.then(()=>console.log('inserted into authors'))
   .catch(err=>console.log('went something wrong while insertind into autors'))

  // client
  //   .query(
  //     `insert into authors (id,full_name,email,gender,dob) values ('${el.id}','${el.full_name}','${el.email}','${el.gender}','${el.birth_date}')`
  //   )
    //.then(() => console.log("inserted into authors table"));
    //.catch(err=>console.error(`went wrong something in insertion authors`,err.stack))
});

const books =JSON.parse(fs.readFileSync('./datasets/books.json').toString())
//console.log(books)
books.forEach((el)=>{

  const query={
    text:'insert into books(title,isbn,author,author_id,publish_date) VALUES($1,$2,$3,$4,$5)',
    values:[el.title,el.ISBN,el.author,el.auther_id,el.published_date]
    
  }
  client.query(query)
  .then("inserted successfully in books")
  .catch((err)=>console.error('went something wrong while inserting in books',err.stack))

//     client
//   .query(
//     `insert into books(title,isbn,author,author_id,publish_date) values('${el.title}','${el.ISBN}','${el.author}','${el.auther_id}','${el.published_date}')`
//   )
// //   .then(() => console.log("inserted into books table"))
//    .catch(err =>console.error(`went wrong something in insertion in books`, err.stack))
// })
})
}

insertData()

client
  .query("select * from authors")
  .then(res => console.table(res.rows))
  .catch(err => console.error("went wrong something", err.stack));

function displayTables(){  
client
  .query("select * from books")
  .then(res => console.table(res.rows))
  .catch(err =>
    console.error("went wrong something while displaying books", err.stack)
  )

  .then(() => client.end())
  .then(() => {
    console.log("client has disconnected");
   
  })
  .catch(err => console.error("error during disconnection", err.stack));
}

displayTables()