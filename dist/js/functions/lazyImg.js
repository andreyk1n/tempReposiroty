document.addEventListener("DOMContentLoaded", () => {
    // Знаходимо всі зображення з класом "lazy" та елементи з фоновими зображеннями класу "lazy-bg"
    const lazyImages = document.querySelectorAll('img.lazy');
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');

    // Прозоре 1x1 піксельне зображення для заглушки (необов'язкове, але корисне для валідності HTML)
    const placeholderImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    // Ініціалізуємо Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Якщо елемент у видимій зоні
            if (entry.isIntersecting) {
                const target = entry.target;

                if (target.tagName === 'IMG') {
                    // Для зображень встановлюємо реальний src
                    const realSrc = target.getAttribute('data-src');
                    if (realSrc) {
                        target.src = realSrc;
                        target.removeAttribute('data-src');
                        target.classList.remove('lazy');
                    }
                } else if (target.classList.contains('lazy-bg')) {
                    // Для елементів із фоновим зображенням встановлюємо background-image
                    const realBg = target.getAttribute('data-bg');
                    if (realBg) {
                        target.style.backgroundImage = `url(${realBg})`;
                        target.removeAttribute('data-bg');
                        target.classList.remove('lazy-bg');
                    }
                }

                // Припиняємо спостереження за цим елементом
                observer.unobserve(target);
            }
        });
    });

    // Додаємо заглушку для зображень, якщо відсутній атрибут src, та ініціалізуємо спостереження
    lazyImages.forEach(image => {
        if (!image.hasAttribute('src')) {
            image.src = placeholderImage;
        }
        imageObserver.observe(image);
    });

    // Ініціалізуємо спостереження для фонів
    lazyBackgrounds.forEach(background => {
        imageObserver.observe(background);
    });
});

/*
Інструкція щодо використання:

1. Для зображень:
    - Додайте клас "lazy" до елемента <img>.
    - Використовуйте атрибут `data-src` для вказівки реального URL зображення.
    - Приклад:
      <img class="lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" data-src="real-image.jpg" alt="Опис зображення">

2. Для елементів із фоновими зображеннями:
    - Додайте клас "lazy-bg" до елемента.
    - Використовуйте атрибут `data-bg` для вказівки реального URL фонового зображення.
    - Приклад:
      <div class="lazy-bg" data-bg="real-background.jpg"></div>

3. Додаткові налаштування:
    - Ви можете змінити `placeholderImage`, якщо потрібно використовувати інше зображення-заглушку.
    - Реальні зображення та фонові зображення будуть завантажуватись лише тоді, коли потраплять у видиму зону.

4. Сумісність:
    - Працює у всіх сучасних браузерах, що підтримують Intersection Observer.
    - Для старих браузерів можна додати полифіл для Intersection Observer, якщо потрібно.
*/
