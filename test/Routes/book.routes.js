module.exports= app => {
    const book=require("../controller/book.controller.js");
    const router=require("express").Router();
    // Create a new book
    router.post("/", book.create);

    // Retrieve all book
    router.get("/", book.findAll);

    app.use("/book", router);
}