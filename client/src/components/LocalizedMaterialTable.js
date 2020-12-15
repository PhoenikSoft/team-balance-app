import React from 'react';
import MaterialTable from 'material-table';
import { withTranslation } from 'react-i18next';

export default withTranslation()(function ({t, ...props}) {
    return <MaterialTable
        {...props}
        localization={{
            header: {
                actions: ''
            },
            pagination: {
                labelRowsSelect: t('ROWS'),
                previousTooltip: t('PREVIOUS_PAGE'),
                nextTooltip: t('NEXT_PAGE'),
                firstTooltip: t('FIRST_PAGE'),
                lastTooltip: t('LAST_PAGE'),
            },
            body: {
                emptyDataSourceMessage: t('NO_DATA_TO_DISPLAY')
            }
        }}
    />
});


