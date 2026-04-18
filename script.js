// Глобальные переменные для доступа из любого места
var tg = window.Telegram.WebApp;
var scores = { tech: 0, bio: 0, creativ: 0, mgmt: 0 };
var currentStep = 0;

var QUESTS = [
    {
        text: "1. Утро понедельника. Как ты начинаешь свой день?",
        options: [
            { text: "📱 Проверка новостей и ленты", cat: "tech" },
            { text: "🧘 Зарядка и завтрак", cat: "bio" },
            { text: "🎨 Наброски и вдохновение", cat: "creativ" },
            { text: "📅 План задач на неделю", cat: "mgmt" }
        ]
    },
    {
        text: "2. В школе предлагают факультатив. Что выберешь?",
        options: [
            { text: "🤖 Программирование роботов", cat: "tech" },
            { text: "🧬 Генетика и опыты", cat: "bio" },
            { text: "🎭 Театральная студия", cat: "creativ" },
            { text: "📈 Школа юного бизнесмена", cat: "mgmt" }
        ]
    },
    {
        text: "3. Твой подход к решению сложного задания?",
        options: [
            { text: "⚙️ Разберу по формулам", cat: "tech" },
            { text: "🌱 Найду пример в природе", cat: "bio" },
            { text: "💡 Придумаю креативный способ", cat: "creativ" },
            { text: "👥 Соберу друзей для мозгового штурма", cat: "mgmt" }
        ]
    },
    {
        text: "4. Какой гаджет тебе важнее всего?",
        options: [
            { text: "🔧 Мощный комп или консоль", cat: "tech" },
            { text: "⌚️ Умный браслет для здоровья", cat: "bio" },
            { text: "🖌 Графический планшет", cat: "creativ" },
            { text: "📱 Смартфон для общения и дел", cat: "mgmt" }
        ]
    },
    {
        text: "5. Вы заблудились с классом в походе. Что сделаешь?",
        options: [
            { text: "🛰 Попробую поймать сигнал и GPS", cat: "tech" },
            { text: "🌲 Разберусь, как найти воду и еду", cat: "bio" },
            { text: "📸 Сфотографирую крутой вид", cat: "creativ" },
            { text: "🗺 Организую всех и поведу за собой", cat: "mgmt" }
        ]
    },
    {
        text: "6. Какую книгу/фильм ты выберешь?",
        options: [
            { text: "📗 Про технологии будущего", cat: "tech" },
            { text: "📘 Про тайны мозга и животных", cat: "bio" },
            { text: "📙 Про историю искусства и дизайна", cat: "creativ" },
            { text: "📕 Про успех великих лидеров", cat: "mgmt" }
        ]
    },
    {
        text: "7. Ссора в компании друзей. Твое поведение?",
        options: [
            { text: "📊 Разберу всё по фактам и логике", cat: "tech" },
            { text: "☕️ Постараюсь всех успокоить", cat: "bio" },
            { text: "🎭 Попробую разрядить обстановку шуткой", cat: "creativ" },
            { text: "🗣 Выступлю судьей и всех помирю", cat: "mgmt" }
        ]
    },
    {
        text: "8. На что ты тратишь свободный вечер?",
        options: [
            { text: "👾 Игры или хобби", cat: "tech" },
            { text: "🏃‍♂️ Спорт или прогулка", cat: "bio" },
            { text: "🎸 Музыка или рисование", cat: "creativ" },
            { text: "🥂 Встреча с друзьями", cat: "mgmt" }
        ]
    },
    {
        text: "9. Тебе дали 100 000 рублей на любую идею. Что купишь?",
        options: [
            { text: "🖥 Детали для сборки ПК", cat: "tech" },
            { text: "🌿 Оборудование для мини-лаборатории", cat: "bio" },
            { text: "🎥 Профессиональную камеру", cat: "creativ" },
            { text: "🚀 Вложу в развитие своего блога/бизнеса", cat: "mgmt" }
        ]
    },
    {
        text: "10. Какая суперсила тебе ближе?",
        options: [
            { text: "🤖 Технопатия (управление техникой)", cat: "tech" },
            { text: "🌿 Управление силами природы", cat: "bio" },
            { text: "🖼 Создание иллюзий и образов", cat: "creativ" },
            { text: "🛡 Влияние на мысли людей", cat: "mgmt" }
        ]
    },
    {
        text: "11. Экологический проект в школе. Что предложишь?",
        options: [
            { text: "♻️ Автомат для переработки пластика", cat: "tech" },
            { text: "🌳 Сад на крыше школы", cat: "bio" },
            { text: "🎨 Выставка картин из мусора", cat: "creativ" },
            { text: "📋 План эко-акций для всего города", cat: "mgmt" }
        ]
    },
    {
        text: "12. Экскурсия в музей. Куда побежишь первым?",
        options: [
            { text: "🕹 Интерактивные изобретения", cat: "tech" },
            { text: "🦴 Скелеты мамонтов и биология", cat: "bio" },
            { text: "🖼 Зал современной живописи", cat: "creativ" },
            { text: "🏛 Зал истории великих открытий", cat: "mgmt" }
        ]
    },
    {
        text: "13. Что ты больше всего ценишь в людях?",
        options: [
            { text: "🧠 Ум и умение во всем разобраться", cat: "tech" },
            { text: "🌾 Доброту и заботу о других", cat: "bio" },
            { text: "✨ Творческий взгляд на мир", cat: "creativ" },
            { text: "✊ Смелость и лидерские качества", cat: "mgmt" }
        ]
    },
    {
        text: "14. Если бы ты строил дом в Minecraft, то какой?",
        options: [
            { text: "🏠 С автоматическими фермами и механизмами", cat: "tech" },
            { text: "🏡 Эко-деревня в лесу", cat: "bio" },
            { text: "🏰 Замок с невероятным дизайном", cat: "creativ" },
            { text: "🏢 Огромный город для всех игроков", cat: "mgmt" }
        ]
    },
    {
        text: "15. Кем ты видишь себя через 10 лет?",
        options: [
            { text: "💻 Создателем крутых приложений", cat: "tech" },
            { text: "🌍 Врачом или ученым, меняющим мир", cat: "bio" },
            { text: "🎭 Известным артистом или дизайнером", cat: "creativ" },
            { text: "💼 Успешным руководителем компании", cat: "mgmt" }
        ]
    },
    {
        text: "16. Представь, что ты открываешь свой YouTube-канал. О чем он будет?",
        options: [
            { text: "📱 Обзоры гаджетов и новинок IT", cat: "tech" },
            { text: "🐾 Жизнь животных и путешествия", cat: "bio" },
            { text: "🎥 Короткометражки и анимация", cat: "creativ" },
            { text: "📈 Как стать успешным и богатым", cat: "mgmt" }
        ]
    },
    {
        text: "17. Какой подарок ты бы хотел получить на день рождения?",
        options: [
            { text: "🛸 Квадрокоптер или 3D-принтер", cat: "tech" },
            { text: "🔭 Мощный телескоп или микроскоп", cat: "bio" },
            { text: "🎹 Синтезатор или электрогитару", cat: "creativ" },
            { text: "🎟 Билет на бизнес-конференцию", cat: "mgmt" }
        ]
    },
    {
        text: "18. В школе затеяли ремонт. Твоя роль?",
        options: [
            { text: "🛠 Настрою освещение и интернет", cat: "tech" },
            { text: "🌿 Займусь озеленением и цветами", cat: "bio" },
            { text: "🖌 Разрисую стены граффити", cat: "creativ" },
            { text: "📋 Буду контролировать бюджет и сроки", cat: "mgmt" }
        ]
    },
    {
        text: "19. Что тебя больше всего радует в конце дня?",
        options: [
            { text: "⚙️ Реализованная сложная задача", cat: "tech" },
            { text: "🕊 Чувство гармонии и спокойствия", cat: "bio" },
            { text: "💡 Новая гениальная идея", cat: "creativ" },
            { text: "🤝 Признание окружающих и команды", cat: "mgmt" }
        ]
    },
    {
        text: "20. Выбери девиз своей будущей карьеры:",
        options: [
            { text: "🚀 Будущее создается технологиями", cat: "tech" },
            { text: "🌳 В гармонии с миром и людьми", cat: "bio" },
            { text: "✨ Творить — значит жить", cat: "creativ" },
            { text: "🌍 Вести за собой к глобальным целям", cat: "mgmt" }
        ]
    }
];

