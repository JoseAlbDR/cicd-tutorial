# NODEPOP-ADV

## INSTALLATION

### VIA GIT

#### Development

1.- **Clone the project**

```bash
  git clone https://github.com/JoseAlbDR/practica-node-avanzado.git
```

2.- **Install the project dependencies**

```bash
  npm i
```

3.- **Copy .env.template and rename it to .env, fill the needed environment variables with yours, set STAGE to development**

```js
  # Default Settings

  STAGE=development

  PORT=3000

  MONGO_URL=mongodb://localhost:27017
  MONGO_DB_NAME=nodepop-adv

  JWT_SEED=youSecretKey

  PUBLIC_FOLDER=public
  UPLOADS_FOLDER=uploads
```

4.- **Run the project in development mode**

```bash
  npm run dev
```

5.- **Populate database**

```bash
  npm run seed
```

6.- **Run the Thumbnail Microservice**

```bash
  npm run thumbnail-service
```

#### Production

1.- **Clone the project**

```bash
  git clone https://github.com/JoseAlbDR/practica-node-avanzado.git
```

2.- **Install the project dependencies**

```bash
  npm i
```

3.- **Copy .env.template and rename it to .env, fill the needed environment variables with yours, set STAGE to production**

```js
  # Default Settings

  STAGE=production

  PORT=3000

  MONGO_URL=mongodb://localhost:27017
  MONGO_DB_NAME=nodepop-adv

  JWT_SEED=youSecretKey

  PUBLIC_FOLDER=public
  UPLOADS_FOLDER=uploads
```

4.- **Run build command**

```bash
  npm run build
```

5.- **Run start command**

```bash
  npm start
```

### VIA DOCKER

1.- **Clone the project**

```bash
  git clone https://github.com/JoseAlbDR/practica-node-avanzado.git
```

2.- **Copy .env.template and rename it to .env, fill the needed environment variables with yours, set STAGE to production**

```js
  # Default Settings

  STAGE=production

  PORT=3000

  MONGO_URL=mongodb://localhost:27017
  MONGO_DB_NAME=nodepop-adv

  JWT_SEED=youSecretKey

  PUBLIC_FOLDER=public
  UPLOADS_FOLDER=uploads
```

2.- **Run docker compose**

```bash
  docker compose up
```

3.- **Seed database if needed**

```bash
  npm run seed
```

## TESTING

1.- **Testing uses .env.test environment file, fill it as your needs**

Test are done with jest and supertest, testing all the api endpoints.

Run:

```bash
  npm test
```

**NOTE**: This initializes a new server and empty database

Example .env.test environment file

```js
  PORT=3001

  MONGO_URL=mongodb://localhost:27017/test-db
  MONGO_DB_NAME=nodepop-adv-test

  JWT_SEED=milittlesecret

  PUBLIC_FOLDER=public
  UPLOADS_FOLDER=uploads
```

## FEATURES

1.- **Authentification**

Nodepop-adv uses bcrypt to hash and secure passwords and JWT for authentication.
By signing up the user data is stored in the database with the hashed password.
Login endpoint handles the validation of the password and send back a toke in a cookie.
Auth middleware handles authentication validating the received token in the cookie and setting new property in body called user with the payload from the token

2.- **Internalization**

Nodepop-adv uses i18n library to internalize the application.
By accessing `http://localhost:${PORT}` you will see a Frontend page that shows the current products in database.
In the page you will see two flags, one for spanish language and one for english language, by clicking in then you can switch the language of the page.

3.- **Image upload with thumbnail background task**

Nodepop-adv uses express-fileupload to handle the upload of the products images.
When uploading an image it will be stored in ${PUBLIC_FOLDER}/${UPLOADS_FOLDER}/products, public/uploads/products by default.
The uploaded image name will be generated based in the original name plus an unique identifier.

A thumbnail is generated while uploading an image using Cote for the microservice and jimp to build the thumbnail.
In the FileUploadService a event will be fired called 'generate-thumbnail' and the ThumbnailMicroservice will be listening for that event to generate the thumbnail.
