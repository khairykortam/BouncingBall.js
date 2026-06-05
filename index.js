function fillCircle(context, x, y, radius, color = "grey") {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
}
(() => {
  const audio = document.getElementById("audio");
  const canvas = document.getElementById("canvas");
  const slider = document.getElementById("slider");
  const displayspeed = document.getElementById("displayspeed");
  const displaybounce = document.getElementById("displaybounce");
  slider.addEventListener("input", (event) => {
    displayspeed.innerText = "Speed: " + event.target.value;
    speed = parseInt(event.target.value);
  });
  // const color = document.getElementById('ballcolor');
  let colorset = [
    "#FF0055", // Neon Red
    "#00FF99", // Neon Green
    "#00CCFF", // Electric Blue
    "#FFEE00", // Bright Yellow
    "#FF00CC", // Magenta
    "#CCFF00", // Lime
    "#FF6600", // Orange
  ];
  let color;
  let scorecounter = 0;
  document.body.style.overflow = "hidden";
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  let speed = 100;

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
  // color.addEventListener('input', function(event){
  //   color.value = event.target.value;
  // })

  const radius = 30;
  let dx = 1,
    dy = 1;
  let x = radius + 10,
    y = radius + 10;
  let start;
  function inc(time) {
    if (start === undefined) {
      start = time;
    }
    if (x + radius >= width || x - radius <= 0) {
      dx = -dx;
      /*audio.pause(); audio.currentTime = 0; audio.play();*/
      color = colorset[Math.floor(Math.random() * colorset.length)];
      scorecounter++;
      displaybounce.innerText = "Bounces: " + scorecounter;
    }
    if (y + radius >= height || y - radius <= 0) {
      dy = -dy;
      /*audio.pause(); audio.currentTime = 0; audio.play();*/
      color = colorset[Math.floor(Math.random() * colorset.length)];
      scorecounter++;
      displaybounce.innerText = "Bounces: " + scorecounter;
    }
    const elapsed = (time - start) * 0.001;
    x += dx * speed * elapsed;
    y += dy * speed * elapsed;

    // Clamp position to stay within bounds
    x = Math.max(radius, Math.min(width - radius, x));
    y = Math.max(radius, Math.min(height - radius, y));

    start = time;

    // context.fillStyle = "black";
    context.clearRect(0, 0, width, height);
    fillCircle(context, x, y, radius, color);
    window.requestAnimationFrame(inc);
  }
  window.requestAnimationFrame(inc);
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyS":
      case "ArrowDown": {
        console.log("down");
        dy = Math.abs(dy);
        break;
      }
      case "KeyW":
      case "ArrowUp": {
        dy = -Math.abs(dy);
        break;
      }
      case "KeyA":
      case "ArrowLeft": {
        dx = -Math.abs(dx);
        break;
      }
      case "KeyD":
      case "ArrowRight": {
        dx = Math.abs(dx);
        break;
      }
    }
  });
})();
