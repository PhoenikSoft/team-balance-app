import React from 'react';
import { withTranslation } from 'react-i18next';
import { authHelper } from '../../_helpers';
import LocalizedMaterialTable from '../LocalizedMaterialTable';


export default withTranslation()(function ({ t, game, deletePlayer, groupId, className }) {
    return <>
        <LocalizedMaterialTable
            className={className}
            title={t('PLAYERS')}
            data={game.players}
            columns={[
                { title: t('NAME'), field: 'firstName' },
                { title: t('RATING'), field: 'rating', type: 'numeric' }
            ]}
            actions={[
                player => ({
                    icon: 'delete',
                    tooltip: t('DELETE_PLAYER'),
                    onClick: (event, player) => deletePlayer(player.id),
                    disabled: !authHelper.isGroupAdmin(groupId) || player.id == authHelper.getCookie('userId')
                })
            ]}
            options={{
                actionsColumnIndex: -1,
                search: false
            }}
        />
    </>
})