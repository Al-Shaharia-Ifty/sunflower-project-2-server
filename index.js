const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const photoCollection = client.db("novo").collection("photo");
    const commentsCollection = client.db("novo").collection("comments");

    app.get("/photos", async (req, res) => {
      const query = {};
      const result = await photoCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/photo-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const details = await photoCollection.findOne(query);
      res.send(details);
    });

    app.get("/photo-comment/:name", async (req, res) => {
      const serviceName = req.params.name;
      const query = { serviceName: serviceName };
      const comments = await commentsCollection.find(query).toArray();
      res.send(comments);
    });

    app.get("/my-comment/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await commentsCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/photo-comment", async (req, res) => {
      const userInfo = req.body;
      const result = await commentsCollection.insertOne(userInfo);
      res.send(result);
    });
  } finally {
  }
}
// class the function
run().catch((err) => console.log(err));

//
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// KMxb79wl1CKTcCLD
