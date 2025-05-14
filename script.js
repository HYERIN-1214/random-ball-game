let names = [];
let balls = [];
let obstacles = [];
let isRunning = false;

function addName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        const nameList = document.getElementById('name-list');
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
        nameInput.value = '';
    }
}

function startRace() {
    if (names.length < 2) {
        alert("두 명 이상의 이름을 입력해주세요!");
        return;
    }

    document.getElementById('start-button').disabled = true;
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('name-list').style.display = 'none';

    const track = document.getElementById('race-track');
    track.innerHTML = '';

    names.forEach((name, index) => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = name;
        ball.style.left = `${(index + 1) * (90 / (names.length + 1))}%`;
        ball.style.top = '0px';
        track.appendChild(ball);
        balls.push({ element: ball, position: 0, speed: Math.random() * 2 + 2 });
    });

    generateObstacles();
    isRunning = true;
    requestAnimationFrame(updateRace);
}

function generateObstacles() {
    const track = document.getElementById('race-track');
    for (let i = 0; i < 10; i++) {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        const size = Math.random() * 40 + 20;
        obstacle.style.width = `${size}px`;
        obstacle.style.height = `${size}px`;
        obstacle.style.left = `${Math.random() * 90}%`;
        obstacle.style.top = `${Math.random() * 400}px`;
        track.appendChild(obstacle);
        obstacles.push({ element: obstacle, size, speed: Math.random() * 2 + 1 });
    }
}

function updateRace() {
    if (!isRunning) return;

    balls.forEach(ball => {
        let speedBoost = Math.random() * 2 - 1;
        ball.position += ball.speed + speedBoost;
        if (ball.position >= 450) {
            declareWinner(ball.element.textContent);
            isRunning = false;
        }
        ball.element.style.top = `${ball.position}px`;
    });

    obstacles.forEach(obstacle => {
        obstacle.element.style.top = `${parseFloat(obstacle.element.style.top) + obstacle.speed}px`;
        if (parseFloat(obstacle.element.style.top) > 500) {
            obstacle.element.style.top = '-50px';
            obstacle.element.style.left = `${Math.random() * 90}%`;
        }
    });

    if (isRunning) {
        requestAnimationFrame(updateRace);
    }
}

function declareWinner(name) {
    const winnerDiv = document.getElementById('winner');
    winnerDiv.textContent = `🎉 오늘의 커피는 ${name}!`;
    winnerDiv.classList.remove('hidden');
}

