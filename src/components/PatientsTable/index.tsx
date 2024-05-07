import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetPatients } from '@/service/ClinicService';
import { IPatients } from '@/core/types';

const columns: GridColDef[] = [
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

  return (
    <Box style={{ height: 500, width: '100%' }}>
      <DataGrid
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
      />
    </Box>
  );
}

export default PatientsTable;
