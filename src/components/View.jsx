import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsPlusCircleFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";


function View() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');


  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  const [read, setRead] = useState([]);

  useEffect(() => {
    axios
      .get('https://dairyapp.onrender.com/dairy/all', config)
      .then((response) => {
        setRead(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://dairyapp.onrender.com/dairy/delete/${id}`, config)
      .then(() => {
        toast.error('Data will be deleted');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting notes:', error);
      });


  };
  const navigateToCreate = () => {
    navigate('/Create');
  };
  return (
    <div>
      <Navbar />


      <div style={{ marginTop: "5rem" }} className="container  p-3 mb-5 bg-body-tertiary rounded-3 ">

        <div className="row">
          <div>
            <BsPlusCircleFill className='float-end fs-1 text-success ps-2' onClick={navigateToCreate}></BsPlusCircleFill>
          </div>
          {read.map((element) => (
            <div className="col-sm-6 mb-3 mb-sm-0" key={element._id}>
              <div className="card my-2">
                <div className="card-body py-2" style={{ 'background-color': '#a7c7cb' }}>
                  <h5 className="card-title float-end badge rounded-pill text-bg-success text-white ">{element.title}</h5>
                  <h6 className="card-subtitle mb-2 ">
                    {element.date}
                  </h6>
                  <p className="card-text text-white fw-bolder">{element.document}</p>
                  <div>
                    <Link className='fs-2 text-success' to={`/edit/${element._id}`}>
                      <AiFillEdit />
                    </Link>
                    <Link className='fs-2 text-danger px-2' onClick={() => handleDelete(element._id)}>
                      <BsFillTrashFill />

                    </Link>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default View