import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    // state variable to keep track of which page we're on => use URL in address bar.
    books: [],
    searchResults: [],
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
      .then(res => this.setState({books: res}))
  }

  handleChangeShelf = async (bookId, newShelf) => {
    console.log('changing shelf...', this.state.books)
    await BooksAPI.update(bookId, newShelf)
      .then(this.getBooks())
  }

  // Still not working
  handlSearchQuery = async (query) => {
    if(query===''){
      this.setState({searchResults: []})
      return
    }  
    try{
      await BooksAPI.search(query)
        .then(res => {
          // Handle empty response
          if(res.error){
            this.setState({searchResults: []})
            return
          }
          const results = res.map(book => {
            // Not found in state's books
            if (this.state.books.find(b => b.id === book.id) === undefined){
              book.shelf = 'none'
            }
            else{
              const theBook = this.state.books.find(b => b.id === book.id)
              const shelfName = theBook.shelf
              book.shelf = shelfName
            }
            return book
          })
          // console.log(results)
          this.setState({searchResults: results})
        })
    }
    catch(error){
          console.log('Invalid query my friend', error)
          this.setState({searchResults: []})
    }

  }
  componentDidMount = () => {
    this.getBooks()
  }

  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            onCloseSearch = {this.closeSearchWindow}
            searchResults = {this.state.searchResults}
            onInputChange = {this.handlSearchQuery}
            onchangeShelf = {this.handleChangeShelf}
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
              <Link 
                to='/search'
                onClick={() => this.openSearchWindow()}
              >
                Add a book
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
