import { connect } from 'react-redux';
import { userActions } from '../actions';
import SignIn from './SignIn';
import { userData } from '../reducers/userData.reducer';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: e => {
            e.preventDefault();
            return (email, password) => {
                dispatch(userActions.login(email, password));
            }
        }
    }
};

const mapStateToProps = state => {
    return {
        error: state.authentication.error,
        refLink: state.userData.refLink,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)