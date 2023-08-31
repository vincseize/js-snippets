var isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
if (isMobile) {
  console.log("User is on a mobile device.");
//   var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "./css/stylesDevices.css"; // Path to your mobile-specific CSS file
//     document.head.appendChild(link);
    document.write("<link rel='stylesheet' type='text/css' href='./css/stylesDevices.css' />");
} else {
  console.log("User is not on a mobile device.");
}
