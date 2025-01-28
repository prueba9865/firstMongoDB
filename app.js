// Using Node.js `require()`
require('dotenv').config()
const mongoose = require('mongoose');
const password = process.env.PASSWORD;

const buscarPrimero = () => {
    // primer registro
    Ordenador.findOne()
        .then(ordenador => {
            if (ordenador) {
                console.log('Primer ordenador encontrado', ordenador)
            } else {
                console.log('No se encontro ningun registro')
            }
        })
        .catch(err => {
            console.error('Error al obtener el ordenador', err)
        })
}

const buscarTodos = () => {
    // primer registro
    Ordenador.find()
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados', ordenadores)
            } else {
                console.log('No se encontro ningun registro')
            }
        })
        .catch(err => {
            console.error('Error al obtener los ordenadores', err)
        })
}

const buscarPorId = (id) => {
    // primer registro
    Ordenador.findById(id)
        .then(ordenador => {
            if (ordenador) {
                console.log('Ordenador encontrados', ordenador)
            } else {
                console.log('No se encontro ningun registro')
            }
        })
        .catch(err => {
            console.error('Error al obtener el ordenador', err)
        })
}

const buscarPorPrecioMayorA = (precio) => {
    // primer registro
    Ordenador.find({ precio: { $gt: precio } })
        .then(ordenadores => {
            if (ordenadores.length > 0) {
                console.log('Ordenadores encontrados con precio mayor a ' + precio, ordenadores)
            } else {
                console.log('No se encontro ningun registro')
            }
        })
        .catch(err => {
            console.error('Error al obtener los ordenadores', err)
        })
}

const crearOrdenador = (marca, precio) => {
    // Crear un nuevo ordenador
    const nuevoOrdenador = new Ordenador({
        marca: marca,
        precio: precio
    });
    // Guardar el ordenador en la base de datos
    nuevoOrdenador.save()
        .then(ordenador => console.log('Ordenador guardado:', ordenador))
        .catch(err => console.error('Error al guardar el ordenador:', err));
}

const actualizarOrdenador = (id, nuevoPrecio) => {
    // Actualizar un ordenador
    //el tercer parametro ( { new: true } ) es para que devuelva el documento actualizado
    Ordenador.findByIdAndUpdate(id, { precio: nuevoPrecio }, { new: true })
        .then(ordenadorActualizado => {
            if (ordenadorActualizado) {
                console.log('Ordenador actualizado:', ordenadorActualizado);
            } else {
                console.log('No se encontró ningún ordenador con ese ID.');
            }
        })
        .catch(err => console.error('Error al actualizar el ordenador:', err));
}

const eliminarOrdenador = (id) => {
    // Eliminar un ordenador
    Ordenador.findByIdAndDelete(id)
        .then(ordenadorEliminado => {
            if (ordenadorEliminado) {
                console.log('Ordenador eliminado:', ordenadorEliminado);
            } else {
                console.log('No se encontró ningún ordenador con ese ID.');
            }
        })
        .catch(err => console.error('Error al eliminar el ordenador:', err));
}

const insertarVariosOrdenadores = () => {
    //insertar varios registros
    // Datos de los ordenadores a insertar
    const ordenadores = [
        { marca: 'Asus', precio: 2800 },
        { marca: 'Lenovo', precio: 2000 }
    ];
    // Insertar los ordenadores
    Ordenador.create(ordenadores)
        .then(ordenadoresCreados => {
            console.log('Ordenadores creados:', ordenadoresCreados);
        })
        .catch(err => console.error('Error al crear los ordenadores:', err));
}

mongoose.connect(`mongodb+srv://alberto:${password}@cluster0.bregh.mongodb.net/almacen`)
    .then(() => console.log('Connected!'));

// esquema del documento
const ordenadorSchema = new mongoose.Schema({
    marca: String,
    precio: Number
})

// creamos el modelo
const Ordenador = mongoose.model('Ordenador', ordenadorSchema, 'ordenadores')