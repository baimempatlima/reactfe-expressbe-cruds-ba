import { Link, useParams } from "react-router-dom";
import "./index.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_RESTAPI;

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(API_URL + "/product/" + id)
        .then((res) => {
          setProduct(res.data.product);
        })
        .catch((error) => console.log(error));
    };
    getProduct();
  }, [id]);

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product?._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product?.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product?.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product?.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
