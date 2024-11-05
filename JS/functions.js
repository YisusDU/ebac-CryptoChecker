
const cryptoCard = (id, imgURL, crypto) => {
    // Contenedor de la moneda
    const card = document.createElement('div');
    card.classList.add('products');

    // Contenedor del logo y nombre
    const logo = document.createElement('div');
    logo.classList.add('product__parameter', 'logo__name');
    
    const icon = document.createElement('i');
    icon.id = 'coin__logo';
    icon.classList.add('logo');
    const img1 = document.createElement('img');
    img1.src = imgURL; // Usar la img de la criptomoneda

    const name = document.createElement('span');
    name.innerText = `${id.name} ${id.symbol.toUpperCase()}`; // Nombre y símbolo

    icon.appendChild(img1)
    logo.appendChild(icon);
    logo.appendChild(name);
    card.appendChild(logo);

    // Contenedor para el precio actual
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('product__parameter');
    const priceLabel = document.createElement('span');
    priceLabel.innerText = 'Price';
    const priceValue = document.createElement('p');
    priceValue.id = 'current__price';
    priceValue.innerText = `$${crypto.market_data.current_price.mxn.toLocaleString()} MXN`; // Precio actual en pesos Mexicanos

    priceContainer.appendChild(priceLabel);
    priceContainer.appendChild(priceValue);
    card.appendChild(priceContainer);

    // Contenedor para el cambio en 24 horas
    const change24hrsContainer = document.createElement('div');
    change24hrsContainer.classList.add('product__parameter');
    const change24hrsLabel = document.createElement('span');
    change24hrsLabel.innerText = '24hrs';
    const change24hrsValue = document.createElement('p');
    change24hrsValue.id = '24hrs';
    change24hrsValue.innerText = `${crypto.market_data.price_change_percentage_24h.toFixed(2)}%`; // Cambio en 24 horas

    change24hrsContainer.appendChild(change24hrsLabel);
    change24hrsContainer.appendChild(change24hrsValue);
    card.appendChild(change24hrsContainer);

    //contenedor para cambio en 7 días
    const change7daysContainer = document.createElement('div');
    change7daysContainer.classList.add('product__parameter');
    const change7daysLabel = document.createElement('span');
    change7daysLabel.innerText = '7d';
    const change7daysValue = document.createElement('p');
    change7daysValue.id = '7d';
    change7daysValue.innerText =  `${crypto.market_data.price_change_percentage_7d.toFixed(2)}%`; // Cambio en 7 días
    
    change7daysContainer.appendChild(change7daysLabel);
    change7daysContainer.appendChild(change7daysValue);
    card.appendChild(change7daysContainer);

    // Contenedor para el cambio en 14 días
    const change14daysContainer = document.createElement('div');
    change14daysContainer.classList.add('product__parameter');
    const change14daysLabel = document.createElement('span');
    change14daysLabel.innerText = '14d';
    const change14daysValue = document.createElement('p');
    change14daysValue.id = '14d';
    change14daysValue.innerText = `${crypto.market_data.price_change_percentage_14d.toFixed(2)}%`; // Cambio en 14 días

    change14daysContainer.appendChild(change14daysLabel);
    change14daysContainer.appendChild(change14daysValue);
    card.appendChild(change14daysContainer);

    // Contenedor para el cambio en 30 días
    const change30daysContainer = document.createElement('div');
    change30daysContainer.classList.add('product__parameter');
    const change30daysLabel = document.createElement('span');
    change30daysLabel.innerText = '30d';
    const change30daysValue = document.createElement('p');
    change30daysValue.id = '30d';
    change30daysValue.innerText = `${crypto.market_data.price_change_percentage_30d.toFixed(2)}%`; // Cambio en 30 días

    change30daysContainer.appendChild(change30daysLabel);
    change30daysContainer.appendChild(change30daysValue);
    card.appendChild(change30daysContainer);

    // Contenedor para el cambio en 60 días
    const change60daysContainer = document.createElement('div');
    change60daysContainer.classList.add('product__parameter');
    const change60daysLabel = document.createElement('span');
    change60daysLabel.innerText = '60d';
    const change60daysValue = document.createElement('p');
    change60daysValue.id = '60d';
    change60daysValue.innerText = `${crypto.market_data.price_change_percentage_60d.toFixed(2)}%`; // Cambio en 60 días

    change60daysContainer.appendChild(change60daysLabel);
    change60daysContainer.appendChild(change60daysValue);
    card.appendChild(change60daysContainer);

    // Contenedor para el cambio en 200 días
    const change200daysContainer = document.createElement('div');
    change200daysContainer.classList.add('product__parameter');
    const change200daysLabel = document.createElement('span');
    change200daysLabel.innerText = '200d';
    const change200daysValue = document.createElement('p');
    change200daysValue.id = '200d';
    change200daysValue.innerText = `${crypto.market_data.price_change_percentage_200d.toFixed(2)}%`; // Cambio en 200 días

    change200daysContainer.appendChild(change200daysLabel);
    change200daysContainer.appendChild(change200daysValue);
    card.appendChild(change200daysContainer);
    
    return card;
};

