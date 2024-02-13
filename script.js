const canvas = document.getElementById("solarSystem");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sun = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 30,
  color: "yellow",
};
let simulationSpeed = 0.05;
let zoomLevel = 1;

const planets = [
  {
    name: "Mercury",
    radius: 4,
    color: "darkgray",
    distance: 58,
    orbitSpeed: 0.047,
  },
  {
    name: "Venus",
    radius: 9,
    color: "khaki",
    distance: 108,
    orbitSpeed: 0.035,
  },
  {
    name: "Earth",
    radius: 9.5,
    color: "blue",
    distance: 150,
    orbitSpeed: 0.03,
  },
  { name: "Mars", radius: 5, color: "red", distance: 228, orbitSpeed: 0.024 },
  {
    name: "Jupiter",
    radius: 20,
    color: "orange",
    distance: 778,
    orbitSpeed: 0.013,
  },
  {
    name: "Saturn",
    radius: 17,
    color: "gold",
    distance: 1429,
    orbitSpeed: 0.009,
  },
  {
    name: "Uranus",
    radius: 14,
    color: "lightblue",
    distance: 2871,
    orbitSpeed: 0.006,
  },
  {
    name: "Neptune",
    radius: 13,
    color: "blue",
    distance: 4495,
    orbitSpeed: 0.005,
  },
];

const shootingStars = [];
const backgroundStars = []; // Array to hold the background stars

function initBackgroundStars() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    backgroundStars.push({ x, y, size });
  }
}

function drawBackground() {
  backgroundStars.forEach((star) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
}
initBackgroundStars();

function drawSun() {
  ctx.fillStyle = sun.color;
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawOrbit(distance) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, distance * zoomLevel, 0, Math.PI * 2);
  ctx.stroke();
}

function drawPlanet(planet, angle) {
  const x = sun.x + Math.cos(angle) * planet.distance * zoomLevel;
  const y = sun.y + Math.sin(angle) * planet.distance * zoomLevel;
  ctx.fillStyle = planet.color;
  ctx.beginPath();
  ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
  ctx.fill();
  // Draw planet name
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText(planet.name, x + planet.radius + 3, y + planet.radius);
}

function drawShootingStar() {
  shootingStars.forEach((star, index) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 5);
    ctx.fill();

    // Update shooting star position
    star.x += star.vx;
    star.y += star.vy;

    // Remove shooting star if it goes out of bounds
    if (star.x > canvas.width || star.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });
}

function addShootingStar() {
  if (Math.random() < 0.02) {
    // Random chance to add a shooting star
    const x = Math.random() * canvas.width;
    const y = 0;
    const vx = 2 + Math.random() * 3;
    const vy = 2 + Math.random() * 3;
    shootingStars.push({ x, y, vx, vy });
  }
}

let time = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(); // Draw the stable background stars
  drawSun();
  planets.forEach((planet) => {
    const angle = time * planet.orbitSpeed;
    drawOrbit(planet.distance); // Draw orbit path
    drawPlanet(planet, angle);
  });
  drawShootingStar();
  addShootingStar();
  time += simulationSpeed;
  requestAnimationFrame(animate);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    simulationSpeed *= 1.1;
  } else if (event.key === "ArrowDown") {
    simulationSpeed *= 0.9;
  } else if (event.key === "+" || event.key === "=") {
    // Zoom in
    zoomLevel *= 1.1;
  } else if (event.key === "-" || event.key === "_") {
    // Zoom out
    zoomLevel *= 0.9;
  }
});

animate();
