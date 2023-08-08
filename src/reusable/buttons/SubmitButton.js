import React from 'react'
import PropTypes, { string } from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import SaveIcon from "@mui/icons-material/Save";
import { Button } from '@mui/material';


/**
 *
 * @param {requestType} Es un estado que puede ser POST o PUT 
 * @param {isLoading} Es un estado booleano 
 * @param {postOrPutTexts} El texto del boton segun el tipo de submit post o put
 * @param {handleSubmit} La funcion que maneja el submit
 * @example
 * <SubmitButton
 *      requestType={requestType}      // suele podria se useSelector de redux o un useState
 *      isLoading={isLoading}          // suele podria se useSelector de redux o un useState
 *      postOrPutTexts={["Crear","Guardar"]}
 *      handleSubmit={formik.handleSubmit}
 * >
 *
 */

function SubmitButton(props) {
const requestType = props.requestType
const isLoading = props.isLoading
const handleSubmit = props.handleSubmit
const textForTypeRequest = props.textForTypeRequest

  return (
    <>
        {requestType === "POST" || requestType === "PUT" ||requestType === "GET" ? (
          isLoading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Guardando...
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
            >
              { requestType === "GET" && textForTypeRequest[0]}
              {requestType === "POST" && textForTypeRequest[1]}
              {requestType === "PUT" && textForTypeRequest[2]}
              

            </Button>
          )
        ) : null}
    </>
  )
}

SubmitButton.propTypes = {
  textForTypeRequest: PropTypes.arrayOf(PropTypes.string),
  isLoading : PropTypes.bool.isRequired,
  requestType: PropTypes.oneOf(['GET', 'POST','PUT']),
  handleSubmit: PropTypes.func
}

export default SubmitButton