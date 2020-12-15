import { connect } from 'react-redux';
import BreadCrumbs from './BreadCrumbs';


const mapDispatchToProps = dispatch => {
    return {}
};

const mapStateToProps = state => {
    return {
        // TODO to show groupname: if now group name make additional fetch to get this name
        // TODO to avoide passing if only one is set, make an additional field in state (SELECTED_GROUP/GAME)
        // and pass it here, clean those if redirected to (Home or Group pages)
        groupName: state.groups.length === 1 ? state.groups[0]?.name : '',
        groupId: state.groups[0]?.id,
        gameName: state.game.name ? state.game.name : '',
        // Hack to make this component rerender when url changes. To remove this see prev TODO
        url: document.URL
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs)