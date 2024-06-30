import React, { useEffect, useState } from "react";
import baseUrl from "../../../Api/baseURL";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CreateUpdateCategoryDialog } from "./CreateUpdateCategoryDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

export const GetAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [method, setMethod] = useState("create");
  const [createUpdateDialogOpen, setCreateUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [targetCategory, setTargetCategory] = useState(null);
  const token = localStorage?.token;

  useEffect(() => {
    baseUrl
      .get("/api/v1/category?limit=500")
      .then((response) => {
        setCategories(response?.data?.data);
      });
  }, []);

  const handleEdit = (row) => {
    setTargetCategory(row);
    setMethod("update");
    setCreateUpdateDialogOpen(true);
  };
  const handleRemove = (row) => {
    setTargetCategory(row);
    setDeleteDialogOpen(true);
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
        <Button
          variant="contained"
          onClick={() => {
            setMethod("create");
            setTargetCategory(null);
            setCreateUpdateDialogOpen(true);
          }}
        >
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

      <CreateUpdateCategoryDialog
        method={method}
        createUpdateDialogOpen={createUpdateDialogOpen}
        setCreateUpdateDialogOpen={setCreateUpdateDialogOpen}
        targetCategory={targetCategory}
        setTargetCategory={setTargetCategory}
        categories={categories}
        setCategories={setCategories}
      />

      <DeleteCategoryDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        targetCategory={targetCategory}
        setTargetCategory={setTargetCategory}
        categories={categories}
        setCategories={setCategories}
      />
    </Container>
  );
};
