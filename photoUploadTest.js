LAMBDA_URL =
  "https://gnizpce5eg.execute-api.us-east-1.amazonaws.com/default/sls-py-dem3-dev-hello";

const video = document.getElementById("video");

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

async function capture() {
  // var canvas = document.getElementById('canvas');
  // var video = document.getElementById('video');
  // canvas.width = video.videoWidth;
  // canvas.height = video.videoHeight;
  // canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  // canvas.toBlob() = (blob) => {
  //   const img = new Image();
  //   img.src = window.URL.createObjectUrl(blob);
  // };
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const canvasURLObj = { image: canvas.toDataURL("image/jpg") };

  try {
    const ores = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(canvasURLObj),
    });

    console.log("alu :: ", ores);
  } catch (e) {
    console.log("potol :: ", e);
  }
}

startVideo();

// video.addEventListener("play", () => {});
