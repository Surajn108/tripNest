const mongoose = require("mongoose")

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    description: String,

    image: {
        type: String,
        set: (v) => v === " " ? "https://images.unsplash.com/photo-1754377479970-bc010d2732ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },

    price: Number,
    location: {
        type: String,
        require: true,
    },
    country: String,
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;