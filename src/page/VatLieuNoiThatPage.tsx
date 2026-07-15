import {
  ChiTietVatLieu,
  DanhSachCanLam,
  TongPhuPhi,
  TongVatLieu
} from "@component";
import * as logic from "@logic";
import { Container, Grid, Paper, Typography } from "@mui/material";
import type { TypeSanPhamCanLam } from "@type";
import * as utils from "@utils";
import BangGiaVatLieu from "component/BangGiaVatLieu";
import { useState } from "react";

export default function VatLieuNoiThatPage() {
  const [danhSachCanLam, setDanhSachCanLam] = useState(
    logic.getDefaultDanhSachCanLam(),
  );

  const data = logic.getFullData(danhSachCanLam);
  const { chiTietDanhSachSanPham, chiTietVatLieu, chiTietVatLieuCanMua, chiTietPhuPhi, tongTien } = data;

  const onChangeDanhSachCanLam = (
    updatedCanLams: TypeSanPhamCanLam[],
  ) => {
    setDanhSachCanLam(updatedCanLams);

    utils.url.updateUrlParams({
      danhSachCanLam: logic.stringifyDanhSachCanLam(
        updatedCanLams.filter((u) => u.quantityBuy),
      ),
    });
  };

  const onChangeSanPhamCanLam = (index: number, newQuantity: number) => {
    const updatedCanLams = [...danhSachCanLam];
    updatedCanLams[index].quantityBuy = newQuantity;
    onChangeDanhSachCanLam(updatedCanLams);
  };

  const onClearDanhSachCanLam = () => {
    onChangeDanhSachCanLam(
      danhSachCanLam.map((c) => ({
        ...c,
        quantityBuy: 0,
      })),
    )
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 10, pt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <Grid sx={{ mb: 2 }}>
            <BangGiaVatLieu />
          </Grid>

          <Grid>
            <DanhSachCanLam
              chiTietDanhSachSanPham={chiTietDanhSachSanPham}
              onChangeSanPhamCanLam={onChangeSanPhamCanLam}
              onClearDanhSachCanLam={onClearDanhSachCanLam}
            />
          </Grid>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Grid sx={{ mb: 2 }}>
            <ChiTietVatLieu chiTietVatLieu={chiTietVatLieu} />
          </Grid>

          <Grid sx={{ mb: 2 }}>
            <TongVatLieu chiTietVatLieuCanMua={chiTietVatLieuCanMua} />
          </Grid>

          <Grid sx={{ mb: 2 }}>
            <TongPhuPhi chiTietPhuPhi={chiTietPhuPhi} />
          </Grid>
        </Grid>
      </Grid>

      <Paper
        elevation={4}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          p: 2,
          textAlign: "right",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Tổng cộng: {utils.view.displayCurrency(tongTien)}
        </Typography>
      </Paper>
    </Container>
  );
}