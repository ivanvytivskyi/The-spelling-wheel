window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SDCZLM9ZGR');



  // Send GA4 "user_engagement" event every 15 seconds
  setInterval(() => {
    gtag('event', 'user_engagement', {
      engagement_time_msec: 15000  // GA expects milliseconds
    });
  }, 15000); // 15s



  if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      // Listen for updates
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        newWorker.onstatechange = () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            // 🚨 A new version is ready!
            showUpdateBanner(newWorker);
          }
        };
      };
    });
}

function showUpdateBanner(worker) {
  const banner = document.createElement("div");
  banner.innerHTML = `
    ✨ A new version is available.
    <button id="updateBtn" style="
      margin-left:10px;
      background:#28a745;
      color:#fff;
      border:none;
      padding:6px 12px;
      border-radius:6px;
      cursor:pointer;
    ">Update</button>
  `;
  banner.style.cssText = `
    position:fixed;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
    background:#333;
    color:#fff;
    padding:10px 20px;
    border-radius:8px;
    z-index:9999;
    font-size:14px;
  `;

  document.body.appendChild(banner);

  document.getElementById("updateBtn").addEventListener("click", () => {
    worker.postMessage("skipWaiting"); // tell SW to activate new one
    window.location.reload();          // reload app with new files
  });
}




