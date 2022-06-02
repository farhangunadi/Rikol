import React from 'react'
import { Link } from "react-router-dom";
import './guide.css'

function Guide() {
  return (
    <>
        <div className="guide-container">
            <div className="title">
                <h1>Guide</h1>
            </div>
            <div className="content-guide">
                <div className="content-wrap">
                    <h2>Basic Search Guide</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, excepturi pariatur. Voluptas, nihil iste veniam beatae doloremque adipisci. Sint maiores quibusdam possimus quidem atque dolor aut vitae? Dolor, laudantium id?</p>
                    <Link className="link" to='/'>
                        <button className="btn-link">
                            Go to basic search
                        </button>
                    </Link>
                </div>
                <div className="content-wrap">
                    <h2>Smart Search Guide</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, excepturi pariatur. Voluptas, nihil iste veniam beatae doloremque adipisci. Sint maiores quibusdam possimus quidem atque dolor aut vitae? Dolor, laudantium id?</p>
                    <Link className="link" to='/advanced'>
                        <button className="btn-link">
                            Go to smart search
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Guide