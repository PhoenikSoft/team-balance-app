import { connect } from 'react-redux';
import { userActions } from '../actions';
import TopBar from './TopBar';

const mapDispatchToProps = dispatch => {
    return {
        onLogoutClick: e => {
            userActions.logout();
        }/*,
        onFeedbackClick: e =>  {
            userActions.triggerDialog('feedBack');
        }*/
    }
};

export default connect(null,mapDispatchToProps)(TopBar);