import React, { Fragment, useState } from 'react'
import Wrapper from '../../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css'

const AddUser = (props) => {

  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const addUserHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: 'Invalid Input',
        message: 'Please Enter a valid name and age (non-empty values)'
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please Enter a valid age (>0)'
      });
      return;
    }
    // console.log(username, age);
    props.onAddUser(username, age);
    setUsername('');
    setAge('');
  }

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  }

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  }

  const errorHandler=()=>{
    setError(null);
  }

  return (
    <Fragment>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>User</label>
          <input id='username' type="text" value={username} onChange={usernameChangeHandler} />
          <label htmlFor="age">Age</label>
          <input id='age' type="number" value={age} onChange={ageChangeHandler} />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Fragment>
  )
}

export default AddUser
