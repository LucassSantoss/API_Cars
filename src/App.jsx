import { useState, useEffect } from "react";
import Button from "./Button";
import Carro from "./Carro";

function App() {
  const [link, setLink] = useState(
    "http://ifsp.ddns.net/webservices/carro/carro"
  );
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    if (link != ".") {
      fetch(link)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data != null) {
            setCarros(Array.isArray(data) ? data : [data]);
          } else {
            alert("Esse carro não existe");
          }
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [link]);

  function showAllCars() {
    setLink(".");
    setLink("http://ifsp.ddns.net/webservices/carro/carro/");
  }

  function showIndexCar() {
    let index = prompt("Digite o índice do carro que deseja procurar: ");
    setLink(`http://ifsp.ddns.net/webservices/carro/carro/${index}`);
  }

  function postCar() {
    let nome = prompt("Nome do carro: ");
    let fabricante = prompt("Fabricante: ");
    let ano = prompt("Ano: ");
    let preco = prompt("Preço: ");
    let potencia = prompt("Potência");
    fetch("http://ifsp.ddns.net/webservices/carro/carro", {
      method: "POST",
      headers: {
        "Content-Type": "postCar",
      },
      body: JSON.stringify({
        nome: nome,
        fabricante: fabricante,
        ano: ano,
        preco: preco,
        potencia: potencia,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          setCarros(Array.isArray(data) ? data : [data]);
          setLink(".");
        } else {
          alert("Esse carro não foi adicionado");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function editCar() {
    let index = prompt("Índice do carro: ");
    let nome = prompt("Nome do carro: ");
    let fabricante = prompt("Fabricante: ");
    let ano = prompt("Ano: ");
    let preco = prompt("Preço: ");
    let potencia = prompt("Potência");
    fetch(`http://ifsp.ddns.net/webservices/carro/carro/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "editCar",
      },
      body: JSON.stringify({
        nome: nome,
        fabricante: fabricante,
        ano: ano,
        preco: preco,
        potencia: potencia,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          setCarros(Array.isArray(data) ? data : [data]);
          setLink(".");
        } else {
          alert("Esse carro não foi editado");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deletCar() {
    let index = prompt("Índice do carro: ");
    setLink(".");
    fetch(`http://ifsp.ddns.net/webservices/carro/carro/${index}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "deleteCar",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != null) {
          setLink("http://ifsp.ddns.net/webservices/carro/carro/");
        } else {
          alert("Esse carro não existe");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <header>
        <h1>Lista de carros</h1>
      </header>
      <main>
        <ul>
          {carros.map((carro) => {
            return (
              <Carro
                key={carro.id}
                nome={carro.nome}
                ano={carro.ano}
                potencia={carro.potencia}
                fabricante={carro.fabricante}
                preco={carro.preco}
                id={carro.id}
              />
            );
          })}
        </ul>
      </main>
      <div id="divButton">
        <Button funcao={showAllCars} msg="Mostrar todos os carros" />
        <Button funcao={showIndexCar} msg="Mostrar carro por índice" />
        <Button funcao={postCar} msg="Cadastrar novo carro" />
        <Button funcao={editCar} msg="Editar carro" />
        <Button funcao={deletCar} msg="Deletar um carro" />
      </div>
    </>
  );
}

export default App;
