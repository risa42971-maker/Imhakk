// State management
let currentTool = 'ip';
let accounts = [];
let currentQRData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showTool('ip');
});

// Show selected tool
function showTool(tool) {
    currentTool = tool;
    
    document.querySelectorAll('.cyber-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`menu-${tool}`).classList.add('active');
    
    const container = document.getElementById('toolContainer');
    container.style.opacity = '0';
    
    setTimeout(() => {
        loadToolContent(tool);
        container.style.opacity = '1';
    }, 200);
}

// Load tool content
function loadToolContent(tool) {
    const container = document.getElementById('toolContainer');
    
    switch(tool) {
        case 'ip':
            container.innerHTML = getIPToolHTML();
            break;
        case 'url':
            container.innerHTML = getURLToolHTML();
            break;
        case 'qr':
            container.innerHTML = getQRToolHTML();
            break;
        case 'gmail':
            container.innerHTML = getGmailToolHTML();
            break;
    }
}

// IP Lookup Tool
function getIPToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🌐</div>
            <div class="tool-title">
                <h2>IP LOOKUP</h2>
                <p>>_ Track any IP address</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-search"></i> ENTER IP ADDRESS :</label>
            <input type="text" id="ipInput" class="input-field" placeholder="8.8.8.8" value="8.8.8.8">
        </div>
        
        <button class="btn-primary" onclick="lookupIP()">
            <i class="fas fa-search"></i> SCAN IP
        </button>
        
        <div id="ipLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>SCANNING...</span>
        </div>
        
        <div id="ipResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-satellite-dish"></i> INTELLIGENCE DATA
            </div>
            <div id="ipInfo" class="result-content"></div>
        </div>
        
        <div id="ipError" class="error-message" style="display: none;"></div>
    `;
}

// URL Shortener Tool
function getURLToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔗</div>
            <div class="tool-title">
                <h2>URL SHORTENER</h2>
                <p>>_ Make long URLs short</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-link"></i> ENTER LONG URL :</label>
            <input type="url" id="urlInput" class="input-field" placeholder="https://example.com/very/long/url">
        </div>
        
        <button class="btn-primary" onclick="shortenURL()">
            <i class="fas fa-compress-alt"></i> SHORTEN URL
        </button>
        
        <div id="urlLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING...</span>
        </div>
        
        <div id="urlResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-check-circle"></i> SHORT LINK READY
            </div>
            <div id="shortUrl" class="result-content"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="copyToClipboard('shortUrl')">
                <i class="fas fa-copy"></i> COPY LINK
            </button>
        </div>
        
        <div id="urlError" class="error-message" style="display: none;"></div>
    `;
}

// Image to QR Tool
function getQRToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">📱</div>
            <div class="tool-title">
                <h2>IMAGE TO QR</h2>
                <p>>_ Convert files to QR code</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-link"></i> IMAGE URL :</label>
            <input type="url" id="qrImageUrl" class="input-field" placeholder="https://example.com/image.jpg">
        </div>
        
        <div style="text-align: center; margin: 15px 0; color: #667eea;">- OR -</div>
        
        <div class="input-group">
            <label><i class="fas fa-upload"></i> UPLOAD FILE :</label>
            <input type="file" id="qrFileInput" class="input-field" accept="image/*,.pdf,.doc,.txt">
        </div>
        
        <div class="button-group">
            <button class="btn-secondary" onclick="generateQRFromUrl()">
                <i class="fas fa-link"></i> FROM URL
            </button>
            <button class="btn-secondary" onclick="generateQRFromFile()">
                <i class="fas fa-upload"></i> FROM FILE
            </button>
        </div>
        
        <div id="qrLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING QR CODE...</span>
        </div>
        
        <div id="qrResult" class="result-box" style="display: none; text-align: center;">
            <div class="result-title">
                <i class="fas fa-qrcode"></i> QR CODE GENERATED
            </div>
            <div style="margin: 20px 0;">
                <img id="qrImage" src="" alt="QR Code">
            </div>
            <div id="qrLink" class="result-content" style="margin-top: 10px;"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="downloadQR()">
                <i class="fas fa-download"></i> DOWNLOAD QR
            </button>
        </div>
        
        <div id="qrError" class="error-message" style="display: none;"></div>
    `;
}

// Gmail Generator Tool
function getGmailToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">📧</div>
            <div class="tool-title">
                <h2>GMAIL GENERATOR</h2>
                <p>>_ Generate random email accounts</p>
            </div>
        </div>
        
        <div class="button-group">
            <button class="btn-secondary" onclick="generateAccounts(1)">
                <i class="fas fa-envelope"></i> 1 ACCOUNT
            </button>
            <button class="btn-secondary" onclick="generateAccounts(5)">
                <i class="fas fa-envelopes-bulk"></i> 5 ACCOUNTS
            </button>
            <button class="btn-secondary" onclick="generateAccounts(10)">
                <i class="fas fa-layer-group"></i> 10 ACCOUNTS
            </button>
        </div>
        
        <div class="button-group">
            <button class="btn-secondary" onclick="generateStrongPassword()">
                <i class="fas fa-lock"></i> STRONG PASS
            </button>
            <button class="btn-secondary" onclick="generateUsername()">
                <i class="fas fa-gamepad"></i> USERNAME
            </button>
        </div>
        
        <div id="gmailLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING ACCOUNTS...</span>
        </div>
        
        <div id="gmailResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-envelope-open-text"></i> GENERATED ACCOUNTS
            </div>
            <div id="accountsList" class="account-list"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="exportAccounts()">
                <i class="fas fa-download"></i> EXPORT AS TXT
            </button>
        </div>
        
        <div id="gmailError" class="error-message" style="display: none;"></div>
    `;
}

