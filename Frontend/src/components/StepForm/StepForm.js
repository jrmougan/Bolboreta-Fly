import React from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import FormPassenger from '../StepperForm/FormPassenger';
import BookingData from '../StepperForm/BookingData.';
import RateChoice from '../StepperForm/RateChoice';
import SeatChoice from '../StepperForm/SeatChoice/SeatChoice';
import ResumeAndPay from '../StepperForm/ResumeAndPay';
import { Container } from '@mui/material';
import Itinerary from '../StepperForm/Itinerary/Itinerary';

function getSteps() {
  return [
    'Información de Pasajeros',
    'Datos de reserva',
    'Elección de tarifa',
    'Elección de asiento',
    'Resumen y Pago',
    'Itinerario',
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return <FormPassenger />;
    case 1:
      return <BookingData />;
    case 2:
      return <RateChoice />;
    case 3:
      return <SeatChoice />;
    case 4:
      return <ResumeAndPay />;
    case 5:
      return <Itinerary />;
    default:
      return 'No hay pasos por aquí';
  }
}

const StepForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  // Aquí elegimos la elección de asiento como un paso opcional

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
      throw new Error('No puedes ir al paso siguiente sin completar el actual');
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  // Esto solo para tenerlo mientras probamos,
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
                <Typography variant='caption'>Opcional</Typography>
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
              <Typography>{getStepContent(activeStep)}</Typography>
              <div className='button_steps'>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  color='primary'
                >
                  Atrás
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSkip}
                  >
                    Saltar
                  </Button>
                )}

                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
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
