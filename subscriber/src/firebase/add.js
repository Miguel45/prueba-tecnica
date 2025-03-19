const { db } = require("./loadDb")

const add = async (collection, data) => {
  try {
    const newDoc = await db.collection(collection).add(data);
    console.log("Documento agregado con ID:", newDoc.id);
  } catch (error) {
    console.error("Error al agregar documento:", error);
  }
}

module.exports = {add}