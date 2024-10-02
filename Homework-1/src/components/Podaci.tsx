type PodaciProps = {
  date: string;
  address: string;
  contact: string;
};

function Podaci(props: PodaciProps) {
  return (
    <>
      <h2>Personal information</h2>
      <div className="podatak">
        <h3>Date of birth</h3>
        <p>{props.date}</p>
      </div>
      <div className="podatak">
        <h3>Address</h3>
        <p>{props.address}</p>
      </div>
      <div className="podatak">
        <h3>Contact me</h3>
        <p>{props.contact}</p>
      </div>
    </>
  );
}

export default Podaci;
