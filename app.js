const express = require("express")
const app = express();
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const port = 3000;



app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")))


main().then((res) => {
    console.log("Connected to DB!!")
    console.log(res)
}).catch((err) => {
    console.log(err)
})

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/tripNest")
}

app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})

//Home rote
app.get("/", async(req, res) => {
    let listings = await Listing.find({});
    res.render("listings/home.ejs" , {listings})
   
});

//Index route
app.get("/listings", async (req, res) => {

    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing })
})

//New route  (Create New listings)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//show (detail) route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing })
})

//Create Route 
app.post("/listings", async (req, res) => {
    let { title, description, image, price, country, location } = req.body;

    const newListing = new Listing({
        title,
        description,
        image,
        price,
        country,
        location,
    })
    await newListing.save();
    res.redirect("/listings");
})

//Edit route (Edit listing)
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing })
    //res.redirect("/listings/:id")

})

//Update route 
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, country, location } = req.body;


    await Listing.findByIdAndUpdate(id, {
        title,
        description,
        image,
        price,
        country,
        location
    }, { runValidators: true });

    res.redirect(`/listings/${id}`)

})

//Delete Route 
app.delete("/listings/:id/", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})



//Testing
// app.get("/testListing" , async(req , res)=>{
//     let sampleListing = new Listing({
//         title : "My lil Vilaa",
//         description : "It is very opulant . \n It is very large is size" ,
//         image : "https://www.istockphoto.com/photo/drone-view-of-woman-relaxing-on-white-sand-beach-with-palm-tress-gm1196941761-341574212?utm_campaign=adp_photos_sponsored&utm_content=https%3A%2F%2Funsplash.com%2Fphotos%2Fman-walks-beneath-palm-trees-on-a-sandy-path-NxeQUw-mdwk&utm_medium=affiliate&utm_source=unsplash&utm_term=beach%3A%3Aad-balancing-template%3Aexperimentˀˀ" ,
//         price : 13990,
//         location : "Mumbai , marine drive" ,
//         country : "India",

//     })

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("sapmle is succ save")
// })
