import express from "express";
const app = express();
import bodyParser from "body-parser";
import axios from "axios"

//PortNo
const portNo = 3000;
//token 
const bearerToken = "0f6a3d76-4a15-41b7-90c4-258562e82113";
//API URL
const API_URL = "https://secrets-api.appbrewery.com";

//middleware
app.use(bodyParser.urlencoded({extended: true}));

//config
const config = {
    headers:{
        Authorization: `Bearer ${bearerToken}` 
    }
}


//routes
app.get("/", async (req,res) => {
    res.render("index.ejs", {content: "Waiting for data..."});
})

//Search by ID
app.post("/get-secret", async (req,res) => {
    const searchId = req.body.id;
     try{
        const result = await axios.get(API_URL + "/secrets/" + searchId, config);
        console.log(JSON.stringify(result.data));
        res.render("index.ejs", {content: JSON.stringify(result.data)});
    }
    catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)})
    }
})

//Post a secret
app.post('/post-secret', async(req,res) => {
    
    const body = {
            "secret": req.body.secret,
            "score": req.body.score
        };
    try {
        const result = await axios.post(API_URL + "/secrets", body, config);
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    }
    catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)})
    }
})

//PUT Secret
app.post("/put-secret", async (req,res) => {
    const searchId = req.body.id;
    const body = {
        "secret": req.body.secret,
        "score": req.body.score
    };
    try {
    const result = await axios.put(API_URL + "/secrets/" + searchId, body, config );
    console.log(JSON.stringify(req.body.secret));
    console.log(JSON.stringify(req.body.score));
    res.render("index.ejs", {content: JSON.stringify(result.data)});
    }
    catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})

//PATCH
app.post("/patch-secret", async (req, res) => {
    const searchId = req.body.id;
    try {
      const result = await axios.patch(
        API_URL + "/secrets/" + searchId,
        req.body,
        config
      );
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
  });

//DELETE
app.post("/delete-secret", async (req,res) => {
    const searchId = req.body.id;
    try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config );
    res.render("index.ejs", {content: JSON.stringify(result.data)});
    }
    catch(error){
        res.render("index.ejs", {content: JSON.stringify(error.response.data)});
    }
})


app.listen(portNo, () => {
    console.log('Server up and running...');
})
