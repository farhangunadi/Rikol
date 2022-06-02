import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';
import Content from '../CardCompt';
import Img1 from "./../../assets/image/v1.png";
import Img2 from "./../../assets/image/v2.png";
import { Footer } from '../Footer';

//fungsi untul effect scroll
const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function FilterSearch() {
  //inisialisasi variable data
    const [value, setValue] = useState({
        codes: [],
        input: "",
        title: "",
        category: "",
        author: "",
        language: "",
        publisher: "",
        published_date: "",
        page_count: "",
        price: "",
    });
    const [searching, setSearching] = useState(false);

    const getDataByFilter = async () => {
      const BASE_URL = "http://localhost:3030/rikolDataset/query"; //url fuseki

        const headers = {
            Accept: "application/sparql-results+json,*/*;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        };

        //membuat varibel untuk menampung query get data
        const queryData = {
            query: `
            PREFIX gb: <https://play.google.com/store/#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            SELECT ?title ?author ?publisher ?category ?language ?published_date ?page_count ?price
            WHERE
            {
                    ?id gb:title ?title ;
                        gb:author ?author ; 
                        gb:publisher ?publisher ; 
                        gb:category ?category ; 
                        gb:language ?language ; 
                        gb:published_date ?published_date ; 
                        gb:page_count ?page_count ; 
                        gb:price ?price .
                    
                    FILTER contains(lcase(str(?title)), lcase(str("${
                      value.title ? value.title : ""
                    }")))
                    FILTER contains(lcase(str(?category)), lcase(str("${
                      value.category ? value.category : ""
                    }")))
                    FILTER contains(lcase(str(?language)), lcase(str("${
                      value.language ? value.language : ""
                    }")))
                    FILTER contains(lcase(str(?author)), lcase(str("${
                      value.author ? value.author : ""
                    }")))
            } ORDER BY ASC (?title)`,
        };

        setSearching(true);
        scrollToSection("codes");

        try {
            const { data } = await axios(BASE_URL, {
                method: "POST",
                headers,
                data: qs.stringify(queryData),
            });
            console.log(data);

            //convert data
            const formatted_data = data.results.bindings.map((code, index) => 
            formatter(code, index));
            console.log(formatted_data);

            setValue({
                ...value,
                codes: formatted_data,
            });
        } catch (err) {
            console.error(err);
        }
    };
    const formatter = (codes, index) => {
        return {
            id: index,
            title: codes.title.value,
            category: codes.category.value,
            author: codes.author.value,
            language: codes.language.value,
            publisher: codes.publisher.value,
            published_date: codes.published_date.value,
            page_count: codes.page_count.value,
            price: codes.price.value,
        };
    };
    const handleChangeTitle = (event) => {
      setValue({
        ...value,
        title: event.target.value,
      });
    };
    const handleChangeCategory = (event) => {
      setValue({
        ...value,
        category: event.target.value,
      });
    };
    const handleChangeLanguage = (event) => {
      setValue({
        ...value,
        language: event.target.value,
      });
    };
    const handleChangeAuthor = (event) => {
      setValue({
        ...value,
        author: event.target.value,
      });
    };
    const content = value.codes.map((code) => (
        <Content 
            id={code.id}
            title={code.title}
            author={code.author}
            category={code.category}
            language={code.language}
            publisher={code.publisher}
            published_date={code.published_date}
            page_count={code.page_count}
            price={code.price}
        />
    ));
    function showKeyword () {
      return([
        value.title !== "" ? (<h3 className='keyword-text'>Title : "{value.title}"</h3>):(<></>),
        value.category !== "" ? (<h3 className='keyword-text'>Category : "{value.category}" </h3>):(<></>),
        value.author !== "" ? (<h3 className='keyword-text'>Author : "{value.author}" </h3>):(<></>),
        value.language !== "" ? (<h3 className='keyword-text'>Language : "{value.language}" </h3>):(<></>),
      ])
    }
  return (
    <>
      <div className="large-container">
        <div className="container">
            <div className="home" id="home">
                <h1 className='title'>Advanced search to find complete information about books with the help of semantic technology</h1>
                <div className="filterAdv">
                    <input                      
                    type="text"
                    className="inputFilter2"
                    placeholder='Title'
                    setValue={value.title}
                    onChange={handleChangeTitle}/>
                    <div className="grid">
                     <input                      
                    type="text"
                    className="inputFilterAuthor"
                    placeholder='Author'
                    setValue={value.author}
                    onChange={handleChangeAuthor}/>
                    <select
                    className="dropdown-select"
                    setValue={value.category}
                    onChange={handleChangeCategory}
                    >
                      <option value="">Category</option>
                      <option value="Fiction">Fiction</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Epic">Epic</option>
                      <option value="Biography">Biography</option>
                      <option value="Games">Games</option>
                      <option value="Comics">Comics</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Mythical">Mythical</option>
                      <option value="General">General</option>
                    </select>
                    <select
                    className="dropdown-select"
                    setValue={value.language}
                    onChange={handleChangeLanguage}
                    >
                      <option value="">Laguange</option>
                      <option value="English">English</option>
                      <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className="button-wrapper-get-all">
                      <button        
                        type="button"
                        value="Search"
                        onClick={getDataByFilter} 
                        className='card-btn'>Search</button>
                      <Link to="/" className='advSearch'>
                            <button className='btn-adv-src'>Go to basic search</button>
                      </Link>    
                </div>
                </div>
            </div>
        </div>

            <div className="codes">
                <div className="container-data">
                    <div className="result-title-wrap">
                        <h1 className='result-title'>Search</h1>
                    </div>
                    <div>
                        {
                            (() => {
                                if(content.length === 0) {
                                    return (
                                        <div>
                                            {
                                                searching === false ? (
                                                    <>
                                                    <p className='warn'>Please enter a keyword for search a book</p>
                                                        <div className="img-wrap">
                                                            <img src={Img1} alt="" />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="result-data">Keyword : "{value.input}"</h3>
                                                        <p className='warn'>Sorry, Book not available!</p>
                                                        <div className="img-wrap">
                                                            <img src={Img2} alt="" />
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    );
                                } else {
                                    return (
                                    <div>
                                        <h3 className="result2-data ">Result : {content.length} data</h3>
                                        <h3 className="result2-data ">Keyword : </h3>
                                        {showKeyword()}
                                        {content}</div>);
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
    </div>
    <Footer />
    </>
  )
}

export default FilterSearch