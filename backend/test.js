const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rodrigojAlexis19:TUCONTRASEÑA@rodrigocluster1.obbnumb.mongodb.net/test')
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('❌ Falla al conectar a MongoDB Atlas:', err));
