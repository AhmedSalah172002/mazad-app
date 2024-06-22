import React, { useEffect, useState } from "react";
import baseUrl from "../../../Api/baseURL";
import { Avatar, Button, Container, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from '@iconify/react/dist/iconify.js';

export const GetAdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    baseUrl.get("/api/v1/category?limit=500").then((response) => {
      setCategories(response?.data?.data);
    });
  }, []);

  const handleEdit = (row) => {

  };
  const handleRemove = (row) => {

  };

  const columns = [
    {
      field: "actions",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex" }}>
          <IconButton onClick={() => handleEdit(params.row)} size="small">
            <Icon
              icon="bx:edit"
              height={24}
              width={24}
              sx={{ m: 1, cursor: "pointer", zIndex: "-1" }}
            />
          </IconButton>
          <IconButton onClick={() => handleRemove(params.row)} size="small">
            <Icon
              icon="wpf:delete"
              height={24}
              width={24}
              sx={{ m: 1, cursor: "pointer", zIndex: "-1", color: "red" }}
            />
          </IconButton>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "الاسم",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography sx={{ textAlign: "right", padding: 1 }}>
            {" "}
            {params.value}{" "}
          </Typography>
        );
      },
    },
    {
      field: "image",
      headerName: "الصورة",
      width: 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
  ];

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          direction: "rtl",
          marginBottom: "10px",
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
          {" "}
          الفئات{" "}
        </Typography>
        <Button variant="contained" onClick={() => {}}>
          {" "}
          انشاء فئة{" "}
        </Button>
      </div>

      <div style={{ width: "100%", direction: "rtl" }}>
        <DataGrid
          rows={categories}
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
    </Container>
  );
};
