import { redirect } from 'react-router-dom';

// This is our logout function

export const action = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiration');
  return redirect('/');
};
