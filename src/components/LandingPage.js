import React from 'react'
import './LandingPage.css'

function LandingPage(props) {
  var category = ['Fiction' , 'Games', 'Biography', 'Fantasy', 'Other'];
  return (
    <div className="container">
        <div className="content">
            <h1 className='title'>Find complete information about books with the help of semantic technology</h1>
            <div className="search-wrapper">
                <div className="search_box">
                    <input type="text" className="input" placeholder="search..."/>
			    </div>
            </div>
            <div className="filter">
                <div className="grid">
                    <input type="text" className="inputFilter" placeholder='Category'/>
                    <input type="text" className="inputFilter" placeholder='Publisher'/>
                    <input type="text" className="inputFilter" placeholder='Language' />
                    <input type="text" className="inputFilter" placeholder='Price'/>
                </div>
            </div>
            <div className="button-wrapper">
                 <button className='card-btn'>Generate</button>
            </div>
        </div>
    </div>
  )
}

export default LandingPage