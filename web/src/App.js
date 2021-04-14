import React, { useEffect, useState } from 'react';
import api from './services/api';
import './Global.css';
import './Sidebar.css';
import './App.css';
import './Main.css';

function App() {
  const [dadosUsuario, setDadosUsuario] = useState([]);

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDadosUsuario({ ...dadosUsuario, latitude, longitude });
      },
      (err) => {
        console.log(err)
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function loadDevs() {
    const response = await api.get('/devs');
    setDevs(response.data);
    console.log(response.data)
  }
  useEffect(() => {

    loadDevs();
  }, []);
  async function handleAddDev(e) {
    e.preventDefault();
    const response = await api.post('/devs', dadosUsuario);
    console.log(response);
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário Github</label>
            <input

              name="github_username"
              id="github_username"
              required
              value={dadosUsuario.github_username}
              onChange={e => setDadosUsuario({
                ...dadosUsuario, github_username: e.target.value
              })}
            />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={dadosUsuario.techs}
              onChange={e => setDadosUsuario({
                ...dadosUsuario, techs: e.target.value
              })}
            />
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type='number'
                name="latitude"
                id="latitude"
                required
                value={dadosUsuario.latitude}
                onChange={e => setDadosUsuario({
                  ...dadosUsuario, latitude: e.target.value
                })}
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={dadosUsuario.longitude}
                onChange={e => setDadosUsuario({
                  ...dadosUsuario, longitude: e.target.value
                })}
              />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev.github_username} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>
                    {dev.name}
                  </strong>
                  <div className="techs">
                    {dev.techs.map(tech => (
                      <code key={dev._id + Math.random(0, 100)}>   {tech}.</code>
                    ))}
                  </div>
                  <span>
                    {dev.company}
                  </span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <br />
              <div className="buttons">
                <div className="button" type="button">
                  <a href={`https://github.com/${dev.github_username}`}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQ3OC42MTMgNDc4LjYxMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDc4LjYxMyA0NzguNjEzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iWE1MSURfMTIyXyI+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00MjcuNTAxLDIwMC42OTVjMS43NzYtMTEuMjM4LDIuODg0LTIzLjU2LDMuMTYzLTM3LjM3N2MtMC4xMDctNTkuMjQ2LTI4LjQ2OC04MC4yMS0zMy45MjUtOTAuMDM4DQoJCQljOC4wMzctNDQuODktMS4zMzEtNjUuMzA5LTUuNjg4LTcyLjI5OWMtMTYuMDctNS43MDQtNTUuOTEsMTQuNzIyLTc3LjY3OCwyOS4xMDFjLTM1LjQ5MS0xMC4zODktMTEwLjQ5NC05LjM3NS0xMzguNjIxLDIuNjg5DQoJCQlDMTIyLjg1Ni00LjM4OSw5NS40MDgsMS4yNzcsOTUuNDA4LDEuMjc3cy0xNy43NDUsMzEuODItNC42OTEsNzguMzcxYy0xNy4wNzUsMjEuNzU5LTI5LjgwMiwzNy4xNDMtMjkuODAyLDc3Ljk0OQ0KCQkJYzAsOS43NzMsMC42MDcsMTkuMDA4LDEuNjM3LDI3Ljg5M2MxNC43MDUsNzcuMzE4LDc1Ljk3LDExMC42NzQsMTM2LjE1LDExNi40MjZjLTkuMDU2LDYuODgxLTE5LjkyOCwxOS45MDMtMjEuNDMyLDM0Ljk5Mg0KCQkJYy0xMS4zNzksNy4zNTctMzQuMjY4LDkuNzg5LTUyLjA2Nyw0LjE5M2MtMjQuOTM5LTcuODgtMzQuNDg2LTU3LjI2Ni03MS44MzMtNTAuMjIxYy04LjA4MSwxLjUxMi02LjQ3NSw2Ljg0MiwwLjUyMywxMS4zODYNCgkJCWMxMS4zNzgsNy4zOCwyMi4wOTQsMTYuNTU0LDMwLjM1NCwzNi4xODVjNi4zNDQsMTUuMDcyLDE5LjY4Nyw0MS45ODIsNjEuODczLDQxLjk4MmMxNi43NDcsMCwyOC40NzctMS45NzksMjguNDc3LTEuOTc5DQoJCQlzMC4zMTksMzguNDA2LDAuMzE5LDUzLjM4NWMwLDE3LjIzOC0yMy4yNjQsMjIuMDc4LTIzLjI2NCwzMC4zNDhjMCwzLjI4OSw3LjcsMy42MDEsMTMuODg4LDMuNjAxDQoJCQljMTIuMjI5LDAsMzcuNjczLTEwLjE4NiwzNy42NzMtMjguMTAzYzAtMTQuMjM3LDAuMjI3LTYyLjA4MSwwLjIyNy03MC40NmMwLTE4LjMwNyw5LjgxMS0yNC4xMzYsOS44MTEtMjQuMTM2DQoJCQlzMS4yMDEsOTcuNzI3LTIuMzYxLDExMC44MjljLTQuMTc3LDE1LjQwOC0xMS43NDQsMTMuMjE5LTExLjc0NCwyMC4wNzZjMCwxMC4yMzMsMzAuNTg5LDIuNTAyLDQwLjczNS0xOS44OTcNCgkJCWM3Ljg0OS0xNy40OTUsNC4zMzQtMTEzLjMzMSw0LjMzNC0xMTMuMzMxbDguMTgzLTAuMTc4YzAsMCwwLjA5NCw0My44OTItMC4xODgsNjMuOTQ0Yy0wLjI5NSwyMC43NjktMi40MzgsNDcuMDI1LDkuODk4LDU5LjQxNw0KCQkJYzguMDk3LDguMTUsMzIuOTAzLDIyLjQ1MSwzMi45MDMsOS4zODJjMC03LjU3NC0xNy4zNzEtMTMuODMzLTE3LjM3MS0zNC4zNTNWMzQ0LjQ1YzEwLjU1MywwLDEyLjczNCwzMS4wNzIsMTIuNzM0LDMxLjA3Mg0KCQkJbDMuODA0LDU3LjcyN2MwLDAtMi41MjYsMjEuMDY1LDIyLjc1NiwyOS44NTZjOC45MjUsMy4xMjYsMjguMDE4LDMuOTc2LDI4LjkxMy0xLjI3MWMwLjg5Ny01LjI2LTIyLjk5LTEzLjAzOC0yMy4yMTctMjkuMzQyDQoJCQljLTAuMTIzLTkuOTMsMC40NDUtMTUuNzQyLDAuNDQ1LTU4LjkzNGMwLTQzLjE2OC01Ljc5OS01OS4xMzctMjYuMDA3LTcxLjg2M0MzNTUuNjY5LDI5NS42ODEsNDE2LjUzNiwyNjkuNTEsNDI3LjUwMSwyMDAuNjk1eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" alt="Github" />
                    <strong>
                      Github
                    </strong>
                  </a>
                </div>
                <div
                  onClick={() => {
                    setDadosUsuario({ ...dev })
                    console.log(dev)
                  }}
                  className="button"
                  id="alterar"
                  type="button">
                  <a href="#"> <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDUyLjAyNSA0NTIuMDI1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTIuMDI1IDQ1Mi4wMjU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMTQ3LjkxMiwzNjMuMzI1Yy00LjctNC43LTEyLjMtNC43LTE3LDBjLTQuNyw0LjctNC43LDEyLjMsMCwxN2wxMy42LDEzLjZoLTU1LjJjLTM1LjksMC02NS0yOS4yLTY1LTY1di00MC4zDQoJCQljMC02LjYtNS40LTEyLTEyLTEycy0xMiw1LjQtMTIsMTJ2NDAuM2MwLDQ5LjEsMzkuOSw4OSw4OSw4OWg1NS4ybC0xMy42LDEzLjZjLTQuNyw0LjctNC43LDEyLjMsMCwxN2MyLjMsMi4zLDUuNCwzLjUsOC41LDMuNQ0KCQkJczYuMS0xLjIsOC41LTMuNWwzNC4xLTM0LjFjNC43LTQuNyw0LjctMTIuMywwLTE3TDE0Ny45MTIsMzYzLjMyNXoiLz4NCgkJPHBhdGggZD0iTTIxMC4zMTIsMC4wMjVoLTE5Ny4xYy02LjYsMC0xMiw1LjQtMTIsMTJ2MTk3LjFjMCw2LjYsNS40LDEyLDEyLDEyaDE5Ny4xYzYuNiwwLDEyLTUuNCwxMi0xMnYtMTk3LjENCgkJCUMyMjIuMzEyLDUuNDI1LDIxNy4wMTIsMC4wMjUsMjEwLjMxMiwwLjAyNXogTTE5OC4zMTIsMTk3LjEyNWgtMTczLjF2LTE3My4xaDE3My4xVjE5Ny4xMjV6Ii8+DQoJCTxwYXRoIGQ9Ik0zNjIuNjEyLDM0LjEyNWgtNTUuMmwxMy42LTEzLjZjNC43LTQuNyw0LjctMTIuMywwLTE3cy0xMi4zLTQuNy0xNywwbC0zNCwzNC4xYy00LjcsNC43LTQuNywxMi4zLDAsMTdsMzQuMSwzNC4xDQoJCQljMi4zLDIuMyw1LjQsMy41LDguNSwzLjVzNi4xLTEuMiw4LjUtMy41YzQuNy00LjcsNC43LTEyLjMsMC0xN2wtMTMuNi0xMy42aDU1LjJjMzUuOSwwLDY1LDI5LjIsNjUsNjV2NDAuM2MwLDYuNiw1LjQsMTIsMTIsMTINCgkJCXMxMi01LjQsMTItMTJ2LTQwLjNDNDUxLjcxMiw3NC4wMjUsNDExLjcxMiwzNC4xMjUsMzYyLjYxMiwzNC4xMjV6Ii8+DQoJCTxwYXRoIGQ9Ik00MzguODEyLDQyOC4wMjVjLTMuMiwwLTYuMywxLjMtOC41LDMuNXMtMy41LDUuMy0zLjUsOC41YzAsMy4xLDEuMyw2LjMsMy41LDguNXM1LjMsMy41LDguNSwzLjVzNi4zLTEuMyw4LjUtMy41DQoJCQlzMy41LTUuMywzLjUtOC41cy0xLjMtNi4zLTMuNS04LjVDNDQ1LjAxMiw0MjkuMzI1LDQ0MS45MTIsNDI4LjAyNSw0MzguODEyLDQyOC4wMjV6Ii8+DQoJCTxwYXRoIGQ9Ik0zODkuNTEyLDQyOC4wMjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzM5Ni4xMTIsNDI4LjAyNSwzODkuNTEyLDQyOC4wMjV6Ii8+DQoJCTxwYXRoIGQ9Ik0yOTAuOTEyLDQyOC4wMjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzI5Ny42MTIsNDI4LjAyNSwyOTAuOTEyLDQyOC4wMjV6Ii8+DQoJCTxwYXRoIGQ9Ik0zNDAuMjEyLDQyOC4wMjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzM0Ni44MTIsNDI4LjAyNSwzNDAuMjEyLDQyOC4wMjV6Ii8+DQoJCTxwYXRoIGQ9Ik0yNDEuNzEzLDQyOC4wMjVjLTMuMiwwLTYuMywxLjMtOC41LDMuNXMtMy41LDUuMy0zLjUsOC41YzAsMy4xLDEuMyw2LjMsMy41LDguNXM1LjMsMy41LDguNSwzLjVjMy4xLDAsNi4zLTEuMyw4LjUtMy41DQoJCQlzMy41LTUuMywzLjUtOC41cy0xLjMtNi4zLTMuNS04LjVTMjQ0LjgxMiw0MjguMDI1LDI0MS43MTMsNDI4LjAyNXoiLz4NCgkJPHBhdGggZD0iTTI0MS43MTMsMzc4LjcyNWMtNi42LDAtMTIsNS40LTEyLDEyczUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJTMjQ4LjMxMiwzNzguNzI1LDI0MS43MTMsMzc4LjcyNXoiLz4NCgkJPHBhdGggZD0iTTI0MS43MTMsMzI5LjQyNWMtNi42LDAtMTIsNS40LTEyLDEyczUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJTMjQ4LjMxMiwzMjkuNDI1LDI0MS43MTMsMzI5LjQyNXoiLz4NCgkJPHBhdGggZD0iTTI0MS43MTMsMjgwLjEyNWMtNi42LDAtMTIsNS40LTEyLDEyczUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJTMjQ4LjMxMiwyODAuMTI1LDI0MS43MTMsMjgwLjEyNXoiLz4NCgkJPHBhdGggZD0iTTI0MS43MTMsMjMwLjkyNWMtMy4yLDAtNi4zLDEuMy04LjUsMy41cy0zLjUsNS4zLTMuNSw4LjVzMS4zLDYuMywzLjUsOC41czUuMywzLjUsOC41LDMuNWMzLjEsMCw2LjMtMS4zLDguNS0zLjUNCgkJCXMzLjUtNS4zLDMuNS04LjVjMC0zLjEtMS4zLTYuMy0zLjUtOC41QzI0Ny45MTIsMjMyLjEyNSwyNDQuODEyLDIzMC45MjUsMjQxLjcxMywyMzAuOTI1eiIvPg0KCQk8cGF0aCBkPSJNMzg5LjUxMiwyMzAuOTI1Yy02LjYsMC0xMiw1LjQtMTIsMTJzNS40LDEyLDEyLDEyczEyLTUuNCwxMi0xMlMzOTYuMTEyLDIzMC45MjUsMzg5LjUxMiwyMzAuOTI1eiIvPg0KCQk8cGF0aCBkPSJNMzQwLjIxMiwyMzAuOTI1Yy02LjYsMC0xMiw1LjQtMTIsMTJzNS40LDEyLDEyLDEyczEyLTUuNCwxMi0xMlMzNDYuODEyLDIzMC45MjUsMzQwLjIxMiwyMzAuOTI1eiIvPg0KCQk8cGF0aCBkPSJNMjkwLjkxMiwyMzAuOTI1Yy02LjYsMC0xMiw1LjQtMTIsMTJzNS40LDEyLDEyLDEyczEyLTUuNCwxMi0xMlMyOTcuNjEyLDIzMC45MjUsMjkwLjkxMiwyMzAuOTI1eiIvPg0KCQk8cGF0aCBkPSJNNDM4LjgxMiwyMzAuOTI1Yy0zLjIsMC02LjMsMS4zLTguNSwzLjVzLTMuNSw1LjMtMy41LDguNXMxLjMsNi4zLDMuNSw4LjVzNS4zLDMuNSw4LjUsMy41czYuMy0xLjMsOC41LTMuNQ0KCQkJczMuNS01LjMsMy41LTguNWMwLTMuMS0xLjMtNi4zLTMuNS04LjVDNDQ1LjAxMiwyMzIuMjI1LDQ0MS45MTIsMjMwLjkyNSw0MzguODEyLDIzMC45MjV6Ii8+DQoJCTxwYXRoIGQ9Ik00MzguODEyLDI4MC4xMjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzQ0NS40MTIsMjgwLjEyNSw0MzguODEyLDI4MC4xMjV6Ii8+DQoJCTxwYXRoIGQ9Ik00MzguODEyLDM3OC43MjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzQ0NS40MTIsMzc4LjcyNSw0MzguODEyLDM3OC43MjV6Ii8+DQoJCTxwYXRoIGQ9Ik00MzguODEyLDMyOS40MjVjLTYuNiwwLTEyLDUuNC0xMiwxMnM1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyUzQ0NS40MTIsMzI5LjQyNSw0MzguODEyLDMyOS40MjV6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" alt="Alterar" />
                    <strong>
                      Alterar
                  </strong>
                  </a>

                </div>

              </div>
            </li>
          ))}
        </ul>
      </main>
    </div >
  );
}

export default App;
