import React, { Component } from 'react'

class Book extends Component {
    render() {

        const {id, style, title, author, onchangeShelf} = this.props

        return(
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={style}></div>
                <div className="book-shelf-changer">
                  <select 
                    onChange={(e) => onchangeShelf(id, e.target.value)}
                    defaultValue = 'moveto'  
                  >
                    <option value='moveto' disabled>Move to..</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Want to Read">Want to Read</option>
                    <option value="Read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{author}</div>
            </div>
        )
    }
}

export default Book