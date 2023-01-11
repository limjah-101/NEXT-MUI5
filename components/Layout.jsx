import React from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import Topbar from "./Topbar";

export default function Layout({title, children}) {
    return (
        <>
            {/* Head */}
            <Head>
                <title>{title ? title + ' - Tsolay Vintage' : 'Tsolay'}</title>
            </Head>
            {/* Topbar */}
            <Topbar />
            {children}
            {/* children */}
            {/* Footer */}
        </>
    );
}
