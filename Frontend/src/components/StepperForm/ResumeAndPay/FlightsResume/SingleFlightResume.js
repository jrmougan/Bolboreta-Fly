import AirlineContainer from './AirlineContainer';
import ScheduleContainer from './ScheduleContainer';

const SingleFlightResume = ({ itinerary, airlineCode }) => {
  return (
    <div className='flight_resume_way flight_resume_going'>
      <AirlineContainer itinerary={itinerary} code={airlineCode} />
      {<ScheduleContainer itinerary={itinerary} />}
    </div>
  );
};

export default SingleFlightResume;
