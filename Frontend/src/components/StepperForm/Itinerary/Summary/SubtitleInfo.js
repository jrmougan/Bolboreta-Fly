import { durationFormat } from '../../../../helpers/formatHelp';

const SubtitleInfo = ({ isRoundtrip, totalDuration }) => {
  return (
    <div className='subtitle_info_container'>
      <p className='bold'>{isRoundtrip ? 'Vuelta' : 'Ida'}</p>
      <span>Duración {durationFormat(totalDuration)}</span>
    </div>
  );
};

export default SubtitleInfo;
