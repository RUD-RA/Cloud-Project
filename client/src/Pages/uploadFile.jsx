import AWS from "aws-sdk";
export function handleUploadClick(file) {
    AWS.config.update({
      accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
      secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
      region: 'YOUR_AWS_REGION'
    });

    const fileInput = document.getElementById("fileInput");
    let filename = file

    if (fileInput.files.length > 0) {
        const selectedFile = fileInput.files[0];
        console.log(selectedFile.type);
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
        }
        // else if (selectedFile.type === "image/svg+xml") {
        //   type = ".svg";
        // } 
        else if (selectedFile.type === "image/gif") {
            type = ".gif";
        }

        if (filename === "") {
            filename = selectedFile.name;
        }

        if (type === '.gif') {
            const params = {
                Bucket: "imageproject101",
                Key: filename + type,
                Body: selectedFile,
                ContentType: selectedFile.type,
                ContentDisposition: 'attachment'
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error("Error uploading image:", err);
                } else {
                    console.log("Image uploaded successfully:", data.Location);
                    alert("Image Uploaded Successfully");
                    // You can display the uploaded image or perform other actions here
                }
            });
        }
        else {
            const params = {
                Bucket: "imageproject101",
                Key: filename + type,
                Body: selectedFile,
                ContentDisposition: 'attachment'
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.error("Error uploading image:", err);
                } else {
                    console.log("Image uploaded successfully:", data.Location);
                    alert("Image Uploaded Successfully");
                }
            });

        }

    }
}