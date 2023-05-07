import "./Obavijesti.css";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
function Obavijesti({ notice, setnotice }) {
  const [isImportant, setIsImportant] = useState(false);
  function onChange() {
    setIsImportant(!isImportant);
  }
  async function deleteNotice(idNotice) {
    await axios.delete(`http://localhost:3002/ormar/${idNotice}`);
    const rez = await axios.get("http://localhost:3003/obavijesti");
    setnotice(rez.data);
  }
  return (
    <div className="section">
      <h2>Unesi novu obavijest!</h2>

      <form className="forma">
        <div>
          <label>
            Naslov:
            <input
              className="input"
              type="text"
              name="naslov"
              placeholder="Unesite naslov"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            Tekst:
            <input
              className="input"
              type="text"
              name="text"
              placeholder="Unesite tekst"
              required
            ></input>
          </label>
        </div>
        <label className="checkbox">
          Važno:
          <input
            type="checkbox"
            name="vazno"
            checked={isImportant}
            onChange={onChange}
          ></input>
        </label>
        <button className="add" type="submit">
          Objavi!
        </button>
      </form>

      <div className="notices">
        {notice.map((notice) => (
          <div key={notice.id} className="notice">
            <div className="naslov">
              <h2>{notice.naslov}</h2>
              <h3>Datum: {notice.datum}</h3>
            </div>
            <p>{notice.tekst}</p>
            <button
              className="delete_bottun"
              onClick={() => deleteNotice(notice.id)}
            >
              <RiDeleteBinLine></RiDeleteBinLine>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Obavijesti;
