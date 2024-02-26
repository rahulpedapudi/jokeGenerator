import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();

const API = "https://v2.jokeapi.dev/joke/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const result = await axios.get(API + "any", {
    params: {
      type: "twopart",
    },
  });
  const data = JSON.stringify(result.data);
  console.log(result.data);
  res.render("index.ejs", {
    setup: result.data.setup,
    delivery: result.data.delivery,
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
