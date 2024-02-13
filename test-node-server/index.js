const expres=require("express");
const { MongoClient } = require('mongodb');
const { ObjectId } =require("mongodb")
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'test1';

const app=expres();
app.use(expres.json())
//localhost:8080/tutorial ---- get
app.get("/tutorials", async (req, res) => {
    const queryParams=req.query;
    try {
        // Make a connection to the database
        await client.connect();
        console.log('Connected successfully to server');

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection('tutorials');

        // Fetch data from the collection
        const data = await collection.find(queryParams).toArray();

        // Send response
        res.json({"message": "success", "data": data});
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        res.status(500).json({"message": "error"});
    } finally {
        // Close the database connection
        await client.close();
        console.log('Connection closed');
    }
});

//localhost:8080/tutorial ---- post
app.post("/tutorials", async (req, res) => {
    //get body
    const body=req.body;
    try {
        // Make a connection to the database
        await client.connect();

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection('tutorials');

        // insert body into the collection
        const insertRecord=await collection.insertOne(body)
        //to check the data is there
        const data = await collection.find({}).toArray();
        // Send response
        res.json({"message": "success", "data": data});
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        res.status(500).json({"message": "error"});
    } finally {
        // Close the database connection
        await client.close();
        console.log('Connection closed');
    }
});

//delete

app.delete("/tutorials/:id", async (req, res) => {
    //get path parameter
    const docId= new ObjectId(req.params.id);
    try {
        // Make a connection to the database
        await client.connect();

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection('tutorials');

        // insert body into the collection
        const insertRecord=await collection.deleteOne({_id :docId})
        //to check the data is there
        const data = await collection.find({}).toArray();
        // Send response
        res.json({"message": "success", "data": data});
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        res.status(500).json({"message": "error"});
    } finally {
        // Close the database connection
        await client.close();
        console.log('Connection closed');
    }
});

app.listen(8080,()=>console.log("server started on port 8080"))