import mysql from "mysql2/promise";
import express from "express";
import path from "path";

const app = express();

// Correct view engine setting
app.set("view engine", "ejs");

// Set views directory (assuming you have a views folder)
app.set('views', path.resolve('./views'));


app.get('/', async (req, res) => {
  try {
    const pool = mysql.createPool({
      host: 'abdladmin.ddns.net',
      user: 'developer',
      password: 'csdkms@2019', 
      database: 'csdkms',
      port: 14306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    const [results] = await pool.query(
      'SELECT * FROM newscorner2_post WHERE category_id = 4 order by publish_at desc limit 15;'
    );

    console.log(results)
    
    res.render('view', { posts: results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
