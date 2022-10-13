import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = (props) => {

    // CREATE STATE VARIABLE
    const [productsData, setProductsData] = useState([])


    // USE EFFECT to render all products on home page render
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                console.log(res.data.products)
                setProductsData(res.data.products)
            })
            .catch(err => console.log(err))
    }, [])


    // DELETE PRODUCT FUNCTION
    const deleteProduct = (deleteId) => {
        // console.log(deleteId);

        // Make Axios Call to server to instruct db to delete
        axios.delete(`http://localhost:8000/api/products/delete/${deleteId}`)
        .then( res => {
            console.log(res.data);
            console.log('PRODUCT DELETED!');

            // Remove Product From DOM After delete succuss
            setProductsData(productsData.filter( (product) => product._id !== deleteId))
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='form-control btn-dark'>
            <h1>All Products</h1>
            <hr />
            {
                // JSON.stringify(data)
                productsData.map((product, _id) => {
                    return (
                            <p key={product._id} style={{ fontSize: "22px" }}>
                                <Link to={ `/products/${product._id}`} style={{ color: "cyan" }}>{product.title}</Link>

                                <button className="btn btn-dark" onClick={ () => deleteProduct(product._id)}
                                style={{ padding: "5px 16px", fontSize: "16px", border: "2px solid cyan", float: "right" }}>Delete</button>
                                {/* <Link to={`/products/delete/${product._id}`} style={{color: "cyan"}}>Delete</Link></button> */}
                            </p>
                    )
                })   
            }
        </div>
    );
};

export default Main;
