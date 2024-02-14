const db=require("../models");
const Book=db.book;

//create and save new book
exports.create = async (req, res) => {
    try {
        // Validation
        if (!req.body.title) {
            return res.status(400).send({ message: "Please enter the title field" });
        }
        
        // Create Book instance
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            published: req.body.published,
        });

        // Save book in the database
        const savedBook = await book.save();

        res.send(savedBook);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the book"
        });
    }
};


exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Book.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };