import React, { Component } from 'react'

class Book extends Component {
    render() {

        const {id, imageLinks, title, authors, onchangeShelf, shelf} = this.props
        const imageURL = `url("${imageLinks.thumbnail}")`
        const style = { width: 128, height: 193, backgroundImage: imageURL }

        return(
            <div className="book">
              <div className="book-top">
                <div 
                  className="book-cover" 
                  style={style}
                ></div>
                <div className="book-shelf-changer">
                  <select 
                    onChange={(e) => onchangeShelf(id, e.target.value)}
                    defaultValue = {shelf}  
                  >
                    <option value='moveto' disabled>Move to..</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{authors.toString()}</div>
            </div>
        )
    }
}

export default Book