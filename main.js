function removeActiveClass() {
    document.querySelectorAll('.btn').forEach(button => {
        button.classList.remove('active');
    });
}
function changeMarvel() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const marvel = document.querySelector('#marvel-page');
    marvel.classList.remove('hidden');
    removeActiveClass();
    const marvelButton = document.querySelector('#marvel-button');
    marvelButton.classList.add('active');
}
function changeDC() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const dc = document.querySelector('#dc-page');
    dc.classList.remove('hidden');
    removeActiveClass();
    const dcButton = document.querySelector('#dc-button');
    dcButton.classList.add('active');
}

function changeArena() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const arena = document.querySelector('#arena-page');
    arena.classList.remove('hidden');
    removeActiveClass();
}
const input = document.querySelector('input');
    input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();

    const cards = document.querySelectorAll('hero-card');

    cards.forEach(card => {
        const alias = card.getAttribute('alias').toLowerCase();
        const visible = alias.includes(searchTerm);
        card.style.display = visible ? 'block' : 'none';
    });
});

