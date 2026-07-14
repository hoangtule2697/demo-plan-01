import { QuantityButton } from "@component/base";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import type { GetFullDataResult } from "@type";

export default function DanhSachCanLam({
    details,
    onChange = () => { },
    onClear = () => { },
}: {
    details: GetFullDataResult["details"];
    onChange?: (index: number, newQuantity: number) => void;
    onClear?: () => void;
}) {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6">
                    Danh sách cần làm
                </Typography>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClear}
                >
                    X
                </Button>
            </Box>

            <List disablePadding>
                {details.map((d, index) => (
                    <ListItem
                        key={`dscl-${d.sanPhamCode}-${d.quantity}`}
                        disableGutters
                        sx={{ py: 1 }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <Typography>
                                {`${d.quantity} cái ${d.name}`}
                            </Typography>

                            <QuantityButton
                                defaultValue={d.quantity}
                                onChange={(newQuantity) =>
                                    onChange(index, newQuantity)
                                }
                            />
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box sx={{ mt: 2 }}>
                <hr />
            </Box>
        </Box>
    );
};
