import React, { Component} from 'react'
import Book from './Book';
import { Link } from 'react-router-dom'

class SearchBooks extends Component {

    render() {

        const {searchResults, onInputChange, onchangeShelf} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to='/'
                        className="close-search" 
                    >   Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(e) => onInputChange(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchResults.map(book => {
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
 export default SearchBooks
