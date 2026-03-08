// --- URL Parameter & Sprachsystem Setup ---
const urlParams = new URLSearchParams(window.location.search);
let currentLang = urlParams.get('lang') || localStorage.getItem('flappyLang') || 'de';

const tDict = {
    back: { de: "Hub Menü", en: "Hub Menu", es: "Menú Hub", fr: "Menu Hub", it: "Menu Hub", pt: "Menu Hub", nl: "Hub Menu", pl: "Menu Hub", ru: "Меню", ja: "ハブメニュー", zh: "枢纽菜单", ko: "허브 메뉴", ar: "القائمة", hi: "हब मेनू", tr: "Hub Menü", sv: "Hub-meny", da: "Hub Menu", fi: "Hub-valikko", el: "Μενού", cs: "Hub Menu" },
    btnPromo: { de: "Code", en: "Code", es: "Código", fr: "Code", it: "Codice", pt: "Código", nl: "Code", pl: "Kod", ru: "Код", ja: "コード", zh: "代码", ko: "코드", ar: "رمز", hi: "कोड", tr: "Kod", sv: "Kod", da: "Kode", fi: "Koodi", el: "Κωδικός", cs: "Kód" },
    menuTitle: { de: "Wähle dein Spiel", en: "Choose your game", es: "Elige tu juego", fr: "Choisissez votre jeu", it: "Scegli il gioco", pt: "Escolha seu jogo", nl: "Kies je spel", pl: "Wybierz grę", ru: "Выберите игру", ja: "ゲームを選択", zh: "选择游戏", ko: "게임 선택", ar: "اختر لعبتك", hi: "अपना खेल चुनें", tr: "Oyununu seç", sv: "Välj spel", da: "Vælg spil", fi: "Valitse peli", el: "Επιλέξτε παιχνίδι", cs: "Vyberte hru" },
    tradeTitle: { de: "Aktien Trading", en: "Stock Trading", es: "Comercio de Acciones", fr: "Bourse", it: "Trading Azioni", pt: "Negociação de Ações", nl: "Aandelenhandel", pl: "Giełda", ru: "Трейдинг", ja: "株式取引", zh: "股票交易", ko: "주식 거래", ar: "تداول الأسهم", hi: "शेयर ट्रेडिंग", tr: "Hisse Ticareti", sv: "Aktiehandel", da: "Aktiehandel", fi: "Osakekauppa", el: "Συναλλαγές", cs: "Obchodování" },
    wheelTitle: { de: "Glücksrad", en: "Wheel of Fortune", es: "Ruleta de la Fortuna", fr: "Roue de la Fortune", it: "Ruota della Fortuna", pt: "Roda da Fortuna", nl: "Rad van Fortuin", pl: "Koło Fortuny", ru: "Колесо Фортуны", ja: "観覧車", zh: "幸运轮", ko: "행운의 바퀴", ar: "عجلة الحظ", hi: "भाग्य का पहिया", tr: "Çarkıfelek", sv: "Lyckohjul", da: "Lykkehjul", fi: "Onnenpyörä", el: "Τροχός της Τύχης", cs: "Kolo štěstí" },
    msgBet: { de: "Einsatz wählen!", en: "Place your bet!", es: "¡Haz tu apuesta!", fr: "Faites vos jeux!", it: "Fai la tua puntata!", pt: "Faça sua aposta!", nl: "Plaats inzet!", pl: "Zrób zakład!", ru: "Сделайте ставку!", ja: "ベットを配置！", zh: "下注！", ko: "베팅하세요!", ar: "ضع رهانك!", hi: "शर्त लगाएं!", tr: "Bahis yapın!", sv: "Placera insats!", da: "Placer indsats!", fi: "Aseta panos!", el: "Τοποθετήστε στοίχημα!", cs: "Vsaďte si!" },
    lblYou: { de: "Du", en: "You", es: "Tú", fr: "Toi", it: "Tu", pt: "Você", nl: "Jij", pl: "Ty", ru: "Ты", ja: "あなた", zh: "你", ko: "너", ar: "أنت", hi: "आप", tr: "Sen", sv: "Du", da: "Du", fi: "Sinä", el: "Εσύ", cs: "Ty" },
    lblShares: { de: "Aktien", en: "Shares", es: "Acciones", fr: "Actions", it: "Azioni", pt: "Ações", nl: "Aandelen", pl: "Akcje", ru: "Акции", ja: "株式", zh: "股票", ko: "주식", ar: "الأسهم", hi: "शेयर", tr: "Hisseler", sv: "Aktier", da: "Aktier", fi: "Osakkeet", el: "Μετοχές", cs: "Akcie" },
    lblValue: { de: "Wert", en: "Value", es: "Valor", fr: "Valeur", it: "Valore", pt: "Valor", nl: "Waarde", pl: "Wartość", ru: "Ценность", ja: "价值", zh: "价值", ko: "가치", ar: "القيمة", hi: "मूल्य", tr: "Değer", sv: "Värde", da: "Værdi", fi: "Arvo", el: "Αξία", cs: "Hodnota" },
    lblAmount: { de: "Menge", en: "Amount", es: "Cantidad", fr: "Montant", it: "Quantità", pt: "Quantidade", nl: "Aantal", pl: "Ilość", ru: "Количество", ja: "量", zh: "数量", ko: "수량", ar: "كمية", hi: "मात्रा", tr: "Miktar", sv: "Belopp", da: "Beløb", fi: "Määrä", el: "Ποσό", cs: "Množství" },
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
    btnLow: { de: "Niedriger", en: "Lower", es: "Menor", fr: "Moins", it: "Basso", pt: "Menor", nl: "Lager", pl: "Niżej", ru: "Ниже", ja: "低い", zh: "较低", ko: "더 낮은", ar: "أدنى", hi: "कम", tr: "Daha düşük", sv: "Lägre", da: "Lavere", fi: "Matalampi", el: "Χαμηλότερο", cs: "Nižší" },
    msgBroke: { de: "Das Casino schenkt dir 100 € Notfallguthaben.", en: "The casino gives you 100 € emergency funds.", es: "El casino te da 100 € de emergencia.", fr: "Le casino vous donne 100 €.", it: "Il casinò ti regala 100 €.", pt: "O cassino te dá 100 €.", nl: "Het casino geeft je 100 €.", pl: "Kasyno daje ci 100 €.", ru: "Казино дает вам 100 €.", ja: "カジノから100 €。", zh: "赌场送您 100 €。", ko: "카지노에서 100 € 지급.", ar: "الكازينو يمنحك 100 €.", hi: "कैसीनो आपको 100 € देता है।", tr: "Casino sana 100 € veriyor.", sv: "Casinot ger dig 100 €.", da: "Casinoet giver dig 100 €.", fi: "Kasino antaa sinulle 100 €.", el: "Το καζίνο σας δίνει 100 €.", cs: "Kasino ti dává 100 €." },
    // NEUE MODAL-ÜBERSETZUNGEN
    modalOk: { de: "OK", en: "OK", es: "Aceptar", fr: "OK", it: "OK", pt: "OK", nl: "OK", pl: "OK", ru: "ОК", ja: "OK", zh: "确定", ko: "확인", ar: "موافق", hi: "ठीक है", tr: "Tamam", sv: "OK", da: "OK", fi: "OK", el: "ΟΚ", cs: "OK" },
    modalCancel: { de: "Abbrechen", en: "Cancel", es: "Cancelar", fr: "Annuler", it: "Annulla", pt: "Cancelar", nl: "Annuleren", pl: "Anuluj", ru: "Отмена", ja: "キャンセル", zh: "取消", ko: "취소", ar: "إلغاء", hi: "रद्द करें", tr: "İptal", sv: "Avbryt", da: "Annuller", fi: "Peruuta", el: "Ακύρωση", cs: "Zrušit" },
    modalPromoTitle: { de: "Promo-Code", en: "Promo Code", es: "Código Promocional", fr: "Code Promo", it: "Codice Promo", pt: "Código Promo", nl: "Promotiecode", pl: "Kod Promo", ru: "Промокод", ja: "プロモコード", zh: "优惠码", ko: "프로모션 코드", ar: "رمز ترويجي", hi: "प्रोमो कोड", tr: "Promosyon Kodu", sv: "Kampanjkod", da: "Rabatkode", fi: "Tarjouskoodi", el: "Κωδικός προσφοράς", cs: "Promo kód" },
    modalPromoMsg: { de: "Bitte gib deinen Promo-Code ein:", en: "Please enter your promo code:", es: "Por favor, introduce tu código:", fr: "Veuillez entrer votre code :", it: "Inserisci il tuo codice:", pt: "Por favor, insira seu código:", nl: "Voer uw promotiecode in:", pl: "Wpisz kod promocyjny:", ru: "Введите промокод:", ja: "コードを入力してください：", zh: "请输入您的优惠码：", ko: "프로모션 코드를 입력하세요:", ar: "أدخل الرمز الترويجي الخاص بك:", hi: "कृपया अपना कोड दर्ज करें:", tr: "Promosyon kodunuzu girin:", sv: "Vänligen ange din kod:", da: "Indtast venligst din kode:", fi: "Anna tarjouskoodisi:", el: "Εισαγάγετε τον κωδικό προσφοράς σας:", cs: "Zadejte svůj promo kód:" },
    modalError: { de: "Fehler", en: "Error", es: "Error", fr: "Erreur", it: "Errore", pt: "Erro", nl: "Fout", pl: "Błąd", ru: "Ошибка", ja: "エラー", zh: "错误", ko: "오류", ar: "خطأ", hi: "त्रुटि", tr: "Hata", sv: "Fel", da: "Fejl", fi: "Virhe", el: "Σφάλμα", cs: "Chyba" },
    modalSuccess: { de: "Erfolg", en: "Success", es: "Éxito", fr: "Succès", it: "Successo", pt: "Sucesso", nl: "Succes", pl: "Sukces", ru: "Успех", ja: "成功", zh: "成功", ko: "성공", ar: "نجاح", hi: "सफलता", tr: "Başarı", sv: "Framgång", da: "Succes", fi: "Menestys", el: "Επιτυχία", cs: "Úspěch" },
    modalPromoUsed: { de: "Dieser Code wurde bereits eingelöst!", en: "This code has already been redeemed!", es: "¡Este código ya ha sido canjeado!", fr: "Ce code a déjà été utilisé !", it: "Questo codice è già stato usato!", pt: "Este código já foi usado!", nl: "Deze code is al ingewisseld!", pl: "Ten kod został już użyty!", ru: "Этот код уже был использован!", ja: "このコードはすでに使用されています！", zh: "该代码已使用！", ko: "이 코드는 이미 사용되었습니다!", ar: "تم استخدام هذا الرمز بالفعل!", hi: "यह कोड पहले ही इस्तेमाल हो चुका है!", tr: "Bu kod zaten kullanıldı!", sv: "Denna kod har redan använts!", da: "Denne kode er allerede brugt!", fi: "Tämä koodi on jo käytetty!", el: "Αυτός ο κωδικός έχει ήδη χρησιμοποιηθεί!", cs: "Tento kód již byl použit!" },
    modalPromoInvalid: { de: "Ungültiger Code!", en: "Invalid code!", es: "¡Código inválido!", fr: "Code invalide !", it: "Codice non valido!", pt: "Código inválido!", nl: "Ongeldige code!", pl: "Nieprawidłowy kod!", ru: "Недействительный код!", ja: "無効なコード！", zh: "无效代码！", ko: "잘못된 코드!", ar: "رمز غير صالح!", hi: "अमान्य कोड!", tr: "Geçersiz kod!", sv: "Ogiltig kod!", da: "Ugyldig kode!", fi: "Virheellinen koodi!", el: "Μη έγκυρος κωδικός!", cs: "Neplatný kód!" },
    modalNoMoney: { de: "Nicht genug Guthaben!", en: "Not enough funds!", es: "¡No hay suficientes fondos!", fr: "Fonds insuffisants !", it: "Fondi insufficienti!", pt: "Fundos insuficientes!", nl: "Niet genoeg saldo!", pl: "Niewystarczające środki!", ru: "Недостаточно средств!", ja: "資金が不足しています！", zh: "资金不足！", ko: "자금이 부족합니다!", ar: "أموال غير كافية!", hi: "पर्याप्त धनराशि नहीं!", tr: "Yetersiz bakiye!", sv: "Inte tillräckligt med pengar!", da: "Ikke nok midler!", fi: "Ei tarpeeksi varoja!", el: "Μη επαρκή κεφάλαια!", cs: "Nedostatek prostředků!" },
    modalNoStocks: { de: "Du hast nicht genug Aktien!", en: "Not enough shares!", es: "¡No tienes suficientes acciones!", fr: "Pas assez d'actions !", it: "Non hai abbastanza azioni!", pt: "Não tem ações suficientes!", nl: "Niet genoeg aandelen!", pl: "Nie masz wystarczająco akcji!", ru: "Недостаточно акций!", ja: "株式が足りません！", zh: "您的股票不足！", ko: "주식이 부족합니다!", ar: "ليس لديك أسهم كافية!", hi: "पर्याप्त शेयर नहीं हैं!", tr: "Yeterli hisseniz yok!", sv: "Inte tillräckligt med aktier!", da: "Ikke nok aktier!", fi: "Ei tarpeeksi osakkeita!", el: "Δεν έχετε αρκετές μετοχές!", cs: "Nemáš dostatek akcií!" },
    modalPromoWon: { de: "Glückwunsch! Du hast {amount} € erhalten.", en: "Congratulations! You received {amount} €.", es: "¡Felicidades! Has recibido {amount} €.", fr: "Félicitations ! Vous avez reçu {amount} €.", it: "Congratulazioni! Hai ricevuto {amount} €.", pt: "Parabéns! Você recebeu {amount} €.", nl: "Gefeliciteerd! Je hebt {amount} € ontvangen.", pl: "Gratulacje! Otrzymałeś {amount} €.", ru: "Поздравляем! Вы получили {amount} €.", ja: "おめでとう！{amount} €を受け取りました。", zh: "恭喜！您获得了 {amount} €。", ko: "축하합니다! {amount} €를 받았습니다.", ar: "تهانينا! لقد تلقيت {amount} €.", hi: "बधाई हो! आपको {amount} € मिले हैं।", tr: "Tebrikler! {amount} € aldınız.", sv: "Grattis! Du har fått {amount} €.", da: "Tillykke! Du har modtaget {amount} €.", fi: "Onnittelut! Olet saanut {amount} €.", el: "Συγχαρητήρια! Λάβατε {amount} €.", cs: "Gratulujeme! Získali jste {amount} €." }
};

