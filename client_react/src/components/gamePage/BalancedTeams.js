import React from 'react';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VoteSlider from '../Dialogs/voteDialog/VoteSlider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { green, red } from '@material-ui/core/colors';
import { authHelper } from '../../_helpers';


const useStyles = makeStyles((theme) => ({
    spacing: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8px',
        whiteSpac: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    arrowContainer: {
        display: 'flex'
    }
}));

export default function ({ balancedTeams, votes,
    showTitle = true,
    showSlider = false,
    showTitleTable = true,
    showVotes = false,
    showCurrentPlayer = true,
    showRating = true
}) {

    let index = 1;
    return < Grid >
        {showTitle && <Grid container justify="center">
            <Typography variant="h6" >Balanced teams</Typography>
        </Grid>}
        {/* Dummy table used to show just column titles */}
        {showTitleTable && <MaterialTable
            data={[]}
            columns={getColumns(showVotes, showRating, votes)}
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
            //!showCurrentPlayer && (team.players = team.players.filter(player => player.id != authHelper.getCookie('userId')));

            // TODO refactor this when BE send votes with game 
            team.players.map(player => {
                if (!votes) return player;
                const voteForPlayer = votes.find(vote => vote.forUserId === player.id);
                if (voteForPlayer) {
                    player.vote = voteForPlayer.vote
                } else {
                    delete player.vote;
                };

            });

            return React.cloneElement(<TeamTable />, {
                team: showCurrentPlayer
                    ? team
                    : { ...team, players: team.players.filter(player => player.id != authHelper.getCookie('userId')) },
                index: index++,
                key: index,
                actions: getActionsConfig(showSlider),
                showSlider,
                votes,
                showVotes,
                showRating
            })
        })}
    </Grid>
}

function TeamTable({ team, index, actions, showSlider, votes, showVotes, showRating }) {
    const classes = useStyles();
    return <MaterialTable
        title={`Team ${index}`}
        data={team.players}
        columns={getColumns(showVotes, showRating, votes)}
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

function getColumns(showVotes, showRating, votes) {
    const columns = [
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' }
    ];
    showRating && columns.push({ title: 'Rating', field: 'rating' });
    const voteColumn = {
        field: 'vote',
        title: 'Votes',
        render: rowData => <div style={{ display: 'flex' }}>
            {(rowData.vote && rowData.vote !== 0) ?
                rowData.vote > 0
                    ? <div><ArrowUpwardIcon style={{ color: green[500] }} /></div>
                    : <div><ArrowDownwardIcon style={{ color: red[500] }} /></div>
                : <div />}
            {rowData.vote !== 0 && <div style={{ paddingTop: '5px' }}>{rowData.vote}</div>}
        </div>
    };

    showVotes && votes && votes.length !== 0 && columns.push(voteColumn);
    return columns;
};