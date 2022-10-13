import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';



// Product Update Form Function to take inputs from user
const UpdateOne = (props) => {

    // GRABBING VARIABLE FROM URL
    const { id } = useParams();


    // Use History to keep track of instance data
    let history = useHistory();


    // STATE Variables - changing variables
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");


    // // Errors
    // const [errors, setErrors] = useState([]);


    // USE EFFECT TO RENDER INFO WITHOUT REFRESHING
    useEffect(  () => {
        // MAKE AXIOS CALL TO DB >>> GRAB OBJ INFO TO PRE-POPULATE UDATE FORM
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then(res => {
                console.log(res.data);
                setTitle(res.data.product.title);
                setPrice(res.data.product.price);
                setDescription(res.data.product.description);
            })
            .catch(err => console.log(err))
    }, [id])


    // CREATE PRODUCT Function
    const updateProduct = (e) => {
        e.preventDefault();

        // Create the new product obj from the form
        const newProduct = {
            title: title,
            price: price,
            description: description
        }

        // POST form data to the products_db, with the obj(new product) created
        axios.put(`http://localhost:8000/api/products/update/${id}`, newProduct)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS writing to the DB!!");
                history.push("/")
            })
            .catch(err => {
                console.log("ERROR!!!");
                console.log(err);


                // ERROR HANDLING - PLATFORM METHOD
                // const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                // const errorArr = []; // Define a temp error array to push the messages in
                // for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                //     errorArr.push(errorResponse[key].message)
                // }
                // // Set Errors
                // setErrors(errorArr);


                // // HANDLING ERRORS - ALTERNATIVE WAY >>> Use this one!
                // const { errors } = err.response.data.error;
                // const messages = Object.keys(errors).map(error => errors[error].message)
                // console.log(messages);
                // setErrors(messages);

            })
    }


    return <div>
        <h2>Update Product Form</h2>
        <p>
            {/* errors: {JSON.stringify(errors)} */}
        </p>

        {/* UNCOMMENT LINES 72 - 74 TO SEE STATE OF INPUT CHANGE IN REAL TIME */}
        {/* {JSON.stringify(title)} <br />
        {JSON.stringify(price)}<br />
        {JSON.stringify(description)}<br /> */}

        {/* Show errors */}
        {/* {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)} */}



        <form onSubmit={updateProduct} className='form-control' style={{ backgroundColor: "black" }}>
            <div className="form-control mb-3 btn-dark">
                <label htmlFor="" style={{ fontSize: "22px", padding: "0px 10px" }}>Title: </label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} /> <br />
            </div>

            <div className="form-control mb-3 btn-dark" style={{ margin: "0px auto" }}>
                <label htmlFor="" style={{ fontSize: "22px", padding: "0px 10px" }}>Price: </label>
                <input type="number" onChange={e => setPrice(e.target.value)} value={price} /> <br />
            </div>

            <div className="form-control mb-5 btn-dark">
                <label htmlFor="" style={{ fontSize: "22px", paddingRight: "15px", marginLeft: "-40px" }}>Description: </label>
                <textarea onChange={e => setDescription(e.target.value)} value={description}></textarea>
            </div>

            <button type="submit" value="submit" className="btn btn-dark form-control"
                style={{ color: "cyan", padding: "5px 0px", fontSize: "22px" }}>Update</button>
        </form>
    </div>;
};

export default UpdateOne;
