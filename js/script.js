const AUTH_CONFIG = {
    userId: 'Bithi',
    password: 'csc183',
};

const galleryImages = [
    { src: 'images/1786555899906.jpg.jpeg', caption: 'Kichu muhurte kono kotha lage na… chupchap thakai onek kichu bole dey. Kichu drissho chokhe thake, ar kichu manush mone. 🤍' },

    { src: 'images/1786555904430.jpg.jpeg', caption: 'Aj Ipun nai ble😌' },

    { src: 'images/1786561237524.jpg.jpeg', caption: '' },

    { src: 'images/1786561247267.jpg.jpeg', caption: 'Ekta shapla, ekta shundor din… ar ekjon manus, jar sathe ei choto choto jinis-o somehow special hoye jay. 🌸' },

    { src: 'images/1786561252272.jpg.jpeg', caption: 'Chokhe eto shanti niye thaka manush ta abar majhe majhe emon paglamo kore, bujhai jay na! 😭😂' },

    { src: 'images/1786561256735.jpg.jpeg', caption: 'Golpo jokhon ekjoner na, dujoner hoy… tokhon ekta choto muhurto-o nijer moto kore mone theke jay.' },

    { src: 'images/1786561261220.jpg.jpeg', caption: 'Phuler moto dekhte simple, kintu er pichone je eto golpo… sheita sudhu amrai jani. 🌺' },

    { src: 'images/IMG-20260510-WA0012.jpg.jpeg', caption: '😂❤️' },

    { src: 'images/IMG-20260619-WA0002.jpg.jpeg', caption: 'Ei hasi ta dekhlei bujha jay, serious thakar acting ta beshikkhon tikbe na. 😌😂' },

    { src: 'images/IMG-20260619-WA0003.jpg.jpeg', caption: 'Best Art From UDVASH — exam er cheyeo beshi effort diye banano masterpiece. Artist ke respect kortei hoy! 😭😂' },

    { src: 'images/IMG-20260619-WA0004.jpg.jpeg', caption: 'Shei Torkari❤️' },

    { src: 'images/IMG-20260727-WA0014.jpg.jpeg', caption: 'Bridge ar rod mere deoar project' },

    { src: 'images/my_epty.jpg.jpeg', caption: 'Phulta shukiye jabe, chobi purono hoye jabe… kintu ei muhurter upor je boka boka hashi chilo, oita eto shohoje jabe na. 🌸' },

    { src: 'images/suhasini.jpg.jpeg', caption: 'Har najar ko ek najar ki talash hai 👀✨ Is chehre Mein Kuchh to khaash hai 🥰' },

    { src: 'images/WhatsApp Image 2026-08-14 at 2.40.14 AM.jpeg', caption: 'Tum khush raho, bas itna hi chahta hoon…Aur haan, tumhari muskurahat hamesha aisi-i rahe। 😊✨' }
];

const lockScreen = document.getElementById('securityLock');
const siteShell = document.getElementById('siteShell');
const lockForm = document.getElementById('lockForm');
const authMessage = document.getElementById('authMessage');
const logoutBtn = document.getElementById('logoutBtn');
const galleryGrid = document.getElementById('galleryGrid');
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const prevImageBtn = document.getElementById('prevImageBtn');
const nextImageBtn = document.getElementById('nextImageBtn');
let currentGalleryIndex = 0;

function setAuthMessage(message, type = '') {
    authMessage.textContent = message;
    authMessage.className = 'auth-message';
    if (type) {
        authMessage.classList.add(type);
    }
}

function unlockSite() {
    sessionStorage.setItem('memorySiteAuth', 'true');
    document.body.classList.add('authenticated');
    if (siteShell) {
        siteShell.style.display = 'block';
    }
    if (lockScreen) {
        lockScreen.classList.add('hidden');
    }
    setAuthMessage('Khul Ja Sim Sim', 'success');
}

