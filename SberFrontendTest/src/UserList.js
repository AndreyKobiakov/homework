import React, { useCallback, useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import ErrorWithDelay from './ErrorWithDelay'
import './styles.css';
import API from './API';
import User from './User';

export const UserList = (props) => {
  const newData = new Date();
  let date = `${newData.getDate()}.${newData.getFullYear()}.${newData.getMonth() + 1}`;
  const [userList, setUserList] = useState([])
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    props.getUsers()
      .then((data) => data.filter(people => people.active))
      .then(people => setUserList(people));
  }, [])

  const onSubmit = async values => {
    API.addUser({
      ...values,
      id: (Math.random() * ((1000000 - 6) + 1)) + 6,
      active: true,
      joined: date
    })
      .then((data) => data.filter(people => people.active))
      .then(people => setUserList(people))
  }

  function deleteHandler(id) {
    API.removeUserById(id)
      .then((data) => data.filter(people => people.active))
      .then((people) => {
        setUserList(people)
        setDisable(false)
      });
  }
  const onDelete = useCallback(id => {
    deleteHandler(id);
    setDisable(true)
  }, [])


  const validate = useCallback(values => {
    const errors = {}
    if (!values.name) {
      errors.firstName = "Заполни"
    }
    if (!values.surname) {
      errors.lastName = "Заполни"
    }
    if (!values.gender) {
      errors.gender = "Выбери пол"
    }
    return errors
  }, [])

  return <div>
    <div className="divTable">
      <table className="table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Пол</th>
            <th>Присоеденился</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {userList?.length
            ? userList.map((el) =>
              <User el={el}
                disable={disable}
                key={el.id}
                onDelete={onDelete} />)
            : <tr>
              <td>Пользователей нет ....</td>
            </tr>}
        </tbody>
      </table>
    </div>
    <div className="divForm">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <>
            <div className="divFormInputs">
              <Field name="name">
                {({ input }) => (
                  <div className="divForInput">
                    <label className="lableNames">
                      Имя
                    </label>
                    <input
                      {...input}
                      type="text"
                      placeholder="First Name" />
                    <ErrorWithDelay name="firstName"
                      delay={1000}>
                      {error => <span className="errorsGender">{error}</span>}
                    </ErrorWithDelay>
                  </div>
                )}
              </Field>
              <Field name="surname">
                {({ input }) => (
                  <div className="divForInput">
                    <label className="lableNames">
                      Фамилия
                    </label>
                    <input
                      {...input}
                      type="text"
                      placeholder="Last Name" />
                    <ErrorWithDelay name="lastName"
                      delay={1000}>
                      {error => <span className="errorsGender">{error}</span>}
                    </ErrorWithDelay>
                  </div>
                )}
              </Field>
            </div>
            <div className="inputsDivGender">
              <div className="radio">
                <h4 className="hSex">
                  Пол:
                </h4>
                <div className="lableNameGender">
                <label
                  className="lableNames"
                  for="emale">
                  Мужской
                </label>
                <Field
                  name="gender"
                  value="male"
                  type="radio"
                  component="input" >
                </Field>
                </div>
                <div className="lableNameGender">
                  <label
                    className="lableNames"
                    for="female">
                    Женский
                  </label>
                  <Field
                    name="gender"
                    value="female"
                    type="radio"
                    component="input" >
                  </Field>
                </div>
                <div className="lableNameGender">
                  <label
                    className="lableNames"
                    for="female">
                    Другое
                  </label>
                  <Field
                    name="gender"
                    value="different"
                    type="radio"
                    component="input" >
                  </Field>
              <ErrorWithDelay
                name="gender"
                delay={1000}>
                {error => <span className="errorsGender" >{error}</span>}
              </ErrorWithDelay>
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                type="submit"
                disabled={submitting}
                onClick={() => { handleSubmit().then(form.reset) }}>
                отправить
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                сброс
              </button>
            </div>
          </>
        )}
      />
    </div >
  </div >;
};

export default UserList;