let currentLang = "en";

 const translations = {
    en: {
      spin: "🎯 SPIN!",
      languageLabel: "🌍 Language:",
      noRepeatOn: "No Repeat: ON",
      noRepeatOff: "No Repeat: OFF",
      addCategory: "➕ Category",
      deleteCategory: "✖ Category",
      speed: "⏩ Speed:",
      reset: "🔄 RESET",
      showDefinition: "📖 Show Definition",
      hideDefinition: "🙈 Hide Definition",
      addDefinition: "✍️ Add Definition",
      editDefinition: "✏️ Edit Definition",
      category: "📂 Category",
      manageWords: "📂 Manage Words",
      words: "Words",
      categories: "Categories",
      customDefPrompt: `Enter your own definition for "{word}" (💡 Tip: For better results, check Cambridge Dictionary). Leave empty to delete your custom definition:`,
      defRemoved: (word) => `🗑️ Custom definition for "${word}" removed.`,
      savedDefinition: "✅ Saved your definition for",
     noWords: "No words to spin! Add some words first.",
     allUsed: "All words used! Resetting for new round.",
     appReset: "App reset to default settings!",
     resetConfirm: "Reset all categories and words to default?",
     
spinFirst: "Spin the wheel first!",
loadingDef: "Loading definition...",
definitionNotFound: "Definition not found.",
offlineDef: "No definition available (offline).",
maxCategories: "Maximum of {max} categories reached. Delete one before adding a new category.",
emptyCategoryName: "Category name cannot be empty!",
categoryExists: "Category \"{name}\" already exists!",
categoryAdded: "✅ Category \"{name}\" added successfully!",
categoryDeleted: "Category deleted successfully!",
cannotDeleteLastCategory: "Cannot delete the last category!",
wordEmpty: "Word cannot be empty!",
maxWords: "Maximum of {max} words reached in this category. Delete some words before adding more.",
addedWords: "✅ Added: {words}",
skippedWords: "⚠️ Skipped (already exist): {words}",
wordDeleted: "Word \"{word}\" deleted!",
invalidTime: "Please enter a valid time.",

deleteCategoryConfirm: "Delete category \"{category}\" and all its words?",
noWordsInCategory: "No words in this category!",
addWordsPrompt: "Add some words to get started.",
definitionFetchError: "⚠️ Could not fetch definition (offline?).",
placeholder: "Spin the wheel to see the word here!",
    add: "✅ Add",
    cancel: "❌ Cancel",
    title: "🎯The Spelling Wheel✨",
    intro: "Spin the wheel, listen to the word, write it down, and check if you spelled it correctly.",
aboutTitle: "✨ About Ivan Vytivskyi",
timeUp: "⏰ Time is up!",
    },

    uk: {
      spin: "🎯 КРУТИТИ!",
      languageLabel: "🌍 Lang/Мова:",
      noRepeatOn: "Без повторів: УВІМК",
      noRepeatOff: "Без повторів: ВИМК",
      addCategory: "➕Категорію",
      deleteCategory: "✖ Категорію",
      speed: "⏩ Швидкість:",
      reset: "🔄 Скинути",
      showDefinition: "📖 Показати Визначення",
      hideDefinition: "🙈 Приховати визначення",
      addDefinition: "✍️ Додати визначення",
      editDefinition: "✏️ Редагувати визначення",
      category: "📂 Категорія",
      manageWords: "📂 Керувати словами",
      words: "Слова",
      categories: "Категорії",
      customDefPrompt: `Введіть власне визначення для "{word}" (💡 Порада: для кращих результатів перевірте Cambridge Dictionary). Залиште порожнім, щоб видалити власне визначення:`,
      defRemoved: (word) => `🗑️ Власне визначення для "${word}" видалено.`,
      savedDefinition: "✅ Збережено ваше визначення для",
     noWords: "Немає слів для обертання! Спочатку додайте слова.",
     allUsed: "Усі слова використано! Починаємо новий раунд.",
     appReset: "Додаток скинуто до налаштувань за замовчуванням!",
resetConfirm: "Скинути всі категорії та слова до стандартних?",



spinFirst: "Спочатку обертайте колесо!",
loadingDef: "Завантаження визначення...",
definitionNotFound: "Визначення не знайдено.",
offlineDef: "Немає визначення (офлайн).",
maxCategories: "Досягнуто максимум {max} категорій. Видаліть одну, щоб додати нову.",
emptyCategoryName: "Назва категорії не може бути порожньою!",
categoryExists: "Категорія \"{name}\" вже існує!",
categoryAdded: "✅ Категорію \"{name}\" успішно додано!",
categoryDeleted: "Категорію успішно видалено!",
cannotDeleteLastCategory: "Неможливо видалити останню категорію!",
wordEmpty: "Слово не може бути порожнім!",
maxWords: "Досягнуто максимум {max} слів у цій категорії. Видаліть деякі, щоб додати нові.",
addedWords: "✅ Додано: {words}",
skippedWords: "⚠️ Пропущено (вже існують): {words}",
wordDeleted: "Слово \"{word}\" видалено!",
invalidTime: "Будь ласка, введіть правильний час.",
timeUp: "⏰ Час вийшов!",

deleteCategoryConfirm: "Видалити категорію \"{category}\" та всі її слова?",
noWordsInCategory: "У цій категорії немає слів!",
addWordsPrompt: "Додайте кілька слів, щоб почати.",
definitionFetchError: "⚠️ Не вдалося отримати визначення (офлайн?).",
placeholder: "Крутіть колесо, щоб побачити слово тут!",
add: "✅ Додати",
    cancel: "❌ Скасувати",
title: "🎯Колесо для правопису✨",
intro: "Крути колесо, слухай слово, запиши його і перевір, чи правильно ти його написав.",
     aboutTitle: "✨ Про Івана Витівського",
aboutText: `
      Мене звати Іван Витівський, я з маленького села Гаївщина в Україні.
      Я створив цей застосунок «Колесо для правопису Івана», коли почав вивчати англійську з нуля.<br><br>

      Правопис завжди був для мене найважчою частиною у вивченні англійської.
      Я пробував багато методів: переписував ті самі слова у зошиті знову і знову,
      наймав учителів (але заняття були занадто дорогими), навіть зробив коробку карток — з помилковим словом на одному боці та правильним на іншому.
      Але я помітив велику проблему — спершу я запам’ятовував неправильний варіант, бо бачив його раніше за правильний.<br><br>

      Мені потрібне було краще рішення: таке, щоб слово можна було почути вголос, записати його, а потім перевірити правильний правопис.<br><br>

      Саме тому я створив цей застосунок — «Колесо для правопису Івана».
      Він простий і легкий у використанні: ви обертаєте колесо, слухаєте слово, записуєте його і перевіряєте правильність написання.<br><br>

      Сподіваюся, цей інструмент допоможе й іншим учням англійської, так само як і мені.
    `
    },

    hi: {
      title: "🎯स्पेलिंग व्हील✨",
      intro: "पहिया घुमाओ, शब्द सुनो, उसे लिखो और जांचो कि आपने उसे सही लिखा है या नहीं।",
      languageLabel: "🌍 Lang/भाषा:",
      spin: "🎯 घुमाएँ!",
      noRepeatOn: "दोहराव नहीं: चालू",
    noRepeatOff: "दोहराव नहीं: बंद",
      addCategory: "➕ श्रेणी जोड़ें",
      deleteCategory: "✖ श्रेणी हटाएँ",
      speed: "⏩ गति:",
      reset: "🔄 रीसेट",
      showDefinition: "📖 परिभाषा दिखाएँ",
      hideDefinition: "🙈 परिभाषा छुपाएँ",
      addDefinition: "✍️ परिभाषा जोड़ें",
      editDefinition: "✏️ परिभाषा संपादित करें",
      category: "📂 श्रेणी",
      manageWords: "📂 शब्द प्रबंधन",
      words: "शब्द",
      categories: "श्रेणियाँ",
      customDefPrompt: `"{word}" के लिए अपनी परिभाषा दर्ज करें (💡 सुझाव: बेहतर परिणामों के लिए Cambridge Dictionary देखें)। अपनी परिभाषा हटाने के लिए खाली छोड़ दें:`,
      defRemoved: (word) => `🗑️ "${word}" की कस्टम परिभाषा हटा दी गई है।`,
      savedDefinition: "✅ आपकी परिभाषा सहेजी गई है:",
     noWords: "कोई शब्द नहीं हैं! पहले कुछ शब्द जोड़ें।",
     allUsed: "सभी शब्दों का उपयोग हो गया! नया दौर शुरू हो रहा है।",
     appReset: "ऐप को डिफ़ॉल्ट सेटिंग्स पर रीसेट कर दिया गया है!",
resetConfirm: "सभी श्रेणियों और शब्दों को डिफ़ॉल्ट पर रीसेट करें?",



spinFirst: "पहले पहिया घुमाएँ!",
loadingDef: "परिभाषा लोड हो रही है...",
definitionNotFound: "परिभाषा नहीं मिली।",
offlineDef: "परिभाषा उपलब्ध नहीं है (ऑफ़लाइन)।",
maxCategories: "अधिकतम {max} श्रेणियाँ पूरी हो गई हैं। नई जोड़ने से पहले एक हटाएँ।",
emptyCategoryName: "श्रेणी का नाम खाली नहीं हो सकता!",
categoryExists: "श्रेणी \"{name}\" पहले से मौजूद है!",
categoryAdded: "✅ श्रेणी \"{name}\" सफलतापूर्वक जोड़ी गई!",
categoryDeleted: "श्रेणी सफलतापूर्वक हटाई गई!",
cannotDeleteLastCategory: "अंतिम श्रेणी को हटाया नहीं जा सकता!",
wordEmpty: "शब्द खाली नहीं हो सकता!",
maxWords: "इस श्रेणी में अधिकतम {max} शब्द पूरे हो गए हैं। नए जोड़ने से पहले कुछ हटाएँ।",
addedWords: "✅ जोड़े गए: {words}",
skippedWords: "⚠️ छोड़े गए (पहले से मौजूद): {words}",
wordDeleted: "शब्द \"{word}\" हटाया गया!",
invalidTime: "कृपया मान्य समय दर्ज करें।",
timeUp: "⏰ समय समाप्त!",

deleteCategoryConfirm: "श्रेणी \"{category}\" और उसके सभी शब्द हटाएँ?",
noWordsInCategory: "इस श्रेणी में कोई शब्द नहीं हैं!",
addWordsPrompt: "शुरू करने के लिए कुछ शब्द जोड़ें।",
definitionFetchError: "⚠️ परिभाषा प्राप्त नहीं हो सकी (ऑफ़लाइन?).",
placeholder: "शब्द देखने के लिए पहिया घुमाएँ!",
add: "✅ जोड़ें",
    cancel: "❌ रद्द करें",
 aboutTitle: "✨ इवान वितिव्स्की के बारे में",     
aboutText: `
      मेरा नाम इवान वितिव्स्की है, मैं यूक्रेन के एक छोटे से गाँव हाइवश्चिना से हूँ।
      मैंने यह ऐप, "इवान का स्पेलिंग व्हील", तब बनाया जब मैं शून्य से अंग्रेज़ी सीख रहा था।<br><br>

      मेरे लिए अंग्रेज़ी सीखने का सबसे कठिन हिस्सा हमेशा वर्तनी रहा है।
      मैंने कई तरीकों को आज़माया: बार-बार वही शब्द कॉपी करना,
      शिक्षकों को रखना (लेकिन कक्षाएँ बहुत महंगी थीं), यहाँ तक कि मैंने फ्लैशकार्ड का एक डिब्बा भी बनाया — जिसमें गलत वर्तनी एक तरफ और सही दूसरी तरफ थी।
      लेकिन मैंने एक बड़ी समस्या देखी — मैं पहले गलत वर्तनी याद कर रहा था, क्योंकि मैंने उसे सही वाले से पहले देखा।<br><br>

      मुझे एक बेहतर समाधान चाहिए था: ऐसा जिसमें शब्द ज़ोर से बोला जाए, मैं उसे लिख सकूँ, और फिर सही वर्तनी देख सकूँ।<br><br>

      यही कारण है कि मैंने यह ऐप बनाया — "इवान का स्पेलिंग व्हील"।
      यह सरल और उपयोग में आसान है: आप पहिया घुमाते हैं, आवाज़ सुनते हैं, शब्द लिखते हैं और फिर जाँचते हैं कि आपने सही लिखा या नहीं।<br><br>

      मुझे उम्मीद है कि यह साधन अन्य अंग्रेज़ी सीखने वालों की भी मदद करेगा, जैसे यह मेरी कर रहा है।
    `
  }
  };

