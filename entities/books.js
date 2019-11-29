const {Client}=require('pg')
const client= new Client({
    host:'localhost',
    user:'postgres',
    password:'satish',
    port:5432,
    database:'postgres'
})
client.connect()
//.then(()=>console.log("connected"))
.catch(err=>console.error("something went wrong while connecting to database",err.stack))

function getBooks(){
   return client.query('select * from books')
    // .then(res=>console.table(res.rows))
    // .catch((err)=>console.log("something went wrong while fetching titles",err.stack))
}

module.exports.getBooks=getBooks
//getBooks()
//updateBook('Revolution 2020','1234456-s')
//deleteBook('1234456-s')
function getBookUsingId(ISBN){
    const query={
        text:`select title from books where ISBN=$1`,
        values:[ISBN]
    }
   return client.query(query)
    // .then((res)=>console.tahdhfhble(res.rows))
    // .catch((err)=>console.error(err.stack))
}
module.exports.getBookUsingId=getBookUsingId

//const ISBN='617908131-X'
//getBookUsingId(ISBN)

function addBook(title,isbn,author,author_id,publish_date){
    const query={
        text:`insert into books(title,isbn,author,author_id,publish_date) VALUES($1,$2,$3,$4,$5)`,
        values:[title,isbn,author,author_id,publish_date]
    }
    return client.query(query)
//     .then(()=>console.log('successfully inserted'))
//     .catch((err)=>console.error("not inserted"))
// 
}
module.exports.addBook=addBook


//addBook()
function updateBook(newName,isbn){
    const query={
        text:`update books set title=$1 where isbn=$2`,
        values:[newName,isbn]
    }
  return  client.query(query)
    // .then(()=>console.log("updated books table "))
    // .catch((err)=>console.error("something went wrong while updating",err.stack))
}
module.exports.updateBook=updateBook
function deleteBook(isbn){
    const query={
        text:`delete from books where isbn=$1`,
        values:[isbn]
    }
 return client.query(query)
    // .then(()=>console.log('deleted successfully'))
    // .catch((err)=>console.log('error while deletion'))
}
module.exports.deleteBook=deleteBook
//deleteBook('1234456-s')