// Hilfsfunktion: Holt den Text direkt in der richtigen Sprache
function getT(key) {
    return (tDict[key] && tDict[key][currentLang]) ? tDict[key][currentLang] : (tDict[key] ? tDict[key]['en'] : key);
}

function applyLanguage(lang) {
    document.getElementById('lang-select').value = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerText = getT(key);
    });
}

document.getElementById('lang-select').addEventListener('change', (e) => {
    currentLang = e.target.value;
    localStorage.setItem('flappyLang', currentLang);
    applyLanguage(currentLang);
});

// Hilfsfunktion für schöne Zahlen (Tausendertrennzeichen + max 2 Nachkommastellen)
function formatMoney(amount) {
    return amount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


// ==========================================
// CUSTOM UI MODAL SYSTEM (Ersetzt prompt & alert)
// ==========================================
let currentModalCallback = null;
const modalOverlay = document.getElementById('custom-modal-overlay');
const modalInput = document.getElementById('c-modal-input');
const modalBtnCancel = document.getElementById('c-modal-btn-cancel');

function showModal(type, title, text, callback = null) {
    document.getElementById('c-modal-title').innerText = title;
    document.getElementById('c-modal-desc').innerText = text;

    modalInput.value = '';
    currentModalCallback = callback;

    if (type === 'prompt') {
        modalInput.classList.remove('hidden');
        modalBtnCancel.classList.remove('hidden');

        // Mit Enter-Taste absenden
        modalInput.onkeyup = (e) => {
            if (e.key === 'Enter') document.getElementById('c-modal-btn-ok').click();
        };
        setTimeout(() => modalInput.focus(), 100);
    } else {
        modalInput.classList.add('hidden');
        modalBtnCancel.classList.add('hidden');
        modalInput.onkeyup = null;
    }

    modalOverlay.classList.remove('hidden');
}

function closeCustomModal() {
    modalOverlay.classList.add('hidden');
    modalInput.onkeyup = null;
}

document.getElementById('c-modal-btn-ok').addEventListener('click', () => {
    const val = modalInput.value;
    closeCustomModal();
    if (currentModalCallback) currentModalCallback(val);
});

document.getElementById('c-modal-btn-cancel').addEventListener('click', () => {
    closeCustomModal();
    if (currentModalCallback) currentModalCallback(null);
});


// ==========================================
// BALANCE & SETUP
// ==========================================
let balance = parseInt(localStorage.getItem('casinoBalance'));
if (isNaN(balance)) balance = 1000;
const balanceDisplay = document.getElementById('balance-display');

function updateBalance(amount) {
    balance += amount;
    localStorage.setItem('casinoBalance', balance);
    balanceDisplay.innerText = formatMoney(balance).split(',')[0]; // Nur ganze Zahlen im Header, sieht cleaner aus
}
updateBalance(0);

// ==========================================
// BANKROTT SYSTEM
// ==========================================
function getTotalPortfolioValue() {
    let total = 0;
    for (let id in stocks) {
        total += stocks[id].owned * stocks[id].price;
    }
    return total;
}

function triggerBankruptcy() {
    balance = 100;
    localStorage.setItem('casinoBalance', balance);
    updateBalance(0);

    const msg = getT('msgBroke');

    const popup = document.createElement('div');
    popup.innerHTML = `<h3 style="margin-bottom:8px;">💸 BANKROTT 💸</h3><p style="font-weight:normal; font-size:16px;">${msg}</p>`;
    popup.style.position = 'fixed';
    popup.style.top = '30px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = 'var(--danger)';
    popup.style.color = '#fff';
    popup.style.padding = '20px 30px';
    popup.style.borderRadius = '12px';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '9999';
    popup.style.boxShadow = '0 15px 35px rgba(0,0,0,0.8)';
    popup.style.border = '2px solid #fff';
    popup.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    popup.style.animation = 'fadeIn 0.5s';

    document.body.appendChild(popup);

    balanceDisplay.parentElement.style.transition = 'transform 0.3s';
    balanceDisplay.parentElement.style.transform = 'scale(1.2)';
    balanceDisplay.parentElement.style.boxShadow = '0 0 20px var(--success)';

    setTimeout(() => {
        balanceDisplay.parentElement.style.transform = 'scale(1)';
        balanceDisplay.parentElement.style.boxShadow = '';
    }, 1000);
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => popup.remove(), 500);
    }, 5000);
}

