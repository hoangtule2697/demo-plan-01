import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
    titleButton,
    header,
    actionHeader,
    OpenButton,
    children,
    footer,
    headerProps,
    drawerProps,
    contentProps,
}: DrawerProps & {
    title?: string;
    titleButton?: string;
    header?: ReactNode;
    footer?: ReactNode;
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

    const iconOpts = {
        left: <ArrowRightIcon />,
        right: <ArrowLeftIcon />,
        top: <ArrowDropDownIcon />,
        bottom: <ArrowDropUpIcon />,
    };
    const defaultAnchor = "right";
    if (!OpenButton) OpenButton = () => <Button variant="outlined" size="small" endIcon={iconOpts[drawerProps?.anchor || defaultAnchor]} onClick={toggleDrawer(true)}>{titleButton || title || "Chi tiết"}</Button>

    return (
        <Grid>
            <Grid>
                <OpenButton onClick={toggleDrawer(true)} />
            </Grid>
            <Grid>
                <Drawer
                    open={open}
                    anchor={defaultAnchor}
                    onClose={toggleDrawer(false)}
                    {...drawerProps}
                >
                    <Grid sx={{ position: "relative", minWidth: "30svw", maxWidth: "80svw" }}>
                        {!!(header || title || actionHeader) && (
                            <Grid
                                sx={{
                                    position: "sticky",
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    p: 2,
                                    paddingBottom: 0,
                                    zIndex: (theme) => theme.zIndex.appBar,
                                    bgcolor: "#fff"
                                }}
                            >
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
                                    sx={{ py: 1.5, px: 2, p: 0 }}
                                    {...headerProps}
                                />
                                <Divider sx={{ mt: 1 }} />
                            </Grid>
                        )}

                        <Grid sx={{ p: 1, minHeight: "82svh" }}>
                            <CardContent sx={{ p: 0 }} {...contentProps}>
                                {children}
                            </CardContent>
                        </Grid>

                        {footer && <Grid
                            sx={{
                                position: "sticky",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                p: 2,
                                paddingTop: 0,
                                zIndex: (theme) => theme.zIndex.appBar,
                                bgcolor: "#fff"
                            }}
                        >
                            <Divider sx={{ mb: 1 }} />
                            {footer}
                        </Grid>}
                    </Grid>
                </Drawer>
            </Grid>
        </Grid>
    );
};

export default BaseDrawer;