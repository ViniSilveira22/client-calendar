import React, { useState, useEffect } from 'react';
import { Box, Avatar } from '@mui/material'; // Importe o Avatar para exibir a foto
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPatients } from '@/service/ClinicService';
import { IPatients } from '@/core/types';
import Form from './Form'
const columns: GridColDef[] = [
  {
    field: 'profilePhoto',
    headerName: '',
    width: 100,
    sortable: false,
    renderCell: (params) => ( 
      <Avatar src={`data:image/jpeg;base64,${params.value}`} sx={{ width: 50, height: 50 }} />
    ),
  },
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

const PatientsTable: React.FC = () => {
  const { data: patients, isLoading, isError } = useGetPatients();
  if (isLoading) return <p>Carregando pacientes...</p>;
  if (isError) return <p>Ocorreu um erro ao carregar pacientes.</p>;
  const decodedData = atob("AA==");
  console.log(decodedData);
  
  return (
    <Box style={{ height: 500, width: '100%' }}>
      {/* <DataGrid
        rows={patients || []}
        columns={columns}
        hideFooterPagination
        autoPageSize
        pagination
        loading={isLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}      
      /> */}
      <Form />

    </Box>
  );
}

export default PatientsTable;
