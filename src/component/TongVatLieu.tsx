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

export default function TongVatLieu({ chiTietVatLieuCanMua }: { chiTietVatLieuCanMua: TypeFullDataSanPham["chiTietVatLieuCanMua"] }) {
    const totalVatLieuCanMua = chiTietVatLieuCanMua.reduce((acc, cur) => acc + utils.number.num(cur.totalVatLieuCanMua), 0);

    const viewOptions = ({ vatLieuCode, options }: TypeFullDataSanPham["chiTietVatLieuCanMua"][number]) => {
        if (options?.totalLength) return `• Đã dùng ${options.totalUsed / 100}m / ${options.totalLength / 100}m, còn lại ${options.totalRemaining / 100}m`;
        if (options?.usedPercent) return `• Đã dùng ${options.usedPercent}%`;
        return null;
    }

    return (
        <BaseCard title="Tổng vật liệu">
            <Grid>
                <Grid>
                    <List disablePadding>
                        {chiTietVatLieuCanMua
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
                                                    <BaseDrawer title="Chi tiết bản vẽ" titleButton="Chi tiết" contentProps={{ sx: { p: 0, minWidth: "60svw" } }}>
                                                        <ChiTietBanVe {...vatLieuCanMua} />
                                                    </BaseDrawer>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                }
                            )}
                    </List>
                </Grid>
                <Grid>
                    <Typography sx={{ fontWeight: "bold", textAlign: "right" }}>
                        tổng tiền vật liệu: {utils.view.displayCurrency(totalVatLieuCanMua)}
                    </Typography>
                </Grid>
            </Grid>
        </BaseCard>
    );
};

const ChiTietBanVe = (vatLieuCanMua: TypeFullDataSanPham["chiTietVatLieuCanMua"][number]) => {
    if (vatLieuCanMua.vatLieuData.width && !vatLieuCanMua.vatLieuData.height) return <ChiTietBanVeByWidth {...vatLieuCanMua} />;
    if (vatLieuCanMua.vatLieuData.width && vatLieuCanMua.vatLieuData.height) return <ChiTietBanVeByWidthHeight {...vatLieuCanMua} />;
    return null;
};

const ChiTietBanVeByWidth = ({ vatLieuCode, options, vatLieuData }: TypeFullDataSanPham["chiTietVatLieuCanMua"][number]) => {
    const { pieces } = options;
    const fullWidth = utils.number.num(vatLieuData.width);
    const fullHeight = 20;

    return <Grid>
        <Grid sx={{ mb: 2 }}>
            <Typography>{`${vatLieuData.name} dài ${utils.number.num(vatLieuData.width) / 100}m`}</Typography>
        </Grid>
        {pieces.map((piece: any, idx: number) => {
            return <Grid key={`bar-${idx}`} sx={{ mb: 3 }}>
                <BanVeXY {...piece} vatLieuCode={vatLieuCode} fullWidth={fullWidth} fullHeight={fullHeight} showHeight={false} showTotalRemaining={true} />
            </Grid>
        })}
    </Grid>;
}

const ChiTietBanVeByWidthHeight = ({ vatLieuCode, options, vatLieuData }: TypeFullDataSanPham["chiTietVatLieuCanMua"][number]) => {
    const { pieces } = options;
    const fullWidth = utils.number.num(vatLieuData.width);
    const fullHeight = utils.number.num(vatLieuData.height);

    return <Grid>
        <Grid sx={{ mb: 2 }}>
            <Typography>{`${vatLieuData.name} ${utils.number.num(vatLieuData.width)}cm x ${utils.number.num(vatLieuData.height)}cm`}</Typography>
        </Grid>
        {pieces.map((piece: any, idx: number) => {
            return <Grid key={`piece-${idx}`} sx={{ mb: 2 }}>
                <BanVeXY {...piece} vatLieuCode={vatLieuCode} fullWidth={fullWidth} fullHeight={fullHeight} />
            </Grid>
        })}
    </Grid>;
}

const BanVeXY = ({ vatLieuCode, fullWidth, fullHeight, rects, totalRemaining, showHeight = true, showTotalRemaining = false }: { vatLieuCode: VatLieuCode, fullWidth: number, fullHeight: number, showHeight?: boolean, totalRemaining?: number; showTotalRemaining?: boolean, rects: { x: number; y: number; x2: number; y2: number }[] }) => {
    const bgImages: Partial<Record<VatLieuCode, string>> = {
        "van_go_vang_nhat": "https://media.istockphoto.com/id/1002879824/fr/photo/fond-de-bois-clair-table-en-bois-ou-en-planches-texture-close-up.jpg?s=612x612&w=0&k=20&c=jdqCGGfmZFwoMol4aL0xtlsC_gGV0EwwqksLKM27eLY=",
        "van_go_nau_dam": "https://gominhlong.com/wp-content/uploads/2017/10/9.-ML-2408-cherry.jpg",
        "van_plywood_20mm": "https://media.istockphoto.com/id/1002879824/fr/photo/fond-de-bois-clair-table-en-bois-ou-en-planches-texture-close-up.jpg?s=612x612&w=0&k=20&c=jdqCGGfmZFwoMol4aL0xtlsC_gGV0EwwqksLKM27eLY=",
    };
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
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>{width}{showHeight ? ` x ${height}` : ""}</Typography>
                    </Box>
                );
            })}

            {
                showTotalRemaining && totalRemaining && totalRemaining > 0 ? <Box
                    key={`vg-last`}
                    sx={{
                        position: "absolute",
                        right: `0%`,
                        top: `0%`,
                        width: `${(totalRemaining / fullWidth) * 100}%`,
                        height: `${(20 / fullHeight) * 100}%`,
                        backgroundColor: "#ff5c3b66",
                        border: "4px dashed grey",
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        fontSize: 12,
                    }}
                >
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>{totalRemaining}{showHeight ? ` x ${20}` : ""}</Typography>
                </Box> : null
            }
        </Box>
    );
}