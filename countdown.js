document.addEventListener('DOMContentLoaded', function () {
    // Здесь вы можете установить дату нового года
    const newYearDate = new Date('January 1, 2024 00:00:00 GMT+00:00').getTime();

    function updateCountdown() {
        const currentDate = new Date().getTime();
        const timeDifference = newYearDate - currentDate;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Обновление отображения
        document.querySelector('.number.day').textContent = days;
        document.querySelector('.number.hour').textContent = hours;
        document.querySelector('.number.min').textContent = minutes;
        document.querySelector('.number.sec').textContent = seconds;

        // Склонение
        document.querySelector('.caption.day').textContent = getDeclension(days, ['День', 'Дня', 'Дней']);
        document.querySelector('.caption.hour').textContent = getDeclension(hours, ['Час', 'Часа', 'Часов']);
        document.querySelector('.caption.min').textContent = getDeclension(minutes, ['Минута', 'Минуты', 'Минут']);
        document.querySelector('.caption.sec').textContent = getDeclension(seconds, ['Секунда', 'Секунды', 'Секунд']);
    }

    function getDeclension(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    // Обновление каждую секунду
    setInterval(updateCountdown, 1000);

    // Инициализация при загрузке страницы
    updateCountdown();
});
