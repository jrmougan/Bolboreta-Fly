import React, { useState, useContext } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import BookingData from "./FormPassenger/BookingData";
import ResumeAndPay from "./ResumeAndPay/ResumeAndPay";
import { Container } from "@mui/material";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { OfferPriceContext } from "../../context/OfferPriceContext";
import * as Yup from "yup";
import TodosPasajeros from "./Pasajeros/TodosPasajeros";
import { YearPicker } from "@mui/lab";
import { sub } from "date-fns";
const StepForm = () => {
  /* 
  ##################################
  ## Funciones API de reserva ##
  ##################################
  */

  /* 
  ##################################
  ## Contexto reserva ##
  ##################################
  */
  const [flightOffer] = useContext(OfferPriceContext);

  const isReturn = flightOffer.itineraries.length > 1;

  // Precio total
  const initialPrice = Number(flightOffer.price.total);
  const [totalPrice, setTotalPrice] = useState(initialPrice);

  /* 
  ##################################
  ## INFORMACIÓN DE LOS PASAJEROS ##
  ##################################
  */

  //Num of passengers

  const numTravelers = flightOffer.travelerPricings.length;

  // Populate the travelers state with the number of travelers
  let allTravelers = [];

  for (let i = 0; i < numTravelers; i++) {
    const travelerBody = {
      id: i + 1,
      name: {
        firstName: "",
        lastName: "",
      },
      dateOfBirth: sub(Date.now(), {
        years: 18,
      }),
      gender: "",
      documents: [
        {
          documentType: "",
          number: "",
          issuanceDate: Date.now(),
          expiryDate: Date.now(),
          birthPlace: "",
          issuanceCountry: "ES",
          nacionality: "ES",
        },
      ],
      contact: {
        purpose: "STANDARD",
        phones: [
          {
            deviceType: "",
            countryCallingCode: "",
            number: "",
          },
        ],
        emailAddress: "",
      },
    };
    allTravelers.push(travelerBody);
  }

  const contactData = {
    name: "",
    lastName: "",
    typeDoc: "",
    doc: "",
    address: "",
    country: "",
    city: "",
    phone: "",
  };

  const [rateCharge, setRateCharge] = useState(0);

  /* 
 #######################
 ## PASOS DEL STEPPER ##
 #######################
 */

  const getStepContent = (page) => {
    if (page === 0) {
      return (
        <FormikParent>
          <TodosPasajeros />
        </FormikParent>
      );
    } else if (page === 1) {
      return (
        <FormikParent>
          <BookingData />
        </FormikParent>
      );
    } else if (page === 2) {
      return (
        <FormikParent>
          {" "}
          <ResumeAndPay
            rateCharge={rateCharge}
            setRateCharge={setRateCharge}
            totalPrice={totalPrice}
          />
        </FormikParent>
      );
    }
  };

  function getSteps() {
    return ["Información de Pasajeros", "Datos de reserva", "Resumen y Pago"];
  }

  /* 
  #################################
  ## Funcionamiento del  Stepper ##
  #################################
  */
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  // Elegimos la elección de asiento como un paso opcional (Paso 3)

  const isStepOptional = (step) => {
    return step === 6;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  // Avanza un paso hacia delante
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // Retrocede un paso
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //  Salta al siguiente paso
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("No puedes ir al paso siguiente sin completar el actual");
    }
    // Define el paso que va a estar activado
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  // Esto solo para tenerlo mientras probamos
  // volver atrás
  const handleReset = () => {
    setActiveStep(0);
  };

  /* 
  #################################
  ## COMPONENTE FORMIK ##
  #################################
  */

  const FormikParent = (props) => {
    const { children } = props;

    /* 
  #################################
  ## VALIDACIÓN FORMIK YUP ##
  #################################
  */

    const FormikValidation = Yup.object().shape({
      travelers: Yup.array().of(
        Yup.object().shape({
          name: Yup.object().shape({
            firstName: Yup.string()
              .min(2, "Demasiado corto")
              .max(15, "Demasiado largo")
              .required("Obligatorio"),
            lastName: Yup.string()
              .min(2, "Demasiado corto")
              .max(15, "Demasiado largo")
              .required("Obligatorio"),
          }),
          dateOfBirth: Yup.date("Fecha no válida").required("Obligatorio"),
          gender: Yup.string().required(),
          documents: Yup.array().of(
            Yup.object().shape({
              documentType: Yup.string().required("Obligatorio"),
              number: Yup.string().required("Obligatorio"),
              issuanceDate: Yup.date("Fecha inválida"),
            })
          ),
          contact: Yup.object().shape({
            phones: Yup.array().of(
              Yup.object().shape({
                deviceType: Yup.string().required("Obligatorio"),
              })
            ),
          }),
        })
      ),
      contactData: Yup.object().shape({
        name: Yup.string().min(4, "Demasiado corto").required("Obligatorio"),
        lastName: Yup.string().required("Obligatorio"),
        typeDoc: "",
        doc: "",
        address: "",
        country: "",
        city: "",
        phone: "",
      }),
    });
    return (
      <Formik
        initialValues={{
          travelers: allTravelers,
          contactData: contactData,
        }}
        onSubmit={(values) => {
          console.log("Formulario Válido");
          console.log(values);
        }}
        validationSchema={FormikValidation}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            {React.cloneElement(children, { ...props })}
            <Button type="submit">Boton</Button>
          </form>
        )}
      </Formik>
    );
  };

  return (
    <Container>
      <div className="stepper_container">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Opcional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography>
                Felicidades, la reserva de su vuelo ha sido un éxito
              </Typography>
              <Button onClick={handleReset}>Volver a comenzar</Button>
            </div>
          ) : (
            <div>
              <div> {getStepContent(activeStep)}</div>
              <div className="button_steps">
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  color="primary"
                >
                  Atrás
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                  >
                    Saltar
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{
                      fontSize: ".7rem",
                    }}
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default StepForm;
