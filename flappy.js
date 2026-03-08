// ==========================================
// GLOBALES LEADERBOARD SETUP (DREAMLO)
// Gleiche Keys wie im Launcher eintragen!
// ==========================================
const DREAMLO_PUBLIC = '5fa8af5feb371a09c4c51d17';
const DREAMLO_PRIVATE = 'cgpr101Ep0yMn0IZPhMAqwVghoK20BG06c_rPh-i1Npg';

// --- LÖSCH-BEFEHL & URL PARAMETER ---
const urlParams = new URLSearchParams(window.location.search);
const forcedLang = urlParams.get('lang');
const urlUser = urlParams.get('user'); // NEU: Name direkt vom Launcher

if (urlParams.get('action') === 'clearSave') {
    localStorage.removeItem('flappyHighScoreUltimate');
    localStorage.removeItem('flappyCustomSettings');
    localStorage.removeItem('flappyDiff');
    localStorage.removeItem('flappyLeaderboard');
}

// --- ÜBERSETZUNGEN ---
const translations = {
    de: { bestScore: "Bester Score:", controls: "Steuerung:<br>Leertaste / Pfeiltaste / Touch", btnStart: "Spiel Starten", btnLeaderboard: "Leaderboard", btnSettings: "Einstellungen", btnCredits: "Credits", gameOver: "Game Over!", scoreLabel: "Score:", bestLabel: "Best:", btnRestart: "Nochmal", btnMenu: "Hauptmenü", modalSettings: "Einstellungen", modalLeaderboard: "Top 10 Leaderboard", rank: "#", name: "Name", score: "Score", labelParticles: "Partikel-Effekte:", labelDifficulty: "Schwierigkeit:", diffEasy: "Einfach", diffNormal: "Normal", diffHard: "Schwer", diffCustom: "Custom", lblGrav: "Schwerkraft:", lblJump: "Sprung:", lblGap: "Lücke:", lblSpd: "Tempo:", lblSpawn: "Spawn Rate:", lblPrev: "Vorschau:", labelLanguage: "Sprache:", btnClose: "Schließen", modalCredits: "Credits", creditsDesc: "Ein ultimatives Flappy Bird Erlebnis.", getReady: "GET READY!", pressStart: "Taste / Touch zum Starten" },
    en: { bestScore: "Best Score:", controls: "Controls:<br>Space / Up Arrow / Touch", btnStart: "Start Game", btnLeaderboard: "Leaderboard", btnSettings: "Settings", btnCredits: "Credits", gameOver: "Game Over!", scoreLabel: "Score:", bestLabel: "Best:", btnRestart: "Restart", btnMenu: "Main Menu", modalSettings: "Settings", modalLeaderboard: "Top 10 Leaderboard", rank: "#", name: "Name", score: "Score", labelParticles: "Particles:", labelDifficulty: "Difficulty:", diffEasy: "Easy", diffNormal: "Normal", diffHard: "Hard", diffCustom: "Custom", lblGrav: "Gravity:", lblJump: "Jump:", lblGap: "Gap:", lblSpd: "Speed:", lblSpawn: "Spawn Rate:", lblPrev: "Preview:", labelLanguage: "Language:", btnClose: "Close", modalCredits: "Credits", creditsDesc: "An ultimate Flappy Bird experience.", getReady: "GET READY!", pressStart: "Press Key / Touch to start" },
    es: { bestScore: "Mejor Puntuación:", controls: "Controles:<br>Espacio / Arriba / Tocar", btnStart: "Iniciar Juego", btnLeaderboard: "Clasificación", btnSettings: "Ajustes", btnCredits: "Créditos", gameOver: "¡Juego Terminado!", scoreLabel: "Puntos:", bestLabel: "Mejor:", btnRestart: "Reiniciar", btnMenu: "Menú", modalSettings: "Ajustes", modalLeaderboard: "Top 10", rank: "#", name: "Nombre", score: "Puntos", labelParticles: "Partículas:", labelDifficulty: "Dificultad:", diffEasy: "Fácil", diffNormal: "Normal", diffHard: "Difícil", diffCustom: "Personalizado", lblGrav: "Gravedad:", lblJump: "Salto:", lblGap: "Espacio:", lblSpd: "Velocidad:", lblSpawn: "Aparición:", lblPrev: "Vista:", labelLanguage: "Idioma:", btnClose: "Cerrar", modalCredits: "Créditos", creditsDesc: "Una experiencia definitiva de Flappy Bird.", getReady: "¡PREPÁRATE!", pressStart: "Presiona / Toca para iniciar" },
    fr: { bestScore: "Meilleur Score:", controls: "Contrôles:<br>Espace / Haut / Toucher", btnStart: "Démarrer", btnLeaderboard: "Classement", btnSettings: "Paramètres", btnCredits: "Crédits", gameOver: "Fin du Jeu!", scoreLabel: "Score:", bestLabel: "Max:", btnRestart: "Rejouer", btnMenu: "Menu", modalSettings: "Paramètres", modalLeaderboard: "Top 10", rank: "#", name: "Nom", score: "Score", labelParticles: "Particules:", labelDifficulty: "Difficulté:", diffEasy: "Facile", diffNormal: "Normal", diffHard: "Difficile", diffCustom: "Perso", lblGrav: "Gravité:", lblJump: "Saut:", lblGap: "Écart:", lblSpd: "Vitesse:", lblSpawn: "Apparition:", lblPrev: "Aperçu:", labelLanguage: "Langue:", btnClose: "Fermer", modalCredits: "Crédits", creditsDesc: "Une expérience Flappy Bird ultime.", getReady: "PRÊT ?", pressStart: "Appuyez / Touchez pour commencer" },
    it: { bestScore: "Miglior Punteggio:", controls: "Controlli:<br>Spazio / Su / Tocco", btnStart: "Inizia Gioco", btnLeaderboard: "Classifica", btnSettings: "Impostazioni", btnCredits: "Crediti", gameOver: "Fine Gioco!", scoreLabel: "Punti:", bestLabel: "Miglior:", btnRestart: "Riavvia", btnMenu: "Menu", modalSettings: "Impostazioni", modalLeaderboard: "Top 10", rank: "#", name: "Nome", score: "Punti", labelParticles: "Particelle:", labelDifficulty: "Difficoltà:", diffEasy: "Facile", diffNormal: "Normale", diffHard: "Difficile", diffCustom: "Personalizzato", lblGrav: "Gravità:", lblJump: "Salto:", lblGap: "Spazio:", lblSpd: "Velocità:", lblSpawn: "Generazione:", lblPrev: "Anteprima:", labelLanguage: "Lingua:", btnClose: "Chiudi", modalCredits: "Crediti", creditsDesc: "Un'esperienza Flappy Bird definitiva.", getReady: "PRONTI!", pressStart: "Premi / Tocca per iniziare" },
    pt: { bestScore: "Melhor Pontuação:", controls: "Controles:<br>Espaço / Cima / Toque", btnStart: "Iniciar Jogo", btnLeaderboard: "Placar", btnSettings: "Config", btnCredits: "Créditos", gameOver: "Fim de Jogo!", scoreLabel: "Pontos:", bestLabel: "Melhor:", btnRestart: "Reiniciar", btnMenu: "Menu", modalSettings: "Config", modalLeaderboard: "Top 10", rank: "#", name: "Nome", score: "Pontos", labelParticles: "Partículas:", labelDifficulty: "Dificuldade:", diffEasy: "Fácil", diffNormal: "Normal", diffHard: "Difícil", diffCustom: "Perso", lblGrav: "Gravidade:", lblJump: "Pulo:", lblGap: "Espaço:", lblSpd: "Velocidade:", lblSpawn: "Geração:", lblPrev: "Prévia:", labelLanguage: "Idioma:", btnClose: "Fechar", modalCredits: "Créditos", creditsDesc: "Uma experiência definitiva de Flappy Bird.", getReady: "PREPARE-SE!", pressStart: "Pressione / Toque para iniciar" },
    nl: { bestScore: "Beste Score:", controls: "Besturing:<br>Spatie / Omhoog / Touch", btnStart: "Start Spel", btnLeaderboard: "Ranglijst", btnSettings: "Instellingen", btnCredits: "Credits", gameOver: "Spel Voorbij!", scoreLabel: "Score:", bestLabel: "Beste:", btnRestart: "Opnieuw", btnMenu: "Menu", modalSettings: "Instellingen", modalLeaderboard: "Top 10 Ranglijst", rank: "#", name: "Naam", score: "Score", labelParticles: "Deeltjes:", labelDifficulty: "Moeilijkheid:", diffEasy: "Makkelijk", diffNormal: "Normaal", diffHard: "Moeilijk", diffCustom: "Aangepast", lblGrav: "Zwaartekracht:", lblJump: "Sprong:", lblGap: "Ruimte:", lblSpd: "Snelheid:", lblSpawn: "Generatie:", lblPrev: "Voorbeeld:", labelLanguage: "Taal:", btnClose: "Sluiten", modalCredits: "Credits", creditsDesc: "Een ultieme Flappy Bird ervaring.", getReady: "MAAK JE KLAAR!", pressStart: "Druk / Touch om te starten" },
    pl: { bestScore: "Najlepszy Wynik:", controls: "Sterowanie:<br>Spacja / W górę / Dotyk", btnStart: "Start Gry", btnLeaderboard: "Ranking", btnSettings: "Ustawienia", btnCredits: "Twórcy", gameOver: "Koniec Gry!", scoreLabel: "Wynik:", bestLabel: "Najlepszy:", btnRestart: "Restart", btnMenu: "Menu", modalSettings: "Ustawienia", modalLeaderboard: "Top 10 Ranking", rank: "#", name: "Nazwa", score: "Wynik", labelParticles: "Cząsteczki:", labelDifficulty: "Trudność:", diffEasy: "Łatwy", diffNormal: "Normalny", diffHard: "Trudny", diffCustom: "Własny", lblGrav: "Grawitacja:", lblJump: "Skok:", lblGap: "Przerwa:", lblSpd: "Prędkość:", lblSpawn: "Częstotliwość:", lblPrev: "Podgląd:", labelLanguage: "Język:", btnClose: "Zamknij", modalCredits: "Twórcy", creditsDesc: "Najlepsze doświadczenie Flappy Bird.", getReady: "GOTOWY!", pressStart: "Naciśnij / Dotknij, aby zacząć" },
    ru: { bestScore: "Лучший Счет:", controls: "Управление:<br>Пробел / Вверх / Касание", btnStart: "Начать", btnLeaderboard: "Рейтинг", btnSettings: "Настройки", btnCredits: "Создатели", gameOver: "Конец!", scoreLabel: "Счет:", bestLabel: "Лучший:", btnRestart: "Заново", btnMenu: "Меню", modalSettings: "Настройки", modalLeaderboard: "Топ 10", rank: "#", name: "Имя", score: "Счет", labelParticles: "Частицы:", labelDifficulty: "Сложность:", diffEasy: "Легко", diffNormal: "Нормально", diffHard: "Сложно", diffCustom: "Свой", lblGrav: "Гравитация:", lblJump: "Прыжок:", lblGap: "Зазор:", lblSpd: "Скорость:", lblSpawn: "Появление:", lblPrev: "Вид:", labelLanguage: "Язык:", btnClose: "Закрыть", modalCredits: "Создатели", creditsDesc: "Идеальный опыт Flappy Bird.", getReady: "ГОТОВ!", pressStart: "Нажми / Коснись для старта" },
    ja: { bestScore: "ベストスコア:", controls: "操作:<br>スペース / 上 / タッチ", btnStart: "ゲーム開始", btnLeaderboard: "ランキング", btnSettings: "設定", btnCredits: "クレジット", gameOver: "ゲームオーバー!", scoreLabel: "スコア:", bestLabel: "ベスト:", btnRestart: "リスタート", btnMenu: "メニュー", modalSettings: "設定", modalLeaderboard: "トップ10", rank: "#", name: "名前", score: "スコア", labelParticles: "パーティクル:", labelDifficulty: "難易度:", diffEasy: "簡単", diffNormal: "普通", diffHard: "難しい", diffCustom: "カスタム", lblGrav: "重力:", lblJump: "ジャンプ:", lblGap: "隙間:", lblSpd: "速度:", lblSpawn: "出現率:", lblPrev: "プレビュー:", labelLanguage: "言語:", btnClose: "閉じる", modalCredits: "クレジット", creditsDesc: "究極のFlappy Bird体験。", getReady: "準備しろ！", pressStart: "キー/タッチで開始" },
    zh: { bestScore: "最高分:", controls: "控制:<br>空格 / 向上 / 触摸", btnStart: "开始游戏", btnLeaderboard: "排行榜", btnSettings: "设置", btnCredits: "关于", gameOver: "游戏结束!", scoreLabel: "分数:", bestLabel: "最高:", btnRestart: "重新开始", btnMenu: "菜单", modalSettings: "设置", modalLeaderboard: "前10名", rank: "#", name: "名字", score: "分数", labelParticles: "粒子:", labelDifficulty: "难度:", diffEasy: "简单", diffNormal: "普通", diffHard: "困难", diffCustom: "自定义", lblGrav: "重力:", lblJump: "跳跃:", lblGap: "间距:", lblSpd: "速度:", lblSpawn: "生成率:", lblPrev: "预览:", labelLanguage: "语言:", btnClose: "关闭", modalCredits: "关于", creditsDesc: "终极Flappy Bird体验。", getReady: "准备！", pressStart: "按键/触摸以开始" },
    ko: { bestScore: "최고 점수:", controls: "조작:<br>스페이스 / 위로 / 터치", btnStart: "게임 시작", btnLeaderboard: "순위표", btnSettings: "설정", btnCredits: "크레딧", gameOver: "게임 오버!", scoreLabel: "점수:", bestLabel: "최고:", btnRestart: "다시 시작", btnMenu: "메뉴", modalSettings: "설정", modalLeaderboard: "상위 10위", rank: "#", name: "이름", score: "점수", labelParticles: "입자:", labelDifficulty: "난이도:", diffEasy: "쉬움", diffNormal: "보통", diffHard: "어려움", diffCustom: "커스텀", lblGrav: "중력:", lblJump: "점프:", lblGap: "간격:", lblSpd: "속도:", lblSpawn: "생성률:", lblPrev: "미리보기:", labelLanguage: "언어:", btnClose: "닫기", modalCredits: "크레딧", creditsDesc: "최고의 Flappy Bird 경험.", getReady: "준비!", pressStart: "키/터치로 시작" },
    ar: { bestScore: "أفضل نتيجة:", controls: "التحكم:<br>مسافة / أعلى / لمس", btnStart: "ابدأ", btnLeaderboard: "المتصدرين", btnSettings: "الإعدادات", btnCredits: "الاعتمادات", gameOver: "انتهت!", scoreLabel: "النتيجة:", bestLabel: "الأفضل:", btnRestart: "إعادة", btnMenu: "القائمة", modalSettings: "الإعدادات", modalLeaderboard: "أفضل 10", rank: "#", name: "الاسم", score: "النتيجة", labelParticles: "تأثيرات:", labelDifficulty: "الصعوبة:", diffEasy: "سهل", diffNormal: "عادي", diffHard: "صعب", diffCustom: "مخصص", lblGrav: "جاذبية:", lblJump: "قفز:", lblGap: "فجوة:", lblSpd: "سرعة:", lblSpawn: "معدل الظهور:", lblPrev: "معاينة:", labelLanguage: "اللغة:", btnClose: "إغلاق", modalCredits: "الاعتمادات", creditsDesc: "تجربة Flappy Bird المطلقة.", getReady: "استعد!", pressStart: "اضغط / المس للبدء" },
    hi: { bestScore: "सर्वश्रेष्ठ स्कोर:", controls: "नियंत्रण:<br>स्पेस / ऊपर / टच", btnStart: "शुरू", btnLeaderboard: "लीडरबोर्ड", btnSettings: "सेटिंग्स", btnCredits: "क्रेडिट्स", gameOver: "गेम ओवर!", scoreLabel: "स्कोर:", bestLabel: "बेस्ट:", btnRestart: "पुनः", btnMenu: "मेनू", modalSettings: "सेटिंग्स", modalLeaderboard: "टॉप 10", rank: "#", name: "नाम", score: "स्कोर", labelParticles: "कण:", labelDifficulty: "कठिनाई:", diffEasy: "आसान", diffNormal: "सामान्य", diffHard: "कठिन", diffCustom: "कस्टम", lblGrav: "गुरुत्वाकर्षण:", lblJump: "कूद:", lblGap: "अंतर:", lblSpd: "गति:", lblSpawn: "स्पॉन दर:", lblPrev: "पूर्वावलोकन:", labelLanguage: "भाषा:", btnClose: "बंद करें", modalCredits: "क्रेडिट्स", creditsDesc: "एक परम अनुभव।", getReady: "तैयार हो जाओ!", pressStart: "शुरू करने के लिए दबाएं" },
    tr: { bestScore: "En İyi Skor:", controls: "Kontroller:<br>Boşluk / Yukarı / Dokunma", btnStart: "Başla", btnLeaderboard: "Liderlik", btnSettings: "Ayarlar", btnCredits: "Hakkında", gameOver: "Bitti!", scoreLabel: "Skor:", bestLabel: "En İyi:", btnRestart: "Tekrar", btnMenu: "Menü", modalSettings: "Ayarlar", modalLeaderboard: "İlk 10", rank: "#", name: "İsim", score: "Skor", labelParticles: "Parçacıklar:", labelDifficulty: "Zorluk:", diffEasy: "Kolay", diffNormal: "Normal", diffHard: "Zor", diffCustom: "Özel", lblGrav: "Yerçekimi:", lblJump: "Zıplama:", lblGap: "Boşluk:", lblSpd: "Hız:", lblSpawn: "Oluşum:", lblPrev: "Önizleme:", labelLanguage: "Dil:", btnClose: "Kapat", modalCredits: "Hakkında", creditsDesc: "Nihai Flappy Bird deneyimi.", getReady: "HAZIR OL!", pressStart: "Başlamak için bas/dokun" },
    sv: { bestScore: "Bästa Poäng:", controls: "Kontroller:<br>Mellanslag / Upp / Touch", btnStart: "Starta", btnLeaderboard: "Topplista", btnSettings: "Inställningar", btnCredits: "Krediter", gameOver: "Spelet Slut!", scoreLabel: "Poäng:", bestLabel: "Bästa:", btnRestart: "Igen", btnMenu: "Meny", modalSettings: "Inställningar", modalLeaderboard: "Topp 10", rank: "#", name: "Namn", score: "Poäng", labelParticles: "Partiklar:", labelDifficulty: "Svårighet:", diffEasy: "Lätt", diffNormal: "Normal", diffHard: "Svår", diffCustom: "Anpassad", lblGrav: "Gravitation:", lblJump: "Hopp:", lblGap: "Avstånd:", lblSpd: "Hastighet:", lblSpawn: "Skapande:", lblPrev: "Förhandsvisning:", labelLanguage: "Språk:", btnClose: "Stäng", modalCredits: "Krediter", creditsDesc: "Den ultimata upplevelsen.", getReady: "GÖR DIG REDO!", pressStart: "Tryck / Touch för att starta" },
    da: { bestScore: "Bedste Score:", controls: "Kontrol:<br>Mellemrum / Op / Touch", btnStart: "Start", btnLeaderboard: "Førertavle", btnSettings: "Indstillinger", btnCredits: "Kreditter", gameOver: "Spil Slut!", scoreLabel: "Score:", bestLabel: "Bedste:", btnRestart: "Prøv Igen", btnMenu: "Menu", modalSettings: "Indstillinger", modalLeaderboard: "Top 10", rank: "#", name: "Navn", score: "Score", labelParticles: "Partikler:", labelDifficulty: "Sværhedsgrad:", diffEasy: "Nem", diffNormal: "Normal", diffHard: "Svær", diffCustom: "Egen", lblGrav: "Tyngdekraft:", lblJump: "Hop:", lblGap: "Afstand:", lblSpd: "Hastighet:", lblSpawn: "Spawn:", lblPrev: "Visning:", labelLanguage: "Sprog:", btnClose: "Luk", modalCredits: "Kreditter", creditsDesc: "En ultimativ oplevelse.", getReady: "GØR DIG KLAR!", pressStart: "Tryk / Touch for at starte" },
    fi: { bestScore: "Paras Tulos:", controls: "Ohjaimet:<br>Välilyönti / Ylös / Kosketus", btnStart: "Aloita", btnLeaderboard: "Tulostaulu", btnSettings: "Asetukset", btnCredits: "Tekijät", gameOver: "Peli Ohi!", scoreLabel: "Pisteet:", bestLabel: "Paras:", btnRestart: "Uudelleen", btnMenu: "Valikko", modalSettings: "Asetukset", modalLeaderboard: "Top 10", rank: "#", name: "Nimi", score: "Pisteet", labelParticles: "Hiukkaset:", labelDifficulty: "Vaikeus:", diffEasy: "Helppo", diffNormal: "Normaali", diffHard: "Vaikea", diffCustom: "Oma", lblGrav: "Painovoima:", lblJump: "Hyppy:", lblGap: "Väli:", lblSpd: "Nopeus:", lblSpawn: "Syntyminen:", lblPrev: "Esikatselu:", labelLanguage: "Kieli:", btnClose: "Sulje", modalCredits: "Tekijät", creditsDesc: "Lopullinen kokemus.", getReady: "VALMISTAUDU!", pressStart: "Paina / Kosketa aloittaaksesi" },
    el: { bestScore: "Καλύτερο:", controls: "Έλεγχοι:<br>Διάστημα / Πάνω / Αφή", btnStart: "Έναρξη", btnLeaderboard: "Κατάταξη", btnSettings: "Ρυθμίσεις", btnCredits: "Συντελεστές", gameOver: "Τέλος!", scoreLabel: "Σκορ:", bestLabel: "Καλύτερο:", btnRestart: "Ξανά", btnMenu: "Μενού", modalSettings: "Ρυθμίσεις", modalLeaderboard: "Top 10", rank: "#", name: "Όνομα", score: "Σκορ", labelParticles: "Σωματίδια:", labelDifficulty: "Δυσκολία:", diffEasy: "Εύκολο", diffNormal: "Κανονικό", diffHard: "Δύσκολο", diffCustom: "Προσαρμοσμένο", lblGrav: "Βαρύτητα:", lblJump: "Άλμα:", lblGap: "Κενό:", lblSpd: "Ταχύτητα:", lblSpawn: "Εμφάνιση:", lblPrev: "Προεπισκόπηση:", labelLanguage: "Γλώσσα:", btnClose: "Κλείσιμο", modalCredits: "Συντελεστές", creditsDesc: "Η απόλυτη εμπειρία.", getReady: "ΕΤΟΙΜΑΣΟΥ!", pressStart: "Πάτα / Άγγιξε για έναρξη" },
    cs: { bestScore: "Nejlepší:", controls: "Ovládání:<br>Mezerník / Nahoru / Dotyk", btnStart: "Začít", btnLeaderboard: "Žebříček", btnSettings: "Nastavení", btnCredits: "Kredity", gameOver: "Konec!", scoreLabel: "Skóre:", bestLabel: "Nejlepší:", btnRestart: "Znovu", btnMenu: "Menu", modalSettings: "Nastavení", modalLeaderboard: "Top 10", rank: "#", name: "Jméno", score: "Skóre", labelParticles: "Částice:", labelDifficulty: "Obtížnost:", diffEasy: "Lehká", diffNormal: "Normální", diffHard: "Těžká", diffCustom: "Vlastní", lblGrav: "Gravitace:", lblJump: "Skok:", lblGap: "Mezera:", lblSpd: "Rychlost:", lblSpawn: "Frekvence:", lblPrev: "Náhled:", labelLanguage: "Jazyk:", btnClose: "Zavřít", modalCredits: "Kredity", creditsDesc: "Ultimátní zážitek.", getReady: "PŘIPRAV SE!", pressStart: "Stiskni / Dotkni se pro start" }
};

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const prevCanvas = document.getElementById('previewCanvas');
const prevCtx = prevCanvas.getContext('2d');

