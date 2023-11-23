LAMBDA_URL =
  "https://ctdix4arbaiudxx4vi4muepthq0lanqd.lambda-url.us-east-1.on.aws/";

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
  const canvasURLObj = canvas.toDataURL("image/png");
  let img64 = "";

  try {
    const ores = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: canvasURLObj,
    });

    const res = await ores.json();
    img64 = res.input.body;

    console.log("alu :: ", img64);
  } catch (e) {
    console.log("potol :: ", e);
  }

  const resCanvas = document.getElementById("resCanvas");
  const ctz = resCanvas.getContext("2d");

  let img = new Image();
  img.onload = () => {
    ctz.drawImage(img, 0, 0);
  };
  img.src = img64;
}

startVideo();
