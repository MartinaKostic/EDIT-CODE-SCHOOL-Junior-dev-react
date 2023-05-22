function Nacinplacanja(props) {
  return (
    <div>
      <label htmlFor="nacinplacanja">Način plaćanja:</label>
      <div className="odabir">
        {" "}
        <input
          type="radio"
          value="Pouzeće"
          checked={props.placanje === "Pouzeće"}
          onChange={props.postaviRadio()}
        />{" "}
        Pouzeće
        <input
          type="radio"
          value="Kartica"
          checked={props.placanje === "Kartica"}
          onChange={props.postaviRadio()}
        />{" "}
        Kartica
      </div>
    </div>
  );
}
export default Nacinplacanja;
