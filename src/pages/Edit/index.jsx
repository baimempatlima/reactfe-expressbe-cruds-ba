import Input from "../../components/Input";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  const history = useHistory();
  const [status, setStatus] = useState(false);
  const { id } = useParams();

  const editProduct = async (e) => {
    e.preventDefault();
    await axios
      .put("https://byu-apiexpressmongo.herokuapp.com/api/v4/product/" + id, {
        name: name,
        price: price,
        stock: stok,
        status: status,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get("https://byu-apiexpressmongo.herokuapp.com/api/v4/product/" + id);
      setName(response.data.product.name);
      setPrice(response.data.product.price);
      setStok(response.data.product.stock);
      setStatus(response.data.product.status);
    };
    getProductById();
  }, [id]);

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={stok} onChange={(e) => setStok(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => setStatus(e.target.checked)} />

          <button type="submit" className="btn btn-primary" onClick={editProduct}>
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
