const url = "https://043xc4ncfb.execute-api.us-west-2.amazonaws.com/s3lemdauploader"; 

export function handleUploadClick() {
  const fileInput = document.getElementById("fileInput");
  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    uploadFile(selectedFile);
  } else {
    alert("Select File and try again!");
  }
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  fetch(
    url,
    {
      method: "POST",
      mode: "no-cors",
      body: formData,
    }
  )
    // .then((response) => response.json())
    .then((data) => {
      console.log("File Uploaded!");
      alert("File Uploaded Successfully");
      // Handle the response from the server, e.g., display a success message.
    })
    .catch((error) => {
      // Handle any errors that occur during the upload.
      console.error("Error uploading file:", error);
    });
}