// Инициализация при загрузке
window.onload = function () {
    if (tg.expand) tg.expand();
    loadQuest();
};

function loadQuest() {
    var quest = QUESTS[currentStep];
    var qText = document.getElementById('question-text');
    var optionsCont = document.getElementById('options-container');
    var progressBar = document.getElementById('progress-bar');

    if (!qText || !optionsCont || !progressBar) return;

    qText.innerText = quest.text;
    optionsCont.innerHTML = '';

    progressBar.style.width = ((currentStep / QUESTS.length) * 100) + '%';

    quest.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = function () { handleChoice(opt.cat); };
        optionsCont.appendChild(btn);
    });
}

function handleChoice(cat) {
    scores[cat]++;
    currentStep++;

    if (currentStep < QUESTS.length) {
        loadQuest();
    } else {
        finishGame();
    }
}

function finishGame() {
    var progressBar = document.getElementById('progress-bar');
    var gameCont = document.getElementById('game-container');
    var finishCont = document.getElementById('finish-container');
    var sendBtn = document.getElementById('send-data-btn');

    if (progressBar) progressBar.style.width = '100%';
    if (gameCont) gameCont.style.display = 'none';
    if (finishCont) finishCont.style.display = 'block';

    if (sendBtn) {
        sendBtn.onclick = function () {
            // Самый важный момент для телефона
            try {
                tg.sendData(JSON.stringify(scores));
                tg.close();
            } catch (e) {
                alert("Ошибка отправки данных: " + e.message);
            }
        };
    }
}