function checkPostGameBankruptcy() {
    if (balance <= 0 && getTotalPortfolioValue() <= 0) {
        setTimeout(triggerBankruptcy, 1500);
    }
}

function checkAndTriggerBankrupt() {
    if (balance <= 0 && getTotalPortfolioValue() <= 0) {
        triggerBankruptcy();
        return true;
    }
    return false;
}

// ==========================================
// PROMO CODES SYSTEM (Jetzt mit Custom UI)
// ==========================================
const promoCodes = {
    "2026": 2026,
    "SCHLEIMY": 500,
    "ADMIN8QZ1M4K7T2A9L5X3": 100000,
    "ADMINP4L9X7A2K8T1M6Q3": 100000,
    "ADMINZ6T3N9A8X1K5Q2B7": 100000,
    "ADMIN4FJ8K2P9XQ7M3R1L": 100000,
    "ADMINA7K9X2M4Q8L1Z5T31MIO": 1000000,
    "ADMINX7K3P9L2A8M4Q1ZT5": 1000000,
    "ADMIN4T9KX2A7Q3M8L1P6R": 1000000,
    "ADMINQ8L3X5M2A7T9K4P1Z": 100000,
    "ADMIN1M7Q4K9A3L8T2X5PZ": 100000,
    "ADMINZ3A9T1K8M4Q7L2XP6": 100000,
    "NEW": 250
};
let redeemedCodes = JSON.parse(localStorage.getItem('casinoRedeemedCodes')) || [];

