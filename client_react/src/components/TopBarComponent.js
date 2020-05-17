import { connect } from 'react-redux';
import { userActions } from '../actions';
import { navigation } from '../_helpers';
import TopBar from './TopBar';



const mapDispatchToProps = dispatch => {

    return {
        onLogoutClick: e => {
            userActions.logout();
        },
        submitFeedback: text => {
            dispatch(userActions.leaveFeedback(text));
        },
        onAppNameClick: e => {
            navigation.goHome();
        }
    }
};

export default connect(null, mapDispatchToProps)(TopBar);