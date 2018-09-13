var keyData = {
  q: {
    color: "#1abc9c",
    url: "../../sounds/bubbles.mp3"
  },
  w: {
    color: "#2ecc71",
    url: "../../sounds/clay.mp3"
  },
  e: {
    color: "#3498db",
    url: "../../sounds/confetti.mp3"
  },
  r: {
    color: "#9b59b6",
    url: "../../sounds/corona.mp3"
  },
  t: {
    color: "#34495e",
    url: "../../sounds/dotted-spiral.mp3"
  },
  y: {
    color: "#16a085",
    url: "../../sounds/flash-1.mp3"
  },
  u: {
    color: "#27ae60",
    url: "../../sounds/flash-2.mp3"
  },
  i: {
    color: "#2980b9",
    url: "../../sounds/flash-3.mp3"
  },
  o: {
    color: "#8e44ad",
    url: "../../sounds/glimmer.mp3"
  },
  p: {
    color: "#2c3e50",
    url: "../../sounds/moon.mp3"
  },
  a: {
    color: "#f1c40f",
    url: "../../sounds/pinwheel.mp3"
  },
  s: {
    color: "#e67e22",
    url: "../../sounds/piston-1.mp3"
  },
  d: {
    color: "#e74c3c",
    url: "../../sounds/piston-2.mp3"
  },
  f: {
    color: "#95a5a6",
    url: "../../sounds/prism-1.mp3"
  },
  g: {
    color: "#f39c12",
    url: "../../sounds/prism-2.mp3"
  },
  h: {
    color: "#d35400",
    url: "../../sounds/prism-3.mp3"
  },
  j: {
    color: "#1abc9c",
    url: "../../sounds/splits.mp3"
  },
  k: {
    color: "#2ecc71",
    url: "../../sounds/squiggle.mp3"
  },
  l: {
    color: "#3498db",
    url: "../../sounds/strike.mp3"
  },
  z: {
    color: "#9b59b6",
    url: "../../sounds/suspension.mp3"
  },
  x: {
    color: "#34495e",
    url: "../../sounds/timer.mp3"
  },
  c: {
    color: "#16a085",
    url: "../../sounds/ufo.mp3"
  },
  v: {
    color: "#27ae60",
    url: "../../sounds/veil.mp3"
  },
  b: {
    color: "#2980b9",
    url: "../../sounds/wipe.mp3"
  },
  n: {
    color: "#8e44ad",
    url: "../../sounds/zig-zag.mp3"
  },
  m: {
    color: "#2c3e50",
    url: "../../sounds/moon.mp3"
  }
};

function playSound(key) {
  new Howl({
    urls: [keyData[key].url]
  }).play();
}

function getCircleColor(key) {
  return keyData[key].color;
}

var circles = [];

function onKeyDown(event) {
  if (keyData[event.key]) {
    var maxPoint = new Point(view.size.width, view.size.height);
    var randomPoint = Point.random();
    var point = maxPoint * randomPoint;
    var newCircle = new Path.Circle(point, 500);
    playSound(event.key);
    newCircle.fillColor = getCircleColor(event.key);
    circles.push(newCircle);
  }
}

function onFrame() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].fillColor.hue += 1;
    circles[i].scale(0.93);
    if (circles[i].area < 1) {
      circles[i].remove();
      circles.splice(i, 1);
    }
  }
}