function customPrompt(message, defaultValue = "") {
  return new Promise((resolve) => {
    const modal = document.getElementById("promptModal");
    const input = document.getElementById("promptInput");
    const title = document.getElementById("promptTitle");

    title.innerText = message;
    input.value = defaultValue;
    modal.style.display = "flex";

    function cleanup() {
      modal.style.display = "none";
      okBtn.removeEventListener("click", okHandler);
      cancelBtn.removeEventListener("click", cancelHandler);
    }

    function okHandler() {
      cleanup();
      resolve(input.value.trim());
    }

    function cancelHandler() {
      cleanup();
      resolve(null);
    }

    const okBtn = document.getElementById("promptOk");
    const cancelBtn = document.getElementById("promptCancel");
    okBtn.addEventListener("click", okHandler);
    cancelBtn.addEventListener("click", cancelHandler);
  });
}

    const MAX_CATEGORIES = 50;
    const MAX_WORDS_PER_CATEGORY = 50;

    const colorMap = {
      "Red": "#FF0000", "Blue": "#0000FF", "Green": "#008000", "Yellow": "#FFFF00", "Purple": "#800080",
      "Pink": "#FFC0CB", "Orange": "#FFA500", "Brown": "#A52A2A", "Black": "#000000", "White": "#FFFFFF",
      "Grey": "#808080", "Gold": "#FFD700", "Silver": "#C0C0C0", "Beige": "#F5F5DC", "Turquoise": "#40E0D0",
      "Teal": "#008080", "Navy": "#000080", "Lavender": "#E6E6FA", "Magenta": "#FF00FF", "Maroon": "#800000",
      "Olive": "#808000", "Peach": "#FFE5B4", "Coral": "#FF7F50", "Ivory": "#FFFFF0", "Charcoal": "#36454F",
      "Mustard": "#FFDB58", "Plum": "#DDA0DD", "Rust": "#B7410E", "Salmon": "#FA8072", "Amber": "#FFBF00",
      "Aqua": "#00FFFF", "Mint": "#98FF98", "Lilac": "#C8A2C8", "Indigo": "#4B0082", "Tan": "#D2B48C",
      "Khaki": "#F0E68C", "Burgundy": "#800020", "Fuchsia": "#FF00FF", "Cyan": "#00FFFF", "Emerald": "#50C878"
    };

    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;

    let arrowAngle = 0;
    let spinning = false;

    const colorPalette = [
      "#FF5733", "#FF8D1A", "#FFC300", "#DAF7A6", "#75FF33",
      "#33FF57", "#33FFBD", "#33FFF6", "#33C3FF", "#3375FF",
      "#5733FF", "#8D33FF", "#C300FF", "#FF33C3", "#FF3375",
      "#FF3357", "#FF6F33", "#FF9E33", "#FFD433", "#D3FF33",
      "#9EFF33", "#6FFF33", "#33FF6F", "#33FF9E", "#33FFD4",
      "#33D4FF", "#339EFF", "#336FFF", "#6F33FF", "#9E33FF"
    ];

    const defaultCategories = {
      
      "Core Words": ["Achieve","Receive","Perceive","Believe","Relieve","Retrieve","Deceive","Necessary","Success","Access","Process","Recess","Opportunity","Community","Unity","Immunity","Knowledge","College","Pledge","Experience","Science","Influence","Significant","Magnificent","Participant","Applicant","Communicate","Educate","Participate","Intermediate","Immediate","Media","Median","Compare","Require","Different","Overall","Over","All","Daily","Nowadays","Months","English","Help","Enough","Great"],
      
      "Fruits & Vegetables" : ["Apple","Pear","Plum","Strawberry","Raspberry","Blackberry","Gooseberry","Redcurrant","Blackcurrant","Rhubarb","Cherry","Blueberry","Cabbage","Carrot","Potato","Parsnip","Turnip","Swede","Leek","Onion","Garlic","Beetroot","Cauliflower","Broccoli","Brussels Sprouts","Peas","Runner Beans","Broad Beans","Courgette","Cucumber","Tomato"],
      "Animals": ["Cat","Dog","Lion","Tiger","Elephant","Zebra","Giraffe","Monkey","Panda","Kangaroo","Hippo","Rhino","Leopard","Cheetah","Wolf","Fox","Deer","Rabbit","Squirrel","Hedgehog","Otter","Seal","Whale","Dolphin","Shark","Octopus","Penguin","Polar Bear","Camel","Donkey","Horse","Goat","Sheep","Cow","Pig","Chicken","Turkey","Duck","Goose","Peacock"],
      "Colors": ["Red","Blue","Green","Yellow","Purple","Pink","Orange","Brown","Black","White","Grey","Gold","Silver","Beige","Turquoise","Teal","Navy","Lavender","Magenta","Maroon","Olive","Peach","Coral","Ivory","Charcoal","Mustard","Plum","Rust","Salmon","Amber","Aqua","Mint","Lilac","Indigo","Tan","Khaki","Burgundy","Fuchsia","Cyan","Emerald"],
      "Travel": ["Airport","Passport","Luggage","Hotel","Ticket","Tourist","Map","Journey","Cruise","Reservation","Flight","Bus","Taxi","Subway","Destination","Adventure","Guide","Backpack","Souvenir","Ferry","Hostel","Schedule","Tour","Excursion","Visa","Arrival","Departure","Check-in","Platform","Boarding","Landmark","Traveling","Baggage","Booking","Caravan","Camper","Camping","Sightseeing","Attraction","Currency"],
      "School": ["Teacher","Student","Classroom","Homework","Exam","Lesson","Library","Backpack","Notebook","Subject","Science","Math","History","Geography","Literature","Art","Music","Sports","Computer","Desk","Chair","Schedule","Report","Break","Recess","Uniform","Principal","Chalkboard","Whiteboard","Marker","Pen","Pencil","Eraser","Calculator","Dictionary","Ruler","Glue","Scissors","Paper","Project","Presentation"],
      "Food": ["Breakfast","Lunch","Dinner","Snack","Dessert","Soup","Salad","Bread","Rice","Pasta","Pizza","Burger","Sandwich","Cheese","Meat","Chicken","Beef","Fish","Eggs","Milk","Juice","Water","Coffee","Tea","Fruit","Vegetable","Apple","Banana","Carrot","Potato","Tomato","Onion","Garlic","Pepper","Cucumber","Strawberry","Orange","Grapes","Chocolate","Ice cream"],
      "Health": ["Doctor","Nurse","Hospital","Clinic","Appointment","Medicine","Pill","Tablet","Injection","Operation","Surgery","Therapy","Treatment","Emergency","Ambulance","Bandage","Fever","Cough","Cold","Flu","Headache","Stomachache","Toothache","Backache","Allergy","Symptom","Diagnosis","Prescription","Pharmacy","Exercise","Diet","Nutrition","Vaccine","Health","Wellness","Dentist","Surgeon","Patient","Recovery","Stress"]
    };

    let categories = JSON.parse(localStorage.getItem('categories')) || JSON.parse(JSON.stringify(defaultCategories));
    let currentCategory = Object.keys(categories)[0];
    let usedWords = [];
    let nonRepeating = true;
    let selectedWord = '';
    let definitionVisible = false;

    let allVoices = [];
