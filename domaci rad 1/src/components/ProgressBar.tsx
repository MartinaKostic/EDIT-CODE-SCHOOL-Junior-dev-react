type ProgressBarProps = {
  percentage: number;
  label: string;
};

function ProgressBar(props: ProgressBarProps) {
  const progres_color = {
    background: `linear-gradient(to right, pink 0%, pink ${props.percentage}%,transparent 0%, transparent 100%)`,
  };
  return (
    <>
      <h3>{props.label}</h3>
      <div className="progres_bar" style={progres_color}></div>
    </>
  );
}

export default ProgressBar;