document.getElementById('btn-promo').addEventListener('click', () => {
    // Ruft das neue Custom Modal auf
    showModal('prompt', getT('modalPromoTitle'), getT('modalPromoMsg'), (codeInput) => {
        if (codeInput === null || !codeInput.trim()) return;

        const code = codeInput.trim().toUpperCase();

        if (redeemedCodes.includes(code)) {
            showModal('alert', getT('modalError'), getT('modalPromoUsed'));
            return;
        }

        if (promoCodes.hasOwnProperty(code)) {
            const amount = promoCodes[code];
            updateBalance(amount);
            redeemedCodes.push(code);
            localStorage.setItem('casinoRedeemedCodes', JSON.stringify(redeemedCodes));

            const successMsg = getT('modalPromoWon').replace('{amount}', formatMoney(amount));
            showModal('alert', getT('modalSuccess'), successMsg);
        } else {
            showModal('alert', getT('modalError'), getT('modalPromoInvalid'));
        }
    });
});


// --- NAVIGATION ---
const btnBack = document.getElementById('btn-back');
const views = document.querySelectorAll('.view');

function openGame(gameId) {
    views.forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + gameId).classList.add('active');
    btnBack.classList.remove('hidden');
    if (gameId === 'trading') {
        if (!tradingInterval) initTrading();
        else updateTradingUI();
    }
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
    if (checkAndTriggerBankrupt()) return;
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
        showMessage('slot-msg', `JACKPOT! +${formatMoney(bet * multi)} €`, 'var(--warning)');
        reels.forEach(r => r.classList.add('win-anim'));
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
        updateBalance(bet * 2);
        showMessage('slot-msg', `Win! +${formatMoney(bet * 2)} €`, 'var(--success)');
    } else {
        showMessage('slot-msg', 'Lose.', 'var(--danger)');
        checkPostGameBankruptcy();
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
    if (checkAndTriggerBankrupt()) return;
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
        checkPostGameBankruptcy();
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
    } else {
        showMessage('bj-msg', 'Lose!', '#e74c3c');
        checkPostGameBankruptcy();
    }
    resetBjUI();
}

