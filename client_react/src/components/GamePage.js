import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Grid from '@material-ui/core/Grid';
import { authHelper } from '../_helpers';
import Button from '@material-ui/core/Button';
import AddPlayersDialog from './AddPlayersDialog';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

export default function GamePage(
    { gameFromGlobalState, fetchGame, groupId, goBack, deletePlayer, addPlayers,balanceTeams }) {
    let game = gameFromGlobalState;
    const classes = useStyles();

    const [addPlayersDialogOpened, setaddPlayersDialogOpened] = useState(false);
    const [isTeamBalanced, setIsTeamBalanced] = useState(false);




    useEffect(() => {
        const fetch = async () => {
            const action = await fetchGame();
            if (action) {
                game = action.game;
                game.balancedTeams && setIsTeamBalanced(true);
            };
        };
        fetch();
    }, []);

    return (
        <div>
            <div>
                <div className={classes.spacing}>
                    <Button variant="contained" color="primary" onClick={e => goBack()}>
                        Back to group
                    </Button>
                    <Button variant="contained" color="primary" onClick={e => setaddPlayersDialogOpened(true)}>
                        Add members
                    </Button>
                </div>
            </div>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <MaterialTable
                        className={classes.paper}
                        title='Players'
                        data={game.players}
                        columns={[
                            //{ title: 'Num', field: 'id', type: 'numeric' },
                            { title: 'Name', field: 'firstName' },
                            { title: 'Rating', field: 'rating', type: 'numeric' }
                        ]}
                        actions={[
                            player => ({
                                icon: 'delete',
                                tooltip: 'Delete Player',
                                onClick: (event, player) => deletePlayer(player.id),
                                disabled: !authHelper.isGroupAdmin(groupId) || player.id == authHelper.getCookie('userId')
                            })
                        ]}
                        options={{
                            actionsColumnIndex: -1,
                            search: false
                        }}
                    />
                    <div className={classes.spacing}>
                    <Button variant="contained" color="primary" onClick={e => balanceTeams()}>
                        Balance teams
                    </Button>
                    
                </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {isTeamBalanced && generateTeamTables(game.balancedTeams.teams)}
                </Grid>
            </Grid>


            <AddPlayersDialog
                defaultPlayers={game.players || []}
                groupId={groupId}
                open={addPlayersDialogOpened}
                handleClose={e => setaddPlayersDialogOpened(false)}
                onSubmit={players => {
                    addPlayers(players);
                    setaddPlayersDialogOpened(false);
                }}
            />
        </div>
    )
}

// TODO move into separate file
function generateTeamTables(balancedTeams) {
    let index = 1;
    return <div>
        <Typography variant="h6" >Balanced teams</Typography>
        {balancedTeams.map(team =>
            React.cloneElement(<TeamTable />, {
                key: team.id,
                team,
                index: index++
            }))}
    </div>

}

function TeamTable({ team, index }) {
    return (< Grid  >
        <MaterialTable
            title={`Team ${index}`}
            data={team.players}
            columns={[
                { title: 'First Name', field: 'firstName' },
                { title: 'Last Name', field: 'lastName' }
            ]}
            options={{
                search: false,
                paging: false,
                header: index === 1
            }}
        />
    </Grid >)
}