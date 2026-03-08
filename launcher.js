// ==========================================
// GLOBALES LEADERBOARD SETUP (DREAMLO)
// 1. Gehe auf dreamlo.com
// 2. Kopiere deinen Public Code und Private Code hier rein
// ==========================================
const DREAMLO_PUBLIC = '5fa8af5feb371a09c4c51d17'; // Bsp: '65e9c0...'
const DREAMLO_PRIVATE = 'cgpr101Ep0yMn0IZPhMAqwVghoK20BG06c_rPh-i1Npg'; // Bsp: 'oK_9h2...'

// --- DATEN & STATE ---
let ownedGames = JSON.parse(localStorage.getItem('launcherOwnedGames')) || [];
let globalLang = localStorage.getItem('flappyLang') || 'de';
let animEnabled = localStorage.getItem('launcherAnim') !== 'false';

function generateRandomUser() {
    return 'User-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// SOFORTIGES SPEICHERN, DAMIT ES NICHT VERLOREN GEHT
let currentUsername = localStorage.getItem('launcherUsername');
if (!currentUsername) {
    currentUsername = generateRandomUser();
    localStorage.setItem('launcherUsername', currentUsername);
}

const gamesDatabase = {
    flappy: {
        id: 'flappy',
        file: 'flappy.html',
        icon: 'flutter_dash',
        bgClass: 'flappy-bg',
        title: 'Flappy Bird',
        desc: {
            de: "Das legendäre Spiel, jetzt mit Custom-Physik und 20 Sprachen!",
            en: "The legendary game, now with custom physics and 20 languages!",
            es: "¡El juego legendario, ahora con física personalizada y 20 idiomas!",
            fr: "Le jeu légendaire, avec physique personnalisée et 20 langues !",
            it: "Il gioco leggendario, con fisica personalizzata e 20 lingue!",
            pt: "O jogo lendário, com física personalizada e 20 idiomas!",
            nl: "Het legendarische spel, met aangepaste fysica en 20 talen!",
            pl: "Legendarna gra, teraz z własną fizyką i 20 językami!",
            ru: "Легендарная игра, теперь с кастомной физикой и 20 языками!",
            ja: "カスタム物理演算と20言語を備えた伝説のゲーム！",
            zh: "传奇游戏，现在具有自定义物理和20种语言！",
            ko: "사용자 지정 물리 및 20개 언어를 지원하는 전설적인 게임!",
            ar: "اللعبة الأسطورية، الآن بفيزياء مخصصة و 20 لغة!",
            hi: "पौराणिक खेल, अब कस्टम भौतिकी और 20 भाषाओं के साथ!",
            tr: "Efsanevi oyun, şimdi özel fizik ve 20 dille!",
            sv: "Det legendariska spelet, med anpassad fysik och 20 språk!",
            da: "Det legendariske spil, med brugerdefineret fysik og 20 sprog!",
            fi: "Legendaarinen peli, mukautetulla fysiikalla ja 20 kielellä!",
            el: "Το θρυλικό παιχνίδι, με προσαρμοσμένη φυσική και 20 γλώσσες!",
            cs: "Legendární hra, s vlastní fyzikou a 20 jazyky!"
        }
    }
};

const translations = {
    de: { navLib: "Bibliothek", navStore: "Shop", navSet: "Einstellungen", titleLib: "Meine Spiele", titleStore: "Entdecken", titleSet: "Launcher Einstellungen", libEmptyTitle: "Deine Bibliothek ist leer.", libEmptyDesc: "Besuche den Shop, um Spiele hinzuzufügen!", storeEmptyTitle: "Der Shop ist leer.", storeEmptyDesc: "Schau später wieder vorbei!", btnPlay: "Spielen", btnGet: "Kostenlos Holen", btnOwned: "In Bibliothek", setUserTitle: "Benutzername", setUserDesc: "Ändere deinen Anzeigenamen im Hub.", setLangTitle: "Globale Sprache", setLangDesc: "Wird als URL-Parameter an Spiele gesendet.", setAnimTitle: "Animationen reduzieren", setAnimDesc: "Schaltet Effekte ab.", btnExit: "Beenden", loader: "Starte Spiel...", btnSave: "Speichern", btnReset: "Zurücksetzen", menuClear: "Stand löschen", menuUninstall: "Deinstallieren" },
    en: { navLib: "Library", navStore: "Store", navSet: "Settings", titleLib: "My Games", titleStore: "Discover", titleSet: "Launcher Settings", libEmptyTitle: "Your library is empty.", libEmptyDesc: "Visit the store to add games!", storeEmptyTitle: "The store is empty.", storeEmptyDesc: "Check back later!", btnPlay: "Play", btnGet: "Get for Free", btnOwned: "In Library", setUserTitle: "Username", setUserDesc: "Change your display name.", setLangTitle: "Global Language", setLangDesc: "Passed to games as URL parameter.", setAnimTitle: "Reduce Animations", setAnimDesc: "Disables effects.", btnExit: "Exit", loader: "Starting...", btnSave: "Save", btnReset: "Reset", menuClear: "Clear Save", menuUninstall: "Uninstall" },
    es: { navLib: "Biblioteca", navStore: "Tienda", navSet: "Ajustes", titleLib: "Mis Juegos", titleStore: "Descubrir", titleSet: "Ajustes del Launcher", libEmptyTitle: "Tu biblioteca está vacía.", libEmptyDesc: "¡Visita la tienda para añadir juegos!", storeEmptyTitle: "La tienda está vacía.", storeEmptyDesc: "¡Vuelve más tarde!", btnPlay: "Jugar", btnGet: "Obtener Gratis", btnOwned: "En Biblioteca", setUserTitle: "Nombre de usuario", setUserDesc: "Cambia tu nombre.", setLangTitle: "Idioma Global", setLangDesc: "Se aplica a todos los juegos.", setAnimTitle: "Reducir Animaciones", setAnimDesc: "Desactiva efectos.", btnExit: "Salir", loader: "Iniciando...", btnSave: "Guardar", btnReset: "Restablecer", menuClear: "Borrar Datos", menuUninstall: "Desinstalar" },
    fr: { navLib: "Bibliothèque", navStore: "Boutique", navSet: "Paramètres", titleLib: "Mes Jeux", titleStore: "Découvrir", titleSet: "Paramètres", libEmptyTitle: "Votre bibliothèque est vide.", libEmptyDesc: "Visitez la boutique !", storeEmptyTitle: "La boutique est vide.", storeEmptyDesc: "Revenez plus tard !", btnPlay: "Jouer", btnGet: "Obtenir Gratuitement", btnOwned: "Dans la Bibliothèque", setUserTitle: "Nom d'utilisateur", setUserDesc: "Changez votre nom.", setLangTitle: "Langue Globale", setLangDesc: "Appliqué à tous les jeux.", setAnimTitle: "Réduire les Animations", setAnimDesc: "Désactive les effets.", btnExit: "Quitter", loader: "Démarrage...", btnSave: "Enregistrer", btnReset: "Réinitialiser", menuClear: "Effacer Sauvegarde", menuUninstall: "Désinstaller" },
    it: { navLib: "Libreria", navStore: "Negozio", navSet: "Impostazioni", titleLib: "I Miei Giochi", titleStore: "Scopri", titleSet: "Impostazioni Launcher", libEmptyTitle: "Libreria vuota.", libEmptyDesc: "Visita il negozio per aggiungere giochi!", storeEmptyTitle: "Negozio vuoto.", storeEmptyDesc: "Riprova più tardi!", btnPlay: "Gioca", btnGet: "Ottieni Gratis", btnOwned: "Nella Libreria", setUserTitle: "Nome Utente", setUserDesc: "Cambia il tuo nome.", setLangTitle: "Lingua Globale", setLangDesc: "Applicato a tutti i giochi.", setAnimTitle: "Riduci Animazioni", setAnimDesc: "Disattiva effetti.", btnExit: "Esci", loader: "Avvio...", btnSave: "Salva", btnReset: "Ripristina", menuClear: "Cancella Dati", menuUninstall: "Disinstalla" },
    pt: { navLib: "Biblioteca", navStore: "Loja", navSet: "Configurações", titleLib: "Meus Jogos", titleStore: "Descobrir", titleSet: "Configurações do Launcher", libEmptyTitle: "Sua biblioteca está vazia.", libEmptyDesc: "Visite a loja para adicionar jogos!", storeEmptyTitle: "A loja está vazia.", storeEmptyDesc: "Volte mais tarde!", btnPlay: "Jogar", btnGet: "Obter Grátis", btnOwned: "Na Biblioteca", setUserTitle: "Nome de Usuário", setUserDesc: "Altere seu nome.", setLangTitle: "Idioma Global", setLangDesc: "Aplicado a todos os jogos.", setAnimTitle: "Reduzir Animações", setAnimDesc: "Desativa efeitos.", btnExit: "Sair", loader: "Iniciando...", btnSave: "Salvar", btnReset: "Redefinir", menuClear: "Apagar Dados", menuUninstall: "Desinstalar" },
    nl: { navLib: "Bibliotheek", navStore: "Winkel", navSet: "Instellingen", titleLib: "Mijn Spellen", titleStore: "Ontdekken", titleSet: "Launcher Instellingen", libEmptyTitle: "Je bibliotheek is leeg.", libEmptyDesc: "Bezoek de winkel om spellen toe te voegen!", storeEmptyTitle: "De winkel is leeg.", storeEmptyDesc: "Kom later terug!", btnPlay: "Spelen", btnGet: "Gratis Halen", btnOwned: "In Bibliotheek", setUserTitle: "Gebruikersnaam", setUserDesc: "Wijzig je weergavenaam.", setLangTitle: "Globale Taal", setLangDesc: "Wordt toegepast op alle spellen.", setAnimTitle: "Animaties Verminderen", setAnimDesc: "Schakelt effecten uit.", btnExit: "Afsluiten", loader: "Starten...", btnSave: "Opslaan", btnReset: "Resetten", menuClear: "Save Wissen", menuUninstall: "Verwijderen" },
    pl: { navLib: "Biblioteka", navStore: "Sklep", navSet: "Ustawienia", titleLib: "Moje Gry", titleStore: "Odkrywaj", titleSet: "Ustawienia Launchera", libEmptyTitle: "Twoja biblioteka jest pusta.", libEmptyDesc: "Odwiedź sklep, aby dodać gry!", storeEmptyTitle: "Sklep jest pusty.", storeEmptyDesc: "Zajrzyj później!", btnPlay: "Graj", btnGet: "Pobierz za Darmo", btnOwned: "W Bibliotece", setUserTitle: "Nazwa Użytkownika", setUserDesc: "Zmień swoją nazwę.", setLangTitle: "Język Globalny", setLangDesc: "Zastosowany do wszystkich gier.", setAnimTitle: "Redukuj Animacje", setAnimDesc: "Wyłącza efekty.", btnExit: "Wyjdź", loader: "Uruchamianie...", btnSave: "Zapisz", btnReset: "Zresetuj", menuClear: "Usuń Zapis", menuUninstall: "Odinstaluj" },
    ru: { navLib: "Библиотека", navStore: "Магазин", navSet: "Настройки", titleLib: "Мои Игры", titleStore: "Обзор", titleSet: "Настройки", libEmptyTitle: "Библиотека пуста.", libEmptyDesc: "Посетите магазин!", storeEmptyTitle: "Магазин пуст.", storeEmptyDesc: "Зайдите позже!", btnPlay: "Играть", btnGet: "Бесплатно", btnOwned: "В Библиотеке", setUserTitle: "Имя", setUserDesc: "Измените ваше имя.", setLangTitle: "Язык", setLangDesc: "Применяется ко всем играм.", setAnimTitle: "Уменьшить анимации", setAnimDesc: "Отключает эффекты.", btnExit: "Выход", loader: "Запуск...", btnSave: "Сохранить", btnReset: "Сброс", menuClear: "Удалить сохр.", menuUninstall: "Удалить игру" },
    ja: { navLib: "ライブラリ", navStore: "ストア", navSet: "設定", titleLib: "マイゲーム", titleStore: "見つける", titleSet: "設定", libEmptyTitle: "空です。", libEmptyDesc: "ストアにアクセス！", storeEmptyTitle: "空です。", storeEmptyDesc: "後でチェック！", btnPlay: "プレイ", btnGet: "無料で入手", btnOwned: "ライブラリ内", setUserTitle: "ユーザー名", setUserDesc: "名前を変更します。", setLangTitle: "言語", setLangDesc: "すべてのゲームに適用されます。", setAnimTitle: "アニメーションを減らす", setAnimDesc: "エフェクトを無効にします。", btnExit: "終了", loader: "起動中...", btnSave: "保存", btnReset: "リセット", menuClear: "セーブ削除", menuUninstall: "アンインストール" },
    zh: { navLib: "库", navStore: "商店", navSet: "设置", titleLib: "我的游戏", titleStore: "发现", titleSet: "设置", libEmptyTitle: "库是空的。", libEmptyDesc: "访问商店！", storeEmptyTitle: "商店是空的。", storeEmptyDesc: "稍后再看！", btnPlay: "游玩", btnGet: "免费获取", btnOwned: "在库中", setUserTitle: "用户名", setUserDesc: "更改名称。", setLangTitle: "语言", setLangDesc: "应用于所有游戏。", setAnimTitle: "减少动画", setAnimDesc: "禁用效果。", btnExit: "退出", loader: "正在启动...", btnSave: "保存", btnReset: "重置", menuClear: "清除存档", menuUninstall: "卸载" },
    ko: { navLib: "라이브러리", navStore: "상점", navSet: "설정", titleLib: "내 게임", titleStore: "발견", titleSet: "설정", libEmptyTitle: "비어 있습니다.", libEmptyDesc: "상점을 방문하세요!", storeEmptyTitle: "비어 있습니다.", storeEmptyDesc: "나중에 확인하세요!", btnPlay: "플레이", btnGet: "무료로 받기", btnOwned: "라이브러리에 있음", setUserTitle: "사용자 이름", setUserDesc: "이름 변경.", setLangTitle: "언어", setLangDesc: "모든 게임에 적용됩니다.", setAnimTitle: "애니메이션 줄이기", setAnimDesc: "효과를 비활성화합니다.", btnExit: "종료", loader: "시작 중...", btnSave: "저장", btnReset: "초기화", menuClear: "저장 삭제", menuUninstall: "제거" },
    ar: { navLib: "المكتبة", navStore: "المتجر", navSet: "الإعدادات", titleLib: "ألعابي", titleStore: "اكتشف", titleSet: "الإعدادات", libEmptyTitle: "مكتبتك فارغة.", libEmptyDesc: "قم بزيارة المتجر!", storeEmptyTitle: "المتجر فارغ.", storeEmptyDesc: "تحقق لاحقًا!", btnPlay: "العب", btnGet: "احصل مجانًا", btnOwned: "في المكتبة", setUserTitle: "اسم المستخدم", setUserDesc: "قم بتغيير اسمك.", setLangTitle: "اللغة", setLangDesc: "يتم تطبيقه على الألعاب.", setAnimTitle: "تقليل الرسوم", setAnimDesc: "يعطل التأثيرات.", btnExit: "خروج", loader: "جاري البدء...", btnSave: "حفظ", btnReset: "إعادة تعيين", menuClear: "مسح الحفظ", menuUninstall: "إلغاء التثبيت" },
    hi: { navLib: "लाइब्रेरी", navStore: "स्टोर", navSet: "सेटिंग्स", titleLib: "मेरे गेम", titleStore: "खोजें", titleSet: "सेटिंग्स", libEmptyTitle: "खाली है।", libEmptyDesc: "स्टोर पर जाएं!", storeEmptyTitle: "खाली है।", storeEmptyDesc: "बाद में देखें!", btnPlay: "खेलें", btnGet: "मुफ्त में प्राप्त करें", btnOwned: "लाइब्रेरी में", setUserTitle: "उपयोगकर्ता नाम", setUserDesc: "अपना नाम बदलें।", setLangTitle: "भाषा", setLangDesc: "सभी खेलों पर लागू होता है।", setAnimTitle: "एनिमेशन कम करें", setAnimDesc: "प्रभावों को अक्षम करता है।", btnExit: "बाहर निकलें", loader: "शुरू हो रहा है...", btnSave: "सहेजें", btnReset: "रीसेट", menuClear: "सेव मिटाएं", menuUninstall: "अनइंस्टॉल करें" },
    tr: { navLib: "Kütüphane", navStore: "Mağaza", navSet: "Ayarlar", titleLib: "Oyunlarım", titleStore: "Keşfet", titleSet: "Ayarlar", libEmptyTitle: "Boş.", libEmptyDesc: "Mağazayı ziyaret et!", storeEmptyTitle: "Boş.", storeEmptyDesc: "Daha sonra kontrol et!", btnPlay: "Oyna", btnGet: "Ücretsiz Al", btnOwned: "Kütüphanede", setUserTitle: "Kullanıcı Adı", setUserDesc: "Adını değiştir.", setLangTitle: "Dil", setLangDesc: "Tüm oyunlara uygulanır.", setAnimTitle: "Animasyonları Azalt", setAnimDesc: "Efektleri devre dışı bırakır.", btnExit: "Çıkış", loader: "Başlatılıyor...", btnSave: "Kaydet", btnReset: "Sıfırla", menuClear: "Kaydı Sil", menuUninstall: "Kaldır" },
    sv: { navLib: "Bibliotek", navStore: "Butik", navSet: "Inställningar", titleLib: "Mina Spel", titleStore: "Upptäck", titleSet: "Inställningar", libEmptyTitle: "Tomt.", libEmptyDesc: "Besök butiken!", storeEmptyTitle: "Tomt.", storeEmptyDesc: "Kolla senare!", btnPlay: "Spela", btnGet: "Skaffa Gratis", btnOwned: "I Biblioteket", setUserTitle: "Användarnamn", setUserDesc: "Ändra ditt namn.", setLangTitle: "Språk", setLangDesc: "Tillämpas på alla spel.", setAnimTitle: "Minska Animationer", setAnimDesc: "Inaktiverar effekter.", btnExit: "Avsluta", loader: "Startar...", btnSave: "Spara", btnReset: "Återställ", menuClear: "Rensa Sparfil", menuUninstall: "Avinstallera" },
    da: { navLib: "Bibliotek", navStore: "Butik", navSet: "Indstillinger", titleLib: "Mine Spil", titleStore: "Opdag", titleSet: "Indstillinger", libEmptyTitle: "Tom.", libEmptyDesc: "Besøg butikken!", storeEmptyTitle: "Tom.", storeEmptyDesc: "Tjek senere!", btnPlay: "Spil", btnGet: "Få Gratis", btnOwned: "I Biblioteket", setUserTitle: "Brugernavn", setUserDesc: "Skift dit navn.", setLangTitle: "Sprog", setLangDesc: "Anvendes på alle spil.", setAnimTitle: "Reducer Animationer", setAnimDesc: "Deaktiverer effekter.", btnExit: "Afslut", loader: "Starter...", btnSave: "Gem", btnReset: "Nulstil", menuClear: "Slet Gem", menuUninstall: "Afinstaller" },
    fi: { navLib: "Kirjasto", navStore: "Kauppa", navSet: "Asetukset", titleLib: "Omat Pelit", titleStore: "Löydä", titleSet: "Asetukset", libEmptyTitle: "Tyhjä.", libEmptyDesc: "Vieraile kaupassa!", storeEmptyTitle: "Tyhjä.", storeEmptyDesc: "Tarkista myöhemmin!", btnPlay: "Pelaa", btnGet: "Hanki Ilmaiseksi", btnOwned: "Kirjastossa", setUserTitle: "Käyttäjänimi", setUserDesc: "Vaihda nimesi.", setLangTitle: "Kieli", setLangDesc: "Sovelletaan kaikkiin peleihin.", setAnimTitle: "Vähennä Animaatioita", setAnimDesc: "Poistaa efektit.", btnExit: "Lopeta", loader: "Käynnistetään...", btnSave: "Tallenna", btnReset: "Nollaa", menuClear: "Tyhjennä Tallennus", menuUninstall: "Poista" },
    el: { navLib: "Βιβλιοθήκη", navStore: "Κατάστημα", navSet: "Ρυθμίσεις", titleLib: "Τα Παιχνίδια Μου", titleStore: "Ανακάλυψε", titleSet: "Ρυθμίσεις", libEmptyTitle: "Άδεια.", libEmptyDesc: "Επισκεφτείτε το κατάστημα!", storeEmptyTitle: "Άδεια.", storeEmptyDesc: "Ελέγξτε αργότερα!", btnPlay: "Παίξε", btnGet: "Δωρεάν", btnOwned: "Στη Βιβλιοθήκη", setUserTitle: "Όνομα", setUserDesc: "Αλλάξτε το όνομά σας.", setLangTitle: "Γλώσσα", setLangDesc: "Εφαρμόζεται παντού.", setAnimTitle: "Μείωση Animations", setAnimDesc: "Απενεργοποιεί εφέ.", btnExit: "Έξοδος", loader: "Εκκίνηση...", btnSave: "Αποθήκευση", btnReset: "Επαναφορά", menuClear: "Διαγραφή Save", menuUninstall: "Απεγκατάσταση" },
    cs: { navLib: "Knihovna", navStore: "Obchod", navSet: "Nastavení", titleLib: "Moje Hry", titleStore: "Objevit", titleSet: "Nastavení", libEmptyTitle: "Prázdné.", libEmptyDesc: "Navštivte obchod!", storeEmptyTitle: "Prázdné.", storeEmptyDesc: "Zkontrolujte později!", btnPlay: "Hrát", btnGet: "Získat Zdarma", btnOwned: "V Knihovně", setUserTitle: "Jméno", setUserDesc: "Změňte své jméno.", setLangTitle: "Jazyk", setLangDesc: "Aplikováno na všechny hry.", setAnimTitle: "Redukovat Animace", setAnimDesc: "Zakáže efekty.", btnExit: "Ukončit", loader: "Spouštění...", btnSave: "Uložit", btnReset: "Resetovat", menuClear: "Smazat Uložení", menuUninstall: "Odinstalovat" }
};

const els = {
    usernameDisplay: document.getElementById('display-username'),
    usernameInput: document.getElementById('username-input'),
    langSelect: document.getElementById('launcher-lang-select'),
    animToggle: document.getElementById('anim-toggle'),
    libContainer: document.getElementById('library-container'),
    storeContainer: document.getElementById('store-container'),

    navLib: document.getElementById('nav-library'),
    navStore: document.getElementById('nav-store'),
    navSet: document.getElementById('nav-settings'),
    titleLib: document.getElementById('title-library'),
    titleStore: document.getElementById('title-store'),
    titleSet: document.getElementById('title-settings'),
    setUserTitle: document.getElementById('set-user-title'),
    setUserDesc: document.getElementById('set-user-desc'),
    setLangTitle: document.getElementById('set-lang-title'),
    setLangDesc: document.getElementById('set-lang-desc'),
    setAnimTitle: document.getElementById('set-anim-title'),
    setAnimDesc: document.getElementById('set-anim-desc'),
    btnExit: document.getElementById('btn-exit-game'),
    loader: document.getElementById('loader-text'),
    textBtnSave: document.getElementById('text-btn-save'),
    textBtnReset: document.getElementById('text-btn-reset')
};

els.usernameDisplay.innerText = currentUsername;
els.usernameInput.value = currentUsername;
els.langSelect.value = globalLang;
els.animToggle.checked = animEnabled;

function applyLanguageToUI(lang) {
    const t = translations[lang] || translations['en'];
    els.navLib.innerText = t.navLib;
    els.navStore.innerText = t.navStore;
    els.navSet.innerText = t.navSet;
    els.titleLib.innerText = t.titleLib;
    els.titleStore.innerText = t.titleStore;
    els.titleSet.innerText = t.titleSet;
    els.setUserTitle.innerText = t.setUserTitle;
    els.setUserDesc.innerText = t.setUserDesc;
    els.setLangTitle.innerText = t.setLangTitle;
    els.setLangDesc.innerText = t.setLangDesc;
    els.setAnimTitle.innerText = t.setAnimTitle;
    els.setAnimDesc.innerText = t.setAnimDesc;
    els.btnExit.innerText = t.btnExit;
    els.loader.innerText = t.loader;
    els.textBtnSave.innerText = t.btnSave;
    els.textBtnReset.innerText = t.btnReset;

    renderLibrary(lang);
    renderStore(lang);
}

els.langSelect.addEventListener('change', (e) => applyLanguageToUI(e.target.value));

// --- ASYNC SPEICHERN & GLOBALE NAMENSPRÜFUNG ---
document.getElementById('btn-save-settings').addEventListener('click', async() => {
    let newName = els.usernameInput.value.trim();
    if (newName === "") newName = generateRandomUser();

    const saveBtn = document.getElementById('text-btn-save');
    const oldText = saveBtn.innerText;

    // Prüfen ob globaler Modus an ist
    if (DREAMLO_PUBLIC !== 'DEIN_PUBLIC_KEY') {
        saveBtn.innerText = "Prüfe Name...";
        try {
            const res = await fetch(`https://www.dreamlo.com/lb/${DREAMLO_PUBLIC}/json`);
            const data = await res.json();
            let entries = data.dreamlo.leaderboard ? data.dreamlo.leaderboard.entry : [];
            if (!Array.isArray(entries) && entries) entries = [entries];

            // Name schon in der globalen Liste?
            const exists = entries.find(e => e.name.toLowerCase() === newName.toLowerCase());
            const myCurrentName = localStorage.getItem('launcherUsername') || '';

            if (exists && newName.toLowerCase() !== myCurrentName.toLowerCase()) {
                alert("Dieser Name ist weltweit schon vergeben! Bitte wähle einen anderen.");
                saveBtn.innerText = oldText;
                return; // Abbruch
            }

            // Namen global "reservieren" mit Score 0, wenn er neu ist
            if (!exists) {
                fetch(`https://www.dreamlo.com/lb/${DREAMLO_PRIVATE}/add/${newName}/0`);
            }
        } catch (e) {
            console.error("Fehler beim Abrufen von Dreamlo", e);
        }
    }

    // Wenn wir hier sind, ist alles okay
    currentUsername = newName;
    localStorage.setItem('launcherUsername', currentUsername);
    els.usernameDisplay.innerText = currentUsername;

    globalLang = els.langSelect.value;
    localStorage.setItem('flappyLang', globalLang);
    applyLanguageToUI(globalLang);

    animEnabled = els.animToggle.checked;
    localStorage.setItem('launcherAnim', animEnabled);

    saveBtn.innerText = "✓";
    setTimeout(() => saveBtn.innerText = oldText, 2000);
});

document.getElementById('btn-reset-settings').addEventListener('click', () => {
    if (confirm("Bist du sicher? Bibliothek, Shop-Einkäufe und alle Einstellungen werden gelöscht!")) {
        localStorage.clear();
        location.reload();
    }
});

function renderLibrary(langOverride) {
    const activeLang = langOverride || globalLang;
    const t = translations[activeLang] || translations['en'];
    els.libContainer.innerHTML = '';

    if (ownedGames.length === 0) {
        els.libContainer.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-rounded empty-icon">sentiment_dissatisfied</span>
                <h2>${t.libEmptyTitle}</h2>
                <p>${t.libEmptyDesc}</p>
                <button class="btn primary" style="margin: 20px auto;" onclick="switchTab('store')">
                    <span class="material-symbols-rounded">storefront</span> Shop
                </button>
            </div>
        `;
        return;
    }

    const mainGame = gamesDatabase[ownedGames[0]];
    const gameDesc = mainGame.desc[activeLang] || mainGame.desc['en'];

    els.libContainer.innerHTML = `
        <div class="hero-banner">
            <div class="hero-content">
                <h2>${mainGame.title}</h2>
                <p>${gameDesc}</p>
                <button class="btn primary" onclick="launchGame('${mainGame.file}')">
                    <span class="material-symbols-rounded">play_arrow</span> ${t.btnPlay}
                </button>
            </div>
        </div>
        <div class="game-grid" id="lib-grid"></div>
    `;

    const grid = document.getElementById('lib-grid');
    ownedGames.forEach(id => {
        const g = gamesDatabase[id];

        grid.innerHTML += `
            <div class="game-card">
                <div class="card-image ${g.bgClass}" onclick="launchGame('${g.file}')">
                    <span class="material-symbols-rounded huge-icon">${g.icon}</span>
                    <div class="play-overlay">
                        <span class="material-symbols-rounded">play_circle</span>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-text">
                        <h4>${g.title}</h4>
                        <p>Arcade</p>
                    </div>
                    <div class="card-actions">
                        <span class="material-symbols-rounded action-icon" onclick="toggleContextMenu(event, '${id}')">more_vert</span>
                        <div class="context-menu" id="ctx-${id}">
                            <div class="context-item" onclick="clearGameSave('${id}')">
                                <span class="material-symbols-rounded">delete_sweep</span> ${t.menuClear}
                            </div>
                            <div class="context-item danger" onclick="uninstallGame('${id}')">
                                <span class="material-symbols-rounded">delete</span> ${t.menuUninstall}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderStore(langOverride) {
    const activeLang = langOverride || globalLang;
    const t = translations[activeLang] || translations['en'];
    els.storeContainer.innerHTML = '<div class="game-grid" id="store-grid"></div>';
    const grid = document.getElementById('store-grid');

    Object.keys(gamesDatabase).forEach(id => {
        const g = gamesDatabase[id];
        const isOwned = ownedGames.includes(id);
        const gameDesc = g.desc[activeLang] || g.desc['en'];

        const btnHtml = isOwned ?
            `<button class="btn success" disabled><span class="material-symbols-rounded">check</span> ${t.btnOwned}</button>` :
            `<button class="btn primary" onclick="buyGame('${id}')"><span class="material-symbols-rounded">download</span> ${t.btnGet}</button>`;

        grid.innerHTML += `
            <div class="game-card" style="cursor: default;">
                <div class="card-image ${g.bgClass}">
                    <span class="material-symbols-rounded huge-icon">${g.icon}</span>
                </div>
                <div class="card-info">
                    <div class="card-text" style="width: 100%;">
                        <h4>${g.title}</h4>
                        <p style="margin-bottom: 15px;">${gameDesc}</p>
                        ${btnHtml}
                    </div>
                </div>
            </div>
        `;
    });
}

window.toggleContextMenu = function(e, id) {
    e.stopPropagation();
    document.querySelectorAll('.context-menu').forEach(m => {
        if (m.id !== 'ctx-' + id) m.classList.remove('show');
    });
    document.getElementById('ctx-' + id).classList.toggle('show');
}

window.addEventListener('click', () => {
    document.querySelectorAll('.context-menu').forEach(m => m.classList.remove('show'));
});

window.clearGameSave = function(id) {
    const t = translations[globalLang] || translations['en'];
    if (confirm(t.menuClear + " ?")) {
        const gameFile = gamesDatabase[id].file;
        const tempFrame = document.createElement('iframe');
        tempFrame.style.display = 'none';
        tempFrame.src = gameFile + "?action=clearSave";
        document.body.appendChild(tempFrame);
        setTimeout(() => {
            document.body.removeChild(tempFrame);
            alert("Fertig!");
        }, 800);
    }
}

window.uninstallGame = function(id) {
    const t = translations[globalLang] || translations['en'];
    if (confirm(t.menuUninstall + " ?")) {
        ownedGames = ownedGames.filter(gameId => gameId !== id);
        localStorage.setItem('launcherOwnedGames', JSON.stringify(ownedGames));
        renderLibrary();
        renderStore();
    }
}

window.buyGame = function(id) {
    if (!ownedGames.includes(id)) {
        ownedGames.push(id);
        localStorage.setItem('launcherOwnedGames', JSON.stringify(ownedGames));
        renderStore();
        renderLibrary();
        switchTab('library');
    }
}

window.switchTab = function(tabId) {
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));
    document.getElementById('tab-' + tabId).classList.add('active');
}

const gameOverlay = document.getElementById('game-overlay');
const gameFrame = document.getElementById('game-frame');

window.launchGame = function(gameFile) {
    // FIX: Wir übergeben den Namen jetzt sicher über die URL!
    const urlMitParams = gameFile + "?lang=" + globalLang + "&user=" + encodeURIComponent(currentUsername);
    gameOverlay.classList.remove('hidden');
    gameFrame.src = urlMitParams;
    gameFrame.onload = function() { gameFrame.focus(); };
}

window.closeGame = function() {
    gameOverlay.classList.add('hidden');
    setTimeout(() => { gameFrame.src = ''; }, 500);
}

applyLanguageToUI(globalLang);