function resetBjUI() {
    document.getElementById('bj-action-area').classList.add('hidden');
    setTimeout(() => document.getElementById('bj-bet-area').classList.remove('hidden'), 2000);
}

// ==========================================
// 3. TRADING 
// ==========================================
let tradingInterval = null;
let activeStockId = 'SMC';
let chartPoints = [];

let savedPortfolio = JSON.parse(localStorage.getItem('casinoPortfolio')) || {};

const stocks = {
    'DMD': { name: 'Diamond Holdings', price: 1000.0, vol: 0.01, history: Array(30).fill(1000.0), owned: savedPortfolio['DMD'] || 0 },
    'SMC': { name: 'SchleimyCorp', price: 100.0, vol: 0.04, history: Array(30).fill(100.0), owned: savedPortfolio['SMC'] || 0 },
    'FLP': { name: 'Flappy Inc.', price: 10.0, vol: 0.12, history: Array(30).fill(10.0), owned: savedPortfolio['FLP'] || 0 },
    'XCC': { name: 'CryptoCoin', price: 1.0, vol: 0.25, history: Array(30).fill(1.0), owned: savedPortfolio['XCC'] || 0 }
};

function savePortfolio() {
    let toSave = {};
    for (let id in stocks) toSave[id] = stocks[id].owned;
    localStorage.setItem('casinoPortfolio', JSON.stringify(toSave));
}

