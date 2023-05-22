function Uvjeti(props) {
  return (
    <div>
      <label htmlFor="uvjeti">
        <input
          type="checkbox"
          oznaceno={props.oznaceno}
          onChange={props.postaviCheck()}
        />
        <span className="checkmark"></span>
        Prihvaćam uvjete narudžbe
      </label>
    </div>
  );
}
export default Uvjeti;
