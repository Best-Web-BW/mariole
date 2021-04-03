const refreshInterval = 1000 * 60 * 4 /* 4 minutes in ms */;

export default function runAutoRefresh(store) {
    runTimeout(store);
}

async function runTimeout(store) {
    if(await refresh(store)) setTimeout(() => runTimeout(store), refreshInterval);
}

async function refresh(store) {
    const response = await fetch("/api/auth/refresh");
    if(response.status === 200) {
        store.enableAdmin();
        return true;
    } else {
        store.disableAdmin();
        return false;
    }
}