function initTrading() {
    renderStockList();
    updateTradingUI();
    if (tradingInterval) clearInterval(tradingInterval);
    tradingInterval = setInterval(updateMarket, 2000);

    window.addEventListener('resize', () => {
        if (document.getElementById('view-trading').classList.contains('active')) {
            updateTradingUI();
        }
    });
}

function selectStock(id) {
    activeStockId = id;
    renderStockList();
    updateTradingUI();
}

function renderStockList() {
    const container = document.getElementById('stock-list-container');
    container.innerHTML = '';

    for (let id in stocks) {
        const stock = stocks[id];
        const oldPrice = stock.history[0];
        const diffPercent = ((stock.price - oldPrice) / oldPrice) * 100;
        const colorClass = diffPercent >= 0 ? 'price-up' : 'price-down';
        const sign = diffPercent >= 0 ? '+' : '';

        const div = document.createElement('div');
        div.className = `stock-item ${id === activeStockId ? 'active' : ''}`;
        div.onclick = () => selectStock(id);

        div.innerHTML = `
            <div class="stock-item-info">
                <span class="stock-item-symbol">${id}</span>
                <span class="stock-item-price">${formatMoney(stock.price)} €</span>
            </div>
            <div class="stock-item-change ${colorClass}">${sign}${diffPercent.toFixed(2)}%</div>
        `;
        container.appendChild(div);
    }
}

function updateTradingUI() {
    const stock = stocks[activeStockId];

    document.getElementById('active-stock-name').innerText = `${stock.name} (${activeStockId})`;
    document.getElementById('live-price').innerText = formatMoney(stock.price) + ' €';

    const oldPrice = stock.history[0];
    const diffPercent = ((stock.price - oldPrice) / oldPrice) * 100;
    const changeEl = document.getElementById('price-change');
    changeEl.innerText = (diffPercent >= 0 ? '+' : '') + diffPercent.toFixed(2) + '%';
    changeEl.className = 'price-change ' + (diffPercent >= 0 ? 'price-up' : 'price-down');
    document.getElementById('live-price').className = 'current-price ' + (diffPercent >= 0 ? 'price-up' : 'price-down');

    document.getElementById('owned-shares').innerText = stock.owned;
    document.getElementById('shares-value').innerText = formatMoney(stock.owned * stock.price) + ' €';

    renderCanvasChart(stock.history);
}

