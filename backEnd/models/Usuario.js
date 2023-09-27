import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);

});

usuarioSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;