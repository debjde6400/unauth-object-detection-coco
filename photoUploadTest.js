LAMBDA_URL = "http://localhost:5000/detect-unauth-objects";

const video = document.getElementById("video");

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

async function capture() {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const canvasURLObj = { image: canvas.toDataURL("image/png") };
  let img64 = "";

  try {
    const ores = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(canvasURLObj),
    });

    const res = await ores.json();
    img64 = res;

    console.log("alu :: ", img64);
  } catch (e) {
    console.log("potol :: ", e);
  }
}

startVideo();
