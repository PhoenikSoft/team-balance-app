import { connect } from 'react-redux';

import { userActions } from '../actions';
import SignUp from './SignUp';


const mapDispatchToProps = dispatch => {
    return {
        onRegisterClick: e => {
            e.preventDefault();
            return (inputs) => {
                dispatch(userActions.update(inputs));
            };
        }
    }
};

const mapStateToProps = state => {
    return {
        userData: state.userData.fetchedUser,
        isSignUp: false
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)