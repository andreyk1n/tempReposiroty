export function initializeModalTriggers() {
    let modalOpenedByMouseLeave = false;
    setTimeout(() => location = '#open-modal', 30000); // 30sec
    setInterval(() => location = '#open-modal', 300000); // 300 sec 
    document.addEventListener('mouseleave', e => {
        if (!modalOpenedByMouseLeave && (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= innerWidth || e.clientY >= innerHeight)) {
            location = '#open-modal';
            modalOpenedByMouseLeave = true;
        }
    });
};


// Відкриття виводом за межі раз на сесію

// export function initializeModalTriggers() {
//     if (sessionStorage.getItem('modalOpened') === 'true') return;

//     const openModal = () => {
//         location = '#open-modal';
//         sessionStorage.setItem('modalOpened', 'true');
//     };

//     setTimeout(openModal, 30000); // Відкрити через 30 секунд
//     setInterval(openModal, 300000); // Відкрити кожні 5 хвилин

//     document.addEventListener('mouseleave', e => {
//         if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= innerWidth || e.clientY >= innerHeight) {
//             openModal();
//         }
//     });
// };
