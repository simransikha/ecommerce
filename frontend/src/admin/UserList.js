import React, { Fragment, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers,deleteUser,clearErrors } from '../actions/userActions';
import {DELETE_USERS_RESET } from '../constants/userConstant';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';

const UserList = () => {

    const alert = useAlert();
    const Navigation = useNavigate();
    const dispatch = useDispatch();

    const { error, users } = useSelector(state => state.allUsers);
    const {isDeleted} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(isDeleted){
          alert.success('Deleted Successfully');
          Navigation('/admin/users')
          dispatch({type: DELETE_USERS_RESET})
        }

    }, [dispatch, alert, error,Navigation,isDeleted]);

    const deleteHandler = (id) => {
        // Handle delete logic here
        dispatch(deleteUser(id))
        
    };

    const setallUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        };
    
        if (users) {
            users.forEach(user => {
                data.rows.push({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role:user.role,
                    actions: (
                        <Fragment>
                            <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                                <i className="fa-solid fa-pencil"></i>
                            </Link>
                            <button  className="btn btn-danger ml-2 py-2 px-2" onClick={() => deleteHandler(user._id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </Fragment>
                    )
                });
            });
        }
    
        return data;
    };

  return (
    <Fragment>
      <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Users</h1>

                    
                            <MDBDataTable
                                data={setallUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        

                    </Fragment>
                </div>
            </div>

    </Fragment>
  )
}

export default UserList