let voiceMap = { ukFemale: null, ukMale: null, usFemale: null, usMale: null };


    function showMessage(text, type = 'success') {
      const messageArea = document.getElementById('messageArea');
      messageArea.innerHTML = `<div class="message ${type}">${text}</div>`;
      setTimeout(() => { messageArea.innerHTML = ''; }, 4000);
    }

    function saveCategories() { localStorage.setItem('categories', JSON.stringify(categories)); }

    function drawWheel() {
      const words = categories[currentCategory];
      if (!words || words.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#333';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(translations[currentLang].noWordsInCategory, centerX, centerY);
        ctx.fillText(translations[currentLang].addWordsPrompt, centerX, centerY + 30);
        return;
      }

      const sliceAngle = (2 * Math.PI) / words.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-Math.PI / 2);

      for (let i = 0; i < words.length; i++) {
        const start = i * sliceAngle;
        const end = start + sliceAngle;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, start, end);
        ctx.closePath();
        ctx.fillStyle = usedWords.includes(words[i]) && nonRepeating ? '#ccc' : colorPalette[i % colorPalette.length];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();

        ctx.save();
        ctx.rotate(start + sliceAngle / 2);
        ctx.fillStyle = '#333';
        ctx.textAlign = 'right';
        ctx.font = '16px Arial';
        ctx.fillText(words[i], radius - 5, 5);
        ctx.restore();
      }
      ctx.restore();
      drawArrow();
      updateWordCountLabel();
    }

    function drawArrow() {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(arrowAngle);
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-10, -30);
      ctx.lineTo(10, -30);
      ctx.lineTo(0, -70);
      ctx.closePath();
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.restore();
    }

    // NEW: helper to hyphenate letters while preserving spaces
    function hyphenateLetters(input) {
      return input
        .split(/(\s+)/)                 // keep spaces as tokens
        .map(t => t.trim() === '' ? t    // leave spaces untouched
                                  : t.split('').join('-'))
        .join('');
    }

    function spinArrow() {
      if (spinning) return;
      const words = categories[currentCategory];
      if (!words || words.length === 0) { 
  const currentLang = document.getElementById("languageSwitcher").value;
  showMessage(translations[currentLang].noWords, 'error'); 
  return; 
}
      if (nonRepeating && usedWords.length === words.length) { 
  usedWords = []; 
  const currentLang = document.getElementById("languageSwitcher").value;
  showMessage(translations[currentLang].allUsed, 'success'); 
}
      spinning = true;
      const sliceAngle = (2 * Math.PI) / words.length;
      let targetIndex;
      do { targetIndex = Math.floor(Math.random() * words.length); } while (nonRepeating && usedWords.includes(words[targetIndex]));
      const spins = Math.floor(Math.random() * 5) + 5;
      const targetAngle = spins * 2 * Math.PI + (targetIndex * sliceAngle) + sliceAngle / 2;
      const startAngle = arrowAngle;
      const speedValue = document.getElementById('speedSlider').value;
      const duration = 6500 - (speedValue * 600);
      let startTime = null;

      function animate(time) {
        if (!startTime) startTime = time;
        const progress = (time - startTime) / duration;
        if (progress < 1) {
          arrowAngle = startAngle + (targetAngle - startAngle) * easeOut(progress);
          drawWheel();
          requestAnimationFrame(animate);
        } else {
          arrowAngle = targetAngle % (2 * Math.PI);
          selectedWord = words[targetIndex];
          if (nonRepeating) usedWords.push(selectedWord);
          speakWord(selectedWord);
          spinning = false;
          drawWheel();

          
          const display = document.getElementById('answerDisplay');
          const hyph = hyphenateLetters(selectedWord);

          resetDefinitionUI();
          definitionVisible = false;


          if (currentCategory === 'Colors') {
            display.innerHTML = `
              <span class="letters" aria-label="${selectedWord}">${hyph}</span>
              <div style="margin-top:10px;width:60px;height:30px;border-radius:5px; background-color:${colorMap[selectedWord] || '#FFFFFF'}; border:1px solid #333; display:inline-block;"></div>
            `;

// ✅ Update Add/Edit Definition button
  const addBtn = document.getElementById("addDefBtn");
  if (addBtn) {
    const customDef = localStorage.getItem(
      "customDef_" + (selectedWord || "").toLowerCase()
    );
    const currentLang = document.getElementById("languageSwitcher").value;
    addBtn.textContent = customDef
      ? translations[currentLang].editDefinition
      : translations[currentLang].addDefinition;
  }

     } else {
            display.innerHTML = `<span class="letters" aria-label="${selectedWord}">${hyph}</span>`;

// ✅ Update Add/Edit Definition button
  const addBtn = document.getElementById("addDefBtn");
  if (addBtn) {
    const customDef = localStorage.getItem(
      "customDef_" + (selectedWord || "").toLowerCase()
    );
    const currentLang = document.getElementById("languageSwitcher").value;
    addBtn.textContent = customDef
      ? translations[currentLang].editDefinition
      : translations[currentLang].addDefinition;
          }
      }
    }
  }
      requestAnimationFrame(animate);
    }

    function easeOut(t) { return (--t) * t * t + 1; }

    function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  const sel = document.getElementById("voiceSelect").value;

  if (voiceMap[sel]) {
    utterance.voice = voiceMap[sel];
  } else {
    // fallback if no exact match
    utterance.lang = sel.includes("uk") ? "en-GB" : "en-US";
  }

  utterance.volume = 1.0;
  utterance.rate = 0.8;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}

    function toggleNonRepeating() {
      nonRepeating = !nonRepeating;
      document.getElementById('nonRepeatStatus').innerText = nonRepeating ? translations[currentLang].noRepeatOn 
      : translations[currentLang].noRepeatOff;
  drawWheel();
}

    function showAddCategoryForm() {
      const form = document.getElementById('addCategoryForm');
      const btn = document.getElementById('addCategoryBtn');
      const input = document.getElementById('newCategoryInput');
      form.style.display = 'block';
      btn.style.display = 'none';
      setTimeout(() => { input.focus(); input.click(); input.select(); }, 10);
      setTimeout(() => { input.focus(); }, 100);
    }

    function cancelAddCategory() {
      document.getElementById('addCategoryForm').style.display = 'none';
      document.getElementById('addCategoryBtn').style.display = 'inline-block';
      document.getElementById('newCategoryInput').value = '';
    }

    function confirmAddCategory() {
      const currentCategoryCount = Object.keys(categories).length;
      if (currentCategoryCount >= MAX_CATEGORIES) { const currentLang = document.getElementById("languageSwitcher").value;
        showMessage(translations[currentLang].maxCategories.replace("{max}", MAX_CATEGORIES), 'error');
        return; }
      const name = document.getElementById('newCategoryInput').value;
      if (!name || !name.trim()) { const currentLang = document.getElementById("languageSwitcher").value;
        showMessage(translations[currentLang].emptyCategoryName, 'error');
        return; }
      const trimmedName = name.trim();
      const existing = Object.keys(categories).map(c => c.toLowerCase());
      if (existing.includes(trimmedName.toLowerCase())) { const currentLang = document.getElementById("languageSwitcher").value;
        showMessage(translations[currentLang].categoryExists.replace("{name}", trimmedName), 'error');
        return; }
      categories[trimmedName] = [];
      currentCategory = trimmedName;
      saveCategories();
      updateCategoryDropdown();
      drawWheel();
      updateWordList();
      cancelAddCategory();
      const currentLang = document.getElementById("languageSwitcher").value;
      showMessage(translations[currentLang].categoryAdded.replace("{name}", trimmedName), 'success');
    }

    function createCategory() { showAddCategoryForm(); }

    function deleteCategory() {
      if (Object.keys(categories).length <= 1) { const currentLang = document.getElementById("languageSwitcher").value;
        showMessage(translations[currentLang].cannotDeleteLastCategory, 'error');
        return; 
      }
      const currentLang = document.getElementById("languageSwitcher").value;
      if (confirm(translations[currentLang].deleteCategoryConfirm.replace("{category}", currentCategory))) {

        delete categories[currentCategory];
        const keys = Object.keys(categories);
        currentCategory = keys.length ? keys[0] : '';
        saveCategories();
        updateCategoryDropdown();
        drawWheel();
        updateWordList();
        showMessage('Category deleted successfully!', 'success');
      }
    }

    
    function addWord() {
  // ✅ Add once per function
  const currentLang = document.getElementById("languageSwitcher").value;

  let input = document.getElementById('newWordInput').value.trim();
  if (!input) {
    showMessage(translations[currentLang].wordEmpty, 'error');
    return;
  }

  // Allow multiple words separated by commas
  let words = input.split(',').map(w => w.trim()).filter(Boolean);

  let added = [];
  let skipped = [];

  words.forEach(word => {
    if (categories[currentCategory].length >= MAX_WORDS_PER_CATEGORY) {
      showMessage(
        translations[currentLang].maxWords.replace("{max}", MAX_WORDS_PER_CATEGORY),
        'error'
      );
      return;
    }

    // Normalize casing
    word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    if (!categories[currentCategory].includes(word)) {
      categories[currentCategory].push(word);
      added.push(word);
    } else {
      skipped.push(word);
    }
  });

  saveCategories();
  document.getElementById('newWordInput').value = '';
  drawWheel();
  updateWordList();

  if (added.length > 0) {
    showMessage(
      translations[currentLang].addedWords.replace("{words}", added.join(", ")),
      "success"
    );
  }

  if (skipped.length > 0) {
    showMessage(
      translations[currentLang].skippedWords.replace("{words}", skipped.join(", ")),
      "warning"
    );
  }
}

    function deleteWord(word) {
      categories[currentCategory] = categories[currentCategory].filter(w => w !== word);
      saveCategories();
      drawWheel();
      updateWordList();
      showMessage(`Word "${word}" deleted!`, 'success');
    }

    function resetApp() {
      if (confirm('Reset all categories and words to default?')) {
        localStorage.clear();
        categories = JSON.parse(JSON.stringify(defaultCategories));
        currentCategory = Object.keys(categories)[0];
        usedWords = [];
        updateCategoryDropdown();
        drawWheel();
        updateWordList();
const currentLang = document.getElementById("languageSwitcher").value;
showMessage(translations[currentLang].appReset, 'success');
      }
    }

    function updateCategoryDropdown() {
      const select = document.getElementById('categorySelect');
      select.innerHTML = '';
      for (let cat in categories) {
        const option = document.createElement('option');
        option.value = cat; option.textContent = cat; select.appendChild(option);
      }
      if (currentCategory) select.value = currentCategory;
      select.onchange = () => { currentCategory = select.value; usedWords = []; drawWheel(); updateWordList(); };
      updateWordCountLabel();
      updateCategoryCountLabel();
    }

    function updateWordCountLabel() {
  const countLabel = document.getElementById('wordCountLabel');
  const currentLang = document.getElementById("languageSwitcher").value;
  if (currentCategory && categories[currentCategory]) {
    countLabel.textContent =
      translations[currentLang].words + ": " +
      categories[currentCategory].length + "/" + MAX_WORDS_PER_CATEGORY;
  } else {
    countLabel.textContent =
      translations[currentLang].words + ": 0/" + MAX_WORDS_PER_CATEGORY;
  }
}

    function updateCategoryCountLabel() {
  const countLabel = document.getElementById('categoryCountLabel');
  const currentLang = document.getElementById("languageSwitcher").value;
  countLabel.textContent =
    translations[currentLang].categories + ": " +
    Object.keys(categories).length + "/" + MAX_CATEGORIES;
}

    function updateWordList() {
      const ul = document.getElementById('wordList');
      ul.innerHTML = '';
      if (categories[currentCategory]) {
        categories[currentCategory].forEach(word => {
          const li = document.createElement('li');
          li.textContent = word;
          const btn = document.createElement('button');
btn.textContent = '❌';
btn.className = 'word-delete-btn';   // ✅ apply small style
btn.onclick = () => deleteWord(word);
li.appendChild(btn);
          ul.appendChild(li);
        });
      }
      updateWordCountLabel();
    }

    function loadVoices() {
  allVoices = speechSynthesis.getVoices();

  function pick(names, lang) {
    return allVoices.find(v => names.some(n => v.name.includes(n)))
        || allVoices.find(v => v.lang === lang);
  }

  // Pick voices
  voiceMap.ukFemale = pick(["Hazel", "Shelley"], "en-GB");
  voiceMap.ukMale   = pick(["Daniel", "George"], "en-GB");
  voiceMap.usFemale = pick(["Emma", "Samantha"], "en-US");
  voiceMap.usMale   = pick(["Fred", "Mark"], "en-US");

  }

speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(loadVoices, 200);

    document.addEventListener("keydown", function(e) {
  // Ignore spacebar if typing in an input or select
  const active = document.activeElement;
  if (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT") {
    return; // let the space work normally
  }

  if (e.code === "Space") {
    e.preventDefault(); // stop page from scrolling
    spinArrow();
  }
});
 
document.addEventListener("DOMContentLoaded", () => {
  const spinBtn = document.getElementById("spinButton");
  const wheelCanvas = document.getElementById("wheelCanvas"); // change ID if needed

  if (spinBtn) {
    spinBtn.addEventListener("click", () => {
      spinArrow();
      trackSpinClick?.();
    });
  }

  if (wheelCanvas) {
    wheelCanvas.addEventListener("click", () => {
      spinArrow();
      trackSpinClick?.();
    });
  }
});


    document.getElementById('newWordInput').addEventListener('keypress', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); addWord(); }
    });

    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(() => {
        const categoryInput = document.getElementById('newCategoryInput');
        if (categoryInput) {
          categoryInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') { event.preventDefault(); confirmAddCategory(); }
          });
          categoryInput.addEventListener('click', function () { this.focus(); });
          categoryInput.addEventListener('touchstart', function () { this.focus(); });

         categoryInput.addEventListener('input', () => {
         document.getElementById('confirmAddCategoryBtn').disabled = categoryInput.value.trim() === '';
});

          const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const form = document.getElementById('addCategoryForm');
                if (form && form.style.display === 'block') {
                  setTimeout(() => { categoryInput.focus(); categoryInput.click(); }, 50);
                }
              }
            });
          });
          observer.observe(document.getElementById('addCategoryForm'), { attributes: true, attributeFilter: ['style'] });
        }
      }, 100);
    });

    

    // Modal functionality for About section
    document.addEventListener('DOMContentLoaded', function () {
      const aboutLink = document.getElementById('aboutLink');
      const modalOverlay = document.getElementById('modalOverlay');
      const closeModal = document.getElementById('closeModal');

      if (aboutLink) { aboutLink.onclick = () => { modalOverlay.style.display = 'block'; }; }
      if (closeModal) { closeModal.onclick = () => { modalOverlay.style.display = 'none'; }; }
      window.onclick = (event) => { if (event.target === modalOverlay) { modalOverlay.style.display = 'none'; } };
    });

