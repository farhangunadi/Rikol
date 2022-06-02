import React from 'react'
import Img from './../assets/image/me 7.png'
import './about.css'

function About() {
  return (
    <div className="about-container">
        <div className="about-content">
            <h1 className="title">
                RIKOL
            </h1>
            <p className='sub-title'>Cari Informasi Buku Online</p>
            <p className='explanation'>Rikol is a website that provides information about books sold in the Google Books Store which will later be implemented using the concept of semantic web using a website platform.</p>
            <p className='explanation'>The purpose of this project is to make it easier to search for books sold on the Google Book Store that can be filtered by book category, language used, etc.</p>
        </div>
        <div className="author">
            <h2>Developer</h2>
            <div className="grid">
                 <div className="img-wrap">
                    <img src={Img} alt="" />
                </div>
                <div className="bio">
                    <p>Name : Farhan Gunadi</p>
                    <p>NPM : 140810190009</p>
                    <p>Institute : UNPAD</p>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default About