// Ejemplo de uso:
const cryptosPopulars = {
    bitcoin: {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin"
    },
    ethereum: {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum"
    },
    litecoin: {
        "id": "litecoin",
        "symbol": "ltc",
        "name": "Litecoin"
    },
    chainlink: {
        "id": "chainlink",
        "symbol": "link",
        "name": "Chainlink"
    },
    uniswap: {
        "id": "uniswap",
        "symbol": "uni",
        "name": "Uniswap"
    }
   
};
/*
parte eliminada del objeto crytposPopular:
    ,
    ethereum: {
        "id": "ethereum",
        "symbol": "eth",
        "name": "Ethereum"
    },
    litecoin: {
        "id": "litecoin",
        "symbol": "ltc",
        "name": "Litecoin"
    },
    chainlink: {
        "id": "chainlink",
        "symbol": "link",
        "name": "Chainlink"
    },
    uniswap: {
        "id": "uniswap",
        "symbol": "uni",
        "name": "Uniswap"
    }
*/

//---------Vamos a crear la función asincrona que hace las peticiones a la API de CoinGecko

// Función para crear un retraso en milisegundos
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función asincrona para obtener datos de CoinGecko
const getCoinGeckoData = async () => {
    // Muestra el spinner
    document.getElementById('spinner').style.display = 'flex';

    // Obtener la fecha actual
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`; 

    // Iterar sobre cada criptomoneda en cryptosPopulars
    for (const key in cryptosPopulars) {
        const crypto = cryptosPopulars[key];

        // Configuración para obtener la imagen de la criptomoneda
        const getIMG = {
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/${crypto.id}/history`,
            params: {
                date: formattedDate,
                localization: 'false'
            },
            headers: { accept: 'application/json' }
        };

        // Configuración para obtener los valores de la criptomoneda
        const getValues = {
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/${crypto.id}`,
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-HRpokdbgoPqyfytYatDB2f2f'}
        };

        try {
            // Obtenemos el JSON con la imagen de la moneda
            const responseImg = await axios.request(getIMG);
            const imgURL = responseImg.data;
            console.log(`Imagen de ${crypto.name}:`,imgURL.image.small); 

            // Obtenemos el JSON con los valores de la moneda
            const responseValue = await axios.request(getValues);
            console.log(`Valores de ${crypto.name}:`, responseValue.data);

            //Creamos la tarjeta con los  datos obtenidos
            const productCard = cryptoCard(crypto, imgURL.image.small, responseValue.data);
            console.log(cryptoCard(crypto, imgURL.image.small, responseValue.data));

            //Seleccionamos el contenedor de comprar
            const  buyContainer = document.querySelector("#buy__container");

            //Seleccionamos el contenedor de mantener
            const  holdContainer = document.querySelector("#hold__container");

            //Seleccionamos el  contenedor de vender
            const  sellContainer = document.querySelector("#sell__container");

            //Creamos la función que  se encarga de agregar la tarjeta a la sección correspondiente

            //Añadimos la ruta que vamos a validar
            const plusLess = responseValue.data.market_data.price_change_percentage_7d;
            if(plusLess > 7){
                sellContainer.appendChild(productCard)
            } else if(plusLess < -7){
                buyContainer.appendChild(productCard)
            } else {
                holdContainer.appendChild(productCard)
            }

            


            // Espera 15 segundos antes de la siguiente solicitud para evitar el error 429
            await delay(35000);
        } catch (error) { 
            // Manejo de errores al obtener datos de la criptomoneda
            console.error(`Error al obtener datos de ${crypto.name}:`, error); 
            alert(`Algo salió mal al obtener datos de ${crypto.name}, intenta de nuevo`);
        }
    }

    // Oculta el spinner después de que se han completado todas las solicitudes
    document.getElementById('spinner').style.display = 'none';
}

// Ejecutar la función cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', getCoinGeckoData());