// Modal functionality for Tips section
document.addEventListener('DOMContentLoaded', function () {
  const tipsBtn = document.getElementById('tipsButton');
  const tipsOverlay = document.getElementById('tipsOverlay');
  const closeTips = document.getElementById('closeTips');

  if (tipsBtn) {
    tipsBtn.onclick = () => { tipsOverlay.style.display = 'block'; };
  }
  if (closeTips) {
    closeTips.onclick = () => { tipsOverlay.style.display = 'none'; };
  }
  window.onclick = (event) => {
    if (event.target === tipsOverlay) {
      tipsOverlay.style.display = 'none';
    }
  };
});

// === ENHANCED DICTIONARY SYSTEM ===

// Fetch definition from online API
async function fetchDefinition(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    const data = await response.json();

    if (Array.isArray(data) && data[0]?.meanings?.length > 0) {
      const meaning = data[0].meanings[0];
      const partOfSpeech = meaning.partOfSpeech || "";
      const definition = meaning.definitions[0].definition || "No definition found.";
      return `${partOfSpeech ? partOfSpeech + ": " : ""}${definition}`;
    } else {
      return "No definition found.";
    }
  } catch (err) {
    return "⚠️ Could not fetch definition (offline?).";
  }
}

// Get definition (custom first → online)
async function getDefinition(word) {
  if (!word) return "Spin the wheel first!";
  let customDef = localStorage.getItem("customDef_" + word.toLowerCase());
  if (customDef) return customDef;
  return await fetchDefinition(word);
}

