const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json("test OK");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect("mongodb://127.0.0.1:27017/moneycontrol").then(() => {
    console.log("Mongodb connected");
  });

  // Extract data from the request body
  const { name, description, datetime, price } = req.body;
  console.log(name);

  // Check if name and description are provided
  if (!name || !description || !datetime) {
    return res
      .status(400)
      .json({ error: "Name description & datatime are required" });
  }

  // Create a new transaction using the Transaction model
  const transaction = await Transaction.create({
    price,
    name,
    description,
    datetime,
  });

  // Respond with the created transaction as JSON
  res.json(transaction);
});

app.listen(4000, () => {
  console.log(`listening on PORT 4000`);
});
