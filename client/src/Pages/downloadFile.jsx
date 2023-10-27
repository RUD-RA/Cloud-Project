export function handleDownloadClick() {
  const s3Url =
    "https://imageproject101.s3.amazonaws.com/ce88a527-ed07-41c1-9136-5c0b2178050a.png";

  fetch(s3Url)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);

      // Extract the file name from the URL (adjust this logic if your URLs have a specific structure)
      const fileName = s3Url.split("/").pop();

      downloadLink.download = fileName;
      downloadLink.click();

      // Clean up the URL object
      URL.revokeObjectURL(downloadLink.href);
      console.log("File Downloaded!");
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
}
