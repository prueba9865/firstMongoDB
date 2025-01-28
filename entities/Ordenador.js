const mongoose = require('mongoose');

// Conexión a la base de datos
const password = process.env.PASSWORD;

mongoose.connect(`mongodb+srv://alberto:${password}@cluster0.bregh.mongodb.net/almacen`)
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error de conexión:', err));

// Esquema del documento
const ordenadorSchema = new mongoose.Schema({
    marca: String,
    precio: Number
});

// Creamos el modelo
const OrdenadorModel = mongoose.model('Ordenador', ordenadorSchema, 'ordenadores');

// Clase Ordenador
class Ordenador {
    // Buscar el primer ordenador
    static buscarPrimero() {
        OrdenadorModel.findOne()
            .then(ordenador => {
                if (ordenador) {
                    console.log('Primer ordenador encontrado', ordenador);
                } else {
                    console.log('No se encontró ningún registro');
                }
            })
            .catch(err => console.error('Error al obtener el ordenador', err));
    }

    // Buscar todos los ordenadores
    static buscarTodos() {
        OrdenadorModel.find()
            .then(ordenadores => {
                if (ordenadores.length > 0) {
                    console.log('Ordenadores encontrados', ordenadores);
                } else {
                    console.log('No se encontró ningún registro');
                }
            })
            .catch(err => console.error('Error al obtener los ordenadores', err));
    }

    // Buscar por ID
    static buscarPorId(id) {
        OrdenadorModel.findById(id)
            .then(ordenador => {
                if (ordenador) {
                    console.log('Ordenador encontrado', ordenador);
                } else {
                    console.log('No se encontró ningún registro');
                }
            })
            .catch(err => console.error('Error al obtener el ordenador', err));
    }

    // Buscar por precio mayor a un valor
    static buscarPorPrecioMayorA(precio) {
        OrdenadorModel.find({ precio: { $gt: precio } })
            .then(ordenadores => {
                if (ordenadores.length > 0) {
                    console.log('Ordenadores encontrados con precio mayor a ' + precio, ordenadores);
                } else {
                    console.log('No se encontró ningún registro');
                }
            })
            .catch(err => console.error('Error al obtener los ordenadores', err));
    }

    // Crear un nuevo ordenador
    static crearOrdenador(marca, precio) {
        const nuevoOrdenador = new OrdenadorModel({
            marca: marca,
            precio: precio
        });

        nuevoOrdenador.save()
            .then(ordenador => console.log('Ordenador guardado:', ordenador))
            .catch(err => console.error('Error al guardar el ordenador:', err));
    }

    // Actualizar un ordenador
    static actualizarOrdenador(id, nuevoPrecio) {
        OrdenadorModel.findByIdAndUpdate(id, { precio: nuevoPrecio }, { new: true })
            .then(ordenadorActualizado => {
                if (ordenadorActualizado) {
                    console.log('Ordenador actualizado:', ordenadorActualizado);
                } else {
                    console.log('No se encontró ningún ordenador con ese ID.');
                }
            })
            .catch(err => console.error('Error al actualizar el ordenador:', err));
    }

    // Eliminar un ordenador
    static eliminarOrdenador(id) {
        OrdenadorModel.findByIdAndDelete(id)
            .then(ordenadorEliminado => {
                if (ordenadorEliminado) {
                    console.log('Ordenador eliminado:', ordenadorEliminado);
                } else {
                    console.log('No se encontró ningún ordenador con ese ID.');
                }
            })
            .catch(err => console.error('Error al eliminar el ordenador:', err));
    }

    // Insertar varios ordenadores
    static insertarVariosOrdenadores() {
        const ordenadores = [
            { marca: 'Asus', precio: 2800 },
            { marca: 'Lenovo', precio: 2000 }
        ];

        OrdenadorModel.create(ordenadores)
            .then(ordenadoresCreados => {
                console.log('Ordenadores creados:', ordenadoresCreados);
            })
            .catch(err => console.error('Error al crear los ordenadores:', err));
    }
}

// Exporta el modelo y las funciones de la clase
module.exports = Ordenador;