// DOM Elemente Setup
const elements = {
    startMenu: document.getElementById('start-menu'),
    gameOverMenu: document.getElementById('game-over-menu'),
    settingsModal: document.getElementById('settings-modal'),
    creditsModal: document.getElementById('credits-modal'),
    leaderboardModal: document.getElementById('leaderboard-modal'),
    leaderboardBody: document.getElementById('leaderboard-body'),
    menuHighscore: document.getElementById('menu-highscore'),
    finalScore: document.getElementById('final-score'),
    highScore: document.getElementById('high-score'),
    particleToggle: document.getElementById('particle-toggle'),
    diffSelect: document.getElementById('difficulty-select'),
    langSelect: document.getElementById('language-select'),
    customBlock: document.getElementById('custom-settings-block'),
    inpGrav: document.getElementById('inp-grav'),
    inpJump: document.getElementById('inp-jump'),
    inpGap: document.getElementById('inp-gap'),
    inpSpd: document.getElementById('inp-spd'),
    inpSpawn: document.getElementById('inp-spawn'),

    tBestScore: document.getElementById('text-best-score'),
    tControls: document.getElementById('text-controls'),
    tBtnStart: document.getElementById('text-btn-start'),
    tBtnLeaderboard: document.getElementById('text-btn-leaderboard'),
    tBtnSettings: document.getElementById('text-btn-settings'),
    tBtnCredits: document.getElementById('text-btn-credits'),
    tGameOver: document.getElementById('text-game-over'),
    tScoreLabel: document.getElementById('text-score-label'),
    tBestLabel: document.getElementById('text-best-label'),
    tBtnRestart: document.getElementById('text-btn-restart'),
    tBtnMenu: document.getElementById('text-btn-menu'),
    tModSettings: document.getElementById('text-modal-settings'),
    tModLeaderboard: document.getElementById('text-modal-leaderboard'),
    tRank: document.getElementById('text-rank'),
    tName: document.getElementById('text-name'),
    tScore: document.getElementById('text-score'),
    tLabParticles: document.getElementById('text-label-particles'),
    tLabDiff: document.getElementById('text-label-difficulty'),
    tDiffEasy: document.getElementById('text-diff-easy'),
    tDiffNorm: document.getElementById('text-diff-normal'),
    tDiffHard: document.getElementById('text-diff-hard'),
    tDiffCustom: document.getElementById('text-diff-custom'),
    tLblGrav: document.getElementById('text-lbl-grav'),
    tLblJump: document.getElementById('text-lbl-jump'),
    tLblGap: document.getElementById('text-lbl-gap'),
    tLblSpd: document.getElementById('text-lbl-spd'),
    tLblSpawn: document.getElementById('text-lbl-spawn'),
    tLblPrev: document.getElementById('text-lbl-preview'),
    tLabLang: document.getElementById('text-label-language'),
    tBtnCloseSet: document.getElementById('text-btn-close-settings'),
    tBtnCloseLead: document.getElementById('text-btn-close-leaderboard'),
    tModCredits: document.getElementById('text-modal-credits'),
    tCredDesc: document.getElementById('text-credits-desc'),
    tBtnCloseCred: document.getElementById('text-btn-close-credits')
};

