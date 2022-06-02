import React from 'react'
import './CardCompt.css'

export const CardCompt = (props) => {
  return (
    <div key={props.id} className="code-list">
            <ul>
                <li>
                    <div className="title">
                        <h1>{props.title}</h1>
                    </div>
                    <div className="content">
                        <h3>Author : {props.author}</h3>
                        <h3>Category : {props.category}</h3>
                        <h3>Language : {props.language}</h3>
                        <h3>Publisher : {props.publisher}</h3>
                        <h3>Published Date : {props.published_date}</h3>
                        <h3>Page Count : {props.page_count} pages</h3>
                        <h3>Price : ${props.price}</h3>
                    </div>
                </li>
            </ul>
        </div>
  )
}
CardCompt.defaultProps = {
    id : '123',
    title : 'abc',
    author : 'abc',
    category : 'abc',
    language : 'abc',
    publisher : 'abc',
    published_date : 'abc',
    page_count : 'abc',
    price : 'abc'
}

export default CardCompt;
