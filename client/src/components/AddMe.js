import { connect } from 'react-redux';
import React from 'react';
import { membersActions } from '../actions';

const REF_REGEX = /\w{20}/;

const isAdded = async () => {
    const ref = document.URL.match(REF_REGEX);
    return await membersActions.addMemberByRef(ref[0]);
}
const mapDispatchToProps = dispatch => {
    isAdded().then(event => dispatch(event))
    return {};
}

function Addme() {
    return <div> </div>
}

export default connect(null, mapDispatchToProps)(Addme);