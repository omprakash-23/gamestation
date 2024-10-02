// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Simple username/password validation (no real backend)
      if (username === 'user' && password === 'password') {
        window.location.href = 'games.html'; // Redirect to game selection
      } else {
        document.getElementById('error-msg').textContent = 'Invalid username or password';
      }
    });
  }

  // Game 1 (Color Match Challenge) logic
  const gameCanvas = document.getElementById('gameCanvas');
  if (gameCanvas) {
    const ctx = gameCanvas.getContext('2d');
    gameCanvas.width = 400;
    gameCanvas.height = 400;

    let score = 0;
    let platformColor = 'red'; // Start with red platform color
    const colors = ['red', 'green', 'blue'];
    let backgroundColor = randomColor();

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function resetGame1() {
      score = 0;
      platformColor = 'red';
      backgroundColor = randomColor();
      document.getElementById('score').textContent = `Score: ${score}`;
    }

    // Update the game
    function updateGame() {
      ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

      // Draw the platform
      ctx.fillStyle = platformColor;
      ctx.fillRect(150, 300, 100, 50);

      // Check for match
      if (backgroundColor === platformColor) {
        score += 1;
        backgroundColor = randomColor(); // Change background color
        document.getElementById('score').textContent = `Score: ${score}`;
      }

      requestAnimationFrame(updateGame);
    }

    // Handle key press to change platform color
    document.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        platformColor = 'red';
      } else if (event.key === 'g') {
        platformColor = 'green';
      } else if (event.key === 'b') {
        platformColor = 'blue';
      }
    });

    // Restart game 1
    document.getElementById('restart-game1').addEventListener('click', resetGame1);

    updateGame(); // Start the game loop
  }

  // Game 2 (Click the Target) logic
  const targetCanvas = document.getElementById('targetCanvas');
  if (targetCanvas) {
    const ctx = targetCanvas.getContext('2d');
    targetCanvas.width = 400;
    targetCanvas.height = 400;

    let score = 0;
    let targetX = Math.random() * 350;
    let targetY = Math.random() * 350;
    const targetRadius = 25;

    function resetGame2() {
      score = 0;
      targetX = Math.random() * 350;
      targetY = Math.random() * 350;
      document.getElementById('score').textContent = `Score: ${score}`;
    }

    // Draw target
    function drawTarget() {
      ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    // Handle click event to detect target hit
    targetCanvas.addEventListener('click', (event) => {
      const rect = targetCanvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Calculate distance between click and target center
      const distance = Math.sqrt((mouseX - targetX) ** 2 + (mouseY - targetY) ** 2);

      if (distance <= targetRadius) {
        score += 1;
        targetX = Math.random() * 350;
        targetY = Math.random() * 350;
        document.getElementById('score').textContent = `Score: ${score}`;
        drawTarget();
      }
    });

    // Restart game 2
    document.getElementById('restart-game2').addEventListener('click', resetGame2);

    drawTarget(); // Start by drawing the first target
  }
});
