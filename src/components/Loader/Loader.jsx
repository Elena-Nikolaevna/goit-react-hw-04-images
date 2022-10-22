import { InfinitySpin as Spiner } from 'react-loader-spinner';
import { LoaderBox } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderBox>
      <Spiner width="400" color="#3f51b5" />
    </LoaderBox>
  );
};