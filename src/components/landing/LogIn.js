// client/src/components/LogIn.js

import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Breadcrumb, Button, Card, Form } from 'react-bootstrap'; // new
import { Link, Navigate } from 'react-router-dom';

// changed
function LogIn (props) {

  const [isSubmitted, setSubmitted] = useState(false)
  const onSubmit = async (values, actions) => {
    try {
      const { response, isError} = await props.logIn(values.username, values.password);
      if (!isError) {
        setSubmitted(true);
        return;
      }
      
      const data = response.response.data;

      if (data.detail) {
        actions.setFieldError('__all__', data.detail);
      } else {
        for (const value in data) {
          actions.setFieldError(value, data[value].join(' '));
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  if (props.isLoggedIn || isSubmitted) {
    return <Navigate to='/menu'/>
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href='/#/'>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Ingreso</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Header>Log in</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={onSubmit}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              values
            }) => (
              <>
                {
                  '__all__' in errors && (
                    <Alert variant='danger'>
                      {errors.__all__}
                    </Alert>
                  )
                }
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control 
                      name='username'
                      onChange={handleChange}
                      value={values.username} 
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control 
                      name='password' 
                      onChange={handleChange}
                      type='password'
                      value={values.password} 
                    />
                  </Form.Group>
                  <div className='d-grid mb-3'>
                    <Button 
                      disabled={isSubmitting}
                      type='submit' 
                      variant='primary'
                    >Ingresar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <Card.Text className='text-center'>
            ¿No tenés cuenta aún? <Link to='/sign-up'>Registrate!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default LogIn;