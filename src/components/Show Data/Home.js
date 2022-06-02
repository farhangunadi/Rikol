import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import { Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';
import Content from './../CardCompt';
import { Footer } from '../Footer';
import Img1 from "./../../assets/image/v1.png";
import Img2 from "./../../assets/image/v2.png";

//fungsi untul effect scroll
const scrollToSection = (flag) => {
  scroller.scrollTo(flag, {
    duration: 800,
    offset:-70,
    delay: 0,
    smooth: "easeInOutQuart",
  });
};

function Home() {
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

    //inisialisasi state awal untuk searching dan search input
    const [searching, setSearching] = useState(false);
    const [statusInput, setStatusInput] = useState(false);

    //fungsi getData untuk mengambil data dari url
    const getData = async () => {
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
                    
                    FILTER (
                    regex(?id, "${value.input}", "i") ||
                    regex(?title, "${value.input}", "i") ||
                    regex(?author, "${value.input}", "i") ||
                    regex(?publisher, "${value.input}", "i") ||
                    regex(?category, "${value.input}", "i") ||
                    regex(?language, "${value.input}", "i") ||
                    regex(?published_date, "${value.input}", "i") ||
                    regex(?page_count, "${value.input}", "i") ||
                    regex(?price, "${value.input}", "i")
                    )
            }`,
        };

        setSearching(true);
        setStatusInput(true);
        document.getElementById('myInput').value = '';
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

    const getAllData = async () => {
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
                        gb:language ?language ; 
                        gb:published_date ?published_date ; 
                        gb:page_count ?page_count ; 
                        gb:price ?price ;
                        gb:category ?category .
            }ORDER BY ASC(?title)`,
        };

        setStatusInput(false);
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
            formatter(code, index)
            );
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

    const handleChange = (event) => {
        setValue({
        ...value,
        input: event.target.value,
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
    return ( 
    <>
        <div className="large-container">
        <div className="container">
            <div className="home" id="home">
                <h1 className='title'>Find complete information about books with the help of semantic technology</h1>
                <div className="search-wrapper">
                    <div className="search_box">
                        <input 
                        id='myInput'
                        type="text"
                        className="input"
                        placeholder="search..."
                        setvalue={value.input}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>
                    <div className="button-wrapper-get-all">
                        <button        
                        type="button"
                        value="Search"
                        onClick={getData} 
                        className='card-btn'>Search</button>
                        <button        
                        type="button"
                        value="Search"
                        onClick={getAllData} 
                        className='btn-get-all'>Get all data</button>
                        <Link to="/advanced" className='advSearch'>
                            <button className='btn-adv-src'>Go to smart search</button>
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
                                                        <p className='warn'>Sorry,Book not available!</p>
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
                                        {
                                        statusInput === true ?(<h3 className="result2-data ">Keyword : " {value.input} "</h3>
                                        ):(<></>)
                                        }
                                        
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

export default Home