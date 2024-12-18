import fs from "fs/promises"
import { BASE_STORAGE_NAME } from "../configs/EnvConfig.js";
import PagingUtil from "../common/PagingUtil.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";

class BookService {
          constructor(){
                    this.STORAGE_PATH= BASE_STORAGE_NAME+"/books.json";
          }
          
          async insertBook(newBook) {
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const books= JSON.parse(data);
                    
                    const existedBooks= books.filter(book=> book.id === newBook.id);
                    if(existedBooks.length>0) 
                              throw new BadRequestError(`Book with id ${newBook.id} already exists`);

                    books.push(newBook);
                    await fs.writeFile(this.STORAGE_PATH, JSON.stringify(books));
          }

          async getBookById(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const books= JSON.parse(data);

                    const searchedBooks= books.filter(book=> book.id === id);
                    if(searchedBooks.length>0) return searchedBooks[0];
                    else throw new NotFoundError("Book not found");
          }

          async getBooks(pageSize, pageNum){
                    if(!pageSize|| pageSize<=0)
                              throw new BadRequestError("PageSize must be >0");
                    if(!pageNum|| pageNum<=0)
                              throw new BadRequestError("PageNum must be >0");
                    
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const books= JSON.parse(data);

                    const indexRange= PagingUtil.getIndexRange(pageSize, pageNum);
                    if(indexRange[0]<books.length)
                              return books.filter((book, index)=>(index>=indexRange[0]&&index<=indexRange[1]));
                    else return [];
          }

          async updateBook(updatedBook){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const books= JSON.parse(data);

                    const updatedBookIndex= books.findIndex(book=>book.id=== updatedBook.id);
                    if(updatedBookIndex!=-1){
                              books[updatedBookIndex]=updatedBook;
                    }
                    else throw new NotFoundError("Book not found");

                    fs.writeFile(this.STORAGE_PATH, JSON.stringify(books));
          }

          async deleteBook(id){
                    const data= await fs.readFile(this.STORAGE_PATH);
                    const books= JSON.parse(data);

                    const updatedBooks= books.filter(book=>book.id !== id);
                    const updatedData= JSON.stringify(updatedBooks);
                    fs.writeFile(this.STORAGE_PATH, updatedData);
          }
}

export default new BookService();