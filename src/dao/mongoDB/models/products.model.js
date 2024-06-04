import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    code: {
        type: String,
        unique: true, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true 
    },
    owner: {
      type: String,
      default: 'admin',
      required: true,
      validate: {
          validator: function(v) {
              // Validar que el owner es 'admin' o un email de usuario premium
              return v === 'admin' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
      }
  }
})
mongoose.set('strictQuery', false)
productSchema.plugin(mongoosePaginate)

export  const productsModel= mongoose.model('products',productSchema)



