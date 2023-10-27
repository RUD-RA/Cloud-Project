import React, { useState } from 'react';

function ImageUploader() {
  const [file, setFile] = useState();
  const handleImageUpload = async (event) => {
    const apiUrl = 'https://043xc4ncfb.execute-api.us-west-2.amazonaws.com/s3lemdauploader';
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        if (response.ok) {
          // Image was successfully uploaded
          console.log('Image uploaded successfully.');
        } else {
          // Handle error
          console.error('Image upload failed.');
        }
      } catch (error) {
        // Handle network error
        console.error('Network error:', error);
      }
    }
  }
  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => {
        setFile(e.target.files[0]);
      }} />
      <button onClick={handleImageUpload}>SEND</button>
    </div>
  )
}

export default ImageUploader;




