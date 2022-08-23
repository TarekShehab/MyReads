import React, { Component } from "react";
import Book from './Book.js'

class BookShelf extends Component{

    render(){

        const {shelfTitle, books, onchangeShelf} = this.props

        // Define the books that belong to this shelf by comparing shelf names
        const shelfBooks = books.filter(book => (book.shelf.toLowerCase().replace(/\s/g, '')) === shelfTitle.toLowerCase().replace(/\s/g, ''))

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            shelfBooks.map(book => {
                                return(
                                    <li key = {book.id}> 
                                        <Book
                                            id = {book.id}
                                            imageLinks = {book.imageLinks}
                                            title = {book.title}
                                            authors = {book.authors}
                                            onchangeShelf = {onchangeShelf}
                                            shelf = {book.shelf}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf