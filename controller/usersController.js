const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")

const loginUsers= async ( req, res, next) => {
  try {
    const {username, password} = req.body;
    if (!username || !password){
      return res.status(400).json ({
        status: "error",
        message: "username dan password wajib diisi"
      })}    
    
    const query= "SELECT * FROM users WHERE username=?"
    const [rows]= await db.execute (query, [username]);

    if (rows.length ===0){
      return res.status (401).json ({
    message: "username atau password salah"
      })
  }
    const user = rows[0];

    const isMatch = await bcrypt.compare (password, user.password);

    if (!isMatch){
      return res.status (401).json ({
        message: "username atau password salah"
      })

      const token = jwt.sign (
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );}
      return res.status (200).json ({
        message: "login berhasil",
        token: token
      })
  } catch (error) {
    next (error);
    }
  }

 const getUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM users ";
    const [rows] = await db.execute(query);
    res.status(200).json({
      message: "berhasil get data user",
      data: rows,
    });
  } catch (err) {
    throw err;
  }
};

const postUsers = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;
    if (!nama || !email || !password || !role) {
      return res.status(400).json({
        status: "error",
        message: "nama, email, password, dan role wajib diisi",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const query =
      "INSERT INTO users (nama, email, password, role) VALUES (?,?,?,?)"
       await db.execute(query, [nama, email, hashedPassword, role]);

    res.status(201).json({
      status: "success",
      message: "Sukses menambahkan user baru",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const { nama, email, password, role } = req.body;

    const query = `
      UPDATE users
      SET nama = ?, email = ?, password = ?, role = ?
      WHERE id = ?
    `;

    await db.execute(query, [nama, email, password, role, id]);

    res.status(200).json({
      message: "Data user berhasil diupdate",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update user",
      error: error.message,
    });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id=?";
    await db.execute(query, [id]);
    res.status(200).json({
      message: "berhasil hapus data users dengan id " + id,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
};
