import React from 'react';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

export default function ({ balancedTeams, votes,
    showTitle = true,
    showSlider = false,
    showTitleTable = true,
    showVotes = false
}) {

    let index = 1;
    return < Grid >
        {showTitle && <Grid container justify="center">
            <Typography variant="h6" >Balanced teams</Typography>
        </Grid>}
        {/* Dummy table used to show just column titles */}
        {showTitleTable && <MaterialTable
            data={[]}
            columns={getColumns(showVotes, votes)}
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
        {balancedTeams.map(team => {
            // TODO refactor this when BE send votes with game 
            team.players.map(player => {
                if (!votes) return player;
                const voteForPlayer = votes.find(vote => vote.forUserId === player.id);
                if (voteForPlayer) {
                    player.vote = voteForPlayer.vote
                } else {
                    delete player.vote;
                }
            });

            return React.cloneElement(<TeamTable />, {
                team,
                index: index++,
                key: index,
                actions: getActionsConfig(showSlider),
                showSlider,
                votes,
                showVotes
            }
            )
        })}
    </Grid>
}

function TeamTable({ team, index, actions, showSlider, votes, showVotes }) {
    const classes = useStyles();
    return <MaterialTable
        title={`Team ${index}`}
        data={team.players}
        columns={getColumns(showVotes, votes)}
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

function getActionsConfig(showSlider) {
    return showSlider && [
        {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
        }]
};

function getColumns(showVotes, votes) {
    const columns = [
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Rating', field: 'rating' }
    ];
    showVotes && votes && votes.length !== 0 && columns.push({ title: 'Votes', field: 'vote' });
    return columns;
};