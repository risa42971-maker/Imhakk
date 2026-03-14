// State management
let currentTool = 'ip';
let accounts = [];
let lastUploadedLink = '';
let lastQRCodeData = '';

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
        case 'link':
            container.innerHTML = getLinkToolHTML();
            break;
        case 'gmail':
            container.innerHTML = getGmailToolHTML();
            break;
    }
}

// IP Lookup Tool HTML
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

// Gmail Generator Tool HTML
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
            <div id="accountsList" class="account-list"></div>
        </div>
        
        <div id="gmailError" class="error-message" style="display: none;"></div>
    `;
}

// Link Checker Tool HTML
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

// Get My IP
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

// Gmail Generator Functions
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
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding: 10px; background: white; border-radius: 8px;">
                    <span><i class="fas fa-envelope"></i> ${amount} ACCOUNTS</span>
                    <span><i class="fas fa-clock"></i> ${new Date().toLocaleTimeString()}</span>
                </div>
        `;

        for (let i = 0; i < amount; i++) {
            const email = generateEmail();
            const password = generatePassword();
            accounts.push({email, password});
            
            html += `
                <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <div style="display: flex; align-items: center; margin-bottom: 10px;">
                        <i class="fas fa-hashtag" style="color: #667eea;"></i>
                        <span style="font-weight: bold; margin-left: 5px;">ACCOUNT #${i + 1}</span>
                    </div>
                    <div style="display: grid; gap: 8px;">
                        <div style="display: flex; align-items: center;">
                            <i class="fas fa-envelope" style="color: #10b981; width: 20px;"></i>
                            <span style="color: #666; margin-left: 8px;">${email}</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <i class="fas fa-lock" style="color: #f59e0b; width: 20px;"></i>
                            <span style="color: #666; margin-left: 8px;">${password}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        html += `
                <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="exportAccounts()">
                    <i class="fas fa-download"></i> EXPORT AS TXT
                </button>
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
            </div>
        `;

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
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
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
            </div>
            
            <div class="developer-credit" style="margin-top: 15px; text-align: center; padding: 10px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span class="neon-text" style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
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
}

// Link Checker Function
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

// Link Analysis Function
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
        element.innerHTML = message + '<br><br><span style="font-size:0.9em;"><i class="fas fa-crown"></i> DEVELOPED BY @TH3Cen_cee</span>';
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }
}

async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    let text = '';
    
    if (element.tagName === 'DIV') {
        text = element.textContent || element.innerText;
    } else {
        text = element.textContent;
    }
    
    const linkMatch = text.match(/https?:\/\/[^\s]+/);
    if (linkMatch) {
        text = linkMatch[0];
    }
    
    try {
        await navigator.clipboard.writeText(text);
        alert('✅ LINK COPIED!\n\n⚡ DEVELOPED BY @TH3Cen_cee');
    } catch (err) {
        alert('❌ COPY FAILED\n\n⚡ DEVELOPED BY @TH3Cen_cee');
    }
    }
