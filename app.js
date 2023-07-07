const express = require("express");
const mongoose = require("mongoose");


const uri =
  "mongodb+srv://pushpendra:semidot123@cluster0.0ysxpco.mongodb.net/Restaurants?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  locality: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/restaurants', async (req, res) => {
  const restaurant = new Restaurant(req.body);
  await restaurant.save();
  res.redirect('/restaurants')
  // const { name, city, locality } = req.body;
  // const restaurant = new Restaurant({ name, city, locality });
  // restaurant.save()
    // .then(() => res.redirect('/restaurants'))
    // .catch((error) => console.error('Error saving restaurant:', error));
});

app.get('/restaurants', async (req, res) => {
  const restaurants = await Restaurant.find({})
  res.render('restaurants', { restaurants });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});