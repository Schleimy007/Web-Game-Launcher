// --- URL Parameter & Sprachsystem Setup ---
const urlParams = new URLSearchParams(window.location.search);
let currentLang = urlParams.get('lang') || localStorage.getItem('flappyLang') || 'de';

const tDict = {
    back: { de: "Hub Menü", en: "Hub Menu", es: "Menú Hub", fr: "Menu Hub", it: "Menu Hub", pt: "Menu Hub", nl: "Hub Menu", pl: "Menu Hub", ru: "Меню", ja: "ハブメニュー", zh: "枢纽菜单", ko: "허브 메뉴", ar: "القائمة", hi: "हब मेनू", tr: "Hub Menü", sv: "Hub-meny", da: "Hub Menu", fi: "Hub-valikko", el: "Μενού", cs: "Hub Menu" },
    menuTitle: { de: "Wähle dein Spiel", en: "Choose your game", es: "Elige tu juego", fr: "Choisissez votre jeu", it: "Scegli il gioco", pt: "Escolha seu jogo", nl: "Kies je spel", pl: "Wybierz grę", ru: "Выберите игру", ja: "ゲームを選択", zh: "选择游戏", ko: "게임 선택", ar: "اختر لعبتك", hi: "अपना खेल चुनें", tr: "Oyununu seç", sv: "Välj spel", da: "Vælg spil", fi: "Valitse peli", el: "Επιλέξτε παιχνίδι", cs: "Vyberte hru" },
    tradeTitle: { de: "Aktien Trading", en: "Stock Trading", es: "Comercio de Acciones", fr: "Bourse", it: "Trading Azioni", pt: "Negociação de Ações", nl: "Aandelenhandel", pl: "Giełda", ru: "Трейдинг", ja: "株式取引", zh: "股票交易", ko: "주식 거래", ar: "تداول الأسهم", hi: "शेयर ट्रेडिंग", tr: "Hisse Ticareti", sv: "Aktiehandel", da: "Aktiehandel", fi: "Osakekauppa", el: "Συναλλαγές", cs: "Obchodování" },
    wheelTitle: { de: "Glücksrad", en: "Wheel of Fortune", es: "Ruleta de la Fortuna", fr: "Roue de la Fortune", it: "Ruota della Fortuna", pt: "Roda da Fortuna", nl: "Rad van Fortuin", pl: "Koło Fortuny", ru: "Колесо Фортуны", ja: "観覧車", zh: "幸运轮", ko: "행운의 바퀴", ar: "عجلة الحظ", hi: "भाग्य का पहिया", tr: "Çarkıfelek", sv: "Lyckohjul", da: "Lykkehjul", fi: "Onnenpyörä", el: "Τροχός της Τύχης", cs: "Kolo štěstí" },
    msgBet: { de: "Einsatz wählen!", en: "Place your bet!", es: "¡Haz tu apuesta!", fr: "Faites vos jeux!", it: "Fai la tua puntata!", pt: "Faça sua aposta!", nl: "Plaats inzet!", pl: "Zrób zakład!", ru: "Сделайте ставку!", ja: "ベットを配置！", zh: "下注！", ko: "베팅하세요!", ar: "ضع رهانك!", hi: "शर्त लगाएं!", tr: "Bahis yapın!", sv: "Placera insats!", da: "Placer indsats!", fi: "Aseta panos!", el: "Τοποθετήστε στοίχημα!", cs: "Vsaďte si!" },
    lblYou: { de: "Du", en: "You", es: "Tú", fr: "Toi", it: "Tu", pt: "Você", nl: "Jij", pl: "Ty", ru: "Ты", ja: "あなた", zh: "你", ko: "너", ar: "أنت", hi: "आप", tr: "Sen", sv: "Du", da: "Du", fi: "Sinä", el: "Εσύ", cs: "Ty" },
    lblShares: { de: "Aktien", en: "Shares", es: "Acciones", fr: "Actions", it: "Azioni", pt: "Ações", nl: "Aandelen", pl: "Akcje", ru: "Акции", ja: "株式", zh: "股票", ko: "주식", ar: "الأسهم", hi: "शेयर", tr: "Hisseler", sv: "Aktier", da: "Aktier", fi: "Osakkeet", el: "Μετοχές", cs: "Akcie" },
    lblValue: { de: "Wert", en: "Value", es: "Valor", fr: "Valeur", it: "Valore", pt: "Valor", nl: "Waarde", pl: "Wartość", ru: "Ценность", ja: "価値", zh: "价值", ko: "가치", ar: "القيمة", hi: "मूल्य", tr: "Değer", sv: "Värde", da: "Værdi", fi: "Arvo", el: "Αξία", cs: "Hodnota" },
    btnBuy: { de: "KAUFEN", en: "BUY", es: "COMPRAR", fr: "ACHETER", it: "COMPRA", pt: "COMPRAR", nl: "KOPEN", pl: "KUP", ru: "КУПИТЬ", ja: "購入", zh: "买", ko: "구입", ar: "شراء", hi: "खरीदें", tr: "SATIN AL", sv: "KÖP", da: "KØB", fi: "OSTA", el: "ΑΓΟΡΑ", cs: "KOUPIT" },
    btnSell: { de: "VERKAUFEN", en: "SELL", es: "VENDER", fr: "VENDRE", it: "VENDI", pt: "VENDER", nl: "VERKOPEN", pl: "SPRZEDAJ", ru: "ПРОДАТЬ", ja: "売る", zh: "卖出", ko: "팔다", ar: "يبيع", hi: "बेचना", tr: "SAT", sv: "SÄLJ", da: "SÆLG", fi: "MYY", el: "ΠΩΛΗΣΗ", cs: "PRODAT" },
    msgColor: { de: "Wähle eine Farbe!", en: "Choose a color!", es: "¡Elige un color!", fr: "Choisis une couleur!", it: "Scegli un colore!", pt: "Escolha uma cor!", nl: "Kies een kleur!", pl: "Wybierz kolor!", ru: "Выберите цвет!", ja: "色を選択", zh: "选择颜色", ko: "색상을 선택하십시오!", ar: "اختر لوناً!", hi: "रंग चुनें!", tr: "Bir renk seç!", sv: "Välj färg!", da: "Vælg farve!", fi: "Valitse väri!", el: "Επιλέξτε χρώμα!", cs: "Vyberte barvu!" },
    btnRed: { de: "Rot", en: "Red", es: "Rojo", fr: "Rouge", it: "Rosso", pt: "Vermelho", nl: "Rood", pl: "Czerwony", ru: "Красный", ja: "赤", zh: "红", ko: "빨간색", ar: "أحمر", hi: "लाल", tr: "Kırmızı", sv: "Röd", da: "Rød", fi: "Punainen", el: "Κόκκινο", cs: "Červená" },
    btnGreen: { de: "Grün", en: "Green", es: "Verde", fr: "Vert", it: "Verde", pt: "Verde", nl: "Groen", pl: "Zielony", ru: "Зеленый", ja: "緑", zh: "绿色", ko: "녹색", ar: "أخضر", hi: "हरा", tr: "Yeşil", sv: "Grön", da: "Grøn", fi: "Vihreä", el: "Πράσινο", cs: "Zelená" },
    btnBlack: { de: "Schwarz", en: "Black", es: "Negro", fr: "Noir", it: "Nero", pt: "Preto", nl: "Zwart", pl: "Czarny", ru: "Черный", ja: "黒", zh: "黑色", ko: "검정", ar: "أسود", hi: "काला", tr: "Siyah", sv: "Svart", da: "Sort", fi: "Musta", el: "Μαύρο", cs: "Černá" },
    msgCashout: { de: "Wann casht du aus?", en: "When to cash out?", es: "¿Cuándo retirar?", fr: "Quand encaisser?", it: "Quando incassare?", pt: "Quando sacar?", nl: "Wanneer uitbetalen?", pl: "Kiedy wypłacić?", ru: "Когда вывести?", ja: "いつ換金する？", zh: "何时提现？", ko: "언제 현금화할까요?", ar: "متى تسحب؟", hi: "कब कैश आउट करें?", tr: "Ne zaman çekilir?", sv: "När ska man ta ut?", da: "Hvornår udbetaling?", fi: "Milloin lunastaa?", el: "Πότε να εξαργυρώσετε;", cs: "Kdy vybrat?" },
    btnGenMines: { de: "Feld generieren", en: "Generate Field", es: "Generar Campo", fr: "Générer Champ", it: "Genera Campo", pt: "Gerar Campo", nl: "Veld Genereren", pl: "Generuj Pole", ru: "Создать поле", ja: "フィールド生成", zh: "生成字段", ko: "필드 생성", ar: "إنشاء حقل", hi: "फ़ील्ड जेनरेट करें", tr: "Alan Oluştur", sv: "Generera Fält", da: "Generer Felt", fi: "Luo Kenttä", el: "Δημιουργία Πεδίου", cs: "Generovat pole" },
    msgMines: { de: "Finde die Diamanten!", en: "Find the diamonds!", es: "¡Encuentra diamantes!", fr: "Trouvez les diamants!", it: "Trova i diamanti!", pt: "Encontre os diamantes!", nl: "Vind de diamanten!", pl: "Znajdź diamenty!", ru: "Найди алмазы!", ja: "ダイヤを探せ！", zh: "寻找钻石！", ko: "다이아몬드를 찾아라!", ar: "ابحث عن الماس!", hi: "हीरे खोजें!", tr: "Elmasları bul!", sv: "Hitta diamanterna!", da: "Find diamanterne!", fi: "Etsi timantit!", el: "Βρείτε τα διαμάντια!", cs: "Najděte diamanty!" },
    msgDice: { de: "Würfel unter Zielzahl!", en: "Roll under target!", es: "¡Tira debajo del objetivo!", fr: "Roulez sous la cible!", it: "Lancia sotto l'obiettivo!", pt: "Role abaixo do alvo!", nl: "Rol onder doel!", pl: "Rzuć poniżej celu!", ru: "Бросок ниже цели!", ja: "ターゲットの下に転がる！", zh: "在目标下滚动！", ko: "목표 아래로 굴리기!", ar: "تدحرج تحت الهدف!", hi: "लक्ष्य के नीचे रोल करें!", tr: "Hedefin altında yuvarla!", sv: "Rulla under målet!", da: "Rul under mål!", fi: "Vieritä alle tavoitteen!", el: "Κυλήστε κάτω από τον στόχο!", cs: "Zahrajte pod cíl!" },
    lblTarget: { de: "Ziel (Unter)", en: "Target (Under)", es: "Objetivo", fr: "Cible", it: "Obiettivo", pt: "Alvo", nl: "Doel", pl: "Cel", ru: "Цель", ja: "ターゲット", zh: "目标", ko: "목표", ar: "الهدف", hi: "लक्ष्य", tr: "Hedef", sv: "Mål", da: "Mål", fi: "Tavoite", el: "Στόχος", cs: "Cíl" },
    btnRoll: { de: "Würfeln", en: "Roll", es: "Tirar", fr: "Rouler", it: "Lancia", pt: "Rolar", nl: "Rollen", pl: "Rzuć", ru: "Бросок", ja: "ロール", zh: "滚", ko: "굴리다", ar: "رول", hi: "रोल", tr: "Yuvarla", sv: "Rulla", da: "Rul", fi: "Heitä", el: "Ρολό", cs: "Hodit" },
    msgWheel: { de: "Dreh das Rad!", en: "Spin the wheel!", es: "¡Gira la rueda!", fr: "Tourne la roue!", it: "Gira la ruota!", pt: "Gire a roda!", nl: "Draai het rad!", pl: "Zakręć kołem!", ru: "Крути колесо!", ja: "ホイールを回す！", zh: "转动轮子！", ko: "바퀴를 돌려라!", ar: "أدر العجلة!", hi: "पहिया घुमाएं!", tr: "Çarkı çevir!", sv: "Snurra hjulet!", da: "Drej hjulet!", fi: "Pyöritä pyörää!", el: "Γυρίστε τον τροχό!", cs: "Roztočte kolo!" },
    btnSpin: { de: "Drehen", en: "Spin", es: "Girar", fr: "Tourner", it: "Gira", pt: "Girar", nl: "Draaien", pl: "Kręcić", ru: "Крутить", ja: "回す", zh: "转圈", ko: "회전", ar: "تدور", hi: "स्पिन", tr: "Çevir", sv: "Snurra", da: "Drej", fi: "Pyöritä", el: "Γυρίζω", cs: "Roztočit" },
    msgHl: { de: "Höher oder niedriger?", en: "Higher or lower?", es: "¿Mayor o menor?", fr: "Plus haut ou plus bas?", it: "Più alto o più basso?", pt: "Maior ou menor?", nl: "Hoger of lager?", pl: "Wyżej czy niżej?", ru: "Выше или ниже?", ja: "高いか低いか？", zh: "更高还是更低？", ko: "더 높거나 더 낮습니까?", ar: "أعلى أو أسفل؟", hi: "उच्च या निम्न?", tr: "Daha yüksek veya düşük?", sv: "Högre eller lägre?", da: "Højere eller lavere?", fi: "Korkeampi tai matalampi?", el: "Υψηλότερα ή χαμηλότερα;", cs: "Vyšší nebo nižší?" },
    btnHigh: { de: "Höher", en: "Higher", es: "Mayor", fr: "Plus", it: "Alto", pt: "Maior", nl: "Hoger", pl: "Wyżej", ru: "Выше", ja: "より高い", zh: "更高", ko: "더 높은", ar: "أعلى", hi: "उच्च", tr: "Daha yüksek", sv: "Högre", da: "Højere", fi: "Korkeampi", el: "Υψηλότερο", cs: "Vyšší" },
    btnLow: { de: "Niedriger", en: "Lower", es: "Menor", fr: "Moins", it: "Basso", pt: "Menor", nl: "Lager", pl: "Niżej", ru: "Ниже", ja: "低い", zh: "较低", ko: "더 낮은", ar: "أدنى", hi: "कम", tr: "Daha düşük", sv: "Lägre", da: "Lavere", fi: "Matalampi", el: "Χαμηλότερο", cs: "Nižší" }
};

