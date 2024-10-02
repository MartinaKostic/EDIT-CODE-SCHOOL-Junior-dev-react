function Sazetak(props) {
  return (
    <div>
      <h2>Sazetak Narudžbe</h2>

      <h4>Vaš kontakt:</h4>
      <p> {props.kontakt}</p>

      <h4>Ime</h4>
      <p>{props.ime}</p>

      <h4>Adresa</h4>
      <p>{props.adresa}</p>

      <h4>Drzava</h4>
      <p>{props.drzava}</p>

      <h4>Vaš način plaćanja</h4>
      <p>{props.placanje}</p>
    </div>
  );
}

export default Sazetak;
