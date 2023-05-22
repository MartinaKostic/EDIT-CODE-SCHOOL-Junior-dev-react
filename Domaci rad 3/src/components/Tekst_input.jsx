function Tekstinput(props) {
  return (
    <div>
      {" "}
      <label htmlFor={props.name}>{props.name}</label>
      <input
        type="text"
        id={props.name}
        value={props.input}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
}
export default Tekstinput;