function applyLanguage(lang) {
    document.getElementById('lang-select').value = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (tDict[key] && tDict[key][lang]) {
            el.innerText = tDict[key][lang];
        } else if (tDict[key] && tDict[key]['en']) {
            el.innerText = tDict[key]['en']; // Fallback zu Englisch
        }
    });
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('flappyLang', currentLang); // Speichert die Sprache synchron zum Launcher
    applyLanguage(currentLang);
});

// Setup Balance
let balance = parseInt(localStorage.getItem('casinoBalance')) || 1000;
const balanceDisplay = document.getElementById('balance-display');

function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('casinoBalance', balance);
    balanceDisplay.innerText = Math.floor(balance);
}
updateBalance(0);

// --- NAVIGATION ---
const btnBack = document.getElementById('btn-back');
const views = document.querySelectorAll('.view');

function openGame(gameId) {
    views.forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + gameId).classList.add('active');
    btnBack.classList.remove('hidden');
    if (gameId === 'trading' && !tradingActive) initTrading();
}

btnBack.addEventListener('click', () => {
    views.forEach(v => v.classList.remove('active'));
    document.getElementById('view-menu').classList.add('active');
    btnBack.classList.add('hidden');
});

function showMessage(elId, text, color = '#fff') {
    const el = document.getElementById(elId);
    el.innerText = text;
    el.style.color = color;
    el.style.animation = 'none';
    setTimeout(() => el.style.animation = 'fadeIn 0.3s ease', 10);
}