let useParticles = localStorage.getItem('flappyParticles') !== 'false';
let currentLang = forcedLang || localStorage.getItem('flappyLang') || 'de';
let currentDiff = localStorage.getItem('flappyDiff') || 'normal';
let highScore = localStorage.getItem('flappyHighScoreUltimate') || 0;
let localLeaderboard = JSON.parse(localStorage.getItem('flappyLeaderboard')) || [];

// Ready Texts
let textGetReady = "GET READY!";
let textPressStart = "Press to Start";

if (forcedLang) { localStorage.setItem('flappyLang', forcedLang); }

let savedCustom = JSON.parse(localStorage.getItem('flappyCustomSettings')) || { gravity: 0.12, jump: 3.5, gap: 170, pipeSpeed: 2.0, spawnRate: 140 };
let diffSettings = {
    easy: { gravity: 0.08, jump: 3.0, gap: 220, pipeSpeed: 1.5, spawnRate: 180 },
    normal: { gravity: 0.12, jump: 3.5, gap: 170, pipeSpeed: 2.0, spawnRate: 140 },
    hard: { gravity: 0.18, jump: 4.2, gap: 130, pipeSpeed: 3.0, spawnRate: 100 },
    custom: savedCustom
};

// UI initial befüllen
elements.particleToggle.checked = useParticles;
elements.langSelect.value = currentLang;
elements.diffSelect.value = currentDiff;
elements.menuHighscore.innerText = highScore;