function renderCanvasChart(history) {
    const canvas = document.getElementById('trading-chart');
    const wrapper = document.getElementById('chart-wrapper');
    const ctx = canvas.getContext('2d');

    canvas.width = wrapper.clientWidth * 2;
    canvas.height = wrapper.clientHeight * 2;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    chartPoints = [];

    const minRaw = Math.min(...history);
    const maxRaw = Math.max(...history);
    const padding = (maxRaw - minRaw) * 0.1 || minRaw * 0.05;
    const min = minRaw - padding;
    const max = maxRaw + padding;
    const range = max - min;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i < 4; i++) {
        let y = (h / 4) * i;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    for (let i = 1; i < 5; i++) {
        let x = (w / 5) * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    ctx.stroke();

    const isUp = history[history.length - 1] >= history[0];
    const color = isUp ? '#2ecc71' : '#e74c3c';

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.lineJoin = 'round';

    history.forEach((p, i) => {
        const x = (i / (history.length - 1)) * w;
        const y = h - ((p - min) / range) * h;

        chartPoints.push({ x: x / 2, y: y / 2, price: p });

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, color + '66');
    grad.addColorStop(1, color + '00');

    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fillStyle = grad;
    ctx.fill();
}

const chartCanvas = document.getElementById('trading-chart');
const tooltip = document.getElementById('chart-tooltip');
const hoverLine = document.getElementById('chart-hover-line');

chartCanvas.addEventListener('mousemove', (e) => {
    if (!chartPoints.length) return;
    const rect = chartCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    let closest = chartPoints.reduce((prev, curr) =>
        Math.abs(curr.x - mouseX) < Math.abs(prev.x - mouseX) ? curr : prev
    );

    tooltip.innerText = formatMoney(closest.price) + ' €';

    let tooltipX = closest.x;
    let safeMargin = tooltip.offsetWidth / 2 + 10;

    if (tooltipX < safeMargin) tooltipX = safeMargin;
    if (tooltipX > rect.width - safeMargin) tooltipX = rect.width - safeMargin;

    let tooltipY = closest.y - 30;
    if (tooltipY < 20) tooltipY = 20;

    tooltip.style.left = tooltipX + 'px';
    tooltip.style.top = tooltipY + 'px';

    tooltip.style.transform = 'translate(-50%, -50%)';
    tooltip.classList.remove('hidden');

    hoverLine.style.left = closest.x + 'px';
    hoverLine.classList.remove('hidden');
});

chartCanvas.addEventListener('mouseleave', () => {
    tooltip.classList.add('hidden');
    hoverLine.classList.add('hidden');
});


function updateMarket() {
    for (let id in stocks) {
        const stock = stocks[id];
        const change = (Math.random() - 0.5) * stock.vol;
        stock.price = Math.max(0.1, stock.price * (1 + change));

        stock.history.shift();
        stock.history.push(stock.price);
    }

    renderStockList();
    updateTradingUI();
}

// BENUTZT JETZT AUCH DAS MODAL SYSTEM FÜR FEHLER!
document.getElementById('btn-buy-stock').addEventListener('click', () => {
    if (checkAndTriggerBankrupt()) return;
    const amount = parseInt(document.getElementById('trade-amount').value) || 1;
    if (amount < 1) return;

    const stock = stocks[activeStockId];
    const cost = stock.price * amount;

    if (balance >= cost) {
        updateBalance(-cost);
        stock.owned += amount;
        savePortfolio();
        updateTradingUI();
    } else {
        showModal('alert', getT('modalError'), getT('modalNoMoney'));
    }
});

// BENUTZT JETZT AUCH DAS MODAL SYSTEM FÜR FEHLER!
document.getElementById('btn-sell-stock').addEventListener('click', () => {
    const amount = parseInt(document.getElementById('trade-amount').value) || 1;
    if (amount < 1) return;

    const stock = stocks[activeStockId];

    if (stock.owned >= amount) {
        const revenue = stock.price * amount;
        updateBalance(revenue);
        stock.owned -= amount;
        savePortfolio();
        updateTradingUI();
    } else {
        showModal('alert', getT('modalError'), getT('modalNoStocks'));
    }
});


// -----------------------------------------
// 4. ROULETTE
// -----------------------------------------
window.playRoulette = function(colorStr) {
    if (checkAndTriggerBankrupt()) return;
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
                showMessage('roulette-msg', `Win! +${formatMoney(win)} €`, 'var(--success)');
            } else {
                showMessage('roulette-msg', 'Lose.', 'var(--danger)');
                checkPostGameBankruptcy();
            }
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
    if (checkAndTriggerBankrupt()) return;
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
            checkPostGameBankruptcy();
        }
    }, 50);
});
document.getElementById('btn-crash-cashout').addEventListener('click', () => {
    clearInterval(crashInterval);
    let win = Math.floor(crashBet * crashMult);
    updateBalance(win);
    showMessage('crash-msg', `Win! +${formatMoney(win)} €`, 'var(--success)');
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
    if (checkAndTriggerBankrupt()) return;
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
            showMessage('coin-msg', `Win! +${formatMoney(bet*2)} €`, 'var(--success)');
        } else {
            showMessage('coin-msg', `Lose.`, 'var(--danger)');
            checkPostGameBankruptcy();
        }
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
    if (checkAndTriggerBankrupt()) return;
    minesBet = parseInt(document.getElementById('mines-bet').value);
    if (minesBet < 1 || minesBet > balance) return showMessage('mines-msg', 'Error!', 'var(--danger)');
    updateBalance(-minesBet);
    document.getElementById('mines-setup').classList.add('hidden');
    mGrid.classList.remove('hidden');
    document.getElementById('btn-mines-cashout').classList.remove('hidden');
    minesPot = minesBet;
    document.getElementById('mines-pot').innerText = formatMoney(minesPot);
    showMessage('mines-msg', 'Viel Glück!', 'var(--text-main)');
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
                document.getElementById('btn-mines-cashout').classList.add('hidden');
                Array.from(mGrid.children).forEach(b => b.onclick = null);
                Array.from(mGrid.children).forEach((b, idx) => {
                    if (bombIndices.includes(idx) && idx !== i) {
                        b.classList.add('bomb');
                        b.innerText = '💣';
                        b.style.opacity = '0.5';
                    }
                });
                setTimeout(() => {
                    mGrid.classList.add('hidden');
                    document.getElementById('mines-setup').classList.remove('hidden');
                }, 2500);
                checkPostGameBankruptcy();
            } else {
                btn.classList.add('safe');
                btn.innerText = '💎';
                minesPot = Math.floor(minesPot * 1.2);
                document.getElementById('mines-pot').innerText = formatMoney(minesPot);
            }
        };
        mGrid.appendChild(btn);
    }
});
document.getElementById('btn-mines-cashout').addEventListener('click', () => {
    updateBalance(minesPot);
    showMessage('mines-msg', `Win! +${formatMoney(minesPot)} €`, 'var(--success)');
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
    if (checkAndTriggerBankrupt()) return;
    const bet = parseInt(document.getElementById('dice-bet').value),
        target = parseInt(dt.value);
    if (bet < 1 || bet > balance) return showMessage('dice-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    const roll = Math.floor(Math.random() * 100) + 1;
    document.getElementById('dice-result').innerText = roll;
    if (roll < target) {
        const win = Math.floor(bet * (100 / target));
        updateBalance(win);
        showMessage('dice-msg', `Win! +${formatMoney(win)} €`, 'var(--success)');
    } else {
        showMessage('dice-msg', `Lose.`, 'var(--danger)');
        checkPostGameBankruptcy();
    }
});

// -----------------------------------------
// 9. WHEEL OF FORTUNE
// -----------------------------------------
const wMults = [0, 1.5, 0.5, 2, 0, 3, 0.2, 5];
document.getElementById('btn-wheel-spin').addEventListener('click', () => {
    if (checkAndTriggerBankrupt()) return;
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
            showMessage('wheel-msg', `${resObj}x! +${formatMoney(win)} €`, 'var(--success)');
        } else {
            showMessage('wheel-msg', 'Lose! 0x', 'var(--danger)');
            checkPostGameBankruptcy();
        }
    }, 2000);
});

