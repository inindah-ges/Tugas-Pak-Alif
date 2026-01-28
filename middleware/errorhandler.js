const errorhandler = (err, res, req, next) => {
    console.log(err.message);

    res.status(500).json({
        message: 'Terjadi kesalahan pada server',
        error: err.message   
    })
}

module.exports= errorhandler 