import AWS from "aws-sdk";

export function handleUploadClick() {
  AWS.config.update({
    accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
    secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
  });

  const fileInput = document.getElementById("fileInput");
  let filename = document.getElementById("key").value;

  if (fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    uploadFile(selectedFile);
  } else {
    alert("Select File and try again!");
  }

  function uploadFile(selectedFile) {
    const s3 = new AWS.S3();
    let type = "";

    if (selectedFile.type === "image/jpeg") {
      type = ".jpg";
    } else if (selectedFile.type === "image/png") {
      type = ".png";
    } else if (selectedFile.type === "image/svg") {
      type = ".svg";
    } else if (selectedFile.type === "image/gif") {
      type = ".gif";
    }

    if(filename === ''){
      filename = selectedFile.name;
    }

    const params = {
      Bucket: "imageproject101",
      Key: filename + type,
      Body: selectedFile,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading image:", err);
      } else {
        console.log("Image uploaded successfully:", data.Location);
      }
    });
  }
}
