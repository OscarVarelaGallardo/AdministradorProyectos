import mongoose from "mongoose";

const tareaSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    fechaEntrega: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    prioridad: {
        type: String,
        required: true,
        trim: true,
        enum: ["ALTA", "MEDIA", "BAJA"],
    },
    estado: {
        type: Boolean,
        default: false,
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    },
   
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
}, { timestamps: true });

const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea;