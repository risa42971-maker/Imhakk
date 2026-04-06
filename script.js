// ==================== STATE MANAGEMENT ====================
let currentTool = 'ip';
let accounts = [];
let lastUploadedLink = '';
let lastQRCodeData = '';

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    showTool('ip');
    
    // Check if user previously enabled dark mode
    const darkModePref = localStorage.getItem('darkMode');
    
    if (darkModePref === 'enabled') {
        document.body.classList.add('dark-mode');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            const text = toggleBtn.querySelector('.toggle-text');
            icon.className = 'fas fa-sun';
            text.textContent = 'LIGHT';
        }
    }
    
    // Check system preference if no saved preference
    if (!darkModePref && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            const text = toggleBtn.querySelector('.toggle-text');
            icon.className = 'fas fa-sun';
            text.textContent = 'LIGHT';
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('darkMode')) {
            if (event.matches) {
                document.body.classList.add('dark-mode');
                updateToggleButton(true);
            } else {
                document.body.classList.remove('dark-mode');
                updateToggleButton(false);
            }
        }
    });
});

// ==================== TOOL NAVIGATION ====================
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

function loadToolContent(tool) {
    const container = document.getElementById('toolContainer');
    
    switch(tool) {
        case 'ip':
            container.innerHTML = getIPToolHTML();
            break;
        case 'link':
            container.innerHTML = getLinkToolHTML();
            break;
        case 'gmail':
            container.innerHTML = getGmailToolHTML();
            break;
        case 'repeat':
            container.innerHTML = getRepeatToolHTML();
            break;
        case 'base64':
            container.innerHTML = getBase64ToolHTML();
            break;
        case 'password':
            container.innerHTML = getPasswordToolHTML();
            break;
        case 'qrcode':
            container.innerHTML = getQRCodeToolHTML();
            break;
        case 'useragent':
            container.innerHTML = getUserAgentToolHTML();
            break;
    }
}

// ==================== TOOL HTML TEMPLATES ====================
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
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button class="btn-primary" onclick="lookupIP()" style="flex: 2;">
                <i class="fas fa-search"></i> SCAN IP
            </button>
            <button class="btn-secondary" onclick="getMyIP()" style="flex: 1;">
                <i class="fas fa-laptop"></i> MY IP
            </button>
        </div>
        
        <div id="ipLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>SCANNING IP ADDRESS...</span>
        </div>
        
        <div id="ipResult" class="result-box" style="display: none;">
            <div id="ipInfo" class="result-content"></div>
        </div>
        
        <div id="ipError" class="error-message" style="display: none;"></div>
    `;
}

function getGmailToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">📧</div>
            <div class="tool-title">
                <h2>GMAIL GENERATOR</h2>
                <p>>_ Generate random email accounts (Working!)</p>
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
            <button class="btn-secondary" onclick="generateAccounts(20)">
                <i class="fas fa-database"></i> 20 ACCOUNTS
            </button>
            <button class="btn-secondary" onclick="generateAccounts(50)">
                <i class="fas fa-chart-line"></i> 50 ACCOUNTS
            </button>
        </div>
        
        <div class="button-group">
            <button class="btn-secondary" onclick="generateStrongPassword()">
                <i class="fas fa-lock"></i> STRONG PASS
            </button>
            <button class="btn-secondary" onclick="generateUsername()">
                <i class="fas fa-gamepad"></i> USERNAME
            </button>
            <button class="btn-secondary" onclick="exportAccountsCSV()">
                <i class="fas fa-file-csv"></i> EXPORT CSV
            </button>
            <button class="btn-secondary" onclick="exportAccountsJSON()">
                <i class="fas fa-code"></i> EXPORT JSON
            </button>
        </div>
        
        <div id="gmailLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING ACCOUNTS...</span>
        </div>
        
        <div id="gmailResult" class="result-box" style="display: none;">
            <div id="accountsList" class="account-list"></div>
        </div>
        
        <div id="gmailError" class="error-message" style="display: none;"></div>
    `;
}

function getLinkToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔍</div>
            <div class="tool-title">
                <h2>LINK CHECKER</h2>
                <p>>_ Check if a link is safe or suspicious</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-link"></i> ENTER URL TO CHECK :</label>
            <input type="url" id="linkInput" class="input-field" placeholder="https://example.com">
        </div>
        
        <button class="btn-primary" onclick="checkLink()">
            <i class="fas fa-shield-alt"></i> SCAN LINK
        </button>
        
        <div id="linkLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>SCANNING LINK FOR THREATS...</span>
        </div>
        
        <div id="linkResult" class="result-box" style="display: none;">
            <div id="linkInfo" class="result-content"></div>
        </div>
        
        <div id="linkError" class="error-message" style="display: none;"></div>
    `;
}

function getRepeatToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔄</div>
            <div class="tool-title">
                <h2>REPEAT WORD</h2>
                <p>>_ Repeat any word up to 1000 times</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-pencil-alt"></i> ENTER YOUR TEXT :</label>
            <input type="text" id="repeatText" class="input-field" placeholder="សួស្តី Deepseek">
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-hashtag"></i> NUMBER OF TIMES (MAX 1000) :</label>
            <input type="number" id="repeatCount" class="input-field" placeholder="100" min="1" max="1000" value="100">
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button class="btn-primary" onclick="generateRepeat()" style="flex: 2;">
                <i class="fas fa-play"></i> GENERATE
            </button>
            <button class="btn-secondary" onclick="clearRepeat()" style="flex: 1;">
                <i class="fas fa-trash"></i> CLEAR
            </button>
        </div>
        
        <div id="repeatLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>GENERATING REPEATED TEXT...</span>
        </div>
        
        <div id="repeatResult" class="result-box" style="display: none;">
            <div class="account-stats">
                <span><i class="fas fa-list"></i> <span id="repeatCountDisplay">0</span> LINES</span>
                <span><i class="fas fa-clock"></i> <span id="repeatTimeDisplay">0.0</span>s</span>
            </div>
            <div id="repeatContent" class="result-content" style="max-height: 400px; overflow-y: auto; font-family: monospace; white-space: pre-wrap;"></div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="btn-secondary" onclick="copyRepeat()" style="flex: 1;">
                    <i class="fas fa-copy"></i> COPY
                </button>
                <button class="btn-secondary" onclick="downloadRepeat()" style="flex: 1;">
                    <i class="fas fa-download"></i> DOWNLOAD TXT
                </button>
            </div>
        </div>
        
        <div id="repeatError" class="error-message" style="display: none;"></div>
        
        <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
            <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
        </div>
    `;
}

function getBase64ToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔐</div>
            <div class="tool-title">
                <h2>BASE64 ENCODER/DECODER</h2>
                <p>>_ Encode or decode Base64 strings</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-code"></i> INPUT TEXT :</label>
            <textarea id="base64Input" class="input-field" rows="4" placeholder="Enter text to encode or decode..."></textarea>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button class="btn-primary" onclick="encodeBase64()" style="flex: 1;">
                <i class="fas fa-lock"></i> ENCODE → BASE64
            </button>
            <button class="btn-primary" onclick="decodeBase64()" style="flex: 1;">
                <i class="fas fa-unlock-alt"></i> DECODE ← BASE64
            </button>
        </div>
        
        <div id="base64Result" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-file-alt"></i> RESULT:
                <button class="btn-secondary" style="margin-left: auto; padding: 5px 10px;" onclick="copyBase64Result()">
                    <i class="fas fa-copy"></i> COPY
                </button>
            </div>
            <div id="base64Content" class="result-content" style="word-break: break-all;"></div>
        </div>
        
        <div id="base64Error" class="error-message" style="display: none;"></div>
        
        <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
            <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
        </div>
    `;
}

function getPasswordToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🔒</div>
            <div class="tool-title">
                <h2>PASSWORD STRENGTH CHECKER</h2>
                <p>>_ Check how strong your password is</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-key"></i> ENTER PASSWORD :</label>
            <input type="password" id="passwordInput" class="input-field" placeholder="Enter your password...">
            <button class="btn-secondary" style="margin-top: 5px;" onclick="togglePasswordVisibility()">
                <i class="fas fa-eye"></i> SHOW/HIDE
            </button>
        </div>
        
        <button class="btn-primary" onclick="checkPasswordStrength()">
            <i class="fas fa-shield-alt"></i> CHECK STRENGTH
        </button>
        
        <div id="passwordResult" class="result-box" style="display: none;">
            <div id="passwordInfo" class="result-content"></div>
        </div>
        
        <div id="passwordError" class="error-message" style="display: none;"></div>
        
        <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
            <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
        </div>
    `;
}

function getQRCodeToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">📱</div>
            <div class="tool-title">
                <h2>QR CODE GENERATOR</h2>
                <p>>_ Convert text or link to QR Code</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-pencil-alt"></i> ENTER TEXT OR URL :</label>
            <textarea id="qrText" class="input-field" rows="3" placeholder="Enter text, URL, or any data..."></textarea>
        </div>
        
        <button class="btn-primary" onclick="generateQRCode()">
            <i class="fas fa-qrcode"></i> GENERATE QR CODE
        </button>
        
        <div id="qrResult" class="result-box" style="display: none; text-align: center;">
            <div id="qrImageContainer"></div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button class="btn-secondary" onclick="downloadQRCode()" style="flex: 1;">
                    <i class="fas fa-download"></i> DOWNLOAD PNG
                </button>
            </div>
        </div>
        
        <div id="qrError" class="error-message" style="display: none;"></div>
        
        <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
            <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
        </div>
    `;
}

function getUserAgentToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🖥️</div>
            <div class="tool-title">
                <h2>RANDOM USER AGENT</h2>
                <p>>_ Generate random browser user agents</p>
            </div>
        </div>
        
        <div class="button-group">
            <button class="btn-secondary" onclick="generateRandomUserAgent()">
                <i class="fas fa-random"></i> GENERATE RANDOM
            </button>
            <button class="btn-secondary" onclick="getCurrentUserAgent()">
                <i class="fas fa-laptop"></i> MY USER AGENT
            </button>
        </div>
        
        <div id="userAgentResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-info-circle"></i> USER AGENT:
                <button class="btn-secondary" style="margin-left: auto; padding: 5px 10px;" onclick="copyUserAgent()">
                    <i class="fas fa-copy"></i> COPY
                </button>
            </div>
            <div id="userAgentContent" class="result-content" style="word-break: break-all; font-family: monospace;"></div>
        </div>
        
        <div id="userAgentError" class="error-message" style="display: none;"></div>
        
        <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
            <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
        </div>
    `;
}

// ==================== DARK MODE FUNCTIONS ====================
function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('darkModeToggle');
    const icon = toggleBtn.querySelector('i');
    const text = toggleBtn.querySelector('.toggle-text');
    
    toggleBtn.classList.add('rotating');
    
    setTimeout(() => {
        toggleBtn.classList.remove('rotating');
    }, 500);
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
        text.textContent = 'DARK';
        localStorage.setItem('darkMode', 'disabled');
        showToast('🌞 Light Mode Activated');
    } else {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
        text.textContent = 'LIGHT';
        localStorage.setItem('darkMode', 'enabled');
        showToast('🌙 Dark Mode Activated');
    }
}

function updateToggleButton(isDark) {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        const text = toggleBtn.querySelector('.toggle-text');
        
        if (isDark) {
            icon.className = 'fas fa-sun';
            text.textContent = 'LIGHT';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'DARK';
        }
    }
}

function showToast(message) {
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas ${message.includes('🌙') ? 'fa-moon' : 'fa-sun'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Keyboard shortcut (Ctrl/Cmd + Shift + D)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// ==================== IP LOOKUP FUNCTIONS ====================
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
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = `http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp,org,as,timezone,lat,lon,query`;
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const data = await response.json();
        const ipData = JSON.parse(data.contents);

        if (ipData.status !== 'success') {
            throw new Error('Invalid IP Address');
        }

        const info = `
            <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <i class="fas fa-satellite-dish" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                    <span style="font-weight: bold; color: #667eea;">IP INFORMATION</span>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-globe" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">IP Address:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.query}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-map-marker-alt" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">Country:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.country}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-map" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">Region:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.regionName}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-city" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">City:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.city}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); grid-column: span 2;">
                        <i class="fas fa-wifi" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">ISP:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.isp}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); grid-column: span 2;">
                        <i class="fas fa-building" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">Organization:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.org || 'N/A'}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-clock" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">Timezone:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.timezone}</div>
                    </div>
                    
                    <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas fa-map-pin" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666; font-size: 0.9em;">Coordinates:</span>
                        <div style="font-weight: bold; margin-top: 5px; color: #333;">${ipData.lat}, ${ipData.lon}</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 10px;">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    <i class="fas fa-lightbulb" style="color: #fbbf24; margin-right: 10px;"></i>
                    <span style="font-weight: bold; color: #667eea;">IP INFO:</span>
                </div>
                <ul style="margin-left: 20px; color: #666; line-height: 1.8;">
                    <li>🌍 This IP is located in ${ipData.country}</li>
                    <li>📡 ISP: ${ipData.isp}</li>
                    <li>🔒 ${ipData.org ? 'Organization: ' + ipData.org : 'No organization data'}</li>
                </ul>
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        `;

        document.getElementById('ipInfo').innerHTML = info;
        showElement('ipResult');
        showLoading('ipLoading', false);
        
    } catch (error) {
        try {
            const fallbackResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData.error) {
                throw new Error('Invalid IP');
            }
            
            const info = `
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <i class="fas fa-satellite-dish" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                        <span style="font-weight: bold; color: #667eea;">IP INFORMATION</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-globe" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">IP Address:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.ip}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-map-marker-alt" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">Country:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.country_name}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-map" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">Region:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.region}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-city" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">City:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.city}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); grid-column: span 2;">
                            <i class="fas fa-building" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">Organization:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.org || 'N/A'}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-clock" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">Timezone:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.timezone}</div>
                        </div>
                        
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-map-pin" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666; font-size: 0.9em;">Coordinates:</span>
                            <div style="font-weight: bold; margin-top: 5px; color: #333;">${fallbackData.latitude}, ${fallbackData.longitude}</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 10px;">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-lightbulb" style="color: #fbbf24; margin-right: 10px;"></i>
                        <span style="font-weight: bold; color: #667eea;">IP INFO:</span>
                    </div>
                    <ul style="margin-left: 20px; color: #666; line-height: 1.8;">
                        <li>🌍 This IP is located in ${fallbackData.country_name}</li>
                        <li>📡 ISP: ${fallbackData.org || 'Unknown'}</li>
                        <li>🔒 Currency: ${fallbackData.currency || 'N/A'}</li>
                    </ul>
                </div>
                
                <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                    <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
                </div>
            `;
            
            document.getElementById('ipInfo').innerHTML = info;
            showElement('ipResult');
            
        } catch (fallbackError) {
            showError('ipError', '⚠️ CANNOT FETCH IP INFORMATION. PLEASE TRY AGAIN.');
        } finally {
            showLoading('ipLoading', false);
        }
    }
}

async function getMyIP() {
    showLoading('ipLoading', true);
    hideElement('ipResult');
    hideElement('ipError');
    
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ipInput').value = data.ip;
        lookupIP();
    } catch (error) {
        showError('ipError', '⚠️ CANNOT GET YOUR IP');
        showLoading('ipLoading', false);
    }
}

// ==================== GMAIL GENERATOR FUNCTIONS (FULLY WORKING) ====================
function generateAccounts(amount) {
    showLoading('gmailLoading', true);
    hideElement('gmailResult');
    hideElement('gmailError');
    accounts = [];

    setTimeout(() => {
        let html = `
            <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <i class="fas fa-envelope-open-text" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                    <span style="font-weight: bold; color: #667eea;">GENERATED ACCOUNTS</span>
                </div>
                
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
                        <i class="fas fa-hashtag" style="color: #667eea;"></i>
                        <span style="font-weight: bold;">ACCOUNT #${i + 1}</span>
                    </div>
                    <div class="account-email">
                        <i class="fas fa-envelope" style="color: #10b981;"></i>
                        <span>${email}</span>
                        <button class="btn-secondary" style="margin-left: auto; padding: 5px 10px;" onclick="copyToClipboard('${email}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="account-password">
                        <i class="fas fa-lock" style="color: #f59e0b;"></i>
                        <span>${password}</span>
                        <button class="btn-secondary" style="margin-left: auto; padding: 5px 10px;" onclick="copyToClipboard('${password}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            `;
        }

        html += `
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="btn-secondary" style="flex: 1;" onclick="copyAllAccounts()">
                        <i class="fas fa-copy"></i> COPY ALL
                    </button>
                    <button class="btn-secondary" style="flex: 1;" onclick="exportAccounts()">
                        <i class="fas fa-download"></i> EXPORT TXT
                    </button>
                </div>
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        `;

        document.getElementById('accountsList').innerHTML = html;
        showElement('gmailResult');
        showLoading('gmailLoading', false);
        showToast(`✅ ${amount} accounts generated successfully!`);
    }, 500);
}

function generateEmail() {
    const firstNames = ['john', 'jane', 'mike', 'sarah', 'david', 'emma', 'chris', 'lisa', 'kevin', 'amy', 'alex', 'jessica', 'ryan', 'olivia', 'daniel'];
    const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'rodriguez', 'martinez'];
    const numbers = Math.floor(Math.random() * 9000) + 1000;
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const useNumber = Math.random() > 0.5;
    
    if (useNumber) {
        return `${firstName}.${lastName}${numbers}@gmail.com`;
    } else {
        return `${firstName}${lastName}${Math.floor(Math.random() * 100)}@gmail.com`;
    }
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
    accounts = [{email: 'STRONG PASSWORD', password: password}];
    
    const html = `
        <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <i class="fas fa-key" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                <span style="font-weight: bold; color: #667eea;">STRONG PASSWORD</span>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <i class="fas fa-lock" style="font-size: 32px; color: #10b981; margin-bottom: 10px;"></i>
                <div style="font-family: monospace; font-size: 1.2em; padding: 15px; background: #f0f3ff; border-radius: 8px; word-break: break-all;">
                    ${password}
                </div>
                <button class="btn-secondary" style="margin-top: 10px;" onclick="copyToClipboard('${password}')">
                    <i class="fas fa-copy"></i> COPY PASSWORD
                </button>
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        </div>
    `;
    
    document.getElementById('accountsList').innerHTML = html;
    showElement('gmailResult');
    showToast('🔐 Strong password generated!');
}

function generateUsername() {
    const prefixes = ['shadow', 'ghost', 'dragon', 'ninja', 'storm', 'phoenix', 'tiger', 'wolf', 'eagle', 'knight', 'cyber', 'phantom', 'dark', 'light', 'thunder'];
    const suffixes = ['x', 'z', 'pro', 'master', 'legend', 'warrior', 'hunter', 'slayer', 'rider', 'lord'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.floor(Math.random() * 9000) + 1000;
    const username = prefix + number + suffix;
    
    accounts = [{email: 'USERNAME', password: username}];
    
    const html = `
        <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <i class="fas fa-gamepad" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                <span style="font-weight: bold; color: #667eea;">COOL USERNAME</span>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center;">
                <i class="fas fa-user" style="font-size: 32px; color: #764ba2; margin-bottom: 10px;"></i>
                <div style="font-size: 1.5em; font-weight: bold; color: #333;">
                    ${username}
                </div>
                <button class="btn-secondary" style="margin-top: 10px;" onclick="copyToClipboard('${username}')">
                    <i class="fas fa-copy"></i> COPY USERNAME
                </button>
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        </div>
    `;
    
    document.getElementById('accountsList').innerHTML = html;
    showElement('gmailResult');
    showToast('🎮 Cool username generated!');
}

function exportAccounts() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }

    let text = 'GENERATED ACCOUNTS\n';
    text += '===================\n';
    text += 'DEVELOPED BY @TH3Cen_cee\n\n';
    
    accounts.forEach((acc, index) => {
        text += `[${index + 1}] EMAIL: ${acc.email}\n`;
        text += `    PASS: ${acc.password}\n`;
        text += '-------------------\n';
    });
    
    text += '\n⚡ HAKK TOOL ⚡ - DEVELOPED BY @TH3Cen_cee';

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('📁 Accounts exported to TXT!');
}

function exportAccountsCSV() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }
    
    let csv = 'Email,Password\n';
    accounts.forEach(acc => {
        csv += `"${acc.email}","${acc.password}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('📊 Accounts exported to CSV!');
}

function exportAccountsJSON() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }
    
    const json = JSON.stringify(accounts, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounts_${Date.now()}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('📋 Accounts exported to JSON!');
}

function copyAllAccounts() {
    if (accounts.length === 0) {
        showError('gmailError', '⚠️ NO ACCOUNTS GENERATED YET');
        return;
    }
    
    let text = '';
    accounts.forEach((acc, index) => {
        text += `${acc.email}:${acc.password}\n`;
    });
    
    copyToClipboard(text);
    showToast(`📋 Copied ${accounts.length} accounts to clipboard!`);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied to clipboard!');
    }).catch(() => {
        showError('gmailError', '⚠️ Copy failed');
    });
}

// ==================== LINK CHECKER FUNCTIONS ====================
function checkLink() {
    const link = document.getElementById('linkInput').value.trim();
    
    if (!link) {
        showError('linkError', '⚠️ PLEASE ENTER A URL');
        return;
    }

    if (!link.startsWith('http')) {
        showError('linkError', '⚠️ URL MUST START WITH http:// OR https://');
        return;
    }

    showLoading('linkLoading', true);
    hideElement('linkResult');
    hideElement('linkError');

    setTimeout(() => {
        try {
            const analysis = analyzeLink(link);
            
            let resultHTML = `
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <i class="fas fa-link" style="font-size: 24px; color: #667eea; margin-right: 10px;"></i>
                        <span style="font-weight: bold; color: #667eea;">URL SCANNED</span>
                    </div>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); word-break: break-all; margin-bottom: 15px;">
                        <i class="fas fa-globe" style="color: #667eea; margin-right: 8px;"></i>
                        <span style="color: #666;">${link}</span>
                    </div>
                </div>
            `;
            
            if (analysis.safe) {
                resultHTML += `
                    <div style="background: linear-gradient(135deg, #10b98110, #10b98120); padding: 20px; border-radius: 10px; margin-bottom: 15px; text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: #10b981;"></i>
                        <h3 style="margin: 10px 0; color: #10b981;">✅ LINK LOOKS SAFE</h3>
                        <p style="color: #666;">No suspicious patterns detected</p>
                    </div>
                `;
            } else {
                resultHTML += `
                    <div style="background: linear-gradient(135deg, #ef444410, #ef444420); padding: 20px; border-radius: 10px; margin-bottom: 15px; text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #ef4444;"></i>
                        <h3 style="margin: 10px 0; color: #ef4444;">⚠️ SUSPICIOUS LINK DETECTED</h3>
                    </div>
                `;
            }
            
            resultHTML += `
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <i class="fas fa-exclamation-circle" style="color: #fbbf24; margin-right: 10px;"></i>
                        <span style="font-weight: bold; color: #667eea;">SCAN RESULTS:</span>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
            `;
            
            analysis.warnings.forEach(warning => {
                const isWarning = warning.includes('⚠️');
                resultHTML += `
                    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 4px solid ${isWarning ? '#ef4444' : '#10b981'}; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <i class="fas ${isWarning ? 'fa-exclamation-circle' : 'fa-check-circle'}" style="color: ${isWarning ? '#ef4444' : '#10b981'}; margin-right: 8px;"></i>
                        <span style="color: #666;">${warning}</span>
                    </div>
                `;
            });
            
            resultHTML += `
                    </div>
                </div>
            `;
            
            resultHTML += `
                <div style="background: linear-gradient(135deg, #667eea10, #764ba210); padding: 20px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        <i class="fas fa-lightbulb" style="color: #fbbf24; font-size: 20px; margin-right: 10px;"></i>
                        <span style="font-weight: bold; color: #667eea;">SAFETY TIPS:</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-lock" style="color: #10b981; margin-right: 8px;"></i>
                            <span style="color: #666;">Use HTTPS</span>
                        </div>
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-shield-alt" style="color: #667eea; margin-right: 8px;"></i>
                            <span style="color: #666;">Avoid short links</span>
                        </div>
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-user-secret" style="color: #764ba2; margin-right: 8px;"></i>
                            <span style="color: #666;">Check domain age</span>
                        </div>
                        <div style="background: white; padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                            <i class="fas fa-search" style="color: #f59e0b; margin-right: 8px;"></i>
                            <span style="color: #666;">Verify sender</span>
                        </div>
                    </div>
                </div>
                
                <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                    <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
                </div>
            `;
            
            document.getElementById('linkInfo').innerHTML = resultHTML;
            showElement('linkResult');
            
        } catch (error) {
            showError('linkError', '⚠️ ERROR ANALYZING LINK');
        } finally {
            showLoading('linkLoading', false);
        }
    }, 800);
}

function analyzeLink(link) {
    const result = {
        safe: true,
        warnings: []
    };
    
    const linkLower = link.toLowerCase();
    
    const phishingKeywords = [
        "login", "signin", "verify", "secure", "update", "confirm",
        "banking", "paypal", "amazon", "facebook", "google",
        "free", "bonus", "gift", "prize", "winner", "claim", 
        "password", "account", "wallet", "bitcoin", "crypto",
        "urgent", "suspended", "limited", "unlock"
    ];
    
    phishingKeywords.forEach(keyword => {
        if (linkLower.includes(keyword)) {
            result.warnings.push(`⚠️ Suspicious keyword detected: "${keyword}"`);
            result.safe = false;
        }
    });
    
    const suspiciousTLDs = [
        ".xyz", ".top", ".club", ".online", ".site", ".live",
        ".tk", ".ml", ".ga", ".cf", ".gq",
        ".work", ".download", ".review", ".date", ".men"
    ];
    
    try {
        const url = new URL(link);
        const domain = url.hostname;
        
        suspiciousTLDs.forEach(tld => {
            if (domain.endsWith(tld)) {
                result.warnings.push(`⚠️ Suspicious domain extension: ${tld}`);
                result.safe = false;
            }
        });
        
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (ipRegex.test(domain)) {
            result.warnings.push(`⚠️ Link uses IP address instead of domain name (common in scams)`);
            result.safe = false;
        }
        
        const shorteners = [
            "bit.ly", "tinyurl", "tiny.cc", "goo.gl", "ow.ly",
            "is.gd", "buff.ly", "adf.ly", "shorte.st", "cutt.ly"
        ];
        
        shorteners.forEach(shortener => {
            if (domain.includes(shortener)) {
                result.warnings.push(`⚠️ Shortened URL detected (${shortener}) - destination hidden`);
                result.safe = false;
            }
        });
        
        if (!link.startsWith("https://")) {
            result.warnings.push(`⚠️ Website does not use HTTPS (not secure)`);
            result.safe = false;
        }
        
        const suspiciousPaths = [
            "/login.php", "/signin", "/verify", "/secure",
            "/update-info", "/confirm", "/wallet", "/payment"
        ];
        
        suspiciousPaths.forEach(path => {
            if (linkLower.includes(path)) {
                result.warnings.push(`⚠️ Suspicious path detected: ${path} (could be phishing page)`);
                result.safe = false;
            }
        });
        
        const subdomainCount = domain.split('.').length - 2;
        if (subdomainCount > 2) {
            result.warnings.push(`⚠️ Unusual number of subdomains (${subdomainCount})`);
            result.safe = false;
        }
        
        const numbersInDomain = (domain.match(/\d/g) || []).length;
        if (numbersInDomain > 5) {
            result.warnings.push(`⚠️ Unusual amount of numbers in domain (${numbersInDomain})`);
            result.safe = false;
        }
        
    } catch (e) {
        result.warnings.push(`⚠️ Invalid URL format`);
        result.safe = false;
    }
    
    if (link.length > 200) {
        result.warnings.push(`⚠️ Very long URL (${link.length} characters)`);
        result.safe = false;
    }
    
    const specialChars = (link.match(/[%@!*$]/g) || []).length;
    if (specialChars > 5) {
        result.warnings.push(`⚠️ Unusual number of special characters (${specialChars})`);
        result.safe = false;
    }
    
    if (result.warnings.length === 0) {
        result.warnings.push("✅ No suspicious patterns detected");
    }
    
    return result;
}

// ==================== REPEAT WORD FUNCTIONS ====================
function generateRepeat() {
    const text = document.getElementById('repeatText').value.trim();
    let count = parseInt(document.getElementById('repeatCount').value);
    
    if (!text) {
        showError('repeatError', '⚠️ PLEASE ENTER SOME TEXT');
        return;
    }
    
    if (isNaN(count) || count < 1) {
        count = 1;
    }
    
    if (count > 1000) {
        showError('repeatError', '⚠️ MAXIMUM LIMIT IS 1000 TIMES ONLY!');
        document.getElementById('repeatCount').value = 1000;
        count = 1000;
        return;
    }
    
    showLoading('repeatLoading', true);
    hideElement('repeatResult');
    hideElement('repeatError');
    
    setTimeout(() => {
        try {
            const startTime = performance.now();
            
            let result = '';
            for (let i = 1; i <= count; i++) {
                result += `${i}. ${text}\n`;
            }
            
            const endTime = performance.now();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            
            document.getElementById('repeatContent').innerHTML = result.replace(/\n/g, '<br>');
            document.getElementById('repeatCountDisplay').innerText = count;
            document.getElementById('repeatTimeDisplay').innerText = timeTaken;
            
            showElement('repeatResult');
            
        } catch (error) {
            showError('repeatError', '⚠️ ERROR GENERATING TEXT');
        } finally {
            showLoading('repeatLoading', false);
        }
    }, 100);
}

function clearRepeat() {
    document.getElementById('repeatText').value = '';
    document.getElementById('repeatCount').value = '100';
    hideElement('repeatResult');
    hideElement('repeatError');
}

function copyRepeat() {
    const content = document.getElementById('repeatContent').innerText;
    
    if (!content) {
        showError('repeatError', '⚠️ NO CONTENT TO COPY');
        return;
    }
    
    copyToClipboard(content);
}

function downloadRepeat() {
    const content = document.getElementById('repeatContent').innerText;
    const text = document.getElementById('repeatText').value.trim();
    const count = document.getElementById('repeatCount').value;
    
    if (!content) {
        showError('repeatError', '⚠️ NO CONTENT TO DOWNLOAD');
        return;
    }
    
    let header = `REPEATED TEXT\n`;
    header += `================\n`;
    header += `TEXT: "${text}"\n`;
    header += `COUNT: ${count} TIMES\n`;
    header += `GENERATED: ${new Date().toLocaleString()}\n`;
    header += `DEVELOPED BY @TH3Cen_cee\n`;
    header += `================\n\n`;
    
    const blob = new Blob([header + content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repeat_${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('📁 Downloaded as TXT!');
}

// ==================== BASE64 FUNCTIONS ====================
function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    
    if (!input) {
        showError('base64Error', '⚠️ PLEASE ENTER TEXT TO ENCODE');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        document.getElementById('base64Content').innerHTML = encoded;
        showElement('base64Result');
        hideElement('base64Error');
        showToast('🔐 Encoded to Base64!');
    } catch (error) {
        showError('base64Error', '⚠️ ENCODING FAILED');
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    
    if (!input) {
        showError('base64Error', '⚠️ PLEASE ENTER BASE64 TEXT TO DECODE');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        document.getElementById('base64Content').innerHTML = decoded;
        showElement('base64Result');
        hideElement('base64Error');
        showToast('🔓 Decoded from Base64!');
    } catch (error) {
        showError('base64Error', '⚠️ INVALID BASE64 STRING');
    }
}

function copyBase64Result() {
    const content = document.getElementById('base64Content').innerText;
    if (content) {
        copyToClipboard(content);
    }
}

// ==================== PASSWORD STRENGTH CHECKER ====================
function checkPasswordStrength() {
    const password = document.getElementById('passwordInput').value;
    
    if (!password) {
        showError('passwordError', '⚠️ PLEASE ENTER A PASSWORD');
        return;
    }
    
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) strength += 20;
    else if (password.length >= 6) strength += 10;
    else feedback.push('⚠️ Password is too short (min 8 characters)');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 20;
    else feedback.push('⚠️ Add uppercase letters');
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 20;
    else feedback.push('⚠️ Add lowercase letters');
    
    // Numbers check
    if (/\d/.test(password)) strength += 20;
    else feedback.push('⚠️ Add numbers');
    
    // Special characters check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    else feedback.push('⚠️ Add special characters (!@#$%^&*)');
    
    let strengthText = '';
    let strengthColor = '';
    let strengthIcon = '';
    
    if (strength >= 80) {
        strengthText = 'VERY STRONG';
        strengthColor = '#10b981';
        strengthIcon = '💪';
    } else if (strength >= 60) {
        strengthText = 'STRONG';
        strengthColor = '#3b82f6';
        strengthIcon = '🔒';
    } else if (strength >= 40) {
        strengthText = 'MEDIUM';
        strengthColor = '#f59e0b';
        strengthIcon = '⚠️';
    } else if (strength >= 20) {
        strengthText = 'WEAK';
        strengthColor = '#ef4444';
        strengthIcon = '🔓';
    } else {
        strengthText = 'VERY WEAK';
        strengthColor = '#ef4444';
        strengthIcon = '❌';
    }
    
    let html = `
        <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 10px;">${strengthIcon}</div>
            <h3 style="color: ${strengthColor}; margin-bottom: 15px;">${strengthText}</h3>
            <div style="background: #e0e0e0; border-radius: 10px; height: 20px; margin-bottom: 20px; overflow: hidden;">
                <div style="background: ${strengthColor}; width: ${strength}%; height: 100%; transition: width 0.5s ease;"></div>
            </div>
            <p style="color: #666; margin-bottom: 10px;"><strong>Strength Score:</strong> ${strength}/100</p>
            <p style="color: #666; margin-bottom: 10px;"><strong>Length:</strong> ${password.length} characters</p>
    `;
    
    if (feedback.length > 0 && strength < 80) {
        html += `
            <div style="margin-top: 15px; padding: 10px; background: #fef3c7; border-radius: 8px;">
                <strong style="color: #92400e;">Tips to improve:</strong>
                <ul style="margin-top: 10px; margin-left: 20px; color: #666;">
                    ${feedback.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
        `;
    } else if (strength >= 80) {
        html += `
            <div style="margin-top: 15px; padding: 10px; background: #d1fae5; border-radius: 8px;">
                <strong style="color: #065f46;">✅ Excellent password!</strong>
                <p style="margin-top: 5px;">Your password is very secure.</p>
            </div>
        `;
    }
    
    html += `
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        </div>
    `;
    
    document.getElementById('passwordInfo').innerHTML = html;
    showElement('passwordResult');
    hideElement('passwordError');
}

function togglePasswordVisibility() {
    const input = document.getElementById('passwordInput');
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// ==================== QR CODE FUNCTIONS ====================
function generateQRCode() {
    const text = document.getElementById('qrText').value.trim();
    
    if (!text) {
        showError('qrError', '⚠️ PLEASE ENTER TEXT OR URL');
        return;
    }
    
    const qrSize = 256;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(text)}`;
    
    const html = `
        <img src="${qrUrl}" alt="QR Code" style="max-width: 100%; border-radius: 10px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
        <p style="margin-top: 10px; color: #666; word-break: break-all;">${text}</p>
    `;
    
    document.getElementById('qrImageContainer').innerHTML = html;
    showElement('qrResult');
    hideElement('qrError');
    showToast('📱 QR Code generated!');
}

function downloadQRCode() {
    const img = document.querySelector('#qrImageContainer img');
    if (img) {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = img.src;
        link.click();
        showToast('📸 QR Code downloaded!');
    } else {
        showError('qrError', '⚠️ No QR Code to download');
    }
}

// ==================== USER AGENT FUNCTIONS ====================
function generateRandomUserAgent() {
    const userAgents = [
        // Chrome Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        // Firefox Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
        // Chrome Mac
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // Safari Mac
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
        // Chrome Linux
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // Edge Windows
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        // Mobile - Chrome Android
        'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
        // Mobile - Safari iOS
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
    ];
    
    const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
    document.getElementById('userAgentContent').innerHTML = randomUA;
    showElement('userAgentResult');
    hideElement('userAgentError');
    showToast('🖥️ Random User Agent generated!');
}

function getCurrentUserAgent() {
    const userAgent = navigator.userAgent;
    document.getElementById('userAgentContent').innerHTML = userAgent;
    showElement('userAgentResult');
    hideElement('userAgentError');
    showToast('📱 Your User Agent loaded!');
}

function copyUserAgent() {
    const content = document.getElementById('userAgentContent').innerText;
    if (content) {
        copyToClipboard(content);
    }
}

// ==================== UTILITY FUNCTIONS ====================
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
        element.innerHTML = message + '<br><br><span style="font-size:0.9em;"><i class="fas fa-crown"></i> DEVELOPED BY @TH3Cen_cee</span>';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 4000);
    }
}
