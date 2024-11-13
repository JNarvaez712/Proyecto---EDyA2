const express = require('express');

//Crear Express App
const app = express();

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok:true
    });
})

//Escuchar n puerto 4000
app.listen(4000, () => {
    console.log('Servidor corriendo en puerto', 4000);
})