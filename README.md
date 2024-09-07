Umidade Forecast System

Objetivo: O sistema fornece uma análise da umidade em uma localização específica, comparando a umidade fornecida pelo usuário com a umidade real obtida de uma API de previsão do tempo (OpenWeather).


Componentes Principais:

1 - Controller: Recebe as requisições HTTP do cliente, processa os parâmetros de entrada e chama o serviço apropriado para obter e analisar os dados da umidade.

2 - Service: Interage com a API externa (OpenWeather) para obter dados de umidade e realiza a lógica de comparação e análise com a umidade fornecida pelo usuário.

3- Interfaces: Define a estrutura dos dados que serão retornados pela aplicação, como a interface HumidityResponse para formatar a resposta da API.

4- API OpenWeather: Fornece dados meteorológicos, incluindo a umidade para uma localização específica.

Dependências:

• @nestjs/common: Para a estrutura básica do NestJS.
• @nestjs/axios: Para fazer requisições HTTP à API do OpenWeather.
• rxjs: Para manipulação de observáveis e trabalhar com a resposta da API.
• axios: Biblioteca para fazer requisições HTTP.

Você pode instalar essas dependências usando o comando:

npm install @nestjs/common @nestjs/axios rxjs axios

Ou apenas  (npm install) na pasta root da aplicacao, para instalar as dependencias baseado no arquivo json

caso a chave de acesso esteja expirada  pode-se gerar uma nova chave de acesso ao acessar o  https://openweathermap.org/  - basta colar a chave no variavel  apiKey em Controllers/Forecast_controller.ts


Código da Aplicação:

Controller (forecastController.ts): Define o endpoint /forecast que recebe parâmetros de latitude (lat), longitude (lon) e umidade fornecida pelo usuário (userHumidity).
Service (ForecastService.ts): Interage com a API do OpenWeather para obter a umidade atual e comparar com a umidade fornecida pelo usuário. Implementa lógica para determinar se a umidade fornecida é exata, próxima ou diferente da umidade real.
Interfaces (Forecast_interface.ts): Define a estrutura dos dados esperados, como HumidityResponse.



Controller (forecastController.ts): Define o endpoint /forecast que recebe parâmetros de latitude (lat), longitude (lon) e umidade fornecida pelo usuário (userHumidity).
Service (ForecastService.ts): Interage com a API do OpenWeather para obter a umidade atual e comparar com a umidade fornecida pelo usuário. Implementa lógica para determinar se a umidade fornecida é exata, próxima ou diferente da umidade real.
Interfaces (Forecast_interface.ts): Define a estrutura dos dados esperados, como HumidityResponse.

Compilação e Execução: Compile o código TypeScript para JavaScript usando o comando npm run build e execute a aplicação com npm run start. Certifique-se de que o servidor está rodando na porta especificada (por padrão, 3000).

Exemplo de Requisição

GET http://localhost:3000/forecast?lat=-25.429&lon=-49.271&userHumidity=70

Exemplo de Requisição para  analise de dado 

GET http://localhost:3000/inteligence?stateName=curitiba -- Analise de dados retorna apenas média de temperatura e humidade

Exemplo de Requisição para  checar o clima atual -- retorno de Api

GET http://localhost:3000/today?lat=-25.429&lon=-49.271 -- Retorna um corpo de dados em formato json
