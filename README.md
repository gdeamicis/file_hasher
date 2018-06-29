# File Hasher

Obtain a hash from a file, and recover the file providing the hash.

## Requirements

Node version: v6.11.0
Node packages: 
 - Express: ^4.16.3
 - Formidable: ^1.2.1
 - Store: ^2.0.12
 
## Install

1. Clone the git repo - `git clone https://github.com/gdeamicis/file_hasher.git`
2. `cd file_hasher` and run `npm install`
3. run `node server.js` to start up the server

## Endpoints

`/`: A simple hello world page

`/service`: Where the service lives

    - POST: include a file named `upload` on the request, to get the hash generated
    
    - GET: include `hash` as an argument, to get a link to download the file

## Tests

Tested using Postman.
