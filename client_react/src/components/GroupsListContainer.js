import { connect } from 'react-redux';
import { authHelper, navigation } from '../_helpers'

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
        onGroupAdd: value => {
            dispatch(groupActions.saveGroup(value));
        },
        isGroupAdmin: authHelper.isGroupAdmin,
        fetchGroups: async () => await dispatch(groupActions.getGroups()),
        goToGroupPage: navigation.goToGroupView


    }
};

const mapStateToProps = state => {
    return {
        groupsFromGlobalState: state.groups,
        isGroupCreatedByCurrentUser: groupId => state.groups.find(group => group.id === groupId).isCreatedByCurrentUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList)