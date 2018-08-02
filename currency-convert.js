const axios = require('axios');
// USD, CAD, 20
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada

//http://data.fixer.io/api/latest?access_key=00c6af330d6d7bd6969e1205ffb67728

//--using old promises
// const getExchangeRate = (from, to) => {
// 	return axios.get('http://data.fixer.io/api/latest?access_key=00c6af330d6d7bd6969e1205ffb67728')
// 	.then((response) => {
// 		const euro = 1 / response.data.rates[from];
// 		const rate = euro * response.data.rates[to];
// 		return rate;
// 	});
// };


//using async await
const getExchangeRate = async (from, to) => {
	const response = await axios.get('http://data.fixer.io/api/latest?access_key=00c6af330d6d7bd6969e1205ffb67728');
	const euro = 1 / response.data.rates[from];
	const rate = euro * response.data.rates[to];
	return rate;
};

// const getCountries = (currencyCode) => {
// 	return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
// 		return response.data.map((country) => {
// 			return country.name;
// 		});
// 	});
// };


const getCountries = async (currencyCode) => {
	const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
	
	return response.data.map((country) => country.name);
};

// const convertCurrency = (from, to, amount) =>{
	
// 	let convertedAmount;
// 	return	getExchangeRate(from, to).then((rate) => {
// 		convertedAmount = (amount * rate).toFixed(2);
// 		return getCountries(to);
// 	}).then((countries) => {
// 		return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
// 	});
// }

const convertCurrency = async (from, to, amount) => {
	const rate = await getExchangeRate(from, to)
	const convertedAmount = (amount * rate).toFixed(2);
	const countries = await getCountries(to);

	return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;


// 	return	getExchangeRate(from, to).then((rate) => {
// 		convertedAmount = (amount * rate).toFixed(2);
// 		return getCountries(to);
// 	}).then((countries) => {
// 		return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
// 	});
}


convertCurrency('USD', 'CAD', 20).then((message) => {
	console.log(message);
});

// getExchangeRate('USD', 'CAD').then((rate) => {
// 	console.log(rate);
// });


// getCountries('cad').then((countries) => {
// 	console.log(countries);
// }).catch((err) =>{
// 	console.log(err);
// });