function lockSite() {
    sessionStorage.removeItem('memorySiteAuth');
    document.body.classList.remove('authenticated');
    if (lockScreen) {
        lockScreen.classList.remove('hidden');
    }
    if (siteShell) {
        siteShell.style.display = 'none';
    }
}

function checkAuthOnLoad() {
    const isAuthenticated = sessionStorage.getItem('memorySiteAuth') === 'true';
    if (isAuthenticated) {
        unlockSite();
    } else {
        document.body.classList.remove('authenticated');
        if (lockScreen) lockScreen.classList.remove('hidden');
        if (siteShell) siteShell.style.display = 'none';
    }
}

function buildGallery() {
    if (!galleryGrid) return;

    galleryGrid.innerHTML = galleryImages.map((image, index) => `
        <div class="col">
            <article class="gallery-item" data-index="${index}" aria-label="Open image ${index + 1}">
                <div class="gallery-image-wrap">
                    <img src="${image.src}" alt="${image.caption}" loading="lazy" />
                </div>
                <div class="gallery-caption">${image.caption}</div>
            </article>
        </div>
    `).join('');

    const galleryCards = document.querySelectorAll('.gallery-item');
    galleryCards.forEach((card) => {
        card.addEventListener('click', () => {
            const index = Number(card.dataset.index);
            openLightbox(index);
        });
    });
}

function updateLightbox() {
    if (!lightboxImage || !lightboxCaption) return;

    const activeItem = galleryImages[currentGalleryIndex];
    lightboxImage.src = activeItem.src;
    lightboxImage.alt = activeItem.caption;
    lightboxCaption.textContent = activeItem.caption;
}

function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightbox();
    if (galleryLightbox && window.bootstrap) {
        const modal = bootstrap.Modal.getOrCreateInstance(galleryLightbox);
        modal.show();
    }
}

function changeLightbox(direction) {
    currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
    updateLightbox();
}

if (lockForm) {
    lockForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUserId = document.getElementById('userId').value.trim();
        const enteredPassword = document.getElementById('password').value.trim();

        if (enteredUserId === AUTH_CONFIG.userId && enteredPassword === AUTH_CONFIG.password) {
            unlockSite();
        } else {
            setAuthMessage('Hy nai', 'error');
            lockForm.reset();
            document.getElementById('userId').focus();
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        lockSite();
        setAuthMessage('', '');
        document.getElementById('userId').focus();
    });
}

if (prevImageBtn) {
    prevImageBtn.addEventListener('click', () => changeLightbox(-1));
}

if (nextImageBtn) {
    nextImageBtn.addEventListener('click', () => changeLightbox(1));
}

if (document.addEventListener) {
    document.addEventListener('keydown', function (event) {
        if (!galleryLightbox || !galleryLightbox.classList.contains('show')) return;

        if (event.key === 'ArrowRight') {
            changeLightbox(1);
        }

        if (event.key === 'ArrowLeft') {
            changeLightbox(-1);
        }

        if (event.key === 'Escape') {
            const modal = bootstrap.Modal.getOrCreateInstance(galleryLightbox);
            modal.hide();
        }
    });
}

const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const countEl = button.querySelector('span');
        if (!countEl) return;

        const currentValue = Number(countEl.textContent.replace(/[^0-9]/g, '')) || 0;
        const newValue = currentValue + 1;
        countEl.textContent = newValue.toLocaleString('bn-BD');
        button.classList.add('liked');

        setTimeout(() => button.classList.remove('liked'), 450);
    });
});

const wishForm = document.getElementById('wishForm');
const wishFeed = document.getElementById('wishFeed');

if (wishForm && wishFeed) {
    wishForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const visitorName = document.getElementById('visitorName').value.trim();
        const visitorMessage = document.getElementById('visitorMessage').value.trim();

        if (!visitorName || !visitorMessage) {
            return;
        }

        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <strong>${visitorName}</strong>
            <p>${visitorMessage}</p>
        `;

        wishFeed.prepend(card);
        wishForm.reset();
    });
}

buildGallery();
checkAuthOnLoad();
