import React, { useState, useContext } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import BookingData from "./FormPassenger/BookingData.";
import RateChoice from "./RateChoice/RateChoice";
import ResumeAndPay from "./ResumeAndPay/ResumeAndPay";
import { Container } from "@mui/material";
import Itinerary from "../StepperForm/Itinerary/Itinerary";
import { OfferPriceContext } from "../../context/OfferPriceContext";
import Pasajero from "./Pasajeros/Pasajeros";
import TodosPasajeros from "./Pasajeros/TodosPasajeros";

const StepForm = () => {
  /* 
  ##################################
  ## Contexto reserva ##
  ##################################
  */
  const [flightOffer] = useContext(OfferPriceContext);
  const { itineraries } = flightOffer;
  console.log("Itineraries Stepper", itineraries);

  console.log("FlightOffer Stepper:");
  console.log(flightOffer);

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

  const [emergencyData, setEmergencyData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [rateCharge, setRateCharge] = useState(0);

  /* 
 #######################
 ## PASOS DEL STEPPER ##
 #######################
 */

  const getStepContent = (page) => {
    if (page === 0) {
      return (
        <TodosPasajeros travelers={travelers} setTravelers={setTravelers} />
      );
    } else if (page === 1) {
      return <BookingData />;
    } else if (page === 2) {
      return (
        <RateChoice
          rateCharge={rateCharge}
          setRateCharge={setRateCharge}
          setTotalPrice={setTotalPrice}
          travelers={travelers}
          isReturn={isReturn}
        />
      );
    } else if (page === 3) {
      return (
        <ResumeAndPay
          rateCharge={rateCharge}
          setRateCharge={setRateCharge}
          totalPrice={totalPrice}
          travelers={travelers}
        />
      );
    } else {
      return (
        <Itinerary
          emergencyData={emergencyData}
          itineraries={itineraries}
          totalPrice={totalPrice}
        />
      );
    }
  };

  function getSteps() {
    return [
      "Información de Pasajeros",
      "Datos de reserva",
      "Elección de tarifa",
      "Resumen y Pago",
      "Itinerario",
    ];
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
    return step === 3;
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
      <div>
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

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  sx={{
                    fontSize: ".7rem",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default StepForm;
