function Carro({ nome, ano, potencia, fabricante, preco, id }) {
  return (
    <>
      <h2>{nome}</h2>
      <p>Ano: {ano}</p>
      <p>Potência: {potencia}</p>
      <p>Fabricante: {fabricante}</p>
      <p>Preço: {preco}</p>
      <p>Id: {id}</p>
    </>
  );
}

export default Carro;
