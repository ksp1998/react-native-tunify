import React from 'react';
import {AudiosList} from '../components';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const AllTunesList = (): JSX.Element => {
  const audioFiles = useSelector((state: RootState) => state.audio.audioFiles);

  return <AudiosList tunes={audioFiles} />;
};

export default AllTunesList;
