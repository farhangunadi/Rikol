import React, { useEffect, useState } from 'react'
import { scroller } from "react-scroll";
import axios from 'axios';
import qs from 'qs';
import './../LandingPage.css';

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
        const BASE_URL = "http://localhost:3030/dataBuku/query"; //url fuseki

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
                        gb:isCategory ?IDcategory ; 
                        gb:language ?language ; 
                        gb:published_date ?published_date ; 
                        gb:page_count ?page_count ; 
                        gb:price ?price .

                    ?IDcategory gb:category ?category .
                    
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
        const BASE_URL = "http://localhost:3030/dataBuku/query"; //url fuseki

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
                        gb:isCategory ?IDcategory ; 
                        gb:language ?language ; 
                        gb:published_date ?published_date ; 
                        gb:page_count ?page_count ; 
                        gb:price ?price .

                    ?IDcategory gb:category ?category .
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
        <div key={code.id} className="code_list">
            <ul>
                <li>
                    <div className="title">
                        <h1>{code.title}</h1>
                    </div>
                    <div className="content">
                        <h3>Author : {code.author}</h3>
                        <h3>Category : {code.category}</h3>
                        <h3>Language : {code.language}</h3>
                        <h3>Publisher : {code.publisher}</h3>
                        <h3>Published Date : {code.published_date}</h3>
                        <h3>Page Count : {code.page_count}</h3>
                        <h3>Price : {code.price}</h3>
                    </div>
                </li>
            </ul>
        </div>
    ));
    return ( 
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
                    onClick={getAllData} 
                    className='btn-getl-all'>Get all data</button>
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
                 <button        
                    type="button"
                    value="Search"
                    onClick={getData} 
                    className='card-btn'>Generate</button>
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
                                                    <p>Please enter a keyword for search a book</p>
                                                </>
                                            ) : (
                                                <>
                                                    <h3 className="result-data">Keyword : "{value.input}"</h3>
                                                    <p className="text-not-found">Sorry,Book not available!</p>
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
    )
}

export default Home