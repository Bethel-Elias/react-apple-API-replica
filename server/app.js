/* question-1 */
require("dotenv").config();
let mysql = require("mysql2");
// console.log(mysql);
let express = require("express");
let cors = require("cors");
// let bodyparser = require("body-parser");
// console.log(bodyparser);

let App = express();
App.use(cors());

// App.use(bodyparser.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// to check server is running yegara hosting
App.get("/test", (req, res) => {
  res.send("backend Server is running");
});

const PORT = process.env.PORT || 4000;

let connection = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectTimeout: 10000,

  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

/* question-2 */

App.get("/install", (req, res) => {
  let Products = `CREATE TABLE if not exists ProductTable(        
  product_id int auto_increment,        
  product_url varchar(255) not null,        
  product_name varchar(255) not null, 

  PRIMARY KEY (product_id)    
  )`;

  let Description = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description varchar(255) not null,
    product_description varchar(255) not null,
    product_img varchar(255) not null,
    product_link varchar(255) not null,

    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES ProductTable(product_id)
)`;

  let Price = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,    
    starting_price varchar(255) not null,
    price_range varchar(255) not null,

    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES ProductTable(product_id)
)`;

  let User = `CREATE TABLE if not exists ProductUser(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_password varchar(255) not null,

    PRIMARY KEY (user_id)
)`;

  let Order = `CREATE TABLE if not exists ProductOrder(
    order_id INT AUTO_INCREMENT,
    product_id int(11) not null,
    user_id INT NOT NULL,


    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES ProductTable(product_id),
    FOREIGN KEY (user_id) REFERENCES ProductUser(user_id)
)`;

  connection.query(Products, (err) => {
    if (err) console.log(err);
  });
  connection.query(Description, (err) => {
    if (err) console.log(err);
  });
  connection.query(Price, (err) => {
    if (err) console.log(err);
  });
  connection.query(User, (err) => {
    if (err) console.log(err);
  });
  connection.query(Order, (err) => {
    if (err) console.log(err);
  });

  res.send("Table created");
});

/* question-3 */

App.post("/add-product", (req, res) => {
  console.log(req.body);

  let {
    product_url,
    product_name,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    // user_name,
    // user_password,
    // order_id,
  } = req.body;

  let insertProduct = `INSERT INTO ProductTable (product_url,product_name) VALUES (?, ?) ;`;

  let insertDescription = `INSERT INTO ProductDescription (product_id, product_brief_description,product_description,product_img,product_link) VALUES (?, ?, ?, ?, ?) ;`;

  let insertPrice = `INSERT INTO ProductPrice (product_id, starting_price,price_range) VALUES (?, ?, ?) ;`;

  // let insertUser = `INSERT INTO ProductUser (user_name,user_password) VALUES (?, ?) ;`;

  // let insertOrder = `INSERT INTO ProductOrder (order_id,product_id) VALUES (?, ?) ;`;

  connection.query(
    insertProduct,
    [product_url, product_name],
    (err, results) => {
      if (err) console.log(`error found: ${err}`);
      console.log(results);

      let id = results.insertId;

      connection.query(
        insertDescription,
        [
          id,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ],
        (err, results) => {
          if (err) console.log(`error found: ${err}`);
        }
      );
      connection.query(
        insertPrice,
        [id, starting_price, price_range],
        (err, results) => {
          if (err) console.log(`error found: ${err}`);
        }
      );
      // connection.query(insertUser, [id, user_name,user_password], (err, results) => {
      //   if (err) console.log(`error found: ${err}`);
      // });
      // connection.query(insertOrder, [id, order_id], (err, results) => {
      //   if (err) console.log(`error found: ${err}`);
      // });
    }
  );
  res.send("Data inserted");
});

// App.put("/update", (req, res) => {
//   let { product_url, product_name } = req.body;
//   console.table(req.body);

//   let updateTable = `UPDATE ProductTable
//                     SET product_name = 'iphone';
//                     WHERE procuct_id = '34'`;

//   connection.query(updateTable, (err, results) => {
//     if (err) throw err;
//     console.log(results.affectedRows + " record(s) updated");

//   })
//     res.end("updated");
// });

// App.delete("/remove", (req, res) => {
//   let {
//     product_url,
//     product_name,
//     product_brief_description,
//     product_description,
//     product_img,
//     product_link,
//     starting_price,
//     price_range,
//     // user_name,
//     // user_password,
//     // order_id,
//   } = req.body;

//   let removeProducts = `DELETE FROM productTable WHERE product_id =6`
//   let removeDescription = `DELETE FROM productTable WHERE product_id =6`;
//   let removeprice = `DELETE FROM productTable WHERE product_id =6`;

//   connection.query(removeprice, (err, results) => {
//     if (err) throw err;
//     console.log(results.affectedRows + " record(s) Deleted");
//   });

// connection.query(removeDescription, (err, results) => {
//   if (err) throw err;
//   console.log(results.affectedRows + " record(s) Deleted");
// });

// connection.query(removeProducts, (err, results) => {
//   if (err) throw err;
//   console.log(results.affectedRows + " record(s) Deleted");
// });

// res.end("Deleted")
// });

App.get("/iphone", (req, res) => {
  connection.query(
    `SELECT * 
    FROM ProductTable 
    JOIN ProductDescription ON ProductTable.product_id = ProductDescription.product_id 
    JOIN ProductPrice ON ProductTable.product_id = ProductPrice.product_id`,

    (err, rows) => {
      if (!err) res.json({ productsall: rows });
      else console.log(err);
    }
  );
  // res.end("data selected")
});

App.get("/iphone/:product_id", (req, res) => {
  let ID = req.params.product_id;
  console.log(ID);
  connection.query(
    `SELECT * 
    FROM ProductTable 
    JOIN ProductDescription ON ProductTable.product_id = ProductDescription.product_id 
    JOIN ProductPrice ON ProductTable.product_id = ProductPrice.product_id
    WHERE ProductTable.product_id = ?`,
    [ID],

    (err, rows) => {
      if (!err) res.json({ productsall: rows });
      else console.log(err);
    }
  );
});

// App.listen(4000, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("server is running at http://localhost:4000");
//   }
// });

App.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
