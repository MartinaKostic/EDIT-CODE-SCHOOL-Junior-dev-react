function Button(props) {
  function handleClick() {
    props.action();
  }
  return (
    <div>
      <button disabled={!props.flag} onClick={handleClick}>
        {props.task}
      </button>
    </div>
  );
}

export default Button;
