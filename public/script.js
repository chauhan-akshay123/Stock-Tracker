const API_BASE_URL = "http://localhost:3000/api";
let authToken = localStorage.getItem("token");

// Show Register Form & Hide Login
function showRegister() {
    document.getElementById("register-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
}

// Show Login Form & Hide Register
function showLogin() {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Register Function
async function register() {
    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;

    // Clear previous errors
    document.getElementById("register-error").innerText = "";

    try {
        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert("Registration successful! Please log in.");
            showLogin();
        } else {
            document.getElementById("register-error").innerText = data.message || "Registration failed!";
        }
    } catch (error) {
        document.getElementById("register-error").innerText = "Network error. Please try again.";
        console.error("Register error:", error);
    }
}


// Login Function
async function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    // Clear previous errors
    document.getElementById("login-error").innerText = "";

    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem("token", data.token);
            authToken = data.token;

            document.getElementById("register-section").style.display = "none";
            document.getElementById("login-section").style.display = "none";
            document.getElementById("content").style.display = "block";

            loadCoins();
            loadUserSubscriptions();
        } else {
            document.getElementById("login-error").innerText = data.message || "Invalid login!";
        }
    } catch (error) {
        document.getElementById("login-error").innerText = "Network error. Please try again.";
        console.error("Login error:", error);
    }
}


// Fetch All Coins
async function loadCoins() {
    const res = await fetch(`${API_BASE_URL}/coins/all`, {
        headers: { Authorization: `Bearer ${authToken}` }
    });

    const data = await res.json();
    if (res.ok) {
        displayCoins(data.data);
    }
}

// Display Coins
function displayCoins(coins) {
    const coinsList = document.getElementById("coins-list");
    coinsList.innerHTML = "";
    coins.forEach(coin => {
        const div = document.createElement("div");
        div.className = "coin";
        div.innerHTML = `
            <span>${coin.name} (${coin.symbol.toUpperCase()})</span>
            <button onclick="subscribe('${coin.id}')">Subscribe</button>
        `;
        coinsList.appendChild(div);
    });
}

// Subscribe to a Coin
async function subscribe(coinId) {
    const res = await fetch(`${API_BASE_URL}/users/subscribe/${coinId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` }
    });

    if (res.ok) {
        loadUserSubscriptions();
    }
}

// Fetch User Subscriptions
async function loadUserSubscriptions() {
    const res = await fetch(`${API_BASE_URL}/users/subscriptions`, {
        headers: { Authorization: `Bearer ${authToken}` }
    });

    const data = await res.json();
    if (res.ok) {
        displaySubscriptions(data.subscriptions);
    }
}

// Display Subscribed Coins
function displaySubscriptions(subscriptions) {
    const subList = document.getElementById("subscribed-coins");
    subList.innerHTML = "";
    subscriptions.forEach(coinId => {
        const div = document.createElement("div");
        div.className = "coin subscribed";
        div.innerHTML = `
            <span>${coinId}</span>
            <button onclick="unsubscribe('${coinId}')">Unsubscribe</button>
        `;
        subList.appendChild(div);
    });
}

// Unsubscribe from a Coin
async function unsubscribe(coinId) {
    const res = await fetch(`${API_BASE_URL}/users/unsubscribe/${coinId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` }
    });

    if (res.ok) {
        loadUserSubscriptions();
    }
}

// Logout Function
function logout() {
    localStorage.removeItem("token");
    authToken = null;
    location.reload();
}

// Check if user is already logged in
if (authToken) {
    document.getElementById("register-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";
    document.getElementById("content").style.display = "block";
    loadCoins();
    loadUserSubscriptions();
}
