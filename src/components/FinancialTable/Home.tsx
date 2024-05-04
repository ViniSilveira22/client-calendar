import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ClinicService from '@/service/ClinicService';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { IPatients } from '@/core/types';

function PacientsTable() {
  const [patients, setPatients] = useState<IPatients[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatients | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await ClinicService.getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAdd = () => {
    setSelectedPatient(null);
    setOpenModal(true);
  };

  const handleEdit = async (row: IPatients) => {
    try {
      const patient = await ClinicService.getPatientById(row.id_patient);
      setSelectedPatient(patient);
      setOpenModal(true);
    } catch (error) {
      console.error('Erro ao buscar dados do paciente:', error);
    }
  };

  const handleDelete = async (row: IPatients) => {
    try {
      await ClinicService.deletePatient(row.id_patient);
      setPatients(prevPatients =>
        prevPatients.filter(patient => patient.id_patient !== row.id_patient)
      );
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  };

  const filterPatients = (patient: IPatients) => {
    const { name, mother, father } = patient;
    const searchTerm = filterValue.toLowerCase();
    return (
      name.toLowerCase().includes(searchTerm) ||
      mother.toLowerCase().includes(searchTerm) ||
      father.toLowerCase().includes(searchTerm)
    );
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      headerAlign: 'center',
      flex: 1,
      align: 'center'
    },
    { field: 'mother', headerName: 'Mãe', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'father', headerName: 'Pai', flex: 1, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <div>
          <EditIcon onClick={() => handleEdit(params.row as IPatients)} style={{ cursor: 'pointer' }} />
          <DeleteIcon onClick={() => handleDelete(params.row as IPatients)} style={{ cursor: 'pointer' }} />
        </div>
      )
    }
  ];

  const filteredPatients = patients.filter(filterPatients);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />} style={{ cursor: 'pointer' }}>
            Adicionar paciente
          </Button>
        </Box>
        <Box>
          <TextField
            label="Filtrar"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <Box minHeight="100px" height="calc(100vh - 200px)" overflow="auto">
        <DataGrid rows={filteredPatients} columns={columns} />
      </Box>
    </Box>
  );
}

export default PacientsTable;
