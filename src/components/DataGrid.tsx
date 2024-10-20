import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  Tooltip
} from '@mui/material';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGridProps } from '../types/props';

const DataGrid: React.FC<DataGridProps> = ({ data, onRowClick }) => {
  if (data.length === 0) {
    return (
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ textAlign: 'center', py: 3 }}
      >
        There is no data.
      </Typography>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Assign Date</TableCell>
            <TableCell align="center">Is Updatable?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(row, index)}
              sx={{
                backgroundColor: row.isUpdatable ? 'inherit' : 'grey.100',
                cursor: row.isUpdatable ? 'pointer' : 'not-allowed',
                '&:hover': {
                  backgroundColor: row.isUpdatable ? 'rgba(0, 0, 0, 0.04)' : 'grey.200'
                }
              }}
            >
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                {format(new Date(row.assignDate), 'dd/MM/yyyy', { locale: tr })}
              </TableCell>
              <TableCell align="center">
                {row.isUpdatable ? (
                  <Tooltip title="Editable">
                    <CheckCircleIcon color="success" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Do not editable">
                    <CancelIcon color="error" />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;