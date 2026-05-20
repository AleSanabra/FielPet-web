const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('fielpet');
});



// Cualquier otra dirección, manda a index PERO permite archivos estáticos
router.use((req, res, next) => {

    // Si es un archivo estático, continuar
    if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|webp)$/)) {
      return next();
    }
  
    // Si no es archivo estático, redirigir al inicio
    res.redirect('/');
  });



module.exports = router;
