document.getElementById('convert-button').addEventListener('click', convertCurrency);

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const apiKey = 'c4fabbcd729e4225f9805306'; // 自分のExchangeRate-APIキーをここに貼り付けます。
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.conversion_rates) {
                const conversionRate = data.conversion_rates[toCurrency];
                if (conversionRate) {
                    const convertedAmount = amount * conversionRate;
                    document.getElementById('converted-amount').textContent = `${amount} ${fromCurrency} は ${convertedAmount.toFixed(2)} ${toCurrency} です。`;
                } else {
                    document.getElementById('converted-amount').textContent = '通貨コードが無効です。';
                }
            } else {
                document.getElementById('converted-amount').textContent = 'データが見つかりません。';
            }
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            document.getElementById('converted-amount').textContent = 'エラーが発生しました。';
        });
}
