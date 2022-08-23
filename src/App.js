import React, { Component} from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import BookShelf from './BookShelf'

class BooksApp extends Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [
      {
        id: 1,
        style:{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' },
        title:'To Kill a Mockingbird',
        author: 'Harper Lee'
      },
      {
        id: 2,
        style:{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' },
        title:'Ender\'s Game',
        author: 'Orson Scott Card'
      },
      {
        id: 3,
        style:{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' },
        title:'1776',
        author: 'David McCullough'
      },
      {
        id: 4,
        style:{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' },
        title:'Harry Potter and the Sorcerer\'s Stone',
        author: 'J.K. Rowling'
      },
      {
        id: 5,
        style:{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' },
        title:'The Hobbit',
        author: 'J.R.R. Tolkien'
      },
      {
        id: 6,
        style:{ width: 128, height: 174, backgroundImage: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' },
        title:'Oh, the Places You\'ll Go!',
        author: 'Seuss'
      },
      {
        id: 7,
        style:{ width: 128, height: 192, backgroundImage: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' },
        title:'The Adventures of Tom Sawyer',
        author: 'Mark Twain'
      },
    ],
    showSearchPage: false
  }

  closeSearchWindow = () => {
    this.setState({ showSearchPage: false })
  }
  
  openSearchWindow = () => {
    this.setState({ showSearchPage: true })
  }

  render() {

    const currentlyReadingBooks = this.state.books.slice(0, 2)
    const wantToReadBooks = this.state.books.slice(2, 4)
    const readBooks = this.state.books.slice(-3)

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
              <div>
                {/* Shelfs */}
                <BookShelf
                  shelfName = 'Currently Reading'
                  shelfBooks = {currentlyReadingBooks}
                />
                
                <BookShelf
                  shelfName = 'Want to Read'
                  shelfBooks = {wantToReadBooks}
                />

                <BookShelf
                  shelfName = 'Read'
                  shelfBooks = {readBooks}
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
