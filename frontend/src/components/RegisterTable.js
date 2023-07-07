import * as React from 'react';
import { DataGrid, frFR } from '@mui/x-data-grid';
import '../styles/RegisterTable.css';

const columns = [
  { field: 'firstName', headerName: 'Prénom', flex: 1, hideable: false},
  { field: 'lastName', headerName: 'Nom', flex: 1},
  { field: 'email', headerName: 'Adresse mail', flex: 2},
  { field: 'class', headerName: 'Classe', flex: 0.5}
];

const eleves = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'jon@snow.fr', class: 'B2 ESGI'},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@lannister.fr', class: 'B2 ESGI'},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@lannister.fr', class: 'B2 ESGI'},
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'arya@stark.fr', class: 'B2 ESGI'},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@targaryenmaisenpluslong.fr', class: 'B2 ESGI'},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrera@clifford.fr', class: 'B2 ESGI'},
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'rossini@frances.fr', class: 'B2 ESGI'},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey@roxie.fr', class: 'B2 ESGI'},
  { id: 10, lastName: 'Snow', firstName: 'Jon', email: 'jon@snow.fr', class: 'B2 ESGI'},
  { id: 12, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@lannister.fr', class: 'B2 ESGI'},
  { id: 13, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@lannister.fr', class: 'B2 ESGI'},
  { id: 14, lastName: 'Stark', firstName: 'Arya', email: 'arya@stark.fr', class: 'B2 ESGI'},
  { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@targaryenmaisenpluslong.fr', class: 'B2 ESGI'},
  { id: 17, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrera@clifford.fr', class: 'B2 ESGI'},
  { id: 18, lastName: 'Frances', firstName: 'Rossini', email: 'rossini@frances.fr', class: 'B2 ESGI'},
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey@roxie.fr', class: 'B2 ESGI'},
  { id: 11, lastName: 'Snow', firstName: 'Jon', email: 'jon@snow.fr', class: 'B2 ESGI'},
  { id: 22, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@lannister.fr', class: 'B2 ESGI'},
  { id: 33, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@lannister.fr', class: 'B2 ESGI'},
  { id: 44, lastName: 'Stark', firstName: 'Arya', email: 'arya@stark.fr', class: 'B2 ESGI'},
  { id: 65, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@targaryenmaisenpluslong.fr', class: 'B2 ESGI'},
  { id: 77, lastName: 'Clifford', firstName: 'Ferrara', email: 'ferrera@clifford.fr', class: 'B2 ESGI'},
  { id: 84, lastName: 'Frances', firstName: 'Rossini', email: 'rossini@frances.fr', class: 'B2 ESGI'},
  { id: 39, lastName: 'Roxie', firstName: 'Harvey', email: 'harvey@roxie.fr', class: 'B2 ESGI'}
];

export default function RegisterTable(props) {
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
                ? `${count.toLocaleString()} élèves sélectionnés`
                : `${count.toLocaleString()} élève sélectionné`,
        }}
        rows={eleves}
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: eleves.length }
            },
        }}
        checkboxSelection
        disableColumnSelector
      />
    </div>
  )
}
