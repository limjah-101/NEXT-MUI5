import React from "react";
import Head from "next/head";
import Topbar from "./Topbar";

export default function Layout({ title, children }) {
    return (
        <>
            {/* Head */}
            <Head>
                <title>{title ? title + " - Admin" : "Admin"}</title>
            </Head>
            {/* Topbar */}
            <Topbar />
            {children}
            {/* children */}
            {/* Footer */}
        </>
    );
}