// -----------------------------------------
// 1. SLOT MACHINE
// -----------------------------------------
const slotSymbols = ['🍒', '🍋', '🍉', '🔔', '💎', '7️⃣'];
const btnSpin = document.getElementById('btn-spin');
const slotBet = document.getElementById('slot-bet');
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

btnSpin.addEventListener('click', () => {
    const bet = parseInt(slotBet.value);
    if (bet < 1 || bet > balance) return showMessage('slot-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    btnSpin.disabled = true;
    showMessage('slot-msg', '...', 'var(--text-muted)');
    reels.forEach(r => {
        r.classList.add('spinning');
        r.classList.remove('win-anim');
    });
    let results = [];
    [1000, 1500, 2000].forEach((time, index) => {
        setTimeout(() => {
            reels[index].classList.remove('spinning');
            const randSym = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
            reels[index].querySelector('.symbol').innerText = randSym;
            results[index] = randSym;
            if (index === 2) checkSlotWin(results, bet);
        }, time);
    });
});

function checkSlotWin(res, bet) {
    btnSpin.disabled = false;
    const [s1, s2, s3] = res;
    if (s1 === s2 && s2 === s3) {
        let multi = (s1 === '7️⃣') ? 50 : (s1 === '💎') ? 20 : (s1 === '🔔') ? 10 : 5;
        updateBalance(bet * multi);
        showMessage('slot-msg', `JACKPOT! +${bet * multi} €`, 'var(--warning)');
        reels.forEach(r => r.classList.add('win-anim'));
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        updateBalance(bet * 2);
        showMessage('slot-msg', `Win! +${bet * 2} €`, 'var(--success)');
    } else {
        showMessage('slot-msg', 'Lose.', 'var(--danger)');
    }
}

// -----------------------------------------
// 2. BLACKJACK
// -----------------------------------------
const suits = ['♠', '♥', '♦', '♣'],
    values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [],
    playerHand = [],
    dealerHand = [],
    bjBet = 0;

function createDeck() {
    deck = [];
    for (let s of suits)
        for (let v of values) deck.push({ suit: s, val: v });
    deck.sort(() => Math.random() - 0.5);
}

function getCardHTML(card, hidden = false) {
    if (hidden) return `<div class="card-ui card-hidden"></div>`;
    const isRed = (card.suit === '♥' || card.suit === '♦') ? 'red' : '';
    return `<div class="card-ui ${isRed}"><div class="card-top">${card.val}${card.suit}</div><div class="card-center">${card.suit}</div><div class="card-bottom">${card.val}${card.suit}</div></div>`;
}

function calcScore(hand) {
    let score = 0,
        aces = 0;
    hand.forEach(c => {
        if (c.val === 'A') {
            aces++;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(c.val)) score += 10;
        else score += parseInt(c.val);
    });
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

function renderBJ(hideDealer = false) {
    document.getElementById('player-cards').innerHTML = playerHand.map(c => getCardHTML(c)).join('');
    document.getElementById('player-score').innerText = calcScore(playerHand);
    document.getElementById('dealer-cards').innerHTML = dealerHand.map((c, i) => getCardHTML(c, i === 1 && hideDealer)).join('');
    document.getElementById('dealer-score').innerText = hideDealer ? "?" : calcScore(dealerHand);
}

document.getElementById('btn-bj-deal').addEventListener('click', () => {
    bjBet = parseInt(document.getElementById('bj-bet').value);
    if (bjBet < 1 || bjBet > balance) return showMessage('bj-msg', 'Error!', 'var(--danger)');
    updateBalance(-bjBet);
    createDeck();
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    document.getElementById('bj-bet-area').classList.add('hidden');
    document.getElementById('bj-action-area').classList.remove('hidden');
    showMessage('bj-msg', 'Hit or Stand?');
    renderBJ(true);
    if (calcScore(playerHand) === 21) handleBjEnd();
});

document.getElementById('btn-bj-hit').addEventListener('click', () => {
    playerHand.push(deck.pop());
    renderBJ(true);
    if (calcScore(playerHand) > 21) {
        renderBJ(false);
        showMessage('bj-msg', 'Bust!', '#e74c3c');
        resetBjUI();
    }
});

document.getElementById('btn-bj-stand').addEventListener('click', () => handleBjEnd());

function handleBjEnd() {
    let p = calcScore(playerHand),
        d = calcScore(dealerHand);
    while (d < 17) {
        dealerHand.push(deck.pop());
        d = calcScore(dealerHand);
    }
    renderBJ(false);
    if (d > 21 || p > d) {
        updateBalance(bjBet * 2);
        showMessage('bj-msg', 'Win!', '#2ecc71');
    } else if (p === d) {
        updateBalance(bjBet);
        showMessage('bj-msg', 'Push!', '#f1c40f');
    } else showMessage('bj-msg', 'Lose!', '#e74c3c');
    resetBjUI();
}

function resetBjUI() {
    document.getElementById('bj-action-area').classList.add('hidden');
    setTimeout(() => document.getElementById('bj-bet-area').classList.remove('hidden'), 2000);
}

// -----------------------------------------
// 3. TRADING
// -----------------------------------------
let tradingActive = false,
    currentPrice = 100.0,
    ownedShares = 0,
    priceHistory = Array(20).fill(100),
    tradingInterval;

function initTrading() {
    tradingActive = true;
    renderChart();
    if (tradingInterval) clearInterval(tradingInterval);
    tradingInterval = setInterval(() => {
        currentPrice = Math.max(1, currentPrice * (1 + ((Math.random() - 0.5) * 5) / 100));
        priceHistory.shift();
        priceHistory.push(currentPrice);
        document.getElementById('live-price').innerText = currentPrice.toFixed(2) + ' €';
        const diffPercent = ((currentPrice - priceHistory[18]) / priceHistory[18]) * 100;
        document.getElementById('price-change').innerText = (diffPercent > 0 ? '+' : '') + diffPercent.toFixed(2) + '%';
        document.getElementById('price-change').className = 'price-change ' + (diffPercent >= 0 ? 'price-up' : 'price-down');
        document.getElementById('shares-value').innerText = (ownedShares * currentPrice).toFixed(2) + ' €';
        renderChart();
    }, 2000);
}

function renderChart() {
    const min = Math.min(...priceHistory),
        max = Math.max(...priceHistory),
        range = max - min || 1;
    const c = document.getElementById('chart-bars');
    c.innerHTML = '';
    priceHistory.forEach((p, i) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = (((p - min) / range) * 80 + 10) + '%';
        if (i > 0) bar.style.backgroundColor = p >= priceHistory[i - 1] ? 'var(--success)' : 'var(--danger)';
        c.appendChild(bar);
    });
}

document.getElementById('btn-buy-stock').addEventListener('click', () => {
    if (balance >= currentPrice) {
        updateBalance(-currentPrice);
        ownedShares++;
        document.getElementById('owned-shares').innerText = ownedShares;
        document.getElementById('shares-value').innerText = (ownedShares * currentPrice).toFixed(2) + ' €';
    }
});
document.getElementById('btn-sell-stock').addEventListener('click', () => {
    if (ownedShares > 0) {
        updateBalance(currentPrice);
        ownedShares--;
        document.getElementById('owned-shares').innerText = ownedShares;
        document.getElementById('shares-value').innerText = (ownedShares * currentPrice).toFixed(2) + ' €';
    }
});

// -----------------------------------------
// 4. ROULETTE
// -----------------------------------------
window.playRoulette = function(colorStr) {
    const bet = parseInt(document.getElementById('roulette-bet').value);
    if (bet < 1 || bet > balance) return showMessage('roulette-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    let roll = 0,
        spins = 0;
    const display = document.getElementById('roulette-result');
    const interval = setInterval(() => {
        display.innerText = Math.floor(Math.random() * 15);
        spins++;
        if (spins > 20) {
            clearInterval(interval);
            roll = Math.floor(Math.random() * 15);
            display.innerText = roll;
            let resultColor = roll === 0 ? 'green' : (roll <= 7 ? 'red' : 'black');
            display.style.color = roll === 0 ? 'var(--success)' : (roll <= 7 ? 'var(--danger)' : '#aaa');
            if (colorStr === resultColor) {
                let win = colorStr === 'green' ? bet * 14 : bet * 2;
                updateBalance(win);
                showMessage('roulette-msg', `Win! +${win} €`, 'var(--success)');
            } else { showMessage('roulette-msg', 'Lose.', 'var(--danger)'); }
        }
    }, 50);
}

// -----------------------------------------
// 5. CRASH
// -----------------------------------------
let crashMult = 1.0,
    crashTarget = 1.0,
    crashBet = 0,
    crashInterval;
document.getElementById('btn-crash-start').addEventListener('click', () => {
    crashBet = parseInt(document.getElementById('crash-bet').value);
    if (crashBet < 1 || crashBet > balance) return showMessage('crash-msg', 'Error!', 'var(--danger)');
    updateBalance(-crashBet);
    document.getElementById('crash-bet-area').classList.add('hidden');
    document.getElementById('crash-cashout-area').classList.remove('hidden');
    crashMult = 1.0;
    crashTarget = 1.0 + (Math.random() * 4);
    if (Math.random() > 0.8) crashTarget += Math.random() * 10;
    document.getElementById('crash-multiplier').style.color = 'var(--accent)';
    showMessage('crash-msg', '...');
    crashInterval = setInterval(() => {
        crashMult += 0.02;
        document.getElementById('crash-multiplier').innerText = crashMult.toFixed(2) + 'x';
        if (crashMult >= crashTarget) {
            clearInterval(crashInterval);
            document.getElementById('crash-multiplier').style.color = 'var(--danger)';
            showMessage('crash-msg', 'CRASHED!', 'var(--danger)');
            resetCrash();
        }
    }, 50);
});

document.getElementById('btn-crash-cashout').addEventListener('click', () => {
    clearInterval(crashInterval);
    let win = Math.floor(crashBet * crashMult);
    updateBalance(win);
    showMessage('crash-msg', `Win! +${win} €`, 'var(--success)');
    document.getElementById('crash-multiplier').style.color = 'var(--success)';
    resetCrash();
});

function resetCrash() {
    document.getElementById('crash-cashout-area').classList.add('hidden');
    setTimeout(() => document.getElementById('crash-bet-area').classList.remove('hidden'), 2000);
}

// -----------------------------------------
// 6. COIN FLIP
// -----------------------------------------
window.playCoinFlip = function(choice) {
    const bet = parseInt(document.getElementById('coin-bet').value);
    if (bet < 1 || bet > balance) return showMessage('coin-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    const display = document.getElementById('coin-display');
    display.style.animation = 'slotSpin 0.2s infinite';
    setTimeout(() => {
        display.style.animation = 'none';
        const result = Math.random() > 0.5 ? 'heads' : 'tails';
        display.innerText = result === 'heads' ? '👱' : '🦅';
        if (choice === result) {
            updateBalance(bet * 2);
            showMessage('coin-msg', `Win! +${bet*2} €`, 'var(--success)');
        } else { showMessage('coin-msg', `Lose.`, 'var(--danger)'); }
    }, 1000);
}

// -----------------------------------------
// 7. MINES
// -----------------------------------------
let minesBet = 0,
    minesPot = 0,
    minesCount = 3;
const mGrid = document.getElementById('mines-grid');
document.getElementById('btn-mines-start').addEventListener('click', () => {
    minesBet = parseInt(document.getElementById('mines-bet').value);
    if (minesBet < 1 || minesBet > balance) return showMessage('mines-msg', 'Error!', 'var(--danger)');
    updateBalance(-minesBet);
    document.getElementById('mines-setup').classList.add('hidden');
    mGrid.classList.remove('hidden');
    document.getElementById('btn-mines-cashout').classList.remove('hidden');
    minesPot = minesBet;
    document.getElementById('mines-pot').innerText = minesPot;
    showMessage('mines-msg', '...');
    mGrid.innerHTML = '';
    let bombIndices = [];
    while (bombIndices.length < minesCount) { let r = Math.floor(Math.random() * 25); if (!bombIndices.includes(r)) bombIndices.push(r); }
    for (let i = 0; i < 25; i++) {
        let btn = document.createElement('button');
        btn.className = 'mine-btn';
        btn.onclick = () => {
            if (btn.classList.contains('safe') || btn.classList.contains('bomb')) return;
            if (bombIndices.includes(i)) {
                btn.classList.add('bomb');
                btn.innerText = '💣';
                showMessage('mines-msg', 'BOOM! Lose.', 'var(--danger)');
                Array.from(mGrid.children).forEach(b => b.onclick = null);
                setTimeout(() => {
                    mGrid.classList.add('hidden');
                    document.getElementById('mines-setup').classList.remove('hidden');
                    document.getElementById('btn-mines-cashout').classList.add('hidden');
                }, 2000);
            } else {
                btn.classList.add('safe');
                btn.innerText = '💎';
                minesPot = Math.floor(minesPot * 1.2);
                document.getElementById('mines-pot').innerText = minesPot;
            }
        };
        mGrid.appendChild(btn);
    }
});

document.getElementById('btn-mines-cashout').addEventListener('click', () => {
    updateBalance(minesPot);
    showMessage('mines-msg', `Win! +${minesPot} €`, 'var(--success)');
    Array.from(mGrid.children).forEach(b => b.onclick = null);
    document.getElementById('btn-mines-cashout').classList.add('hidden');
    setTimeout(() => {
        mGrid.classList.add('hidden');
        document.getElementById('mines-setup').classList.remove('hidden');
    }, 2000);
});

// -----------------------------------------
// 8. DICE ROLL
// -----------------------------------------
const dt = document.getElementById('dice-target');
dt.addEventListener('input', () => {
    let target = parseInt(dt.value);
    if (target < 2) target = 2;
    if (target > 98) target = 98;
    document.getElementById('dice-mult-display').innerText = (100 / target).toFixed(2) + 'x';
});

document.getElementById('btn-dice-roll').addEventListener('click', () => {
    const bet = parseInt(document.getElementById('dice-bet').value),
        target = parseInt(dt.value);
    if (bet < 1 || bet > balance) return showMessage('dice-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    const roll = Math.floor(Math.random() * 100) + 1;
    document.getElementById('dice-result').innerText = roll;
    if (roll < target) {
        const win = Math.floor(bet * (100 / target));
        updateBalance(win);
        showMessage('dice-msg', `Win! +${win} €`, 'var(--success)');
    } else { showMessage('dice-msg', `Lose.`, 'var(--danger)'); }
});

// -----------------------------------------
// 9. WHEEL OF FORTUNE
// -----------------------------------------
const wMults = [0, 1.5, 0.5, 2, 0, 3, 0.2, 5];
document.getElementById('btn-wheel-spin').addEventListener('click', () => {
    const bet = parseInt(document.getElementById('wheel-bet').value);
    if (bet < 1 || bet > balance) return showMessage('wheel-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    const wheel = document.getElementById('wheel-display');
    wheel.style.transition = 'transform 2s cubic-bezier(0.25, 1, 0.5, 1)';
    const spins = 1800 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${spins}deg)`;
    setTimeout(() => {
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${spins % 360}deg)`;
        const resObj = wMults[Math.floor(Math.random() * wMults.length)],
            win = Math.floor(bet * resObj);
        if (win > 0) {
            updateBalance(win);
            showMessage('wheel-msg', `${resObj}x! +${win} €`, 'var(--success)');
        } else { showMessage('wheel-msg', 'Lose! 0x', 'var(--danger)'); }
    }, 2000);
});

// -----------------------------------------
// 10. HIGH-LOW
// -----------------------------------------
let hlPot = 0,
    hlCurrentVal = 0;
const hlCard = document.getElementById('hl-card-current');
document.getElementById('btn-hl-start').addEventListener('click', () => {
    const bet = parseInt(document.getElementById('hl-bet').value);
    if (bet < 1 || bet > balance) return showMessage('hl-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    hlPot = bet;
    document.getElementById('hl-pot').innerText = hlPot;
    document.getElementById('hl-setup').classList.add('hidden');
    document.getElementById('hl-actions').classList.remove('hidden');
    createDeck();
    const c = deck[0];
    hlCurrentVal = ['J', 'Q', 'K', 'A'].includes(c.val) ? (c.val === 'A' ? 14 : (c.val === 'K' ? 13 : (c.val === 'Q' ? 12 : 11))) : parseInt(c.val);
    hlCard.innerHTML = `<div class="card-top">${c.val}</div><div class="card-center">${c.suit}</div>`;
    hlCard.className = 'card-ui ' + ((c.suit === '♥' || c.suit === '♦') ? 'red' : '');
    showMessage('hl-msg', '...');
});

window.playHighLow = function(guess) {
    const oldVal = hlCurrentVal;
    createDeck();
    const c = deck[0];
    hlCurrentVal = ['J', 'Q', 'K', 'A'].includes(c.val) ? (c.val === 'A' ? 14 : (c.val === 'K' ? 13 : (c.val === 'Q' ? 12 : 11))) : parseInt(c.val);
    hlCard.innerHTML = `<div class="card-top">${c.val}</div><div class="card-center">${c.suit}</div>`;
    hlCard.className = 'card-ui ' + ((c.suit === '♥' || c.suit === '♦') ? 'red' : '');

    if ((guess === 'high' && hlCurrentVal >= oldVal) || (guess === 'low' && hlCurrentVal <= oldVal)) {
        hlPot = Math.floor(hlPot * 1.5);
        document.getElementById('hl-pot').innerText = hlPot;
        showMessage('hl-msg', 'Win!', 'var(--success)');
    } else {
        showMessage('hl-msg', 'Lose!', 'var(--danger)');
        document.getElementById('hl-actions').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('hl-setup').classList.remove('hidden');
            hlCard.innerHTML = '?';
        }, 2000);
    }
}
document.getElementById('btn-hl-cashout').addEventListener('click', () => {
    updateBalance(hlPot);
    showMessage('hl-msg', `Win! +${hlPot} €`, 'var(--success)');
    document.getElementById('hl-actions').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('hl-setup').classList.remove('hidden');
        hlCard.innerHTML = '?';
    }, 2000);
});

// Beim ersten Start die Sprache sofort laden:
applyLanguage(currentLang);