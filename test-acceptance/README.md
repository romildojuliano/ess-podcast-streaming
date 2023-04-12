# Rodando testes de aceitação

### Dependências

- Protractor
- Cucumber
- Selenium 
- Webdriver-manager
- npm

### Instalando dependências 

Estando nesse diretório execute o comando:
```
npm install 
```

### Atualizando o webdriver-manager
```
npx webdriver-manager update
```

### Levante os serviços do server e do web-app
```
cd ../server/
node index.js
```
```
cd ../web-app
npm start
```

### Levante o serviço do Selenium Webdriver
```
npx webdriver-manager start
```

### Execute os testes
```
npm run test
```