import React from "react";
import "./Book.css";

const Book = (props) => {
  return (
    <div className="book-container">
      <div className="book-img-container">
        <div className="book-img">
          <img src={props.img} alt={props.title} />
        </div>
        <div className="book-description">{props.description}</div>
      </div>
      <div className="book-info">
        <div className="book-text">
          <div className="book-title">
            <h3>{props.title}</h3>
          </div>

          <p className="book-author">{props.author}</p>
        </div>
        <div className="book-price">
          <p> &#8364;{props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
