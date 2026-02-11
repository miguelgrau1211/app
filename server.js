const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Configuración de la conexión a la base de datos
// Railway proporciona la variable MYSQL_URL automáticamente
const connection = mysql.createConnection(process.env.MYSQL_URL || process.env.DATABASE_URL);

app.get('/', (req, res) => {
  // Consulta simple para verificar que la base de datos funciona
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      return res.send(`<h1>Error de conexión a la BD:</h1> <p>${err.message}</p>`);
    }

    // Reemplaza esta URL con la tuya de Cloudinary más adelante
    const imageUrl = 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'; 
    
    res.send(`
      <h1>Hola Mundo desde Railway!</h1>
      <p>Estado de la Base de Datos: <strong>Conectada correctamente</strong> (Resultado de prueba: ${results[0].solution})</p>
      <hr>
      <h3>Imagen desde Cloudinary (Opcional Avanzado):</h3>
      <img src="${imageUrl}" alt="Imagen de prueba" style="max-width: 300px; border-radius: 8px;">
    `);
  });
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});