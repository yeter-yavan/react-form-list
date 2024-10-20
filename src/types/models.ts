export interface DataItem {
    code: string;
    name: string;
    assignDate: string | Date;
    isUpdatable: boolean;
  }
  
  export interface FormData {
    code: string;
    name: string;
    assignDate: Date | null;
    isUpdatable: boolean;
  }
  
  // Redux store state
  export interface DataState {
    items: DataItem[];
  }
  
  export type RootState = {
    data: DataState;
  }