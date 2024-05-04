import * as React from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 300,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Idade',
    width: 50,
    type: 'number',
    editable: true,
  },
  {
    field: 'birthDate',
    headerName: 'Data de nascimento',
    width: 150,
    type: 'date',
    editable: true,
  },
  {
    field: 'father',
    headerName: 'Pai',
    width: 300,
    editable: true,
  },
  {
    field: 'mother',
    headerName: 'Mãe',
    sortable: false,
    width: 300,
    editable: true,
  },
  {
    field: 'guardian',
    headerName: 'Responsável',
    width: 110,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Endereço',
    width: 110,
    editable: true,
  },
  {
    field: 'phone',
    headerName: 'Telefone',
    width: 110,
    editable: true,
  },
  {
    field: 'school',
    headerName: 'Escola',
    width: 110,
    editable: true,
  },
  {
    field: 'period',
    headerName: 'Período',
    width: 110,
    editable: true,
  },
  {
    field: 'teacher',
    headerName: 'Professor',
    width: 110,
    editable: true,
  },
  {
    field: 'diagnosis',
    headerName: 'Diagnóstico',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, name: "Vinícius Rafael da Silveira", father: 'Snow', mother: 'Jon', age: 14 },
  { id: 2, name: "teste", father: 'Lannister', mother: 'Cersei', age: 31 },
  { id: 3, name: "teste", father: 'Lannister', mother: 'Jaime', age: 31 },
  { id: 4, name: "teste", father: 'Stark', mother: 'Arya', age: 11 },
  { id: 5, name: "teste", father: 'Targaryen', mother: 'Daenerys', age: null },
  { id: 6, name: "teste", father: 'Melisandre', mother: null, age: 150 },
  { id: 7, name: "teste", father: 'Clifford', mother: 'Ferrara', age: 44 },
  { id: 8, name: "teste", father: 'Frances', mother: 'Rossini', age: 36 },
  { id: 9, name: "teste", father: 'Roxie', mother: 'Harvey', age: 65 },
  { id: 10, name: "teste", father: 'Melisandre', mother: null, age: 150 },
  { id: 11, name: "teste", father: 'Clifford', mother: 'Ferrara', age: 44 },
  { id: 12, name: "teste", father: 'Frances', mother: 'Rossini', age: 36 },
  { id: 13, name: "teste", father: 'Roxie', mother: 'Harvey', age: 65 },
  { id: 14, name: "teste", father: 'Melisandre', mother: null, age: 150 },
  { id: 15, name: "teste", father: 'Clifford', mother: 'Ferrara', age: 44 },
  { id: 16, name: "teste", father: 'Frances', mother: 'Rossini', age: 36 },
  { id: 17, name: "teste", father: 'Roxie', mother: 'Harvey', age: 65 },

];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
