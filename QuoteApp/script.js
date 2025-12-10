const quotesCollection = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "If you are working on something that you really care about, you don’t have to be pushed. The vision pulls you.", author: "Steve Jobs" },
    { text: "People who are crazy enough to think they can change the world, are the ones who do.", author: "Rob Siltanen" },
    { text: "Failure will never overtake me if my determination to succeed is strong enough.", author: "Og Mandino" },
    { text: "We may encounter many defeats but we must not be defeated.", author: "Maya Angelou" },
    { text: "Knowing is not enough; we must apply. Wishing is not enough; we must do.", author: "Johann Wolfgang Von Goethe" }
];

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const likeBtn = document.getElementById('likeBtn');
const favList = document.getElementById('favList');
const emptyMsg = document.getElementById('emptyMsg');

let currentQuote = {};

document.addEventListener('DOMContentLoaded', () => {
    getNewQuote();
    loadFavorites();
});

function getNewQuote() {
    const randomIndex = Math.floor(Math.random() * quotesCollection.length);
    currentQuote = quotesCollection[randomIndex];

    quoteText.innerText = `"${currentQuote.text}"`;
    quoteAuthor.innerText = `- ${currentQuote.author}`;

    checkIfLiked();
}

async function shareQuote() {
    const shareData = {
        title: 'Daily Inspiration',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
        url: window.location.href
    };

    try {
        await navigator.share(shareData);
    } catch (err) {
        navigator.clipboard.writeText(`${shareData.text}`);
        alert("Quote copied to clipboard!");
    }
}

function toggleFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favQuotes')) || [];
    
    const index = favorites.findIndex(q => q.text === currentQuote.text);

    if (index === -1) {
        favorites.push(currentQuote);
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>'; 
    } else {
        favorites.splice(index, 1);
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-heart"></i>'; 
    }

    localStorage.setItem('favQuotes', JSON.stringify(favorites));
    loadFavorites();
}

function checkIfLiked() {
    let favorites = JSON.parse(localStorage.getItem('favQuotes')) || [];
    const exists = favorites.some(q => q.text === currentQuote.text);

    if (exists) {
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favQuotes')) || [];
    favList.innerHTML = '';

    if (favorites.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        favorites.forEach((fav, index) => {
            const li = document.createElement('li');
            li.className = 'fav-item';
            li.innerHTML = `
                "${fav.text}"
                <span class="fav-author">- ${fav.author}</span>
                <i class="fas fa-trash delete-fav" onclick="removeFavorite(${index})"></i>
            `;
            favList.appendChild(li);
        });
    }
}

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('favQuotes')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favQuotes', JSON.stringify(favorites));
    loadFavorites();
    checkIfLiked(); 
}

function showHome() {
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('favScreen').classList.add('hidden');
    document.getElementById('homeBtn').classList.add('active');
    document.getElementById('favBtn').classList.remove('active');
}

function showFavorites() {
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('favScreen').classList.remove('hidden');
    document.getElementById('homeBtn').classList.remove('active');
    document.getElementById('favBtn').classList.add('active');
}