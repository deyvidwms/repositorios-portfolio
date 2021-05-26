const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/* Listar repositorios  */
app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

/* Adicionar novo repositorio */
app.post("/repositories", (request, response) => {

  const body = request.body;

  const repository = { 
    id: uuid(), 
    title: body.title, 
    url: body.url, 
    techs: body.techs, 
    likes: 0 
  };

  repositories.push(repository);

  return response.json(repository);

});

/* Editar repositorio */
app.put("/repositories/:id", (request, response) => {
  
  let { id } = request.params;

  let body = request.body;

  let repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if ( repositoryIndex === -1 )
    return response.status(400).json({error: "Repository not found."});

  const repository = repositories[repositoryIndex];

  repository.title = body.title;
  repository.url = body.url;
  repository.techs = body.techs;

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

/* Deletar repositorio */
app.delete("/repositories/:id", (request, response) => {

  let { id } = request.params;

  let repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if ( repositoryIndex === -1 )
    return response.status(400).json({error: "Repository not found."});

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

/* Adicionar like ao repositorio */
app.post("/repositories/:id/like", (request, response) => {
  
  let { id } = request.params;

  let repositoryIndex = repositories.findIndex( repository => repository.id === id );

  if ( repositoryIndex === -1 )
    return response.status(400).json({error: "Repository not found."});

  const repository = repositories[repositoryIndex];

  repository.likes += 1;

  repositories[repositoryIndex] = repository;

  return response.json(repository);

});

module.exports = app;
