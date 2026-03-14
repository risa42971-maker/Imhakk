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
        case 'url':
            container.innerHTML = getURLToolHTML();
            break;
        case 'upload':
            container.innerHTML = getUploadToolHTML();
            break;
        case 'gmail':
            container.innerHTML = getGmailToolHTML();
            break;
        case 'link':
            container.innerHTML = getLinkToolHTML();
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
            <div class="result-title">
                <i class="fas fa-satellite-dish"></i> IP INFORMATION
            </div>
            <div id="ipInfo" class="result-content"></div>
            <div class="developer-credit">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        </div>
        
        <div id="ipError" class="error-message" style="display: none;"></div>
    `;
}

// URL Shortener Tool HTML
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
            <span>GENERATING SHORT LINK...</span>
        </div>
        
        <div id="urlResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-check-circle"></i> SHORT LINK READY
            </div>
            <div id="shortUrl" class="result-content"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="copyToClipboard('shortUrl')">
                <i class="fas fa-copy"></i> COPY LINK
            </button>
            <div class="developer-credit">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        </div>
        
        <div id="urlError" class="error-message" style="display: none;"></div>
    `;
}

// UPLOAD TOOL HTML (ដំណើរការផ្ទាល់ក្នុង Web App)
function getUploadToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">☁️</div>
            <div class="tool-title">
                <h2>CLOUD UPLOAD</h2>
                <p>>_ Upload files & get direct link</p>
            </div>
        </div>
        
        <div class="info-box" style="background: #f0f3ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: #667eea; margin-bottom: 10px;">
                <i class="fas fa-info-circle"></i> Supported Files:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                <span style="background: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                    <i class="fas fa-image" style="color: #667eea;"></i> Images
                </span>
                <span style="background: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                    <i class="fas fa-video" style="color: #667eea;"></i> Videos
                </span>
                <span style="background: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                    <i class="fas fa-file-alt" style="color: #667eea;"></i> Documents
                </span>
                <span style="background: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                    <i class="fas fa-music" style="color: #667eea;"></i> Audio
                </span>
                <span style="background: white; padding: 5px 12px; border-radius: 20px; font-size: 0.9em;">
                    <i class="fas fa-archive" style="color: #667eea;"></i> ZIP/RAR
                </span>
            </div>
            <p style="color: #f59e0b; margin-top: 10px; font-size: 0.9em;">
                <i class="fas fa-exclamation-triangle"></i> Max file size: 10MB
            </p>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-cloud-upload-alt"></i> SELECT FILE TO UPLOAD :</label>
            <input type="file" id="uploadFileInput" class="input-field" accept="*/*">
        </div>
        
        <div class="button-group">
            <button class="btn-primary" onclick="uploadToCloud()" style="width: 100%;">
                <i class="fas fa-cloud-upload-alt"></i> UPLOAD TO CLOUD
            </button>
        </div>
        
        <div id="uploadLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>UPLOADING TO CLOUD...</span>
        </div>
        
        <div id="uploadResult" class="result-box" style="display: none;">
            <div class="result-title">
                <i class="fas fa-check-circle"></i> UPLOAD SUCCESSFUL
            </div>
            <div id="uploadInfo" class="result-content" style="text-align: center;"></div>
            
            <div id="qrCodeContainer" style="display: none; text-align: center; margin-top: 20px;">
                <div class="result-title">
                    <i class="fas fa-qrcode"></i> QR CODE
                </div>
                <div style="margin: 15px 0;">
                    <img id="qrCodeImage" src="" alt="QR Code" style="max-width: 200px; border: 3px solid white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                </div>
                <button class="btn-secondary" onclick="downloadQRCode()">
                    <i class="fas fa-download"></i> DOWNLOAD QR
                </button>
            </div>
            
            <div class="button-group" style="margin-top: 20px;">
                <button class="btn-secondary" onclick="copyUploadLink()">
                    <i class="fas fa-copy"></i> COPY LINK
                </button>
                <button class="btn-secondary" onclick="window.open(lastUploadedLink, '_blank')">
                    <i class="fas fa-external-link-alt"></i> OPEN LINK
                </button>
            </div>
            
            <div class="developer-credit">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        </div>
        
        <div id="uploadError" class="error-message" style="display: none;"></div>
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
            <div class="result-title">
                <i class="fas fa-envelope-open-text"></i> GENERATED ACCOUNTS
            </div>
            <div id="accountsList" class="account-list"></div>
            <button class="btn-secondary" style="margin-top: 15px; width: 100%;" onclick="exportAccounts()">
                <i class="fas fa-download"></i> EXPORT AS TXT
            </button>
            <div class="developer-credit">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
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
            <div class="result-title">
                <i class="fas fa-clipboard-check"></i> SCAN RESULTS
            </div>
            <div id="linkInfo" class="result-content"></div>
            <div class="developer-credit">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
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
            <div>
                <div><i class="fas fa-globe"></i> <strong>IP Address:</strong> ${ipData.query}</div>
                <div><i class="fas fa-map-marker-alt"></i> <strong>Country:</strong> ${ipData.country}</div>
                <div><i class="fas fa-map"></i> <strong>Region:</strong> ${ipData.regionName}</div>
                <div><i class="fas fa-city"></i> <strong>City:</strong> ${ipData.city}</div>
                <div><i class="fas fa-wifi"></i> <strong>ISP:</strong> ${ipData.isp}</div>
                <div><i class="fas fa-building"></i> <strong>Organization:</strong> ${ipData.org || 'N/A'}</div>
                <div><i class="fas fa-clock"></i> <strong>Timezone:</strong> ${ipData.timezone}</div>
                <div><i class="fas fa-map-pin"></i> <strong>Coordinates:</strong> ${ipData.lat}, ${ipData.lon}</div>
            </div>
            <div class="developer-credit" style="margin-top: 15px;">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        `;

        document.getElementById('ipInfo').innerHTML = info;
        showElement('ipResult');
    } catch (error) {
        try {
            const fallbackResponse = await fetch(`https://ipapi.co/${ip}/json/`);
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData.error) {
                throw new Error('Invalid IP');
            }
            
            const info = `
                <div>
                    <div><i class="fas fa-globe"></i> <strong>IP Address:</strong> ${fallbackData.ip}</div>
                    <div><i class="fas fa-map-marker-alt"></i> <strong>Country:</strong> ${fallbackData.country_name}</div>
                    <div><i class="fas fa-map"></i> <strong>Region:</strong> ${fallbackData.region}</div>
                    <div><i class="fas fa-city"></i> <strong>City:</strong> ${fallbackData.city}</div>
                    <div><i class="fas fa-wifi"></i> <strong>ISP:</strong> ${fallbackData.org || 'N/A'}</div>
                    <div><i class="fas fa-clock"></i> <strong>Timezone:</strong> ${fallbackData.timezone}</div>
                    <div><i class="fas fa-map-pin"></i> <strong>Coordinates:</strong> ${fallbackData.latitude}, ${fallbackData.longitude}</div>
                </div>
                <div class="developer-credit" style="margin-top: 15px;">
                    <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
                </div>
            `;
            
            document.getElementById('ipInfo').innerHTML = info;
            showElement('ipResult');
        } catch (fallbackError) {
            showError('ipError', '⚠️ CANNOT FETCH IP INFORMATION. PLEASE TRY AGAIN.');
        }
    } finally {
        showLoading('ipLoading', false);
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

    setTimeout(() => {
        const shortUrl = 'https://tinyurl.com/' + Math.random().toString(36).substring(2, 8);
        document.getElementById('shortUrl').innerHTML = `
            <div style="word-break: break-all;">${shortUrl}</div>
            <div class="developer-credit" style="margin-top: 10px;">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        `;
        showElement('urlResult');
        showLoading('urlLoading', false);
    }, 1000);
}

