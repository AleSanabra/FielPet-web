const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {

  //Leo lista de nombre de fotos de mascotas
  const carpetaMascotas = path.join(__dirname, '../','public/img/mascotas');

  const imagenes = fs.readdirSync(carpetaMascotas)
    .filter(archivo =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(archivo)
    )
    .map(archivo => `/img/mascotas/${archivo}`);

  // Muestro la pagina
  res.render('fielpet', {
    imagenes,
    whatsapp: '5492804300220',
    dominio: 'mascotapiotrowsky.com.ar',
  });
});

/*
router.get('/cotizador', (req, res) => {

  // Muestro la pagina
  res.render('cotizador', {
    whatsapp: '5492804300220',
    dominio: 'mascotapiotrowsky.com.ar',
  });
});
*/

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
