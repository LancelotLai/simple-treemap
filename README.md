# User Guide

- Dockerize and used git action for CI/CD

## Details

First, run the development server:

```bash
yarn dev
```

Or start a production server:

```bash
yarn build && yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Start the Visual Test by running storybook:

```bash
yarn storybook
```

The page auto-updates as you edit the file.

```.env.local``` is for your local environment
```.env.development``` is for your develop environment (development)
```.env.production``` is for your production environment (production)

start docker image with:

``` bash
docker-compose up --build
```

use git action for ci/cd:

``` bash
node -- development & production
docker -- production
```
