import {
    Button,
    CardContent,
    CardHeader,
    Divider,
    Drawer,
    Grid,
    Typography,
    type DrawerProps
} from "@mui/material";
import { useState, type ElementType, type ReactNode } from "react";

const BaseDrawer = ({
    title,
    header,
    actionHeader,
    OpenButton,
    children,
    headerProps,
    drawerProps,
    contentProps,
}: DrawerProps & {
    title?: string;
    header?: ReactNode;
    actionHeader?: ReactNode;
    OpenButton?: ElementType;
    children?: ReactNode;
    headerProps?: any;
    drawerProps?: DrawerProps;
    contentProps?: any;
}) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    if (!OpenButton) OpenButton = () => <Button variant="outlined" size="small" onClick={toggleDrawer(true)}>Chi tiết</Button>

    return (
        <Grid>
            <Grid>
                <OpenButton onClick={toggleDrawer(true)} />
            </Grid>
            <Grid>
                <Drawer open={open} onClose={toggleDrawer(false)} anchor={"right"} {...drawerProps}>
                    <Grid sx={{ p: 1 }}>
                        {!!(header || title || actionHeader) && (
                            <>
                                <CardHeader
                                    title={<Grid data-testid="base-card-header">
                                        <Grid container spacing={1} sx={{ justifyContent: "space-between" }}>
                                            <Grid>
                                                {title && <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 20 }}>{title}</Typography>}
                                            </Grid>
                                            <Grid>{actionHeader}</Grid>
                                        </Grid>
                                        <Grid>{header}</Grid>
                                    </Grid>}
                                    sx={{
                                        py: 1.5,
                                        px: 2,
                                        p: 0,
                                    }}
                                    {...headerProps}
                                />
                                <Grid sx={{ mt: 1, mb: 1 }}>
                                    <Divider />
                                </Grid>
                            </>
                        )}

                        <CardContent sx={{ p: 0, minWidth: "500px" }} {...contentProps}>
                            {children}
                        </CardContent>
                    </Grid>
                </Drawer>
            </Grid>
        </Grid>
    );
};

export default BaseDrawer;