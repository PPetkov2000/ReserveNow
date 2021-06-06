## Table of Contents

* [Installation](#installation)
* [Website](#website)

## Installation

1. Clone the repo
```sh
git clone https://github.com/PPetkov2000/ReserveNow
```
2. Install NPM backend packages
```sh
cd frontend => npm install
```
3. Install NPM frontend packages
```sh
cd frontend => npm install
```
4. Create .env file in the backend folder and add the following
```sh
PORT=4000
MONGO_URI=your_mongoDB_uri

#### For the PayPal button to work add this
PAYPAL_CLIENT_ID=your_paypal_client_id
```
5. Run Application
```sh
run frontend: npm run client
run backend: cd backend => npm run server
run both: npm run dev
```
6. Go to
```sh
http://localhost:3000/
```

## Website

![ReserveNow](https://github.com/PPetkov2000/ReserveNow/blob/main/app-view.png)
