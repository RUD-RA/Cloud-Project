import React, { useState, useEffect } from 'react';

function ImageComponent() {
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
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <h1>Image URLs</h1>
            <ul>
                {imageUrls.map((url, index) => (
                    <li key={index}>
                        <img src={url} alt={`Image ${index}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageComponent;
