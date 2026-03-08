// --- URL PARAMETER & INIT ---
const urlParams = new URLSearchParams(window.location.search);
const forcedLang = urlParams.get('lang') || 'de';
const urlUser = urlParams.get('user') || 'Player';

document.getElementById('player-name').innerText = urlUser;

if (urlParams.get('action') === 'clearSave') {
    localStorage.removeItem('casinoCoins');
    localStorage.removeItem('tradeShares');
}

// Master Balance!
let coins = parseInt(localStorage.getItem('casinoCoins')) || 1000;
const coinsDisplay = document.getElementById('coins-display');

function updateCoins(amount) {
    if (amount !== undefined) coins = amount;
    coinsDisplay.innerText = coins;
    localStorage.setItem('casinoCoins', coins);
}
updateCoins(); // initial render

// --- SCREEN MANAGEMENT ---
const screens = ['lobby', 'slots', 'blackjack', 'roulette', 'trading'];
const btnBack = document.getElementById('btn-back-lobby');
const title = document.getElementById('title');

window.openGame = function(gameId) {
    screens.forEach(s => document.getElementById(`screen-${s}`).classList.remove('active'));
    document.getElementById(`screen-${gameId}`).classList.add('active');
    btnBack.classList.remove('hidden');

    if (gameId === 'slots') title.innerText = 'Lucky Slots';
    if (gameId === 'blackjack') title.innerText = 'Blackjack 21';
    if (gameId === 'roulette') title.innerText = 'Roulette';
    if (gameId === 'trading') title.innerText = 'Wall Street';
}

btnBack.addEventListener('click', () => {
    screens.forEach(s => document.getElementById(`screen-${s}`).classList.remove('active'));
    document.getElementById('screen-lobby').classList.add('active');
    btnBack.classList.add('hidden');
    title.innerText = 'Grand Casino';
});


// ==========================================
// GAME 1: SLOTS
// ==========================================
let slotsBet = 10;
let isSpinning = false;
const symbols = ['🍒', '🍋', '🍊', '🍉', '🍇', '💎', '🔔', '7️⃣'];
const betDisplay = document.getElementById('current-bet');
const slotsMsg = document.getElementById('slots-status');
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

document.getElementById('btn-bet-up').onclick = () => {
    if (!isSpinning && slotsBet + 10 <= coins) {
        slotsBet += 10;
        betDisplay.innerText = slotsBet;
    }
};
document.getElementById('btn-bet-down').onclick = () => {
    if (!isSpinning && slotsBet > 10) {
        slotsBet -= 10;
        betDisplay.innerText = slotsBet;
    }
};

document.getElementById('btn-spin').onclick = () => {
    if (isSpinning) return;
    if (coins < slotsBet) { slotsMsg.innerHTML = `<span class="status-lose">Zu wenig Coins!</span>`; return; }

    updateCoins(coins - slotsBet);
    isSpinning = true;
    slotsMsg.innerHTML = "🎰 🎰 🎰";
    reels.forEach(r => r.classList.add('spinning'));

    setTimeout(() => {
        reels.forEach(r => r.classList.remove('spinning'));
        const result = [symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)], symbols[Math.floor(Math.random() * symbols.length)]];
        reels[0].innerText = result[0];
        reels[1].innerText = result[1];
        reels[2].innerText = result[2];

        if (result[0] === result[1] && result[1] === result[2]) {
            let win = slotsBet * 10;
            updateCoins(coins + win);
            slotsMsg.innerHTML = `<span class="status-win">JACKPOT! (+${win})</span>`;
        } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
            let win = slotsBet * 2;
            updateCoins(coins + win);
            slotsMsg.innerHTML = `<span class="status-win">Gewonnen! (+${win})</span>`;
        } else {
            slotsMsg.innerHTML = `<span class="status-lose">Verloren!</span>`;
        }

        isSpinning = false;
        if (slotsBet > coins && coins > 0) {
            slotsBet = Math.max(10, Math.floor(coins / 10) * 10);
            betDisplay.innerText = slotsBet;
        }
    }, 1500);
};


// ==========================================
// GAME 2: BLACKJACK
// ==========================================
let deck = [],
    pHand = [],
    dHand = [];
const suits = ['♥', '♦', '♣', '♠'],
    vals = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const getVal = (c) => ['J', 'Q', 'K'].includes(c.v) ? 10 : c.v === 'A' ? 11 : parseInt(c.v);
const calcScore = (hand) => {
    let s = 0,
        aces = 0;
    hand.forEach(c => { s += getVal(c); if (c.v === 'A') aces++; });
    while (s > 21 && aces > 0) {
        s -= 10;
        aces--;
    }
    return s;
};

const renderBJ = () => {
    const dc = document.getElementById('d-cards'),
        pc = document.getElementById('p-cards');
    dc.innerHTML = '';
    pc.innerHTML = '';
    dHand.forEach(c => { dc.innerHTML += `<div class="card ${c.s==='♥'||c.s==='♦'?'red-suit':''}">${c.hidden?'?':c.v+c.s}</div>` });
    pHand.forEach(c => { pc.innerHTML += `<div class="card ${c.s==='♥'||c.s==='♦'?'red-suit':''}">${c.v+c.s}</div>` });
    document.getElementById('p-score').innerText = calcScore(pHand);
    document.getElementById('d-score').innerText = dHand.length > 0 && dHand[0].hidden ? '?' : calcScore(dHand);
};

