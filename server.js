console.log("Welcome to UserAuthentication App.");

import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import router from "./routes/routes.js";
import {} from "dotenv/config";

const session_store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "CostCoUsers",
    collectionName: "CostCoSessions"
})

const port = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({extented: true}));
app.use(session({
    secret: "A secret Key to sign the cookie",
    saveUninitialized: false,
    resave: false,
    store: session_store
}));
app.set('view-engine', 'ejs');

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`App is listening port: ${port}`);
});

app.use("/", router);