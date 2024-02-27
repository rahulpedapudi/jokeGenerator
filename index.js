import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

const API = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ! Add to Favourites
// ! Share Jokes
// ! Infinite Scroll??!?
// ! Copy to clipboard
// ! Light and Dark Modes

var categoryChoice = "";
var result;
var fav = [];

// ! add to favourites
app.post("/fav", (req, res) => {
  console.log(result.data.id);
  fav.push(result.data.id);
  res.redirect("/");
});

// ! handles the favourite list and renders them
app.get("/favlist", async (req, res) => {
  try {
    var favlist = [];

    for (let index = 0; index < fav.length; index++) {
      const element = fav[index];

      const favResult = await axios.get(API + `any?idRange=${element}`);
      const favData = favResult.data;
      favlist.push({ fsetup: favData.setup, fdelivery: favData.delivery });
    }

    res.render("fav.ejs", {
      list: favlist,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// ! Shows the Relevant Joke according to category.
app.post("/", async (req, res) => {
  try {
    categoryChoice = req.body["category"];
    result = await axios.get(API + categoryChoice, {
      params: {
        type: "twopart",
      },
    });
    const data = JSON.stringify(result.data);
    res.render("index.ejs", {
      setup: result.data.setup,
      delivery: result.data.delivery,
      category: result.data.category,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// ! Root route - Random Joke
app.get("/", async (req, res) => {
  try {
    result = await axios.get(API + "any" + "?safe-mode", {
      params: {
        type: "twopart",
      },
    });
    const data = JSON.stringify(result.data);
    res.render("index.ejs", {
      setup: result.data.setup,
      delivery: result.data.delivery,
      category: result.data.category,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
