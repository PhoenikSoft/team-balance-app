import GroupPage from './GroupPage';
import { connect } from 'react-redux';
import { authHelper, navigation, selectorHelpers, urlParserHelper } from '../_helpers';
import { groupService } from '../_services'

import { groupActions } from '../actions';


const mapDispatchToProps = dispatch => {
    return {
        fetchGroup: async () => {
            const groupId = urlParserHelper.getGroupId()
            const access = await groupService.checkAccess(groupId);
            if (access) {
                return dispatch(groupActions.getGroup(groupId));
            } else {
                alert('permission denied')
            }
        }
    }
}

const mapStateToProps = state => {
    function getGroup() {
        const groupId = urlParserHelper.getGroupId()
        const group = state.groups.find(group => group.id == groupId);
        if (group) {
            return group;
        } else {
            return {};
        };
    };
    return {
        groupFromGlobalState: getGroup()
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage)