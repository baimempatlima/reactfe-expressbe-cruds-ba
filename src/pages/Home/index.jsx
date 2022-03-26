import { Link } from "react-router-dom";
import "./index.scss";
import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_RESTAPI;

const Home = () => {
  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState("");
  const deleteProduct = (id) => {
    axios
      .delete(API_URL + "/product/" + id)
      .then((res) => getProduct())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const response = await axios.get(API_URL + "/product");
    setProduct(response.data.product);
  };

  const searchProduct = (list, searchValue) => {
    let buf = ".*" + searchValue.replace(/(.)/g, "$1.*").toLowerCase();
    var reg = new RegExp(buf);
    let newList = list.filter(function (e) {
      return reg.test(e.name.toLowerCase());
    });
    return newList;
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">Stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {searchProduct(product, keyword).map((item, i) => {
            return (
              <tr key={i}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td className="text-right">{item.price}</td>
                <td className="text-right">{item.stock}</td>
                <td className="text-center">
                  <Link to={`/detail/${item._id}`} className="btn btn-sm btn-info">
                    Detail
                  </Link>
                  <Link to={`/edit/${item._id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <Link to="#" className="btn btn-sm btn-danger" onClick={() => deleteProduct(item._id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
          {/* {products.map((product, _id) => (
            
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
