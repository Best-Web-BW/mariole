const refreshInterval = 1000 * 60 * 4 /* 4 minutes in ms */;

export default function runAutoRefresh(store) {
    runTimeout(store);
}

async function runTimeout(store) {
    if(!localStorage.getItem("admin")) return;
    if(await refresh()) {
        store.enableAdmin();
        setTimeout(() => runTimeout(store), refreshInterval);
    } else store.disableAdmin();
}

async function refresh() {
    const response = await fetch("/api/auth/refresh");
    return response.status === 200;
}