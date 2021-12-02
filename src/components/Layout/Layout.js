import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import styles from "../../../src/styles/layout/layout.module.css";
import { Outlet } from "react-router";

export function Layout({children}){
    return (
        <div className={styles.layout}>
            <Navbar/>
            <div class="main-sidebar">
                <Sidebar/>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );    
}