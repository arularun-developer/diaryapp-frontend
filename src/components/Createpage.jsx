import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createpage() {
    const [data, setData] = useState({
        title: "",
        date: "",
        document: "",
    });
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);



    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };


    const token = localStorage.getItem("token");

    const config = {
        headers: {
            'x-auth-token': `${token}`,
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const url = "https://dairyapp.onrender.com/dairy/add";
            const response = await axios.post(url, data, config);


            navigate("/view");
            toast.success("Create Notes Successfully");



        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
            }
        }
    };

    return (
        <>
            <Navbar />
            <br /><br /><br />
            <div className="container  d-flex align-items-center justify-content-center  py-md-0 ">
                <div className="col-md-7">
                    <div className="text-center p-5 border border-3 rounded-4 border-warning bg-dark.bg-gradient">
                        <h2 className=" fw-bolder text pb-2 text-warning" >Create</h2>
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-warning float-start" >
                                    Title
                                </label>
                                <input type="text" className="form-control" placeholder="Title"
                                    required
                                    name='title'
                                    value={data.title}
                                    onChange={handleChange} />

                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label text-warning float-start"
                                >
                                    Date
                                </label>
                                <input type="date" className="form-control" placeholder="Date"
                                    required
                                    name='date'
                                    value={data.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="document" className="form-label text-warning float-start">
                                    Notes
                                </label>
                                <textarea type="text" className="form-control h-25 "
                                    name="document"
                                    value={data.document}
                                    onChange={handleChange}
                                    placeholder="Notes"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btncolor text-center mt-3 w-50"
                            >
                                {isLoading ? (
                                    <span className='spinner-border text-dark mx-2'></span>
                                ) : (
                                    "Add Content"
                                )}
                            </button>

                            <ToastContainer />

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Createpage