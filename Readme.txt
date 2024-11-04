Antes de comenzar

El propósito principal de este proyecto es desarrollar una aplicación web dinámica e interactiva que consuma una API externa.
La aplicación deberá realizar solicitudes a la API y presentar los resultados al usuario de una manera intuitiva y eficiente..


Paso a paso

Desarrollar una página web informativa que utilice una API para obtener y mostrar datos. La elección de la API está orientada a
 proveer contenido relevante y útil, como puede ser información de películas y series.

Se debe de usar alguna de estas APIs
https://www.tvmaze.com/api - Información de peliculas y serires
Alguna API de uso libre de tu elección

La aplicación debe contener al menos una página principal y opcionalmente otras páginas secundarias, todas consumiendo al menos
 dos endpoints diferentes de la API seleccionada.

La interfaz gráfica debe ser clara y estéticamente agradable, mostrando la información de manera estructurada y coherente. 

Debe ser desarrollada utilizando  SASS para definir estilos visuales y layouts.
Usar HTML semantico

Utilizar Vanilla JavaScript para la lógica de la aplicación. Se prohíbe el uso de jQuery para fomentar la práctica con estándares
modernos y Vanilla JS.

Realizar las solicitudes a la API utilizando Axios, manejando las respuestas y posibles errores con promesas o async/await para un
código más limpio y eficiente.

Apoyarse en el módulo de sitios web interactivos para el adecuado manejo del DOM y la interactividad del usuario.

El proyecto debe vivir en un repositorio en GitHub.

Subir el proyecto a algún servicio de alojamiento.

//----------------------------------------------Ideas
Quiero hacer un sitio que muestre como van las criptomonedas para saber cuando comprar y cuando vender
Quiero que muestre alertas de subida y bajada de precio  de las criptomonedas
Quiero que muestre las criptomonedas con sus respectivos precios y subidas y  bajadas de precio
Y quiero que  muestre los graficos del registro historico de dichas criptomonedas
Para esto necesito utilizar la API de CoinGecko 
https://www.coingecko.com/en/api

//--------------------------------
Talvez podemos añadir una sección para acciones de la bolsa de valores

//-------------Incie sesion en la api de  CoinGecko
este es el link para ingresar la clave
https://api.coingecko.com/api/v3/ping?x_cg_demo_api_key=CG-HRpokdbgoPqyfytYatDB2f2f
me regresa un JSON  con el siguiente contenido

{
    "gecko_says": "(V3) To the Moon!"
}

//-------------------------Uso de postman
Cuando vemos el json que nos devuelve postman en el body de la parte inferior, podemos hacer busquedas en el con el simbolo d ela lupa
Para que funcione en Postman, debo añadir unos parametros  en la peticion GET
Además del link:
https://api.coingecko.com/api/v3/coins/list?accept=application/json&x-cg-demo-api-key=CG-HRpokdbgoPqyfytYatDB2f2f
en la sección de parametros, en la derecha hay un boton que dice bulkedit, click ahí y me arroja un espacio para escribir
Escribimos los siguiente
accept:application/json
x-cg-demo-api-key:	CG-HRpokdbgoPqyfytYatDB2f2f

y podemos ver que el link del  GET cambia a 
https://api.coingecko.com/api/v3/coins/list?accept=application/json&x-cg-demo-api-key=CG-HRpokdbgoPqyfytYatDB2f2f

Eso arroja esto:
 {
        "id": "01coin",
        "symbol": "zoc",
        "name": "01coin"
    },
    {
        "id": "0chain",
        "symbol": "zcn",
        "name": "Zus"
    },...

//--------------------Link en postman para obtener el id de las  criptomonedas
https://api.coingecko.com/api/v3/coins/list?accept=application/json&x-cg-demo-api-key=CG-HRpokdbgoPqyfytYatDB2f2f

//---------------------Link para optener datos de Bitcoin, puedes cambiar Bitcoin por otra  criptomoneda, acorde a su id
La verda vienen muchos datos,  pero los que me interesan son los siguientes
"id": "bitcoin",
"symbol": "btc",
"name": "Bitcoin",
precio actual--------- https://api.coingecko.com/api/v3/coins/bitcoin?accept=application/json&x-cg-demo-api-key=CG-HRpokdbgoPqyfytYatDB2f2f
buscar en el json :
current_price
mxn---pesos mexicanos sin decimales

"price_change_24h": -256.2593316244,
        "price_change_percentage_24h": -0.35356,
        "price_change_percentage_7d": 7.51767,
        "price_change_percentage_14d": 6.43166,
        "price_change_percentage_30d": 13.88976,
        "price_change_percentage_60d": 22.57371,
        "price_change_percentage_200d": 13.07546,

max precio historico ---------verlo en la pagina  de coin gecko, en la parte de datos de la criptomoneda y añadirlo manualmente, 
además, hacer una función que lo actualice automáticamente


https://api.coingecko.com/api/v3/coins/bitcoin?accept=application/json&x-cg-demo-api-key=	CG-HRpokdbgoPqyfytYatDB2f2f


---Este el codigo en axios que me arroja gecko 
Recuerda añadir la  libreria axios en tu proyecto
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

const options = {
  method: 'GET',
  url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-HRpokdbgoPqyfytYatDB2f2f'}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));


//---------------Criptos que planeo añadir
bitcoin
ethereum
litecoin
Chainlink
Uniswap



//----------Usa este endopoint para adiquirir las imagenes de cada criptomoneda
usa .image.small

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.coingecko.com/api/v3/coins/id/history',
  params: {x_cg_demo_api_key: 'CG-HRpokdbgoPqyfytYatDB2f2f'},
  headers: {accept: 'application/json'}
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
