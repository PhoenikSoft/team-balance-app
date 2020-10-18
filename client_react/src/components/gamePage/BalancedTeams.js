import React from 'react';
import { withTranslation } from 'react-i18next';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VoteSlider from '../Dialogs/voteDialog/VoteSlider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';
import { green, red, blue } from '@material-ui/core/colors';
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

export default withTranslation() (function ({ t, balancedTeams, votes,
    showTitle = true,
    showSlider = false,
    showTitleTable = true,
    showCurrentPlayer = true,
    showRating = true
}) {

    let index = 1;
    return < Grid >
        {showTitle && <Grid container justify="center">
            <Typography variant="h6" >{t('BALANCED_TEAMS')}</Typography>
        </Grid>}
        {/* Dummy table used to show just column titles */}
        {showTitleTable && <MaterialTable
            data={[]}
            columns={getColumns(t, showRating, votes)}
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
            team.players = mergePlayersWithVotes(team.players, votes);
            return React.cloneElement(<TeamTable />, {
                t, 
                team: showCurrentPlayer
                    ? team
                    : { ...team, players: team.players.filter(player => player.id != authHelper.getCookie('userId')) },
                index: index++,
                key: index,
                actions: getActionsConfig(showSlider),
                showSlider,
                votes,
                showRating
            })
        })}
    </Grid>
});

function TeamTable({ t, team, index, actions, showSlider, votes, showRating }) {
    const classes = useStyles();
    return <MaterialTable
        title={t('TEAM') + ` ${index}`}
        data={team.players}
        columns={getColumns(t, showRating, votes)}
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
            </div>,
            Action: props =>
              (<div style={{ width: '150px', display: 'flex' }}>
                  {showSlider && <VoteSlider rating={props.data.rating} userId={props.data.id} />}
              </div>)
        }}
        actions={actions}
    />
}

function getActionsConfig(showSlider) {
    return showSlider
        ? [{
            icon: 'save',
            tooltip: 'Save User',
        }]
        : []
};

function getColumns(t, showRating, votes) {
    const columns = [
        { title: t('NAME'), field: 'firstName' },
        { title: t('LAST_NAME'), field: 'lastName' }
    ];
    showRating && columns.push({ title: t('RATING'), field: 'rating' });
    const voteColumn = {
        field: 'vote',
        title: t('VOTES'),
        render: rowData => <div style={{ display: 'flex' }}>
            {getVoteChangeIcon(rowData)}
            {rowData.vote !== 0 && <div style={{ paddingTop: '5px' }}>{rowData.vote}</div>}
        </div>
    };

    (votes && votes.length !== 0) && columns.push(voteColumn);
    return columns;
}

function getVoteChangeIcon(rowData) {
    if (rowData.id == authHelper.getCookie('userId')) {
        return;
    }
    if (!rowData.vote || rowData.vote === 0) {
        return <div><RemoveIcon style={{ color: blue[500] }} /></div>;
    }
    return (rowData.vote && rowData.vote > 0)
        ? <div><ArrowUpwardIcon style={{ color: green[500] }} /></div>
        : <div><ArrowDownwardIcon style={{ color: red[500] }} /></div>;
}

function mergePlayersWithVotes(players, votes) {
    return players.map(player => {
        if (!votes) return player;
        const voteForPlayer = votes.find(vote => vote.forUserId === player.id);
        if (voteForPlayer) {
            return { ...player, vote: voteForPlayer.vote }
        } else {
            delete player.vote;
            return player;
        };

    });
};
