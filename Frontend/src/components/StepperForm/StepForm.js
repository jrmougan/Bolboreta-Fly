import React, { useState, useContext } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import BookingData from "./FormPassenger/BookingData";
import ResumeAndPay from "./ResumeAndPay/ResumeAndPay";
import { Container } from "@mui/material";

import { OfferPriceContext } from "../../context/OfferPriceContext";

import TodosPasajeros from "./Pasajeros/TodosPasajeros";

const StepForm = () => {
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
      dateOfBirth: null,
      gender: "",
      documents: [
        {
          documentType: "",
          number: "",
          issuanceDate: null,
          expiryDate: null,
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

  const [travelers, setTravelers] = useState(allTravelers);

  const [rateCharge, setRateCharge] = useState(0);

  let allAutoLabel = [];

  for (let i = 0; i < numTravelers; i++) {
    const body = {
      gender: "",
      docType: "",
      telType: "",
      countryCall: "",
    };
    allAutoLabel.push(body);
  }
  const [autoLabels, setAutoLabels] = useState(allAutoLabel);

  /* 
 #######################
 ## ESTADO STEP 2 ##
 #######################
 */
  const [bookingData, setBookingData] = useState({
    name: "",
    lastname: "",
    typedoc: "",
    document: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });
  /* 
 #######################
 ## PASOS DEL STEPPER ##
 #######################
 */

  const getStepContent = (page) => {
    if (page === 0) {
      return (
        <TodosPasajeros
          numTravelers={numTravelers}
          travelers={travelers}
          setTravelers={setTravelers}
          labels={{ autoLabels, setAutoLabels }}
        />
      );
    } else if (page === 1) {
      return <BookingData state={[bookingData, setBookingData]} />;
    } else if (page === 2) {
      return (
        <ResumeAndPay
          rateCharge={rateCharge}
          setRateCharge={setRateCharge}
          totalPrice={totalPrice}
          travelers={travelers}
          bookingData={bookingData}
        />
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
              <div>{getStepContent(activeStep)}</div>
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
