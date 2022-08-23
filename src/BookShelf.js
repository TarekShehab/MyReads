import React, { Component } from "react";
import Book from './Book.js'

class BookShelf extends Component{

    render(){

        const {shelfName, books} = this.props

        // Define the books that belong to this shelf
        const shelfBooks = books.filter(book => book.shelf === shelfName)

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            shelfBooks.map(book => {
                                return(
                                    <li key = {book.id}> 
                                        <Book
                                            style = {book.style}
                                            title = {book.title}
                                            author = {book.author}
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