// Reset definition UI after each spin
function resetDefinitionUI() {
  document.getElementById("definitionBox").innerText = "";
  const linkBox = document.getElementById("cambridgeLink");
if (linkBox) {
  linkBox.style.display = "none";
}
  const defBtn = document.getElementById("showDefBtn");
  if (defBtn) {
    const currentLang = document.getElementById("languageSwitcher").value;
    defBtn.textContent = translations[currentLang].showDefinition;
  }
}
// Attach button events
document.addEventListener("DOMContentLoaded", () => {

 // Initialize language when DOM is ready
  const langSwitcher = document.getElementById("languageSwitcher");
  currentLang = langSwitcher ? langSwitcher.value : "en";

// Initialize the app
    updateCategoryDropdown();
    drawWheel();
    updateWordList();
    document.getElementById("nonRepeatStatus").innerText =
  nonRepeating ? translations[currentLang].noRepeatOn : translations[currentLang].noRepeatOff;
    

  // Draw the wheel with the correct language right away
  drawWheel();

  const defBtn = document.getElementById("showDefBtn");
  const addBtn = document.getElementById("addDefBtn");
  const box = document.getElementById("definitionBox");
  const linkBox = document.getElementById("cambridgeLink");



  if (defBtn) {
    defBtn.addEventListener("click", async () => {
      if (!selectedWord) {
        box.innerText = "Spin the wheel first!";
        linkBox.style.display = "none";
        return;
      }

      if (!definitionVisible) {
        box.innerText = "Loading definition...";
        const def = await getDefinition(selectedWord);
        box.innerText = def;

        if (linkBox) {
          const link = linkBox.querySelector("a");
          link.href = `https://dictionary.cambridge.org/dictionary/english/${selectedWord}`;
          linkBox.style.display = "block";
        }

        const currentLang = document.getElementById("languageSwitcher").value;
        defBtn.textContent = translations[currentLang].hideDefinition;
        definitionVisible = true;
      } else {
        box.innerText = "";

        if (linkBox) {
          linkBox.style.display = "none";
        }
        const currentLang = document.getElementById("languageSwitcher").value;
        defBtn.textContent = translations[currentLang].showDefinition;
        definitionVisible = false;
      }
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", async () => {
      if (!selectedWord) {
        box.innerText = "Spin the wheel first!";
        return;
      }

      let existing = localStorage.getItem("customDef_" + selectedWord.toLowerCase()) || "";
      const currentLang = document.getElementById("languageSwitcher").value;

      // get translated string and replace {word} with actual selectedWord
      const promptText = translations[currentLang].customDefPrompt.replace("{word}", selectedWord);

      const newDef = await customPrompt(promptText, existing);

      if (newDef && newDef.trim() !== "") {
        localStorage.setItem("customDef_" + selectedWord.toLowerCase(), newDef.trim());
        box.innerText = newDef.trim();
        showMessage(`${translations[currentLang].savedDefinition} "${selectedWord}"`, "success");
        addBtn.textContent = translations[currentLang].editDefinition;
      } else {
        localStorage.removeItem("customDef_" + selectedWord.toLowerCase());
        box.innerText = "";
        showMessage(translations[currentLang].defRemoved(selectedWord), "warning");
      }
    });
  }
});

