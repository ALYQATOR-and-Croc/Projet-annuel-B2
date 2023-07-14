import React, { useState, useEffect } from 'react';
import { DataGrid, frFR } from '@mui/x-data-grid';
import '../styles/RegisterTable.css';

const columns = [
  { field: 'prenom', headerName: 'Prénom', flex: 1, hideable: false},
  { field: 'nom', headerName: 'Nom', flex: 1},
  { field: 'adresse_email', headerName: 'Adresse mail', flex: 2},
];

export default function RegisterTable(props) {

  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    props.setSelectedRows(selectedRows);
  }, [selectedRows]);

  const eleves = props.eleves;
  
  return (
    <div className="RegisterTable">
      <DataGrid
        sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within" : {outline: "none !important"},
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within": { outline: "none !important"}
        }}
        localeText={{...frFR.components.MuiDataGrid.defaultProps.localeText, 
            footerRowSelected: (count) =>
                            count > 1
                ? `${count.toLocaleString()} élèves sélectionné(e)s`
                : `${count.toLocaleString()} élève sélectionné(e)`,
        }}
        rows={eleves}
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 20 }
            },
        }}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = eleves.filter((eleve) =>
            selectedIDs.has(eleve.id)
          );
          setSelectedRows(selectedRowData);
        }}
        disableColumnSelector
      />
    </div>
  )
}
