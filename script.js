var tg = window.Telegram.WebApp;
var currentStep = 0;
var scores = { tech: 0, bio: 0, creativ: 0, mgmt: 0 };

var QUESTS = [
    {
        text: "1. Роль в IT-стартапе. Кем ты будешь?",
        options: [
            { text: "А) CFO: Считаю прибыль, налоги и бюджеты", cat: "mgmt" },
            { text: "Б) CTO: Пишу чистый код и архитектуру", cat: "tech" },
            { text: "В) CEO: Горю идеей и веду людей за собой", cat: "mgmt" },
            { text: "Г) CPO: Прорабатываю UX и потребности юзеров", cat: "creativ" }
        ]
    },
    {
        text: "2. Внезапный обвал акций компании. Твои действия?",
        options: [
            { text: "А) Буду искать баги в торговых алгоритмах", cat: "tech" },
            { text: "Б) Успокою команду и инвесторов", cat: "bio" },
            { text: "В) Просчитаю убытки и сокращу расходы", cat: "mgmt" },
            { text: "Г) Запущу хайп на фоне кризиса", cat: "creativ" }
        ]
    },
    {
        text: "3. Групповой проект: создать новое приложение. Твой вклад?",
        options: [
            { text: "А) Сбор команды и защита проекта", cat: "mgmt" },
            { text: "Б) Расчет окупаемости и цены для рынка", cat: "mgmt" },
            { text: "В) Дизайн интерфейса и логотипа", cat: "creativ" },
            { text: "Г) Написание серверной части и логики", cat: "tech" }
        ]
    },
    {
        text: "4. Любимый крупный сервис упал. Твоя первая мысль?",
        options: [
            { text: "А) Посчитаю убытки компании от простоя", cat: "mgmt" },
            { text: "Б) Ошибка где-то в коде БД или серверах", cat: "tech" },
            { text: "В) Наверное, готовят масштабное обновление", cat: "creativ" },
            { text: "Г) Как PR-менеджеры справятся с негативом", cat: "bio" }
        ]
    },
    {
        text: "5. Нужно привлечь миллионные инвестиции. Что покажешь первым?",
        options: [
            { text: "А) Уникальный бренд и концепцию будущего", cat: "creativ" },
            { text: "Б) Сплоченную и опытную команду экспертов", cat: "bio" },
            { text: "В) Финансовый план и сроки окупаемости", cat: "mgmt" },
            { text: "Г) Работающий прототип с чистым кодом", cat: "tech" }
        ]
    },
    {
        text: "6. Кибербезопасность под угрозой. Как спасаешь компанию?",
        options: [
            { text: "А) Оценю риски штрафов и юридических исков", cat: "mgmt" },
            { text: "Б) Ставлю новые файрволы и патчу дыры", cat: "tech" },
            { text: "В) Объясню персоналу правила цифровой гигиены", cat: "bio" },
            { text: "Г) Создам PR-кампанию об усилении защиты", cat: "creativ" }
        ]
    },
    {
        text: "7. Что в карьере для тебя важнее всего?",
        options: [
            { text: "А) Правильно рассчитать налоги и прибыль", cat: "mgmt" },
            { text: "Б) Убедить клиента и закрыть сделку", cat: "mgmt" },
            { text: "В) Придумать образ, который купят все", cat: "creativ" },
            { text: "Г) Создать технологически совершенный софт", cat: "tech" }
        ]
    },
    {
        text: "8. В офисе сломалось важное оборудование. Твоя реакция?",
        options: [
            { text: "А) Найду, где купить замену дешевле и быстрее", cat: "mgmt" },
            { text: "Б) Разберусь в схеме и попробую починить софт", cat: "tech" },
            { text: "В) Поддержу коллег и соберу жалобу руководству", cat: "bio" },
            { text: "Г) Придумаю креативное временное решение", cat: "creativ" }
        ]
    },
    {
        text: "9. Искусственный интеллект для тебя это...",
        options: [
            { text: "А) Способ сократить расходы на персонал", cat: "mgmt" },
            { text: "Б) Набор сложных алгоритмов и весов", cat: "tech" },
            { text: "В) Генератор бесконечного вдохновения", cat: "creativ" },
            { text: "Г) Угроза рабочим местам живых людей", cat: "bio" }
        ]
    },
    {
        text: "10. Кто из этих лидеров тебе ближе по духу?",
        options: [
            { text: "А) Стив Джобс (Визионер и управленец)", cat: "mgmt" },
            { text: "Б) Линус Торвальдс (Создатель Linux)", cat: "tech" },
            { text: "В) Уоррен Баффет (Инвестор и экономист)", cat: "mgmt" },
            { text: "Г) Павел Дуров (IT + Рынок + Лидерство)", cat: "tech" }
        ]
    },
    {
        text: "11. Зомби-апокалипсис: ресурсов не хватает. Твоя стратегия?",
        options: [
            { text: "А) Введу местную валюту и налажу торговлю", cat: "mgmt" },
            { text: "Б) Чинить электронику и системы защиты", cat: "tech" },
            { text: "В) Буду медиком и психологом в лагере", cat: "bio" },
            { text: "Г) Стану лидером и возьму дисциплину на себя", cat: "mgmt" }
        ]
    },
    {
        text: "12. Колония на Марсе: как ее развивать?",
        options: [
            { text: "А) Роботы и автоматизация добычи ресурсов", cat: "tech" },
            { text: "Б) Наладка экспорта и экономики между мирами", cat: "mgmt" },
            { text: "В) Поиск способов восстановления психики людей", cat: "bio" },
            { text: "Г) Управление и законы первого поселения", cat: "mgmt" }
        ]
    },
    {
        text: "13. Что критичнее всего при выпуске IT-продукта?",
        options: [
            { text: "А) Попадание в рынок и прибыльность модели", cat: "mgmt" },
            { text: "Б) Отсутствие багов и высокая скорость работы", cat: "tech" },
            { text: "В) Удобство и эстетичный UX-дизайн", cat: "creativ" },
            { text: "Г) Моральное состояние команды в дедлайн", cat: "bio" }
        ]
    },
    {
        text: "14. Какую одну суперспособность выберешь?",
        options: [
            { text: "А) Считывать рыночные курсы на месяц вперед", cat: "mgmt" },
            { text: "Б) Видеть код любой программы насквозь", cat: "tech" },
            { text: "В) Генерировать 100 идей в минуту", cat: "creativ" },
            { text: "Г) Внушать полное доверие собеседнику", cat: "bio" }
        ]
    },
    {
        text: "15. Твоя главная цель в истории?",
        options: [
            { text: "А) Создание фонда меценатов из прибылей", cat: "mgmt" },
            { text: "Б) Создание мирового стандарта связи/интернета", cat: "tech" },
            { text: "В) Стать лидером новой экономической формации", cat: "mgmt" },
            { text: "Г) Изменение культуры через дизайн и идеи", cat: "creativ" }
        ]
    },
    {
        text: "16. Рекомендательные алгоритмы TikTok для тебя это...",
        options: [
            { text: "А) Мощнейший канал для рекламных бюджетов", cat: "mgmt" },
            { text: "Б) Гениальная математическая система данных", cat: "tech" },
            { text: "В) Способ захвата и удержания внимания масс", cat: "bio" },
            { text: "Г) Инструмент для бесконечного поиска референсов", cat: "creativ" }
        ]
    },
    {
        text: "17. Крупная сумма денег для тебя это...",
        options: [
            { text: "А) Инструмент для капитализации и влияния", cat: "mgmt" },
            { text: "Б) Ресурс для закупки передового серверного парка", cat: "tech" },
            { text: "В) Свобода творить без оглядки на рынок", cat: "creativ" },
            { text: "Г) Средство обеспечения безопасности близких", cat: "bio" }
        ]
    },
    {
        text: "18. Нужно уволить неэффективного сотрудника. Как поступишь?",
        options: [
            { text: "А) Взвешу затраты на него против его вклада", cat: "mgmt" },
            { text: "Б) Проверю его КПД по коммитам и тех-задачам", cat: "tech" },
            { text: "В) Сделаю это частью ребрендинга всей команды", cat: "creativ" },
            { text: "Г) Поговорю лично и помогу с новым местом", cat: "bio" }
        ]
    },
    {
        text: "19. Твое идеальное личное пространство?",
        options: [
            { text: "А) Офис в небоскребе с видом на цифры и рынок", cat: "mgmt" },
            { text: "Б) Мощная станция и три 4К монитора", cat: "tech" },
            { text: "В) Творческая студия с кучей вдохновения", cat: "creativ" },
            { text: "Г) Уютное кафе или парк для живого общения", cat: "bio" }
        ]
    },
    {
        text: "20. Кем ты видишь себя через 10 лет?",
        options: [
            { text: "А) Серийным предпринимателем и инвестором", cat: "mgmt" },
            { text: "Б) Архитектором глобальных IT-систем", cat: "tech" },
            { text: "В) Главным визионером высокотеха", cat: "creativ" },
            { text: "Г) Признанным лидером большого сообщества", cat: "mgmt" }
        ]
    }
];