document.getElementById('btn-bj-deal').onclick = () => {
    if (coins < 50) { document.getElementById('bj-msg').innerHTML = `<span class="status-lose">Nicht genug Coins!</span>`; return; }
    updateCoins(coins - 50);

    deck = [];
    suits.forEach(s => vals.forEach(v => deck.push({ s, v })));
    deck.sort(() => Math.random() - 0.5);
    pHand = [deck.pop(), deck.pop()];
    dHand = [{ hidden: true, ...deck.pop() }, deck.pop()];
    document.getElementById('bj-msg').innerText = 'Dein Zug...';

    document.getElementById('btn-bj-hit').disabled = false;
    document.getElementById('btn-bj-stand').disabled = false;
    document.getElementById('btn-bj-deal').disabled = true;
    renderBJ();
    if (calcScore(pHand) === 21) endBJ(true, "Blackjack!");
};

const endBJ = (win, msg) => {
    dHand[0].hidden = false;
    renderBJ();
    document.getElementById('bj-msg').innerHTML = `<span class="${win ? 'status-win' : (win===null ? '' : 'status-lose')}">${msg || (win?"Du Gewinnst (+100)!":"Du Verlierst!")}</span>`;

    if (win) updateCoins(coins + 100);
    else if (win === null) {
        updateCoins(coins + 50);
        document.getElementById('bj-msg').innerText = "Unentschieden (+50)";
    }

    document.getElementById('btn-bj-hit').disabled = true;
    document.getElementById('btn-bj-stand').disabled = true;
    document.getElementById('btn-bj-deal').disabled = false;
};

document.getElementById('btn-bj-hit').onclick = () => {
    pHand.push(deck.pop());
    renderBJ();
    if (calcScore(pHand) > 21) endBJ(false, "Bust! Verloren.");
};
document.getElementById('btn-bj-stand').onclick = () => {
    dHand[0].hidden = false;
    while (calcScore(dHand) < 17) dHand.push(deck.pop());
    renderBJ();
    let ps = calcScore(pHand),
        ds = calcScore(dHand);
    if (ds > 21 || ps > ds) endBJ(true);
    else if (ds === ps) endBJ(null);
    else endBJ(false);
};


// ==========================================
// GAME 3: ROULETTE
// ==========================================
const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const getColor = (n) => n === 0 ? 'green' : (reds.includes(n) ? 'red' : 'black');
let isRolling = false;

window.playRoulette = (betColor) => {
    if (isRolling) return;
    if (coins < 50) { document.getElementById('roulette-msg').innerHTML = `<span class="status-lose">Nicht genug Coins!</span>`; return; }

    isRolling = true;
    updateCoins(coins - 50);
    let resBox = document.getElementById('roulette-result');
    let msg = document.getElementById('roulette-msg');
    msg.innerText = "Kugel rollt...";
    resBox.innerText = "?";
    resBox.className = "result-box";

    let rollInt = setInterval(() => resBox.innerText = Math.floor(Math.random() * 37), 50);

    setTimeout(() => {
        clearInterval(rollInt);
        let num = Math.floor(Math.random() * 37);
        let winColor = getColor(num);
        resBox.innerText = num;
        resBox.className = "result-box bg-" + winColor;

        if (betColor === winColor) {
            let win = betColor === 'green' ? 50 * 14 : 50 * 2;
            updateCoins(coins + win);
            msg.innerHTML = `<span class="status-win">Gewonnen! (+${win})</span>`;
        } else {
            msg.innerHTML = `<span class="status-lose">Verloren!</span>`;
        }
        isRolling = false;
    }, 2000);
};


// ==========================================
// GAME 4: TRADING (WALL STREET)
// ==========================================
let shares = parseInt(localStorage.getItem('tradeShares')) || 0;
let price = 100.00;
let priceHistory = Array(30).fill(100);
const ctx = document.getElementById('trade-chart').getContext('2d');

const updateTradeUI = () => {
    document.getElementById('trade-shares').innerText = shares;
    document.getElementById('trade-price').innerText = price.toFixed(2);
    document.getElementById('trade-value').innerText = (shares * price).toFixed(2);
    localStorage.setItem('tradeShares', shares);
};

const drawChart = () => {
    ctx.canvas.width = ctx.canvas.parentElement.clientWidth;
    ctx.canvas.height = 200;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let max = Math.max(...priceHistory) + 10,
        min = Math.min(...priceHistory) - 10;
    ctx.beginPath();
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    priceHistory.forEach((val, i) => {
        let x = (i / (priceHistory.length - 1)) * ctx.canvas.width;
        let y = ctx.canvas.height - ((val - min) / (max - min) * ctx.canvas.height);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
};

document.getElementById('btn-trade-buy').onclick = () => {
    if (coins >= price) {
        updateCoins(coins - price);
        shares++;
        updateTradeUI();
    }
};
document.getElementById('btn-trade-sell').onclick = () => {
    if (shares > 0) {
        updateCoins(coins + price);
        shares--;
        updateTradeUI();
    }
};

// Markt-Update Loop (läuft immer im Hintergrund weiter!)
setInterval(() => {
    let change = (Math.random() - 0.5) * 10;
    price = Math.max(1, price + change); // Preis kann nicht unter 1 fallen
    document.getElementById('trade-price').style.color = change >= 0 ? '#00ff88' : '#e74c3c';
    priceHistory.shift();
    priceHistory.push(price);

    // Nur neu zeichnen, wenn Screen offen ist (spart Leistung)
    if (document.getElementById('screen-trading').classList.contains('active')) {
        drawChart();
        updateTradeUI();
    }
}, 1000);

updateTradeUI();