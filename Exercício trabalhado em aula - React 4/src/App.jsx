import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    //https://accounts.spotify.com/api/token

    /*
    Para entender o código abaixo, precisa saber:
    como funciona uma API (FEITO)
    código assíncrono (async, await, promises, then, catch) 
    axios (https://axios-http.com/docs/intro)

    */

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", "7cad8343bc03430cac57a6eb31223b91");
    params.append("client_secret", "b9e2f4e78b4a4538a30923f7af67a946");

//https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=7cad8343bc03430cac57a6eb31223b91&client_secret=b9e2f4e78b4a4538a30923f7af67a946
    
axios.post("https://accounts.spotify.com/api/token", params).then((res) => {
      const accessToken = res.data.access_token;
      console.log(accessToken);
      axios
        .get("https://api.spotify.com/v1/browse/new-releases", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setReleases(res.data.albums.items);

        });
    });
  }, []); // rodar somente uma vez

  // useEffect pode aceitar uma lista de estados, que vai monitorar as alterações
  // pode também aceitar um array vazio para que o useEffect seja executado uma unica vez

  return (
    <>
      <div className="logo">
        <img src="./src/assets/Frame.svg" alt="" />
        <h1>DurvalDiscos</h1>
      </div>
      <p className="description">Pesquise qualquer artista e ouça no Spotify</p>
      <div className="search">
        <input type="text" className="input-search" />
        <button className="btn-search">Pesquisar</button>
      </div>

      <div>
        {releases.map((album) => {
          return (
            <div key={album.id}> {album.name}
              <img src={album.images[0].url} alt="" />
             </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