elements.inpGrav.value = diffSettings.custom.gravity;
elements.inpJump.value = diffSettings.custom.jump;
elements.inpGap.value = diffSettings.custom.gap;
elements.inpSpd.value = diffSettings.custom.pipeSpeed;
elements.inpSpawn.value = diffSettings.custom.spawnRate;

if (currentDiff === 'custom') elements.customBlock.classList.remove('hidden');

function applyLanguage(lang) {
    const t = translations[lang] || translations['en'];
    elements.tBestScore.innerHTML = t.bestScore;
    elements.tControls.innerHTML = t.controls;
    elements.tBtnStart.innerText = t.btnStart;
    elements.tBtnLeaderboard.innerText = t.btnLeaderboard;
    elements.tBtnSettings.innerText = t.btnSettings;
    elements.tBtnCredits.innerText = t.btnCredits;
    elements.tGameOver.innerText = t.gameOver;
    elements.tScoreLabel.innerText = t.scoreLabel;
    elements.tBestLabel.innerText = t.bestLabel;
    elements.tBtnRestart.innerText = t.btnRestart;
    elements.tBtnMenu.innerText = t.btnMenu;
    elements.tModSettings.innerText = t.modalSettings;
    elements.tModLeaderboard.innerText = t.modalLeaderboard;
    elements.tRank.innerText = t.rank;
    elements.tName.innerText = t.name;
    elements.tScore.innerText = t.score;
    elements.tLabParticles.innerText = t.labelParticles;
    elements.tLabDiff.innerText = t.labelDifficulty;
    elements.tDiffEasy.innerText = t.diffEasy;
    elements.tDiffNorm.innerText = t.diffNormal;
    elements.tDiffHard.innerText = t.diffHard;
    elements.tDiffCustom.innerText = t.diffCustom;
    elements.tLblGrav.innerText = t.lblGrav;
    elements.tLblJump.innerText = t.lblJump;
    elements.tLblGap.innerText = t.lblGap;
    elements.tLblSpd.innerText = t.lblSpd;
    elements.tLblSpawn.innerText = t.lblSpawn;
    elements.tLblPrev.innerText = t.lblPrev;
    elements.tLabLang.innerText = t.labelLanguage;
    elements.tBtnCloseSet.innerText = t.btnClose;
    elements.tBtnCloseLead.innerText = t.btnClose;
    elements.tBtnCloseCred.innerText = t.btnClose;
    elements.tModCredits.innerText = t.modalCredits;
    elements.tCredDesc.innerText = t.creditsDesc;

    textGetReady = t.getReady;
    textPressStart = t.pressStart;

    currentLang = lang;
    localStorage.setItem('flappyLang', lang);
}

