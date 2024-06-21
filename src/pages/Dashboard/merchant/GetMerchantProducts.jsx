import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import baseUrl from '../../../Api/baseURL';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { arEG } from '@mui/material/locale';
import { Icon } from '@iconify/react/dist/iconify.js';
import { CreateUpdateProductDialog } from './CreateUpdateProductDialog';

const PRODUCT_STATUS = {
  "not-started": 'لم يبدأ',
  "start-now": 'يعمل الان',
  "finished": 'منتهى',
}

const theme = createTheme(
  {
    direction: 'rtl',
  },
  arEG
);

export const GetMerchantProducts = () => {
  const [products, setProducts] = useState([]);
  const [method, setMethod] = useState('create')
  const [createUpdateDialogOpen, setCreateUpdateDialogOpen] = useState(false)
  const [targetProduct, setTargetProduct] = useState(null)

  const handleEdit = (row) => {
    setTargetProduct(row)
    setMethod('update')
    setCreateUpdateDialogOpen(true)
  }
  const handleRemove = (row) => {
    setTargetProduct(row)
  }

  const columns = [
    {
      field: 'actions',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <div style={{ display: 'flex' }}>
          <IconButton onClick={() => handleEdit(params.row)} size="small">
            <Icon icon="bx:edit" height={24} width={24} sx={{ m: 1, cursor: 'pointer', zIndex: '-1' }} />
          </IconButton>
          <IconButton onClick={() => handleRemove(params.row)} size="small">
            <Icon icon="wpf:delete" height={24} width={24} sx={{ m: 1, cursor: 'pointer', zIndex: '-1', color: 'red' }} />
          </IconButton>
        </div>
      ),
    },
    {
      field: 'name', headerName: 'الاسم', width: 200, renderCell: (params) => {
        return <Typography sx={{ textAlign: 'right', padding: 1 }}> {params.value} </Typography>
      },
    },
    {
      field: 'image',
      headerName: 'الصورة',
      width: 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: 'description',
      headerName: 'الوصف',
      width: 300,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'initialPrice', headerName: 'السعر الابتدائي', type: 'number', width: 150,
      renderCell: (params) => <Typography sx={{ textAlign: 'center' }} > {params?.value} </Typography>
    },
    {
      field: 'lowestBidValue', headerName: 'أقل قيمة للمزايده', type: 'number', width: 150,
      renderCell: (params) => <Typography sx={{ textAlign: 'center' }} > {params?.value} </Typography>
    },
    {
      field: 'status', headerName: 'الحالة', width: 150,
      renderCell: (params) => <Typography sx={{ textAlign: 'right' }} > {PRODUCT_STATUS[params?.value]} </Typography>
      ,
    },
    {
      field: 'date', headerName: 'التاريخ', width: 150,
      renderCell: (params) => {
        return <Typography sx={{ textAlign: 'right' }} > {params?.value?.split('T')[0]} </Typography>
      },
    },
    {
      field: 'startTime', headerName: 'وقت البدء', width: 150,
      renderCell: (params) => <Typography sx={{ textAlign: 'right' }} > {params?.value} </Typography>
    },
    {
      field: 'endTime', headerName: 'وقت الانتهاء', width: 150,
      renderCell: (params) => <Typography sx={{ textAlign: 'right' }} > {params?.row?.endTime} </Typography>
    },
  ];

  useEffect(() => {
    baseUrl.get('/api/v1/products?limit=50')
      .then(response => {
        setProducts(response?.data?.data)
      })
  }, []);

  return (
    <ThemeProvider theme={theme} >
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', direction: 'rtl', marginBottom: '10px' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '25px' }} >  المنتجات </Typography>
          <Button variant='contained' onClick={() => {
            setCreateUpdateDialogOpen(true)
            setTargetProduct(null)
            setMethod('create')
          }} >  انشاء منتج </Button>
        </div>

        <div style={{ width: '100%', direction: 'rtl' }}>
          <DataGrid
            rows={products}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </div>

        <CreateUpdateProductDialog
          method={method}
          createUpdateDialogOpen={createUpdateDialogOpen}
          setCreateUpdateDialogOpen={setCreateUpdateDialogOpen}
          setMethod={setMethod}
          targetProduct={targetProduct}
          setTargetProduct={setTargetProduct}
          products={products}
          setProducts={setProducts}

        />


      </Container>

    </ThemeProvider>
  );
}
