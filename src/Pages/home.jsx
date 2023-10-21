import React, { useEffect, useState } from 'react'
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage, AiFillSecurityScan, AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri"
import { BiSearchAlt2 } from "react-icons/bi"
import { FiMoreVertical } from "react-icons/fi"
import { BsDownload } from "react-icons/bs"
import img1 from "../Assets/download.jpeg"
import img2 from "../Assets/cat.jpeg"
import img3 from "../Assets/goku.jpeg"
import "./homestyle.css";

function Home() {

    const [imageUrls, setImageUrls] = useState([]);
    const myArray = ['60vh', '30vh', '35vh', '50vh', '40vh', '60vh'];
    function getRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    const randomElement = getRandomElement(myArray);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://2cs1fcufue.execute-api.us-west-2.amazonaws.com/getallimage');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setImageUrls(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    const [isopen, setIsopen] = useState(false);
    const openmenu = () => {
        if (isopen == false) {
            setIsopen(true)
        }
        else {
            setIsopen(false)
        }
    }
    return (
        <div>
            <nav className='mynav'>
                <div className="logo" style={{ marginLeft: "10px" }}></div>
                <div className="nav-ele">Home</div>
                <div className="nav-ele">Explore</div>
                <div className="nav-ele"><div className="create-ele " onClick={openmenu}>Create <RiArrowDropDownLine /></div> </div>
                <div className="navsearch">
                    <div className="search-icon"><BiSearchAlt2 /></div>
                    <input type="text" placeholder='Search' />
                </div>
                <div className="nav-ele icons"><BsBellFill /></div>
                <div className="nav-ele icons"><AiFillMessage /></div>
                <div className="nav-ele icons"><div className="logo"></div></div>
                <div className="nav-ele last"><RiArrowDropDownLine /></div>
            </nav>
            <div className="body-con">
                <div className="pinwrapper">
                    <div className="pin">
                        <img src={img1} alt="image" />
                        <div className="overlay">
                            <div className="title">Anime</div>
                            <div className="options"><BsDownload /> <FiMoreVertical /></div>
                        </div>
                    </div>
                    <div className="pin" style={{ height: "30vh" }}>
                        <img src={img2} alt="image" />
                        <div className="overlay">
                            <div className="title">Cat</div>
                            <div className="options"><BsDownload /> <FiMoreVertical /></div>
                        </div>
                    </div>
                    <div className="pin" style={{ height: "60vh" }}>
                        <img src={img3} alt="image" />
                        <div className="overlay">
                            <div className="title">Goku</div>
                            <div className="options"><BsDownload /> <FiMoreVertical /></div>
                        </div>
                    </div>
                    {imageUrls.map((url, index) =>
                    (<div className="pin" style={{ height: randomElement }} key={index}>
                        <img src={url} alt="image" />
                        <div className="overlay">
                            <div className="title">Goku</div>
                            {console.log(randomElement)}
                            <div className="options"><BsDownload /> <FiMoreVertical /></div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            {isopen && <div className="createpannel">
                <div className="left">
                    <div className="upld-con">
                        <input type='file' id='select' style={{ display: "none" }} />
                        <label htmlFor='select' style={{ fontFamily: "Bree Serif" }} >Select an image</label>
                    </div>
                </div>
                <div className="right">
                    <div className="close" onClick={openmenu}><AiOutlineClose /></div>
                    <div className="ins-con">
                        <label className='title1'>Title</label>
                        <input type="text" className='inputs' /><br/>
                        <button >Submit</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Home