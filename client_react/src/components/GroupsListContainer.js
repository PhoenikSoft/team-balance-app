import { connect } from 'react-redux';

import { groupActions } from '../actions';
import GroupsList from './GroupsList';


const mapDispatchToProps = dispatch => {
    return {
        onEditSubmit: (groupdId, value) => {
            dispatch(groupActions.updateGroup(groupdId, value));
        },
        onGroupDelete: e => {
            dispatch(groupActions.deleteGroup(e.target.value));
        },
        onGroupAdd: e => {
            dispatch(groupActions.saveGroup(e.target.value));
        }
    }
};

const mapStateToProps = state => {
    return {
        groups: state.groups
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)