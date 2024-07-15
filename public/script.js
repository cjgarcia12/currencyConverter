const baseCurrency = document.getElementById('base-currency');
const targetCurrency = document.getElementById('target-currency');

const convertedAmount = document.getElementById('converted-amount');
const amount = document.getElementById('amount');

const date = document.getElementById('date');
const histDatesCont = document.getElementById('historical-rates-container');

const favorites = document.getElementById('favorites');

// list all keys from api fetch
const listCurrencies = () => {
    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IH2kLfdZeklM5wzTPVsnvBlKqdXN4t2PyLPUVziN')
        .then(response => {
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('API rate limit reached. Please try again later.');
                } else {
                    throw new Error('Failed to fetch currency data.');
                }
            }
            return response.json();
        })
        .then(result => {
            const currencies = Object.keys(result.data);
            currencies.forEach((el) => {
                let baseOption = `<option value="${el}">${el}</option>`;
                let targetOption = `<option value="${el}">${el}</option>`;
                baseCurrency.innerHTML += baseOption;
                targetCurrency.innerHTML += targetOption;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

const convertCurrencies = () => {
    if (baseCurrency.value === '' || targetCurrency.value === '' || isNaN(amount.value) || amount.value <= 0) {
        alert('Please enter valid inputs for currencies and amount.');
        return;
    }
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IH2kLfdZeklM5wzTPVsnvBlKqdXN4t2PyLPUVziN&base_currency=${baseCurrency.value}&currencies=${targetCurrency.value}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('API rate limit reached. Please try again later.');
                } else {
                    throw new Error('Failed to fetch conversion data.');
                }
            }
            return response.json();
        })
        .then(result => {
            const key = Object.keys(result.data)[0];
            const conversion = result.data[key] * amount.value;
            convertedAmount.innerHTML = Math.round(conversion * 100) / 100;
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

// displays the historical exchange rate
const viewHistory = () => {
    histDatesCont.innerHTML = '';
    const selectedDate = new Date(date.value);
    const today = new Date();
    if (baseCurrency.value === '' || targetCurrency.value === '' || date.value === '' || isNaN(selectedDate) || selectedDate >= today) {
        histDatesCont.innerHTML = `Please fill out all inputs with valid data, and ensure the date is before today.`;
        return;
    }
    fetch(`https://api.freecurrencyapi.com/v1/historical?apikey=fca_live_IH2kLfdZeklM5wzTPVsnvBlKqdXN4t2PyLPUVziN&date=${date.value}&base_currency=${baseCurrency.value}&currencies=${targetCurrency.value}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('API rate limit reached. Please try again later.');
                } else {
                    throw new Error('Failed to fetch historical data.');
                }
            }
            return response.json();
        })
        .then(result => {
            const dateKey = Object.keys(result.data)[0];
            const currKey = Object.keys(result.data[dateKey])[0];
            const conversion = result.data[dateKey][currKey];
            const final = Math.round(conversion * 100) / 100;
            histDatesCont.innerHTML = `
            Historical exchange rate on ${date.value}: ${amount.value} ${baseCurrency.value} = ${final * amount.value} ${targetCurrency.value}
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

const saveFavoritePair = (base, target) => {
    return fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baseCurrency: base, targetCurrency: target })
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save favorite pair');
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

const loadFavorites = () => {
    return fetch('/api/favorites')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load favorites');
            return response.json();
        })
        .then(fav => {
            favorites.innerHTML = '';
            fav.forEach(el => {
                let newElem = document.createElement('button');
                newElem.innerHTML = `${el.baseCurrency}/${el.targetCurrency}`;
                newElem.addEventListener('click', () => {
                    baseCurrency.value = el.baseCurrency;
                    targetCurrency.value = el.targetCurrency;
                    convertCurrencies();
                });
                favorites.appendChild(newElem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}

// loads listCurrencies() on page load
document.addEventListener('DOMContentLoaded', listCurrencies);
document.addEventListener('DOMContentLoaded', loadFavorites);

// loads when target-currency is chosen or value is changed
targetCurrency.addEventListener('change', convertCurrencies);
amount.addEventListener('change', convertCurrencies);

document.getElementById('save-favorite').addEventListener('click', () => {
    const base = baseCurrency.value;
    const target = targetCurrency.value;
    saveFavoritePair(base, target).then(loadFavorites);
});
