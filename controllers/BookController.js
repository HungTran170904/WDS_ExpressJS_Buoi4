import BookService from "../services/BookService.js";

class BookController{
          async insertBook(req, res, next){
                    try{
                              const newBook= req.body;
                              await BookService.insertBook(newBook);
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async getBookById(req, res, next){
                    try{
                              const id= req.params["id"];
                              const book= await BookService.getBookById(id);
                              res.status(200).json(book);
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async getBooks(req, res, next){
                    try{
                              const pageSize= req.query.pageSize;
                              const pageNum= req.query.pageNum;
                              const books=await BookService.getBooks(pageSize, pageNum);
                              res.status(200).json(books);
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async updateBook(req, res, next){
                    try{
                              const updatedBook= req.body;
                              await BookService.updateBook(updatedBook);
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }

          async deleteBook(req, res, next){
                    try{
                              const id= req.params["id"];
                              await BookService.deleteBook(id);
                              res.status(201).end();
                    }
                    catch(err){
                              console.log("Error", err.message);
                              if(err.httpCode) res.status(err.httpCode).send(err.message);
                              else res.status(500).send("Unknown error");
                    }
          }
}

export default new BookController();