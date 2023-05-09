import "./Obavijesti.css";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useContext } from "react";
import ModeContext from "../ModeContext";

function Obavijesti() {
  const mode = useContext(ModeContext);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    naslov: "",
    tekst: "",
    vazno: false,
    datum: new Date(),
  });
  const [isImportant, setIsImportant] = useState(false);
  const [notice, setNotice] = useState([]);

  function onChange(e) {
    setIsImportant((prev) => !prev);
    setForm({ ...form, [e.target.name]: e.target.checked });
  }

  useEffect(() => {
    refetchNotice();
  }, []);

  function refetchNotice() {
    axios.get("http://localhost:3003/obavijesti").then((res) => {
      sortItems(res.data);
    });
  }

  async function deleteNotice(noticeId) {
    await axios.delete(`http://localhost:3003/obavijesti/${noticeId}`);
    refetchNotice();
  }

  const sortItems = (notices) => {
    const sortedItems = notices.sort(
      (a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime()
    );
    console.log(sortedItems);
    setNotice(sortedItems);
  };

  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3003/obavijesti", form).then(() => {
      refetchNotice();
      setOpenForm(false);
      setForm({
        naslov: "",
        tekst: "",
        vazno: false,
        datum: new Date(),
      });
    });
  };

  function inputChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div className="section">
      <h2>Unesi novu obavijest!</h2>
      <button onClick={() => setOpenForm(true)}>Nova Obavijest</button>

      {openForm ? (
        <form className="forma" onSubmit={sendData}>
          <div>
            <label>
              Naslov:
              <input
                className="input"
                type="text"
                name="naslov"
                placeholder="Unesite naslov"
                value={form.naslov}
                onChange={inputChange}
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              <span style={{ display: "block" }}>Tekst:</span>
              <textarea
                className="input"
                type="text"
                name="tekst"
                value={form.tekst}
                onChange={inputChange}
                required
              ></textarea>
            </label>
          </div>
          {mode == "admin" ? (
            <label className="checkbox">
              Važno:
              <input
                type="checkbox"
                name="vazno"
                checked={isImportant}
                onChange={onChange}
              ></input>
            </label>
          ) : null}

          <button className="add" type="submit">
            Objavi!
          </button>
        </form>
      ) : null}

      <div className="notices">
        {notice.map((notice) => (
          <div key={notice.id} className="notice">
            {notice.vazno ? <p className="important">VAŽNO!</p> : null}
            <div className="naslov">
              <h2>{notice.naslov}</h2>
              <h3>
                Datum: {new Date(notice.datum).toLocaleDateString("en-GB")}
              </h3>
            </div>
            <p>{notice.tekst}</p>
            {mode == "admin" ? (
              <button
                className="delete_bottun"
                onClick={() => deleteNotice(notice.id)}
              >
                <RiDeleteBinLine></RiDeleteBinLine>
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Obavijesti;