// -----------------------------------------
// 10. HIGH-LOW
// -----------------------------------------
let hlPot = 0,
    hlCurrentVal = 0;
const hlCard = document.getElementById('hl-card-current');
document.getElementById('btn-hl-start').addEventListener('click', () => {
    if (checkAndTriggerBankrupt()) return;
    const bet = parseInt(document.getElementById('hl-bet').value);
    if (bet < 1 || bet > balance) return showMessage('hl-msg', 'Error!', 'var(--danger)');
    updateBalance(-bet);
    hlPot = bet;
    document.getElementById('hl-pot').innerText = formatMoney(hlPot);
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
        document.getElementById('hl-pot').innerText = formatMoney(hlPot);
        showMessage('hl-msg', 'Win!', 'var(--success)');
    } else {
        showMessage('hl-msg', 'Lose!', 'var(--danger)');
        document.getElementById('hl-actions').classList.add('hidden');
        setTimeout(() => {
            document.getElementById('hl-setup').classList.remove('hidden');
            hlCard.innerHTML = '?';
        }, 2000);
        checkPostGameBankruptcy();
    }
}
document.getElementById('btn-hl-cashout').addEventListener('click', () => {
    updateBalance(hlPot);
    showMessage('hl-msg', `Win! +${formatMoney(hlPot)} €`, 'var(--success)');
    document.getElementById('hl-actions').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('hl-setup').classList.remove('hidden');
        hlCard.innerHTML = '?';
    }, 2000);
});

// Beim Start
applyLanguage(currentLang);