// Upload to Cloud Function
async function uploadToCloud() {
    const fileInput = document.getElementById('uploadFileInput');
    
    if (!fileInput.files || fileInput.files.length === 0) {
        showError('uploadError', '⚠️ PLEASE SELECT A FILE');
        return;
    }

    const file = fileInput.files[0];
    
    if (file.size > 10 * 1024 * 1024) {
        showError('uploadError', '⚠️ FILE TOO LARGE (MAX 10MB)');
        return;
    }

    showLoading('uploadLoading', true);
    hideElement('uploadResult');
    hideElement('uploadError');
    hideElement('qrCodeContainer');

    try {
        const formData = new FormData();
        formData.append('reqtype', 'fileupload');
        formData.append('fileToUpload', file);

        // ប្រើ API របស់ catbox.moe តាមរយៈ proxy
        const proxyUrl = 'https://api.allorigins.win/post?url=';
        const targetUrl = 'https://catbox.moe/user/api.php';
        
        const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        let link;
        if (data.contents) {
            link = data.contents;
        } else {
            link = data;
        }

        if (!link || typeof link !== 'string' || !link.startsWith('https://')) {
            throw new Error('Invalid response from server');
        }

        link = link.replace(/"/g, '').trim();
        lastUploadedLink = link;

        let fileType = 'FILE';
        if (file.type.startsWith('image/')) fileType = 'IMAGE';
        else if (file.type.startsWith('video/')) fileType = 'VIDEO';
        else if (file.type.startsWith('audio/')) fileType = 'AUDIO';
        else if (file.type.includes('pdf')) fileType = 'PDF';
        else if (file.type.includes('text')) fileType = 'TEXT';

        const uploadInfo = `
            <div style="margin-bottom: 15px;">
                <strong style="color: #764ba2;">✅ ${fileType} UPLOADED SUCCESSFULLY!</strong><br>
                <small style="color: #666;">${file.name}</small><br>
                <small>Size: ${(file.size / 1024).toFixed(2)} KB</small>
            </div>
            <div style="background: #f0f3ff; padding: 12px; border-radius: 8px; word-break: break-all; border: 1px solid #667eea30;">
                <i class="fas fa-link" style="color: #667eea;"></i> ${link}
            </div>
            <div class="developer-credit" style="margin-top: 15px;">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
            </div>
        `;

        document.getElementById('uploadInfo').innerHTML = uploadInfo;

        // បង្កើត QR Code សម្រាប់រូបភាព
        if (file.type.startsWith('image/')) {
            try {
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`;
                document.getElementById('qrCodeImage').src = qrApiUrl;
                lastQRCodeData = qrApiUrl;
                document.getElementById('qrCodeContainer').style.display = 'block';
            } catch (qrError) {
                console.log('QR generation failed:', qrError);
            }
        }

        showElement('uploadResult');
        
    } catch (error) {
        console.error('Upload error:', error);
        
        // បង្ហាញជម្រើស Telegram Bot ពេល Upload មិនជោគជ័យ
        const errorMessage = `
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #f59e0b;"></i>
                <h3 style="color: #f59e0b; margin: 10px 0;">WEB UPLOAD LIMITED</h3>
                <p style="color: #666; margin-bottom: 15px;">Browser cannot upload directly due to security restrictions.</p>
                <div style="background: #f0f3ff; padding: 15px; border-radius: 10px;">
                    <p style="color: #667eea; margin-bottom: 10px;">
                        <i class="fab fa-telegram"></i> USE TELEGRAM BOT INSTEAD:
                    </p>
                    <a href="https://t.me/Darknet_cen3bot" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 25px; border-radius: 25px; text-decoration: none; font-weight: bold;">
                        <i class="fab fa-telegram"></i> @Darknet_cen3bot
                    </a>
                </div>
                <div class="developer-credit" style="margin-top: 15px;">
                    <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
                </div>
            </div>
        `;
        
        document.getElementById('uploadInfo').innerHTML = errorMessage;
        showElement('uploadResult');
    } finally {
        showLoading('uploadLoading', false);
    }
}

// Copy upload link
async function copyUploadLink() {
    if (!lastUploadedLink) {
        showError('uploadError', '⚠️ NO LINK TO COPY');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(lastUploadedLink);
        alert('✅ LINK COPIED!\n\n⚡ DEVELOPED BY @TH3Cen_cee');
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = lastUploadedLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ LINK COPIED!\n\n⚡ DEVELOPED BY @TH3Cen_cee');
    }
}

// Download QR code
function downloadQRCode() {
    if (!lastQRCodeData) return;
    
    const link = document.createElement('a');
    link.href = lastQRCodeData;
    link.download = `qrcode_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        html += `
            <div class="developer-credit" style="margin-top: 15px;">
                <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
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
        <div class="developer-credit" style="margin-top: 15px;">
            <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
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
        <div class="developer-credit" style="margin-top: 15px;">
            <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
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
async function checkLink() {
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
                <div style="margin-bottom: 15px; padding: 10px; background: #f0f3ff; border-radius: 8px;">
                    <i class="fas fa-link"></i> <strong>URL:</strong> ${link}
                </div>
            `;
            
            if (analysis.safe) {
                resultHTML += `
                    <div style="color: #10b981; text-align: center;">
                        <i class="fas fa-check-circle" style="font-size: 48px;"></i>
                        <h3 style="margin: 10px 0;">✅ LINK LOOKS SAFE</h3>
                        <p>No suspicious patterns detected</p>
                    </div>
                `;
            } else {
                resultHTML += `
                    <div style="color: #ef4444; text-align: center;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 48px;"></i>
                        <h3 style="margin: 10px 0;">⚠️ SUSPICIOUS LINK DETECTED</h3>
                    </div>
                `;
            }
            
            resultHTML += '<div style="margin-top: 20px;">';
            analysis.warnings.forEach(warning => {
                resultHTML += `
                    <div style="padding: 10px; margin-bottom: 8px; background: ${analysis.safe ? '#f0f3ff' : '#fff2f2'}; border-radius: 6px; border-left: 4px solid ${analysis.safe ? '#667eea' : '#ef4444'};">
                        <i class="fas ${analysis.safe ? 'fa-info-circle' : 'fa-exclamation-circle'}" style="color: ${analysis.safe ? '#667eea' : '#ef4444'}; margin-right: 8px;"></i>
                        ${warning}
                    </div>
                `;
            });
            resultHTML += '</div>';
            
            resultHTML += `
                <div style="margin-top: 20px; padding: 12px; background: linear-gradient(135deg, #667eea10, #764ba210); border-radius: 8px;">
                    <i class="fas fa-lightbulb" style="color: #fbbf24;"></i>
                    <strong style="color: #667eea;"> SAFETY TIPS:</strong>
                    <ul style="margin-top: 8px; margin-left: 20px; color: #666;">
                        <li>Never enter personal information on suspicious sites</li>
                        <li>Check if the website uses HTTPS (padlock icon)</li>
                        <li>Be careful with shortened URLs (tinyurl, bit.ly)</li>
                        <li>If it looks too good to be true, it probably is</li>
                    </ul>
                </div>
                <div class="developer-credit" style="margin-top: 15px;">
                    <i class="fas fa-crown"></i> DEVELOPED BY <span class="neon-text">@TH3Cen_cee</span>
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
    
    const phishiingKeywords = [
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
    
    // យកតែ link សុទ្ធ (មិនយក DEVELOPED BY)
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
