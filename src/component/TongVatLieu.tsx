import { getTitleVatLieu } from "@data";
import {
    Box,
    Grid,
    List,
    ListItem,
    Typography
} from "@mui/material";
import type { TypeCanThietVatLieu, TypeFullDataSanPham, VatLieuCode } from "@type";
import * as utils from "@utils";
import { BaseCard, BaseDrawer } from "./base";

export default function TongVatLieu({ tongVatLieuCanMua }: { tongVatLieuCanMua: TypeFullDataSanPham["tongVatLieuCanMua"] }) {

    const viewOptions = ({ vatLieuCode, options }: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
        switch (vatLieuCode) {
            case "sat_hop_kem": {
                return `• Đã dùng ${options.totalUsed / 100}m / ${options.totalLength / 100}m, còn lại ${options.totalRemaining / 100}m`
            }
        }
        return null;
    }

    return (
        <BaseCard title="Tổng vật liệu">
            <List disablePadding>
                {tongVatLieuCanMua
                    .map(
                        (vatLieuCanMua, idx) => {
                            const { vatLieuData, quantityNeedBuy, totalVatLieuCanMua } = vatLieuCanMua;

                            return <ListItem
                                key={`tvl-${idx}`}
                                disableGutters
                                sx={{ py: 1 }}
                            >
                                <Grid sx={{ width: "100%" }}>
                                    <Grid container sx={{ justifyContent: "space-between" }} >
                                        <Grid>
                                            <Typography>
                                                {`${quantityNeedBuy} ${getTitleVatLieu({ ...vatLieuData, vatLieuCode: vatLieuData.code } as unknown as TypeCanThietVatLieu, vatLieuData)}`}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Typography>{utils.view.displayCurrency(totalVatLieuCanMua)}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ justifyContent: "space-between" }}>
                                        <Grid>
                                            <Typography sx={{ ml: 4 }}>
                                                {viewOptions(vatLieuCanMua)}
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <BaseDrawer title="Chi tiết bản vẽ" contentProps={{ sx: { p: 0, minWidth: "1300px" } }}>
                                                <ChiTietBanVe {...vatLieuCanMua} />
                                            </BaseDrawer>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        }
                    )}
            </List>
        </BaseCard>
    );
};

const ChiTietBanVe = (vatLieuCanMua: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
    switch (vatLieuCanMua.vatLieuCode) {
        case "sat_hop_kem": {
            return <ChiTietBanVeSatHop {...vatLieuCanMua} />
        }
        case "van_go_vang_nhat": {
            return <ChiTietBanVeVanGo {...vatLieuCanMua} />
        }
        case "van_go_nau_dam": {
            return <ChiTietBanVeVanGo {...vatLieuCanMua} />
        }
    }
    return null;
};

const ChiTietBanVeSatHop = ({ options, vatLieuData }: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
    const { bars } = options;

    const BanVeHopSat = ({ fullWidth, remainingLength, cuts }: { fullWidth: number; remainingLength: number; cuts: number[] }) => {
        return <Grid>
            <Grid>
                <Typography>{`cắt ${cuts.length} đoạn`}</Typography>
            </Grid>
            <Grid data-testid="ban-ve-hop-sat" container sx={{ width: "100%", backgroundColor: "red", height: "40px" }}>
                {cuts.map((cut: number, idx: number) => {
                    return <Grid key={`cut-${idx}`} container sx={{ width: `${Math.round((cut * 100) / fullWidth)}%`, backgroundColor: "#7cdf7c", height: "40px", borderRight: "4px dashed grey", alignItems: "center" }}>
                        <span style={{ textAlign: "center", width: "100%" }}>{cut}</span>
                    </Grid>
                })}
                {remainingLength &&
                    <Grid container sx={{ width: `${Math.round((remainingLength * 100) / fullWidth)}%`, height: "40px", alignItems: "center" }}>
                        <span style={{ textAlign: "center", width: "100%" }}>{remainingLength}</span>
                    </Grid>}
            </Grid>
        </Grid>;
    }

    return <Grid>
        <Grid sx={{ mb: 2 }}>
            <Typography>{`${vatLieuData.name} dài ${utils.number.num(vatLieuData.width) / 100}m`}</Typography>
        </Grid>
        {bars.map((bar: any, idx: number) => {
            return <Grid key={`bar-${idx}`} sx={{ mb: 2 }}>
                <BanVeHopSat {...bar} />
            </Grid>
        })}
    </Grid>;
}

const ChiTietBanVeVanGo = ({ vatLieuCode, options, vatLieuData }: TypeFullDataSanPham["tongVatLieuCanMua"][number]) => {
    const { pieces } = options;
    const fullWidth = utils.number.num(vatLieuData.width);
    const fullHeight = utils.number.num(vatLieuData.height);

    const bgImages: Partial<Record<VatLieuCode, string>> = {
        "van_go_vang_nhat": "https://media.istockphoto.com/id/1002879824/fr/photo/fond-de-bois-clair-table-en-bois-ou-en-planches-texture-close-up.jpg?s=612x612&w=0&k=20&c=jdqCGGfmZFwoMol4aL0xtlsC_gGV0EwwqksLKM27eLY=",
        "van_go_nau_dam": "https://gominhlong.com/wp-content/uploads/2017/10/9.-ML-2408-cherry.jpg"
    };

    const BanVeVanGo = ({ rects }: { rects: { x: number; y: number; x2: number; y2: number }[] }) => {
        return (
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: `${fullWidth}/${fullHeight}`,
                    border: "2px solid",
                    borderColor: "grey.500",
                    bgcolor: "antiquewhite",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    ...(bgImages[vatLieuCode] ? { backgroundImage: `url("${bgImages[vatLieuCode]}")` } : {})
                }}
            >
                {rects.map((r, index) => {
                    const width = Math.round(r.x2 - r.x);
                    const height = Math.round(r.y2 - r.y);

                    return (
                        <Box
                            key={`vg-${index}`}
                            sx={{
                                position: "absolute",
                                left: `${(r.x / fullWidth) * 100}%`,
                                top: `${(r.y / fullHeight) * 100}%`,
                                width: `${(width / fullWidth) * 100}%`,
                                height: `${(height / fullHeight) * 100}%`,
                                backgroundColor: "#7cdf7c66",
                                border: "4px dashed grey",
                                boxSizing: "border-box",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                                fontSize: 12,
                            }}
                        >
                            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>{width} × {height}</Typography>
                        </Box>
                    );
                })}
            </Box>
        );
    }

    return <Grid>
        <Grid sx={{ mb: 2 }}>
            <Typography>{`${vatLieuData.name} ${utils.number.num(vatLieuData.width)}cm x ${utils.number.num(vatLieuData.height)}cm`}</Typography>
        </Grid>
        {pieces.map((piece: any, idx: number) => {
            return <Grid key={`piece-${idx}`} sx={{ mb: 2 }}>
                <BanVeVanGo {...piece} />
            </Grid>
        })}
    </Grid>;
}