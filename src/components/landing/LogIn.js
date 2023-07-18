// client/src/components/LogIn.js

import React, {useState} from "react";
import {Formik, useFormik} from "formik";
// import { Alert, Breadcrumb, Button, Card, Form } from 'react-bootstrap'; // new
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import TextInput from "../../reusable/textInput/TextInput";
import loginSchema from "./logInValidationSchema";
import SubmitButton from "../../reusable/buttons/SubmitButton";
import {loggingIn} from "../../states/authState";
import {useDispatch, useSelector} from "react-redux";

// changed
function LogIn(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoading } = useSelector(state => state.auth)
  const [isSubmitted, setSubmitted] = useState(false);
  const { isError } = useSelector(state=>state.auth)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema.validationSchema,
    onSubmit: () => {
      onSubmit();
    },
  });

  const onSubmit = async (values, actions) => {
    const {username, password} = formik.values;
    console.log(username);
    try {
      dispatch(loggingIn({username, password, navigate}));
      // console.log("Hola mundosss");
      // console.info("isError ",isError )
      // !isError && navigate('/home')
      //     const {response, isError} = await props.logIn(
      //       values.username,
      //       values.password
      //     );
      //     if (!isError) {
      //       setSubmitted(true);
      //       return;
      //     }
      //     const data = response.response.data;

      //     if (data.detail) {
      //       actions.setFieldError("__all__", data.detail);
      //     } else {
      //       for (const value in data) {
      //         actions.setFieldError(value, data[value].join(" "));
      //       }
      //     }
    } catch (error) {
      console.log(error);
    }
  };

  if (props.isLoggedIn || isSubmitted) {
    return <Navigate to="/menu" />;
  }

  return (
    <>
      <Stack spacing={5} sx={{pt: 3}}>
        <TextInput
          nombreVariable="username"
          text={formik.values.username}
          variant="h6"
          editing={true}
          isLoading={isLoading}
          formik={formik}
          label="Nombre de usuario"
        />
        <TextInput
          nombreVariable="password"
          text={formik.password}
          variant="h6"
          editing={true}
          isLoading={isLoading}
          formik={formik}
          label="Contraseña"
          type="password"
        />
        <Stack>
          <SubmitButton
            requestType={"POST"} // suele podria se useSelector de redux o un useState
            isLoading={isLoading} // suele podria se useSelector de redux o un useState
            postOrPutTexts={["Ingresar", "Guardar"]}
            handleSubmit={formik.handleSubmit}
          />
        </Stack>
      </Stack>
      {/* <Breadcrumb>
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
      </Card> */}
    </>
  );
}

export default LogIn;
