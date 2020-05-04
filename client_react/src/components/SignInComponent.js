import { connect } from 'react-redux';
import {userActions} from '../actions';
import SignIn from './SignIn';

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (email, password) => {
            dispatch(userActions.login(email, password));
        },
    };
};

//export default withRouter(connect(null,mapDispatchToProps)(SignIn))
export default connect(null,mapDispatchToProps)(SignIn)