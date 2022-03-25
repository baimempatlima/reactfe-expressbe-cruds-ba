import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  const history = useHistory();
  const [status, setStatus] = useState(false);

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post("https://byu-apiexpressmongo.herokuapp.com/api/v4/product", {
      name: name,
      price: price,
      stock: stok,
      status: status,
    });
    history.push("/");
  };
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProduct}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={stok} onChange={(e) => setStok(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
