import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar.
     */
    books: [],
    showSearchPage: false
  }
  
  closeSearchWindow = () => {
    this.setState({ showSearchPage: false })
  }
  
  openSearchWindow = () => {
    this.setState({ showSearchPage: true })
  }

  // Fetch books from server and update books in state
  getBooks = async () => {
    await BooksAPI.getAll()
      .then(res => {
        this.setState({books: res}
        )})
  }

  handleChangeShelf = async (bookId, newShelf) => {
    
    console.log('changing shelf...')
    BooksAPI.update(bookId, newShelf)
    this.getBooks()
    
  }

  render() {
    
    this.getBooks()
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            onCloseSearch = {this.closeSearchWindow}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {/* shelfs */}
              <div>
                <BookShelf
                  shelfTitle = 'Currently Reading'
                  books = {this.state.books}
                  onchangeShelf = {this.handleChangeShelf}
                />

                <BookShelf
                  shelfTitle = 'Want to Read'
                  books = {this.state.books}
                  onchangeShelf = {this.handleChangeShelf}
                />

                <BookShelf
                  shelfTitle = 'Read'
                  books = {this.state.books}
                  onchangeShelf = {this.handleChangeShelf}
                />
              </div>
            </div>
            {/* Search button */}
            <div className="open-search">
              <button onClick={() => this.openSearchWindow()}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
