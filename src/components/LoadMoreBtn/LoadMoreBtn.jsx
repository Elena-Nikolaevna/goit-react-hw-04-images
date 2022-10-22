import PropTypes from 'prop-types';
import { LoadButton } from './LoadMoreBtn.styled';
//import styles from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ children, onClick }) => {
  return (
    <LoadButton type="button" onClick={onClick}>
      {children}
    </LoadButton>
  );
}

LoadMoreBtn.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};