import React, { useEffect, useState } from 'react'
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri"
import { BiSearchAlt2 } from "react-icons/bi"
import { FiMoreVertical } from "react-icons/fi"
import { BsDownload } from "react-icons/bs"
import "./homestyle.css";

function Home() {

    const [imageUrls, setImageUrls] = useState([]);
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
        if (isopen === false) {
            setIsopen(true)
        }
        else {
            setIsopen(false)
        }
    }
    return (
        <div>
            <nav className="mynav">
                <div style={{ marginLeft: "15px" }}>
                    <img
                        className="logo"
                        src="https://img.icons8.com/bubbles/100/stack-of-photos.png"
                        alt="website-logo"
                    />
                </div>
                <div className="nav-ele">Home</div>
                <div className="nav-ele">Explore</div>
                <div className="nav-ele">
                    <div className="create-ele " onClick={openmenu}>
                        Create <RiArrowDropDownLine />
                    </div>
                </div>
                <div className="navsearch">
                    <div className="search-icon">
                        <BiSearchAlt2 />
                    </div>
                    <input type="text" placeholder="Search" />
                </div>
                <div className="nav-ele icons">
                    <BsBellFill />
                </div>
                <div className="nav-ele icons">
                    <AiFillMessage />
                </div>
                <div className="nav-ele icons">
                    <div>
                        <img
                            className="logo1"
                            src="https://img.icons8.com/color/96/checked-user-male--v1.png"
                            alt="checked-user-male--v1"
                        />
                    </div>
                </div>
                <div className="nav-ele last">
                    <RiArrowDropDownLine />
                </div>
            </nav>
            <div className="body-con">
                <div className="pinwrapper">
                    {imageUrls.map((url, index) => (
                        <div className="pin" style={{ height: "40vh" }} key={index}>
                            <img src={url} alt="Display" />
                            <div className="overlay">
                                <div className="title">{url.split('/').pop().split('.').slice(0, -1).join('.')}</div>
                                <div className="options">
                                    <a href={url} target='_blank' rel='noreferrer'><BsDownload className='download'  /> </a><FiMoreVertical />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isopen && (
                <div className="createpannel">
                    <div className="left">
                        <div className="upld-con">
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                accept="image/*"
                            />
                            <label htmlFor="fileInput" style={{ fontFamily: "Bree Serif" }}>
                                Select an image
                            </label>
                        </div>
                    </div>
                    <div className="right">
                        <div className="close" onClick={openmenu}>
                            <AiOutlineClose />
                        </div>
                        <div className="ins-con">
                            <label className="title1">Title</label>
                            <input type="text" className="inputs" />
                            <br />
                            <button >Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home