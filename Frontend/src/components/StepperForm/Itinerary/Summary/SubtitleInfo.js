const SubtitleInfo = ({ isRoundtrip, totalDuration }) => {
  return (
    <div className='subtitle_info_container'>
      <p className='bold'>{isRoundtrip ? 'Ida y Vuelta' : 'Ida'}</p>
      <span>Duración {totalDuration}</span>
    </div>
  );
};

export default SubtitleInfo;