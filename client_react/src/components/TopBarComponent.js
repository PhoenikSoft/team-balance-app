import { connect } from 'react-redux';
import { userActions } from '../actions';
import { navigation } from '../_helpers';
import TopBar from './TopBar';
import {i18next} from '../index';


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
        },
        changeLanguage: lng => {
            i18next.changeLanguage(lng)
        },
    }
};

export default connect(null, mapDispatchToProps)(TopBar);