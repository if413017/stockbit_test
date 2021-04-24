![Logo](https://avatars1.githubusercontent.com/u/5658226?s=200&v=4)

Stockbit test!

***
Migrate database

    cd src
    sequqlize db:migrate

run

    npm start
API_URL

    https://limitless-sierra-43882.herokuapp.com

Task
1. Simple Database Querying

fungsi get data terletek di API:

    GET API_URL/API/v1/stockbit/user

2. API search Movies
endpoint search movies by keyword

    GET API_URL/API/v1/stockbit/movie/search
    query:
        keyword: String
        page: Integer
        
endpoint get detail movies

    GET API_URL/API/v1/stockbit/movie/detail
    query:
        imdbID: String
        
Unit test terletak pada folder /test

    npm run test



3. Refactor Code
fuction `findFirstStringInBracket` terletak di API:

    GET API_URL/API/v1/stockbit/user/refactor-code/:word
    query params:
        word: String
        
4. Logic test Anagram
function `anagram` terletak di API:

    GET API_URL/API/v1/stockbit/user/anagram
    
