import { connect } from 'react-redux';
import {authHelper} from '../_helpers'

import { groupActions } from '../actions';
import GroupsList from './GroupsList';


const mapDispatchToProps = dispatch => {
    return {
        onEditSubmit: (groupdId, value) => {
            dispatch(groupActions.updateGroup(groupdId, value));
        },
        onGroupDelete: groupId => {
            dispatch(groupActions.deleteGroup(groupId));
        },
        onGroupAdd: e => {
            dispatch(groupActions.saveGroup(e.target.value));
        },
        onGroupAddClick: e => {
            dispatch(groupActions.openAddGroupDialog());
        },

        isGroupAdmin: authHelper.isGroupAdmin
    }
};

const mapStateToProps = state => {
    return {
        groups: state.groups
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)