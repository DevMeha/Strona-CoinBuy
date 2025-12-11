document.addEventListener('DOMContentLoaded', () => {
    // Stan portfela (saldo i posiadane kryptowaluty)
    const wallet = {
        balance: 10000,
        portfolio: []
    };

    // Elementy interfejsu (DOM) - sekcje i przyciski
    const walletBalanceElement = document.getElementById('wallet-balance');
    const cryptoContainer = document.getElementById('crypto-container');
    const profileModal = document.querySelector('.profile-modal');
    const portfolioContentElement = document.getElementById('portfolio-content');
    const profileButton = document.querySelector('.btn_profile');

    // Obsługa LocalStorage (zapisywanie i wczytywanie danych portfela)
    function saveWallet() {
        localStorage.setItem('wallet', JSON.stringify(wallet));
    }

    function loadWallet() {
        const savedWallet = localStorage.getItem('wallet');
        if (savedWallet) {
            const data = JSON.parse(savedWallet);
            wallet.balance = data.balance;
            wallet.portfolio = data.portfolio;
        }
    }

    // Aktualizacja wyświetlanego salda na stronie
    function updateBalanceDisplay() {
        walletBalanceElement.textContent = `$${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Wyświetlanie sekcji portfolio (tabela z posiadanymi walutami)
    function displayPortfolio() {
        if (!portfolioContentElement) return;

        portfolioContentElement.innerHTML = '';

        if (wallet.portfolio.length === 0) {
            portfolioContentElement.innerHTML = '<p>Nie posiadasz żadnych kryptowalut.</p>';
            return;
        }

        const portfolioTable = document.createElement('table');
        portfolioTable.className = 'portfolio-table';
        portfolioTable.innerHTML = `
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Ilość</th>
                    <th>Cena zakupu</th>
                    <th>Akcja</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = portfolioTable.querySelector('tbody');

        wallet.portfolio.forEach(coin => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${coin.name}</td>
                <td>${coin.quantity.toFixed(6)}</td>
                <td>$${coin.price.toFixed(2)}</td>
                <td><button class="btn-sell" data-id="${coin.id}">Sprzedaj</button></td>
            `;
            tbody.appendChild(row);
        });

        portfolioContentElement.appendChild(portfolioTable);
    }

    // Funkcja kupna: sprawdza środki, aktualizuje stan i zapisuje
    function handleBuyTransaction(id, name, price) {
        const quantityRaw = prompt(`Ile ${name} chcesz kupić?`, '1');
        if (quantityRaw === null || quantityRaw.trim() === '') return;

        const quantity = parseFloat(quantityRaw);
        if (isNaN(quantity) || quantity <= 0) {
            alert('Proszę podać prawidłową ilość.');
            return;
        }

        const totalCost = quantity * price;
        if (totalCost > wallet.balance) {
            alert('Nie masz wystarczających środków.');
            return;
        }

        wallet.balance -= totalCost;

        const existingCoin = wallet.portfolio.find(coin => coin.id === id);
        if (existingCoin) {
            existingCoin.quantity += quantity;
        } else {
            wallet.portfolio.push({ id, name, quantity, price });
        }

        saveWallet();
        updateBalanceDisplay();
        displayPortfolio();
    }

    // Funkcja sprzedaży: sprawdza ilość, aktualizuje stan i zapisuje
    function handleSellTransaction(id) {
        const coinToSell = wallet.portfolio.find(coin => coin.id === id);
        if (!coinToSell) return;

        const quantityRaw = prompt(`Posiadasz ${coinToSell.quantity.toFixed(6)} ${coinToSell.name}. Ile chcesz sprzedać?`, coinToSell.quantity.toFixed(6));
        if (quantityRaw === null || quantityRaw.trim() === '') return;

        const quantityToSell = parseFloat(quantityRaw);
        if (isNaN(quantityToSell) || quantityToSell <= 0 || quantityToSell > coinToSell.quantity) {
            alert('Nieprawidłowa ilość.');
            return;
        }

        wallet.balance += quantityToSell * coinToSell.price;
        coinToSell.quantity -= quantityToSell;

        if (coinToSell.quantity < 0.000001) {
            wallet.portfolio = wallet.portfolio.filter(c => c.id !== id);
        }

        saveWallet();
        updateBalanceDisplay();
        displayPortfolio();
    }

    // Pobieranie danych z API i wyświetlanie rynku
    let cryptoMarketData = [];

    async function fetchCryptoPrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
            const data = await response.json();
            cryptoMarketData = data;
            displayCryptoPrices(data);
        } catch (error) {
            console.error('Błąd pobierania danych:', error);
        }
    }

    function displayCryptoPrices(coins) {
        if (!cryptoContainer) return;
        cryptoContainer.innerHTML = '';

        coins.forEach(coin => {
            const coinElement = document.createElement('div');
            coinElement.className = 'crypto-card';
            coinElement.innerHTML = `
                <div class="crypto-header">
                    <img src="${coin.image}" alt="${coin.name}" style="width:24px;height:24px;margin-right:8px;">
                    <div class="crypto-name">${coin.name} (${coin.symbol.toUpperCase()})</div>
                </div>
                <div class="crypto-price">$${coin.current_price.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:6})}</div>
                <div class="crypto-change ${coin.price_change_percentage_24h_in_currency >= 0 ? 'positive' : 'negative'}">
                    ${coin.price_change_percentage_24h_in_currency >=0 ? '+' : ''}${coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                </div>
                <div class="crypto-buy-action">
                    <button class="btn-buy" data-id="${coin.id}" data-name="${coin.name}" data-price="${coin.current_price}">Kup</button>
                </div>
            `;
            cryptoContainer.appendChild(coinElement);
        });
    }

    // Inicjalizacja: start aplikacji, interwały i obsługa przycisków (event listeners)
    function init() {
        loadWallet();
        updateBalanceDisplay();
        fetchCryptoPrices();
        setInterval(fetchCryptoPrices, 60000);

        cryptoContainer.addEventListener('click', e => {
            if (e.target.classList.contains('btn-buy')) {
                const { id, name, price } = e.target.dataset;
                handleBuyTransaction(id, name, parseFloat(price));
            }
        });

        profileButton.addEventListener('click', displayPortfolio);

        profileModal.addEventListener('click', e => {
            if (e.target.classList.contains('btn-sell')) {
                const { id } = e.target.dataset;
                handleSellTransaction(id);
            }
        });
    }

    init();
});