// --- Popup helpers (global) ---
function showTimeUpPopup() {
  const popup = document.getElementById("timeUpPopup");
  const currentLang = document.getElementById("languageSwitcher").value;
  document.getElementById("timeUpMessage").innerText =
    translations[currentLang].timeUp || "⏰ Time is up!";
  popup.style.display = "flex";
}

function closeTimeUpPopup() {
  const popup = document.getElementById("timeUpPopup");
  popup.style.display = "none";
}

  // Study timer
let timerInterval;
let endTime = null;
let timerSoundPlayed = false;

function startTimer() {
  const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
  const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

  if (minutes <= 0 && seconds <= 0) {
    const currentLang = document.getElementById("languageSwitcher").value;
    showMessage(translations[currentLang].invalidTime, 'error');
    return;
  }

  // Set end time
endTime = Date.now() + (minutes * 60 + seconds) * 1000;
timerSoundPlayed = false;

if (timerInterval) clearInterval(timerInterval);
updateTimerDisplay();

timerInterval = setInterval(() => {
  updateTimerDisplay();
}, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  endTime = null;
  timerSoundPlayed = false;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  let remainingSeconds = 0;

  if (endTime) {
    remainingSeconds = Math.round((endTime - Date.now()) / 1000);

    if (remainingSeconds <= 1 && !timerSoundPlayed) {
      // 🔔 Play sound 2 seconds before the popup
      const sound = document.getElementById('timerSound');
      sound.currentTime = 0;
      sound.play().catch(() => {
        console.log("Browser blocked the sound, will still show popup.");
      });
      timerSoundPlayed = true;
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      endTime = null;
      remainingSeconds = 0;

      // 🟢 Show popup only when time is really up
      showTimeUpPopup();
    }
  }

  const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const seconds = (remainingSeconds % 60).toString().padStart(2, '0');

  const minutesInput = document.getElementById('minutesInput');
  const secondsInput = document.getElementById('secondsInput');

  minutesInput.value = minutes;
  secondsInput.value = seconds;
}


    
// (Old dictionary removed here)
    
    
// Detect if device is mobile
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// Remove UK Female voice option on mobile devices
document.addEventListener("DOMContentLoaded", () => {
  if (isMobileDevice()) {
    const voiceSelect = document.getElementById("voiceSelect");
    const option = voiceSelect.querySelector('option[value="ukFemale"]');
    if (option) {
      option.remove();

      // ✅ Also set default to US Female if UK Female was removed
      voiceSelect.value = "usFemale";
    }
  }
});


  function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("speedLabel").textContent = translations[lang].speed;
  document.getElementById("spinButton").textContent = translations[lang].spin;
  document.getElementById('nonRepeatStatus').innerText = nonRepeating ? translations[lang].noRepeatOn: translations[lang].noRepeatOff;
document.getElementById("introText").textContent = translations[currentLang].intro;  
  document.getElementById("addCategoryBtn").textContent = translations[lang].addCategory;
  document.getElementById("deleteCategoryBtn").textContent = translations[lang].deleteCategory;
  document.getElementById("resetButton").textContent = translations[lang].reset;
  document.getElementById("showDefBtn").textContent = translations[lang].showDefinition;
  document.getElementById("addDefBtn").textContent = translations[lang].addDefinition;
  document.querySelector("label[for='categorySelect']").textContent = translations[lang].category;
  document.getElementById("categoryCountLabel").textContent = translations[lang].categories;
  document.getElementById("categoryLabel").textContent = translations[lang].category + ":";
  document.getElementById("manageWordsLabel").textContent = translations[lang].manageWords;
  document.getElementById("wordCountLabel").textContent =
  translations[lang].words + ": " + categories[currentCategory].length + "/" + MAX_WORDS_PER_CATEGORY;
  document.getElementById("categoryCountLabel").textContent = translations[lang].categories + ": " + Object.keys(categories).length + "/50";
  drawWheel();
  document.getElementById("answerDisplay").textContent = translations[lang].placeholder;
  document.getElementById("confirmAddCategoryBtn").textContent = translations[lang].add;
  document.getElementById("cancelAddCategoryBtn").textContent = translations[lang].cancel;
  document.querySelector("h1").textContent = translations[lang].title;
  document.querySelector("label[for='languageSwitcher']").textContent =  translations[lang].languageLabel;
  document.getElementById("aboutTitle").textContent = translations[lang].aboutTitle;
  document.querySelector(".modal-box div div").innerHTML = translations[lang].aboutText;
  
}




  function trackSpinClick() {
    gtag('event', 'spin_button_click', {
      event_category: 'interaction',
      event_label: 'Spin button pressed'
    });
  }

(function () {
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");
  const likeCountEl = document.getElementById("likeCount");
  const dislikeCountEl = document.getElementById("dislikeCount");
  if (!likeBtn || !dislikeBtn) return;

  let userChoice = null;

  function setDisabled() {
    likeBtn.classList.remove("like-selected");
    dislikeBtn.classList.remove("dislike-selected");

    if (userChoice === "like") {
      likeBtn.classList.add("like-selected");
    }
    if (userChoice === "dislike") {
      dislikeBtn.classList.add("dislike-selected");
    }
  }

  function renderCounts({ likes, dislikes, userChoice: choice }) {
    likeCountEl.textContent = likes;
    dislikeCountEl.textContent = dislikes;
    userChoice = choice;
    setDisabled();
  }

  // 1) Load current totals + user's existing choice
  fetch("/.netlify/functions/vote", {
    method: "GET",
    credentials: "include", // ensure cookie is sent
  })
    .then((r) => r.json())
    .then(renderCounts)
    .catch(() => { /* ignore */ });

  // 2) Send a vote
  async function sendVote(choice) {
    const res = await fetch("/.netlify/functions/vote", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice }),
    });
    const data = await res.json();
    renderCounts(data);
  }

  likeBtn.addEventListener("click", () => {
    if (userChoice === "like") return;
    sendVote("like");
  });

  dislikeBtn.addEventListener("click", () => {
    if (userChoice === "dislike") return;
    sendVote("dislike");
  });
})();
