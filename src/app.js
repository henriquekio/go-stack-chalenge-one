const express = require("express");
const cors = require("cors");
const {v4: uuid} = require('uuid');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title = '', url = '', techs = []} = request.body
  const repository = {id: uuid(), title, url, techs, likes: 0}
  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const {title = '', url = '', techs = []} = request.body
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Invalid repository'})
  }

  const repository = {id: uuid(), title, url, techs, likes: 0}
  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  if (repositoryIndex < 0) {
    return response.status(400).json({error: 'Invalid repository'})
  }

  repositories.splice(repositoryIndex)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const repositoryIndex = repositories.findIndex(repo => repo.id === id)
  if(repositoryIndex < 0 ){
    return response.status(400).json({error: 'Invalid repository'})
  }
  const repository = repositories[repositoryIndex]
  repositories[repositoryIndex] = {...repository, likes: repository.likes + 1}
  const likes= {likes: repositories[repositoryIndex].likes}

  return response.json(likes)
});

module.exports = app;
