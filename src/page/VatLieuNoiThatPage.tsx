import {
  ChiTietVatLieu,
  DanhSachCanLam,
  TongVatLieu
} from "@component";
import * as logic from "@logic";
import { Container, Grid, Paper, Typography } from "@mui/material";
import type { SanPhamCanLam } from "@type";
import * as utils from "@utils";
import { useState } from "react";

export default function VatLieuNoiThatPage() {
  const [danhSachCanLam, setDanhSachCanLam] = useState(
    logic.getDefaultDanhSachCanLam(),
  );

  const data = logic.getFullData(danhSachCanLam);
  const { tongTien } = data;

  const onChangeDanhSachCanLam = (
    updatedCanLams: SanPhamCanLam[],
  ) => {
    setDanhSachCanLam(updatedCanLams);

    utils.url.updateUrlParams({
      danhSachCanLam: logic.stringifyDanhSachCanLam(
        updatedCanLams.filter((u) => u.quantity),
      ),
    });
  };

  const onChangeSanPhamCanLam = (index: number, newQuantity: number) => {
    const updatedCanLams = [...danhSachCanLam];
    updatedCanLams[index].quantity = newQuantity;
    onChangeDanhSachCanLam(updatedCanLams);
  };

  const onClearDanhSachCanLam = () => {
    onChangeDanhSachCanLam(
      danhSachCanLam.map((c) => ({
        ...c,
        quantity: 0,
      })),
    )
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 10, pt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6 }}>
          <DanhSachCanLam
            {...data}
            onChangeSanPhamCanLam={onChangeSanPhamCanLam}
            onClearDanhSachCanLam={onClearDanhSachCanLam}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Grid sx={{ mb: 2 }}>
            <ChiTietVatLieu {...data} />
          </Grid>

          <Grid>
            <TongVatLieu {...data} />
          </Grid>
        </Grid>

        {/* <Grid size={{ xs: 12, md: 4 }}>
          <ChiTietSanPham {...data} />
        </Grid> */}
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