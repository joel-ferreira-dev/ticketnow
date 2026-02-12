"use client";

import { Card, Skeleton, Box, Stack } from "@mui/material";

export default function EventCardSkeleton() {
    return (
        <Card sx={{ height: "100%" }}>
            <Skeleton variant="rectangular" height={200} animation="wave" />
            <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="80%" height={32} animation="wave" />
                <Skeleton variant="text" width="100%" animation="wave" />
                <Skeleton variant="text" width="60%" animation="wave" />
                <Stack spacing={0.75} sx={{ mt: 2 }}>
                    <Skeleton variant="text" width="50%" animation="wave" />
                    <Skeleton variant="text" width="40%" animation="wave" />
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Skeleton variant="text" width="30%" height={36} animation="wave" />
                    <Skeleton variant="rounded" width={120} height={36} animation="wave" />
                </Box>
            </Box>
        </Card>
    );
}
