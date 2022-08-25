import React, { Component, StrictMode } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf'
import { Link, Route, Routes } from 'react-router-dom'


class BooksApp extends Component {
  state = {
    books: [],
    searchResults: [],
  }

  // Fetch books from server and update books in state
  getBooks = async () => {
    await BooksAPI.getAll()
      .then(res => this.setState({books: res}))
  }

  // Change the shelf of a book in the server 
  handleChangeShelf = async (bookId, newShelf) => {
    await BooksAPI.update(bookId, newShelf)
      .then(this.getBooks())
  }

  // Fetch query results from server and edit them and update searchResults in the state
  handlSearchQuery = async (query) => {
    // Handle the case if the user removes his input from search box
    if(query===''){
      this.setState({searchResults: []})
      return
    }  
    try{
      await BooksAPI.search(query)
        .then(res => {
          // Handle empty response (no matches with query)
          if(res.error){
            this.setState({searchResults: []})
            return
          }
          const results = res.map(book => {
            // Not in state's books => none
            if (this.state.books.find(b => b.id === book.id) === undefined){
              book.shelf = 'none'
            }
            // in state's books => the shelf it's in
            else{
              const theBook = this.state.books.find(b => b.id === book.id)
              const shelfName = theBook.shelf
              book.shelf = shelfName
            }
            return book
          })
          this.setState({searchResults: results})
        })
    }
    catch(error){
          console.log('Invalid query my friend', error)
    }

  }
  
  componentDidMount = () => {
    this.getBooks()
  }

  render() {

    return (
      <StrictMode>
        <div className="app">
          <Routes>
            <Route 
              exact path='/' 
              element={
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
                  {/* Search link */}
                  <div className="open-search">
                    <Link 
                      to='/search'
                    >
                      Add a book
                    </Link>
                  </div>
                </div>}
            />
            
            <Route 
              path='/search' 
              element={
                <SearchBooks
                  searchResults = {this.state.searchResults}
                  onInputChange = {this.handlSearchQuery}
                  onchangeShelf = {this.handleChangeShelf}
                />}
            />
          </Routes>   
        </div>
      </StrictMode>  
    )
  }
}

export default BooksApp