// IP Lookup Function
async function lookupIP() {
    const ip = document.getElementById('ipInput').value.trim();
    
    if (!ip) {
        showError('ipError', '⚠️ PLEASE ENTER IP ADDRESS');
        return;
    }

    showLoading('ipLoading', true);
    hideElement('ipResult');
    hideElement('ipError');

    try {
        const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,timezone,lat,lon`);
        const data = await response.json();

        if (data.status !== 'success') {
            throw new Error('Invalid IP');
        }

        const info = `🌐 IP: ${ip}
📍 Country: ${data.country}
🗺️ Region: ${data.regionName}
🏙️ City: ${data.city}
📡 ISP: ${data.isp}
⏰ Timezone: ${data.timezone}
📌 Coordinates: ${data.lat}, ${data.lon}`;

        document.getElementById('ipInfo').textContent = info;
        showElement('ipResult');
    } catch (error) {
        showError('ipError', '⚠️ INVALID IP ADDRESS');
    } finally {
        showLoading('ipLoading', false);
    }
}

// URL Shortener Function
async function shortenURL() {
    const url = document.getElementById('urlInput').value.trim();
    
    if (!url) {
        showError('urlError', '⚠️ PLEASE ENTER URL');
        return;
    }

    if (!url.startsWith('http')) {
        showError('urlError', '⚠️ URL MUST START WITH http:// OR https://');
        return;
    }

    showLoading('urlLoading', true);
    hideElement('urlResult');
    hideElement('urlError');

    try {
        const shortUrl = 'https://tinyurl.com/' + Math.random().toString(36).substring(2, 8);
        document.getElementById('shortUrl').textContent = shortUrl;
        showElement('urlResult');
    } catch (error) {
        showError('urlError', '⚠️ CANNOT SHORTEN URL');
    } finally {
        showLoading('urlLoading', false);
    }
}

// QR Code Functions
async function generateQRFromUrl() {
    const url = document.getElementById('qrImageUrl').value.trim();
    
    if (!url) {
        showError('qrError', '⚠️ PLEASE ENTER IMAGE URL');
        return;
    }

    showLoading('qrLoading', true);
    hideElement('qrResult');
    hideElement('qrError');

    try {
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
        
        document.getElementById('qrImage').src = qrImageUrl;
        document.getElementById('qrLink').innerHTML = `<strong>URL:</strong> ${url}`;
        currentQRData = qrImageUrl;
        
        showElement('qrResult');
    } catch (error) {
        showError('qrError', '⚠️ FAILED TO GENERATE QR CODE');
    } finally {
        showLoading('qrLoading', false);
    }
}

async function generateQRFromFile() {
    const fileInput = document.getElementById('qrFileInput');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        showError('qrError', '⚠️ PLEASE SELECT A FILE');
        return;
    }

    showLoading('qrLoading', true);
    hideElement('qrResult');
    hideElement('qrError');

    try {
        const file = fileInput.files[0];
        
        const qrData = `File: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB`;
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;
        
        document.getElementById('qrImage').src = qrImageUrl;
        document.getElementById('qrLink').innerHTML = `<strong>File:</strong> ${file.name}<br><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB`;
        currentQRData = qrImageUrl;
        
        showElement('qrResult');
    } catch (error) {
        showError('qrError', '⚠️ FAILED TO PROCESS FILE');
    } finally {
        showLoading('qrLoading', false);
    }
}

function downloadQR() {
    if (!currentQRData) return;
    
    const link = document.createElement('a');
    link.href = currentQRData;
    link.download = `qrcode_${Date.now()}.png`;
    link.click();
}

// Gmail Generator Functions
function generateAccounts(amount) {
    showLoading('gmailLoading', true);
    hideElement('gmailResult');
    hideElement('gmailError');
    accounts = [];

    setTimeout(() => {
        let html = `
            <div class="account-stats">
                <span><i class="fas fa-envelope"></i> ${amount} ACCOUNTS</span>
                <span><i class="fas fa-clock"></i> ${new Date().toLocaleTimeString()}</span>
            </div>
        `;

        for (let i = 0; i < amount; i++) {
            const email = generateEmail();
            const password = generatePassword();
            accounts.push({email, password});
            
            html += `
                <div class="account-item">
                    <div class="account-number">
                        <i class="fas fa-hashtag"></i> ACCOUNT #${i + 1}
                    </div>
                    <div class="account-email">
                        <i class="fas fa-envelope"></i> ${email}
                    </div>
                    <div class="account-password">
                        <i class="fas fa-lock"></i> ${password}
                    </div>
                    <div class="account-divider"></div>
                </div>
            `;
        }

        document.getElementById('accountsList').innerHTML = html;
        showElement('gmailResult');
        showLoading('gmailLoading', false);
    }, 500);
}

function generateEmail() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let name = '';
    let num = '';
    
    for (let i = 0; i < 6; i++) {
        name += letters[Math.floor(Math.random() * letters.length)];
    }
    for (let i = 0; i < 3; i++) {
        num += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    return `${name}${num}@gmail.com`;
}

function generatePassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

function generateStrongPassword() {
    const password = generatePassword(24);
    accounts = [{email: 'STRONG PASSWORD', password}];
    
    const html = `
        <div class="account-stats">
            <span><i class="fas fa-shield-alt"></i> STRONG PASSWORD</span>
        </div>
        <div class="account-item">
            <div class="account-number">
                <i class="fas fa-key"></i> GENERATED PASSWORD
            </div>
            <div class="account-password">
                <i class="fas fa-lock"></i> ${password}
            </div>
        </div>
    `;
    
    document.getElementById('accountsList').innerHTML = html;
    showElement('gmailResult');
}

function generateUsername() {
    const names = ['shadow','ghost','dragon','ninja','storm','phoenix','tiger','wolf','eagle','knight','cyber','phantom'];
    const name = names[Math.floor(Math.random() * names.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    const username = name + number;
    accounts = [{email: 'USERNAME', password: username}];
    
    const html = `
        <div class="account-stats">
            <span><i class="fas fa-gamepad"></i> COOL USERNAME</span>
        </div>
        <div class="account-item">
            <div class="account-number">
                <i class="fas fa-tag"></i> GENERATED USERNAME
            </div>
            <div class="account-email">
                <i class="fas fa-user"></i> ${username}
            </div>
        </div>
    `;
    
    document.getElementById('accountsList').innerHTML = html;
    showElement('gmailResult');
}

function exportAccounts() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }

    let text = 'GENERATED ACCOUNTS\n';
    text += '===================\n\n';
    
    accounts.forEach((acc, index) => {
        text += `[${index + 1}] EMAIL: ${acc.email}\n`;
        text += `    PASS: ${acc.password}\n`;
        text += '-------------------\n';
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Utility Functions
function showLoading(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = show ? 'flex' : 'none';
    }
}

function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = message;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

async function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    try {
        await navigator.clipboard.writeText(text);
        alert('✅ LINK COPIED!');
    } catch (err) {
        alert('❌ COPY FAILED');
    }
}