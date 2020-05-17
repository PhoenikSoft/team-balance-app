import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { membersActions } from '../actions';

const REF_REGEX = /\w{20}/;


const isAdded = async () => {
    const ref = document.URL.match(REF_REGEX);
    return await membersActions.addMemberByRef(ref[0]);
}
const mapDispatchToProps = async dispatch => {
    return {
        flag: dispatch(await isAdded())
    }
}

const mapStateToProps = state => {
    return {}
}

function Addme({ }) {
    return <div>

    </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Addme);