import React from 'react';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VoteSlider from '../Dialogs/voteDialog/VoteSlider';

const useStyles = makeStyles((theme) => ({
    spacing: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8px',
        whiteSpac: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
}));


export default function ({ balancedTeams,
    showTitle = true,
    showSlider = false,
    showVoteResult = false,
    showTitleTable = true
}) {
    

    function getActionsConfig() {
        return showSlider && [
            {
                icon: 'save',
                tooltip: 'Save User',
                onClick: (event, rowData) => alert("You saved " + rowData.name)
            }]
    }
    let index = 1;
    return < Grid >
        {showTitle && <Grid container justify="center">
            <Typography variant="h6" >Balanced teams</Typography>
        </Grid>}
        {/* Dummy table used to show just column titles */}
        {showTitleTable && <MaterialTable
            data={[]}
            columns={[
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' },
                { title: 'Rating', field: 'rating' }
            ]}
            actions={getActionsConfig()}
            options={{
                search: false,
                paging: false,
                showTitle: false,
                showEmptyDataSourceMessage: false,
                toolbar: false,
                actionsColumnIndex: showSlider ? -1 : 0
            }}
        />}
        {balancedTeams.map(team =>
            React.cloneElement(<TeamTable />, {
                team,
                index: index++,
                key: index,
                actions: getActionsConfig(),
                showSlider
            }))}
    </Grid>
}

function TeamTable({ team, index, actions, showSlider }) {
    const classes = useStyles();
    return <MaterialTable
        title={`Team ${index}`}
        data={team.players}
        columns={[
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Rating', field: 'rating' }
        ]}
        options={{
            search: false,
            paging: false,
            header: false,
            actionsColumnIndex: -1
        }}
        components={{
            Toolbar: props => <div className={classes.spacing}>
                <h6 className="MuiTypography-root MuiTypography-h6">
                    {props.title}</h6>
            </div>
        }}
        actions={actions}
        components={{
            Action: props =>
                (<div style={{ width: '150px', display: 'flex' }}>
                    {showSlider && <VoteSlider rating={props.data.rating} userId={props.data.id} />}
                </div>)
        }}
    />
};