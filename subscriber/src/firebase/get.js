const { db } = require("./loadDb")

const get = async (collection) => {
    try {
        const snapshot = await db.collection(collection).get();

        if (snapshot.empty) {
            console.log("No hay documentos en la colección: ", collection);
            return;
        }

        snapshot.forEach(doc => console.log(doc.data()));

    } catch (error) {
        console.error("Error al leer la colección: ", error);
    }
}

module.exports = { get }