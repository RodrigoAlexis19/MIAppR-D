// connect.js
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://rodrigojAlexis19:Rodrigo4719361597@rodrigocluster1.obbnumb.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("🎉 Conexión directa a Atlas establecida");
    const db = client.db("test");
    const col = db.collection("testCollection");
    const result = await col.findOne();
    console.log("Consulta de prueba:", result);
  } catch (err) {
    console.error("💥 Fallo de conexión directa:", err);
  } finally {
    await client.close();
  }
}

run();