applyLanguage(currentLang);

let gameSpeed = diffSettings[currentDiff].pipeSpeed;

function applyDifficulty() {
    let s = diffSettings[currentDiff];
    bird.gravity = parseFloat(s.gravity);
    bird.jump = parseFloat(s.jump);
    pipes.gap = parseInt(s.gap);
    gameSpeed = parseFloat(s.pipeSpeed);
}

elements.langSelect.addEventListener('change', (e) => applyLanguage(e.target.value));

elements.diffSelect.addEventListener('change', (e) => {
    currentDiff = e.target.value;
    localStorage.setItem('flappyDiff', currentDiff);
    if (currentDiff === 'custom') { elements.customBlock.classList.remove('hidden'); } else { elements.customBlock.classList.add('hidden'); }
    applyDifficulty();
});

function updateCustomSettings() {
    diffSettings.custom.gravity = elements.inpGrav.value;
    diffSettings.custom.jump = elements.inpJump.value;
    diffSettings.custom.gap = elements.inpGap.value;
    diffSettings.custom.pipeSpeed = elements.inpSpd.value;
    diffSettings.custom.spawnRate = elements.inpSpawn.value;
    localStorage.setItem('flappyCustomSettings', JSON.stringify(diffSettings.custom));
    if (currentDiff === 'custom') applyDifficulty();
}

