import { Route } from 'react-router';
import PhoneNumber from './PhoneNumber';

const ContactCard = props => {
  const { match, history, location } = props;

  const { contactId } = match.params;

  const nextLocation = {
    pathname: match.url + '/phone',
    state: {
        from: location.state.from
    }
  };

  const openPhoneNumber = () => {
    history.push(nextLocation);
  };


  const goBack = () => {
      history.push(location.state.from)
  }

  return (
    <>
      <button onClick={goBack}>GoBack</button>
      <h1>ContactCard {`${contactId}`}</h1>
      <button onClick={openPhoneNumber}>PhoneNumber</button>
      <Route path={'/contacts/:contactId/phone'} component={PhoneNumber} />
    </>
  );
};

export default ContactCard;
