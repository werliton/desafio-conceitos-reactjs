import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";
import { endpoints } from "./utils/constants";

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const project = {
      title: `Projeto Piloto ${Date.now()}`,
      owner: "Werliton Silva"
    }
    const repositoryCreated = await api.post(endpoints.repositories, project)

    setRepositories([
      ...repositories, repositoryCreated.data
    ])
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  useEffect(() => {
    loadRepositories()
  }, [])

  async function loadRepositories() {
    const response = api.get(endpoints.repositories)

    setRepositories((await response).data)
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.length === 0 ?
            <h2>Nenhum repositório cadastrado!</h2>
            :
            repositories.map(item => {
              return (
                <li key={item.id}>
                  <b>{item.title}</b>

                  <button onClick={() => handleRemoveRepository(1)}>
                    Remover
                  </button>
                </li>
              )
            })

        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