function startApp() {
    if (tg) {
        if (tg.expand) tg.expand();
        if (tg.ready) tg.ready();
        // Легкая вибрация при запуске
        if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
    }
    loadQuest();
}

function loadQuest() {
    var quest = QUESTS[currentStep];
    var qText = document.getElementById('question-text');
    var optionsCont = document.getElementById('options-container');
    var pBar = document.getElementById('progress-bar');

    if (!qText || !optionsCont) return;

    qText.innerText = quest.text;
    optionsCont.innerHTML = '';

    if (pBar) {
        pBar.style.width = ((currentStep / QUESTS.length) * 100) + '%';
    }

    quest.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = function () {
            // Вибрация на телефоне!
            if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');

            scores[opt.cat]++;
            currentStep++;
            if (currentStep < QUESTS.length) {
                loadQuest();
            } else {
                finishAndSend();
            }
        };
        optionsCont.appendChild(btn);
    });
}

function finishAndSend() {
    var pBar = document.getElementById('progress-bar');
    var qText = document.getElementById('question-text');
    var oCont = document.getElementById('options-container');

    if (pBar) pBar.style.width = '100%';
    if (qText) qText.innerText = "Результаты отправляются...";
    if (oCont) oCont.innerHTML = '<div class="loader"></div>';

    // Мгновенная отправка
    try {
        if (tg && tg.sendData) {
            tg.sendData(JSON.stringify(scores));
            setTimeout(function () { tg.close(); }, 100);
        } else {
            alert("Тест завершен! Результаты: " + JSON.stringify(scores));
        }
    } catch (e) {
        console.error(e);
    }
}

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
