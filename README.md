
# NoteMaker

A challenge that is based on creating a simple notebook, with a basic crud made with requests via restful api.

## Technologies and Tools

For the front-end:
- Nextjs
- TailwindCSS
- Typescript.

For the backend and infra:

- Redis 
- NGINX 
- Postgres
- Django
- Django Rest Framework
- 
## Build and Run
Use the following command to build and run the application

```docker
docker-compose build 
``` 
and
```docker
docker-compose up 
```
to start the application.

If you are getting an error in the nextjs image, start the nextjs application manually, through the "app" folder, with the following command

```node
npm i 
```
and then
```node
 npm run dev
```

Remember to make the migrations so that it works as required.
