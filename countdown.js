function CountdownTimer(elm, tl, imageSrc) {
  this.initialize(elm, tl, imageSrc);
}

CountdownTimer.prototype = {
  initialize: function(elm, tl, imageSrc) {
    this.elem = document.getElementById(elm);
    this.tl = tl;
    this.imageSrc = imageSrc;
  },

  countDown: function() {
    var timer = '';
    var today = new Date();
    var timeRemaining = this.tl - today;

    if (timeRemaining > 0) {
      var day = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      var hour = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      var min = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 1000)) % 60;
      var sec = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / 1000) % 60;

      // Скрываем блоки с нулевыми значениями
      if (day > 0) {
        timer += `<span class="number-wrapper"><div class="line"></div><span class="number day">${day}</span><div class="caption">${this.getCorrectDeclension(day, 'день')}</div></span>`;
      }
      if (hour > 0 || day > 0) {
        timer += `<span class="number-wrapper"><div class="line"></div><span class="number hour">${hour}</span><div class="caption">${this.getCorrectDeclension(hour, 'час')}</div></span>`;
      }
      if (min > 0 || hour > 0 || day > 0) {
        timer += `<span class="number-wrapper"><div class="line"></div><span class="number min">${this.addZero(min)}</span><div class="caption">${this.getCorrectDeclension(min, 'минута')}</div></span>`;
      }
      if (sec > 0 || min > 0 || hour > 0 || day > 0) {
        timer += `<span class="number-wrapper"><div class="line"></div><span class="number sec">${this.addZero(sec)}</span><div class="caption">${this.getCorrectDeclension(sec, 'секунда')}</div></span>`;
      }

      this.elem.innerHTML = timer;

      setTimeout(() => { this.countDown(); }, 1000);
    } else {
      this.showFullscreenImage();
    }
  },

  addZero: function(num) {
    return ('0' + num).slice(-2);
  },

  getCorrectDeclension: function(num, word) {
    const declensions = {
      "день": ["ДЕНЬ", "ДНЯ", "ДНЕЙ"],
      "час": ["ЧАС", "ЧАСА", "ЧАСОВ"],
      "минута": ["МИНУТА", "МИНУТЫ", "МИНУТ"],
      "секунда": ["СЕКУНДА", "СЕКУНДЫ", "СЕКУНД"]
    };

    let declension;
    if (word === "день") {
      declension = num % 10 === 1 && num % 100 !== 11 ? declensions["день"][0] : (num % 10 >= 2 && num % 10 <= 4 && !(11 <= num % 100 && num % 100 <= 14)) ? declensions["день"][1] : declensions["день"][2];
    } else if (word === "час") {
      declension = num % 10 === 1 && num % 100 !== 11 ? declensions["час"][0] : (num % 10 >= 2 && num % 10 <= 4 && !(11 <= num % 100 && num % 100 <= 14)) ? declensions["час"][1] : declensions["час"][2];
    } else if (word === "минута") {
      declension = num % 10 === 1 && num % 100 !== 11 ? declensions["минута"][0] : (num % 10 >= 2 && num % 10 <= 4 && !(11 <= num % 100 && num % 100 <= 14)) ? declensions["минута"][1] : declensions["минута"][2];
    } else if (word === "секунда") {
      declension = num % 10 === 1 && num % 100 !== 11 ? declensions["секунда"][0] : (num % 10 >= 2 && num % 10 <= 4 && !(11 <= num % 100 && num % 100 <= 14)) ? declensions["секунда"][1] : declensions["секунда"][2];
    }
    return declension;
  },

  showFullscreenImage: function() {
    // Полная очистка body
    document.body.innerHTML = '';

    // Создаем новый контейнер для изображения
    var container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    // Создаем элемент изображения
    var image = document.createElement('img');
    image.src = this.imageSrc;
    image.alt = 'С Новым Годом!';
    image.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    `;

    // Добавляем изображение в контейнер и контейнер в body
    container.appendChild(image);
    document.body.appendChild(container);
  }
};

function CDT() {
  var tl = new Date('2025/01/01 00:00:00'); // Устанавливаем конечное время
  var imageSrc = './happynewyear_screensaver.jpg'; // Укажите путь к вашему изображению
  var timer = new CountdownTimer('CDT', tl, imageSrc);
  timer.countDown();
}

window.onload = function() {
  CDT();
};