[elements.inpGrav, elements.inpJump, elements.inpGap, elements.inpSpd, elements.inpSpawn].forEach(inp => {
    inp.addEventListener('input', updateCustomSettings);
});

elements.particleToggle.addEventListener('change', (e) => {
    useParticles = e.target.checked;
    localStorage.setItem('flappyParticles', useParticles);
});

function openModal(modal) { modal.classList.remove('hidden'); }

function closeModal(modal) { modal.classList.add('hidden'); }

// --- LEADERBOARD LOGIK (Lokal ODER Global) ---
async function renderLeaderboard() {
    elements.leaderboardBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Lade Daten...</td></tr>';

    let entriesToShow = [];

    if (DREAMLO_PUBLIC !== 'DEIN_PUBLIC_KEY') {
        // GLOBALER MODUS
        try {
            const res = await fetch(`https://www.dreamlo.com/lb/${DREAMLO_PUBLIC}/json`);
            const data = await res.json();
            let entries = data.dreamlo.leaderboard ? data.dreamlo.leaderboard.entry : [];
            if (!Array.isArray(entries) && entries) entries = [entries];
            entriesToShow = entries.slice(0, 10);
        } catch (e) {
            elements.leaderboardBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:red;">Netzwerk-Fehler!</td></tr>';
            return;
        }
    } else {
        // LOKALER MODUS
        entriesToShow = localLeaderboard;
    }

    elements.leaderboardBody.innerHTML = '';
    if (entriesToShow.length === 0) {
        elements.leaderboardBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Noch keine Scores!</td></tr>`;
        return;
    }

    entriesToShow.forEach((entry, index) => {
        let rowClass = index === 0 ? 'top-1' : '';
        elements.leaderboardBody.innerHTML += `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
            </tr>
        `;
    });
}

document.getElementById('start-btn').addEventListener('click', prepareGame);
document.getElementById('restart-btn').addEventListener('click', prepareGame);
document.getElementById('menu-btn').addEventListener('click', showMainMenu);
document.getElementById('settings-btn').addEventListener('click', () => openModal(elements.settingsModal));
document.getElementById('close-settings-btn').addEventListener('click', () => closeModal(elements.settingsModal));
document.getElementById('credits-btn').addEventListener('click', () => openModal(elements.creditsModal));
document.getElementById('close-credits-btn').addEventListener('click', () => closeModal(elements.creditsModal));
document.getElementById('leaderboard-btn').addEventListener('click', () => {
    renderLeaderboard();
    openModal(elements.leaderboardModal);
});
document.getElementById('close-leaderboard-btn').addEventListener('click', () => closeModal(elements.leaderboardModal));

// --- LIVE PREVIEW LOGIK ---
let pFrames = 0;
let pBirdY = 360;
let pBirdVel = 0;
let pPipes = [];

function previewLoop() {
    if (elements.settingsModal.classList.contains('hidden') || currentDiff !== 'custom') { requestAnimationFrame(previewLoop); return; }
    let grav = parseFloat(elements.inpGrav.value) || 0.12;
    let jump = parseFloat(elements.inpJump.value) || 3.5;
    let gap = parseInt(elements.inpGap.value) || 170;
    let speed = parseFloat(elements.inpSpd.value) || 2.0;
    let spawn = parseInt(elements.inpSpawn.value) || 140;

    pBirdVel += grav;
    if (pBirdVel > 4.5) pBirdVel = 4.5;
    pBirdY += pBirdVel;
    if (pFrames % 70 === 0 || pBirdY > 450) pBirdVel = -jump;
    if (pBirdY < 0) {
        pBirdY = 0;
        pBirdVel = 0;
    }
    if (pFrames % spawn === 0) { pPipes.push({ x: 480, top: Math.random() * (720 - 150 - 60 - gap) + 60 }); }
    for (let i = 0; i < pPipes.length; i++) {
        pPipes[i].x -= speed;
        if (pPipes[i].x < -100) {
            pPipes.splice(i, 1);
            i--;
        }
    }

    prevCtx.clearRect(0, 0, prevCanvas.width, prevCanvas.height);
    prevCtx.save();
    prevCtx.scale(prevCanvas.width / 480, prevCanvas.height / 720);
    prevCtx.fillStyle = '#70c5ce';
    prevCtx.fillRect(0, 0, 480, 720);
    prevCtx.fillStyle = '#ded895';
    prevCtx.fillRect(0, 720 - 150, 480, 150);
    prevCtx.fillStyle = '#73bf2e';
    prevCtx.fillRect(0, 720 - 150, 480, 20);

    prevCtx.fillStyle = '#73bf2e';
    prevCtx.strokeStyle = '#548c22';
    prevCtx.lineWidth = 4;
    pPipes.forEach(p => {
        let w = 65;
        prevCtx.fillRect(p.x, 0, w, p.top);
        prevCtx.strokeRect(p.x, 0, w, p.top);
        let bottomY = p.top + gap;
        prevCtx.fillRect(p.x, bottomY, w, 720 - bottomY);
        prevCtx.strokeRect(p.x, bottomY, w, 720 - bottomY);
    });

    prevCtx.fillStyle = '#f4c800';
    prevCtx.strokeStyle = '#000';
    prevCtx.lineWidth = 2;
    prevCtx.beginPath();
    prevCtx.ellipse(80 + 22, pBirdY + 16, 22, 16, 0, 0, Math.PI * 2);
    prevCtx.fill();
    prevCtx.stroke();
    prevCtx.restore();

    pFrames++;
    requestAnimationFrame(previewLoop);
}
previewLoop();

// --- SPIEL-LOGIK ---
let frames = 0;
let gameState = 'START'; // START, READY, PLAY, OVER
let score = 0;

const bg = {
    x: 0,
    y: canvas.height - 150,
    w: canvas.width,
    h: 150,
    clouds: [
        { x: 50, y: 100, speed: 0.5, size: 40 }, { x: 250, y: 180, speed: 0.3, size: 60 },
        { x: 400, y: 80, speed: 0.6, size: 30 }, { x: 600, y: 250, speed: 0.4, size: 50 }
    ],
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size * 0.8, cloud.y - cloud.size * 0.3, cloud.size * 0.8, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size * 1.5, cloud.y, cloud.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.fillStyle = '#ded895';
        ctx.fillRect(this.x, this.y, canvas.width, this.h);
        ctx.fillStyle = '#73bf2e';
        ctx.fillRect(this.x, this.y, canvas.width, 20);
        ctx.fillStyle = '#548c22';
        ctx.fillRect(this.x, this.y + 20, canvas.width, 6);
        for (let i = 0; i < canvas.width / 20 + 2; i++) {
            ctx.fillStyle = '#d1c77f';
            ctx.beginPath();
            ctx.moveTo(this.x + i * 40, this.y + 26);
            ctx.lineTo(this.x + i * 40 + 15, this.y + this.h);
            ctx.lineTo(this.x + i * 40 + 25, this.y + this.h);
            ctx.lineTo(this.x + i * 40 + 10, this.y + 26);
            ctx.fill();
        }
    },
    update() {
        if (gameState === 'PLAY') {
            this.clouds.forEach(cloud => {
                cloud.x -= cloud.speed;
                if (cloud.x + cloud.size * 3 < 0) {
                    cloud.x = canvas.width + 50;
                    cloud.y = Math.random() * 300 + 50;
                }
            });
            this.x = (this.x - gameSpeed) % 40;
        }
    }
};

const bird = {
    x: 80,
    y: 250,
    w: 44,
    h: 32,
    velocity: 0,
    gravity: diffSettings[currentDiff].gravity,
    jump: diffSettings[currentDiff].jump,
    maxFallSpeed: 4.5,
    rotation: 0,
    particles: [],
    draw() {
        if (useParticles && gameState === 'PLAY') {
            this.particles.forEach(p => {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        if (gameState === 'PLAY') this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.15)));
        if (gameState === 'READY') this.rotation = 0;
        ctx.rotate(this.rotation);
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000';

        ctx.fillStyle = '#f4c800';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.w / 2, this.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(-6, 3, 10, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(8, -5, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(11, -5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#e45c13';
        ctx.beginPath();
        ctx.ellipse(14, 5, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    },
    flap() {
        this.velocity = -this.jump;
        if (useParticles) {
            for (let i = 0; i < 6; i++) {
                this.particles.push({
                    x: this.x + 10,
                    y: this.y + this.h,
                    vx: Math.random() * -2 - 1,
                    vy: Math.random() * 2 - 1,
                    size: Math.random() * 5 + 3,
                    alpha: 1
                });
            }
        }
    },
    update() {
        if (gameState === 'READY') {
            // Vogel schwebt leicht hoch und runter
            this.y = 250 + Math.sin(frames * 0.1) * 10;
        }
        if (gameState === 'PLAY') {
            if (useParticles) {
                this.particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.alpha -= 0.05;
                });
                this.particles = this.particles.filter(p => p.alpha > 0);
            }
            this.velocity += this.gravity;
            if (this.velocity > this.maxFallSpeed) this.velocity = this.maxFallSpeed;
            this.y += this.velocity;
            if (this.y + this.h >= canvas.height - bg.h) {
                this.y = canvas.height - bg.h - this.h;
                gameOver();
            }
            if (this.y <= 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }
    },
    reset() {
        this.y = 250;
        this.velocity = 0;
        this.rotation = 0;
        this.particles = [];
        applyDifficulty();
    }
};

const pipes = {
    items: [],
    w: 65,
    gap: diffSettings[currentDiff].gap,
    draw() {
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            ctx.fillStyle = '#73bf2e';
            ctx.strokeStyle = '#548c22';
            ctx.lineWidth = 4;

            ctx.fillRect(p.x, 0, this.w, p.top);
            ctx.strokeRect(p.x, 0, this.w, p.top);
            ctx.fillRect(p.x - 5, p.top - 30, this.w + 10, 30);
            ctx.strokeRect(p.x - 5, p.top - 30, this.w + 10, 30);

            let bottomY = p.top + this.gap;
            let bottomH = canvas.height - bottomY - bg.h;
            ctx.fillRect(p.x, bottomY, this.w, bottomH);
            ctx.strokeRect(p.x, bottomY, this.w, bottomH);
            ctx.fillRect(p.x - 5, bottomY, this.w + 10, 30);
            ctx.strokeRect(p.x - 5, bottomY, this.w + 10, 30);
        }
    },
    update() {
        if (gameState !== 'PLAY') return;
        let spawnR = parseInt(diffSettings[currentDiff].spawnRate) || 140;
        if (frames % spawnR === 0) {
            let minPipeHeight = 60;
            let maxPos = canvas.height - bg.h - minPipeHeight - this.gap;
            let topHeight = Math.floor(Math.random() * (maxPos - minPipeHeight + 1) + minPipeHeight);
            this.items.push({ x: canvas.width, top: topHeight, passed: false });
        }
        for (let i = 0; i < this.items.length; i++) {
            let p = this.items[i];
            p.x -= gameSpeed;
            let hitboxMargin = 8;
            let birdHitbox = { x: bird.x + hitboxMargin, y: bird.y + hitboxMargin, w: bird.w - (hitboxMargin * 2), h: bird.h - (hitboxMargin * 2) };
            if (birdHitbox.x + birdHitbox.w > p.x && birdHitbox.x < p.x + this.w) {
                if (birdHitbox.y < p.top || birdHitbox.y + birdHitbox.h > p.top + this.gap) gameOver();
            }
            if (p.x + this.w < bird.x && !p.passed) {
                score++;
                p.passed = true;
            }
            if (p.x + this.w < -20) {
                this.items.shift();
                i--;
            }
        }
    },
    reset() {
        this.items = [];
        applyDifficulty();
    }
};

function drawScoreAndText() {
    if (gameState === 'PLAY' || gameState === 'OVER') {
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 6;
        ctx.font = 'bold 50px "Courier New", Courier, monospace';
        ctx.textAlign = 'center';
        ctx.strokeText(score, canvas.width / 2, 80);
        ctx.fillText(score, canvas.width / 2, 80);
    }

    // "Get Ready" Text
    if (gameState === 'READY') {
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 5;
        ctx.textAlign = 'center';

        ctx.font = 'bold 45px "Courier New", Courier, monospace';
        ctx.strokeText(textGetReady, canvas.width / 2, canvas.height / 3);
        ctx.fillText(textGetReady, canvas.width / 2, canvas.height / 3);

        ctx.font = 'bold 22px "Courier New", Courier, monospace';
        ctx.strokeText(textPressStart, canvas.width / 2, canvas.height / 3 + 50);
        ctx.fillText(textPressStart, canvas.width / 2, canvas.height / 3 + 50);
    }
}

function update() {
    bg.update();
    bird.update();
    pipes.update();
}

function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bg.draw();
    pipes.draw();
    bird.draw();
    drawScoreAndText();
}

function loop() {
    update();
    draw();
    if (gameState !== 'OVER') frames++;
    requestAnimationFrame(loop);
}

// prepareGame versetzt das Spiel in den READY state
function prepareGame() {
    gameState = 'READY';
    elements.startMenu.classList.add('hidden');
    elements.gameOverMenu.classList.add('hidden');
    elements.settingsModal.classList.add('hidden');
    elements.creditsModal.classList.add('hidden');
    elements.leaderboardModal.classList.add('hidden');
    applyDifficulty();
    bird.reset();
    pipes.reset();
    score = 0;
    frames = 0;
}

function startGame() {
    gameState = 'PLAY';
    bird.flap();
}

function showMainMenu() {
    gameState = 'START';
    elements.gameOverMenu.classList.add('hidden');
    elements.startMenu.classList.remove('hidden');
    elements.menuHighscore.innerText = highScore;
    bird.reset();
    pipes.reset();
    draw();
}

function gameOver() {
    gameState = 'OVER';
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('flappyHighScoreUltimate', highScore);
    }

    // Zieht sich den exakten Namen aus der URL, und wenn da nix ist, aus dem Speicher!
    let playerName = urlUser || localStorage.getItem('launcherUsername') || 'Player';

    // LEADERBOARD UPDATE (Global oder Lokal)
    if (score > 0) {
        if (DREAMLO_PRIVATE !== 'DEIN_PRIVATE_KEY') {
            // Sende an globalen Server (Dreamlo behält automatisch den höchsten Score pro Name!)
            fetch(`https://www.dreamlo.com/lb/${DREAMLO_PRIVATE}/add/${playerName}/${score}`);
        } else {
            // LOKAL: Prüfen, ob der Spieler schon existiert
            let existingIndex = localLeaderboard.findIndex(e => e.name === playerName);

            if (existingIndex !== -1) {
                // Spieler existiert, überschreibe Score nur wenn er höher ist
                if (score > localLeaderboard[existingIndex].score) {
                    localLeaderboard[existingIndex].score = score;
                }
            } else {
                // Neuer Spieler
                localLeaderboard.push({ name: playerName, score: score });
            }

            // Sortieren und auf Top 10 begrenzen
            localLeaderboard.sort((a, b) => b.score - a.score);
            localLeaderboard = localLeaderboard.slice(0, 10);
            localStorage.setItem('flappyLeaderboard', JSON.stringify(localLeaderboard));
        }
    }

    elements.finalScore.innerText = score;
    elements.highScore.innerText = highScore;
    elements.gameOverMenu.classList.remove('hidden');
}

function handleInput(e) {
    if (!elements.settingsModal.classList.contains('hidden') || !elements.creditsModal.classList.contains('hidden') || !elements.leaderboardModal.classList.contains('hidden')) return;
    if (e && e.target && (e.target.tagName === 'BUTTON' || e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT')) return;

    if (gameState === 'READY') {
        startGame();
    } else if (gameState === 'PLAY') {
        bird.flap();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleInput();
    }
});
canvas.addEventListener('mousedown', handleInput);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleInput();
}, { passive: false });

applyDifficulty();
loop();