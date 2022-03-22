# Visualization of reactor runtime.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app(both server and client).

### `npm run server`

Runs its server.  
It also can be done with command `node server/server.js`  

### `npm run client`

Runs client application  
It also can be done with command  
```
cd client
npm start
```  
It will takes some times, and If finished, you can see the webpage in [http://localhost:3000](http://localhost:3000)  

## How to use
To use visualizer, you have to go through following steps.  
1) run server  
`npm run server`  
2) run client  
`npm run client`
3) open [web page](http://localhost:3000)  
4) execute reactor-based javascript program.  
   These programs are in reactor-ts/dist/benchmark  
   For example, if you want to 'Sieve.js' in the folder,  
   `node reactor-ts/dist/benchmark/Sieve.js`  
5) Click the 'reload' buttons and check the dependency graph  
(Warning: This project is uncompleted. In actual, the web page have to show dynamic changes of reactor)  
