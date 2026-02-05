const db = require("../config/db");

const getById = async (req, res) => {
    try{
        const { id } = req.params
        const query = 'SELECT * FROM product WHERE id = ?'
        const [rows] = await db.query(query, id)
        await res.status(200).json({
            message: 'berhasil get data',
            data: rows
        })
    } catch(error) {
        throw error
    }
}

const getProduct = async (req, res) => {
  try {
    const query =
      "SELECT * FROM product";
    const [rows] = await db.execute(query);
    res.status(200).json({
      message: "berhasil get data",
      data: rows,
    });
  } catch (err) {
    throw err;
  }
};

const postProduct = async (req, res) => {
  try {
    const data = {
      nama: req.body.nama,
      harga: req.body.harga
    }
    if(!data.nama || !data.harga){
      return res.status(400).json({
        status: "error",
        message: "nama dan harga wajib diisi",
      });
    }
    const query = "INSERT INTO product (nama, harga) VALUES(?,?)";
    await db.execute(query, [data.nama, data.harga]);
    res.status(200).json({
      message: "sukses menambahkan product baru",
    });
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga } = req.body;

    if(!nama || !harga){
      return res.status(400).json({
        status: "error",
        message: "nama dan harga wajib diisi",
      });
    }

    const query = `
      UPDATE product
      SET nama = ?, harga = ?
      WHERE id = ?
    `;

    await db.execute(query, [nama, harga, id]);

    res.status(200).json({
      message: "Data product berhasil diupdate",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update product",
      error: error.message,
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM product WHERE id=?";
    await db.execute(query, [id]);
    res.status(200).json({
      message: "berhasil hapus data dengan id " + id,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProduct,
  getById,
  postProduct,
  updateProduct,
  deleteProduct,
};
