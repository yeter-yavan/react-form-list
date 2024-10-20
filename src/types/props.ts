import { Control } from 'react-hook-form';
import { SvgIconComponent } from '@mui/icons-material';

// Common Input Props
export interface CommonInputProps {
  name: string;
  label: string;
  control: Control<any>;
  pattern?: {
    value: RegExp;
    message: string;
  };
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  tooltip?: string;
  type?: string;
}

// Date Picker Props
export interface DatePickerInputProps {
  name: string;
  label: string;
  control: Control<any>;
  required?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

// Common Button Props
export interface CommonButtonProps {
  label: string;
  onClick: () => void;
  startIcon?: React.ReactElement<SvgIconComponent>;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
  tooltip?: string;
  variant?: 'contained' | 'outlined' | 'text';
}

// DataGrid Props
export interface DataGridProps {
  data: DataItem[];
  onRowClick: (item: DataItem, index: number) => void;
}