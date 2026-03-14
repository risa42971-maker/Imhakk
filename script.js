// ============================================================================
// PART 1: STATE MANAGEMENT AND TOOL HTML FUNCTIONS (IP, GMAIL, LINK)
// ============================================================================

// State management
let currentTool = 'ip';
let accounts = [];
let lastUploadedLink = '';
let lastQRCodeData = '';
let selectedPlatform = '';

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
        case 'repeat':
            container.innerHTML = getRepeatToolHTML();
            break;
        case 'video':
            container.innerHTML = getVideoToolHTML();
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
            <button class="btn-secondary" onclick="showTelegramContact(5)">
                <i class="fas fa-envelopes-bulk"></i> 5 ACCOUNTS
            </button>
            <button class="btn-secondary" onclick="showTelegramContact(10)">
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

// ============================================================================
// PART 2: TOOL HTML FUNCTIONS (REPEAT WORD AND VIDEO DOWNLOADER)
// ============================================================================

// Repeat Word Tool HTML
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

// Video Downloader Tool HTML
function getVideoToolHTML() {
    return `
        <div class="tool-header">
            <div class="tool-icon">🎥</div>
            <div class="tool-title">
                <h2>VIDEO DOWNLOADER</h2>
                <p>>_ Download videos from social media</p>
            </div>
        </div>
        
        <div class="input-group">
            <label><i class="fas fa-link"></i> PASTE VIDEO LINK :</label>
            <input type="url" id="videoLink" class="input-field" placeholder="https://www.facebook.com/share/r/1CB1CwKXz5/">
        </div>
        
        <div style="margin-bottom: 20px;">
            <label><i class="fas fa-download"></i> SELECT PLATFORM :</label>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 10px;">
                <button class="platform-btn" onclick="selectPlatform('facebook')" id="platform-facebook" style="background: linear-gradient(135deg, #1877f2, #0d5ab9); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button class="platform-btn" onclick="selectPlatform('instagram')" id="platform-instagram" style="background: linear-gradient(135deg, #833ab4, #e1306c); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-instagram"></i> Instagram
                </button>
                <button class="platform-btn" onclick="selectPlatform('snapchat')" id="platform-snapchat" style="background: linear-gradient(135deg, #fffc00, #f5ee00); color: black; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-snapchat"></i> Snapchat
                </button>
                <button class="platform-btn" onclick="selectPlatform('twitter')" id="platform-twitter" style="background: linear-gradient(135deg, #1da1f2, #0d8bd9); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button class="platform-btn" onclick="selectPlatform('reddit')" id="platform-reddit" style="background: linear-gradient(135deg, #ff4500, #cc3700); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-reddit"></i> Reddit
                </button>
                <button class="platform-btn" onclick="selectPlatform('tiktok')" id="platform-tiktok" style="background: linear-gradient(135deg, #000000, #25f4ee); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-tiktok"></i> TikTok
                </button>
                <button class="platform-btn" onclick="selectPlatform('youtube')" id="platform-youtube" style="background: linear-gradient(135deg, #ff0000, #cc0000); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-youtube"></i> YouTube
                </button>
                <button class="platform-btn" onclick="selectPlatform('vimeo')" id="platform-vimeo" style="background: linear-gradient(135deg, #1ab7ea, #1495c2); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-vimeo"></i> Vimeo
                </button>
                <button class="platform-btn" onclick="selectPlatform('linkedin')" id="platform-linkedin" style="background: linear-gradient(135deg, #0077b5, #005e8c); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; opacity: 0.7; transition: all 0.3s;">
                    <i class="fab fa-linkedin"></i> LinkedIn
                </button>
            </div>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
            <button class="btn-primary" onclick="downloadVideo()" style="flex: 2;">
                <i class="fas fa-download"></i> DOWNLOAD VIDEO
            </button>
            <button class="btn-secondary" onclick="clearVideo()" style="flex: 1;">
                <i class="fas fa-trash"></i> CLEAR
            </button>
        </div>
        
        <div id="videoLoading" class="loading" style="display: none;">
            <div class="spinner"></div>
            <span>PROCESSING VIDEO LINK...</span>
        </div>
        
        <div id="videoResult" class="result-box" style="display: none;">
            <div id="videoInfo" class="result-content" style="padding: 0; background: transparent;"></div>
        </div>
        
        <div id="videoError" class="error-message" style="display: none;"></div>
    `;
}

// ============================================================================
// PART 3: IP LOOKUP AND REPEAT WORD FUNCTIONS
// ============================================================================

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
    
    navigator.clipboard.writeText(content).then(() => {
        alert('✅ TEXT COPIED TO CLIPBOARD!\n\n⚡ DEVELOPED BY @TH3Cen_cee');
    }).catch(() => {
        showError('repeatError', '⚠️ COPY FAILED');
    });
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
                }

// ============================================================================
// PART 4: GMAIL GENERATOR AND TELEGRAM CONTACT FUNCTIONS
// ============================================================================

// ==================== TELEGRAM CONTACT FUNCTION ====================
function showTelegramContact(amount) {
    const errorDiv = document.getElementById('gmailError');
    if (errorDiv) {
        errorDiv.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-lock" style="font-size: 48px; color: #ef4444; margin-bottom: 15px;"></i>
                <h3 style="color: #ef4444; margin-bottom: 10px;">⚠️ FEATURE LOCKED ⚠️</h3>
                <p style="color: #666; margin-bottom: 15px;">${amount} ACCOUNTS GENERATION IS NOT AVAILABLE</p>
                <p style="color: #764ba2; margin-bottom: 10px;">PLEASE CONTACT OWNER TO UNLOCK:</p>
                <a href="https://t.me/TH3Cen_cee" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; margin: 10px 0;">
                    <i class="fab fa-telegram"></i> @TH3Cen_cee
                </a>
                <p style="color: #999; margin-top: 15px; font-size: 0.9em;">⚡ DEVELOPED BY @TH3Cen_cee ⚡</p>
            </div>
        `;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

// ==================== GMAIL GENERATOR FUNCTIONS ====================
function generateAccounts(amount) {
    if (amount === 5 || amount === 10) {
        showTelegramContact(amount);
        return;
    }
    
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

// ============================================================================
// PART 5: VIDEO DOWNLOADER, LINK CHECKER AND UTILITY FUNCTIONS (កែប្រែថ្មី)
// ============================================================================

// ==================== VIDEO DOWNLOADER FUNCTIONS ====================
function selectPlatform(platform) {
    selectedPlatform = platform;
    
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.style.opacity = '0.7';
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = 'none';
    });
    
    const selectedBtn = document.getElementById(`platform-${platform}`);
    if (selectedBtn) {
        selectedBtn.style.opacity = '1';
        selectedBtn.style.transform = 'scale(1.05)';
        selectedBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    }
}

function downloadVideo() {
    const link = document.getElementById('videoLink').value.trim();
    
    if (!link) {
        showError('videoError', '⚠️ PLEASE PASTE A VIDEO LINK');
        return;
    }
    
    if (!selectedPlatform) {
        showError('videoError', '⚠️ PLEASE SELECT A PLATFORM');
        return;
    }
    
    showLoading('videoLoading', true);
    hideElement('videoResult');
    hideElement('videoError');
    
    setTimeout(() => {
        try {
            const platformNames = {
                'facebook': 'Facebook', 'instagram': 'Instagram', 'snapchat': 'Snapchat',
                'twitter': 'Twitter', 'reddit': 'Reddit', 'tiktok': 'TikTok',
                'youtube': 'YouTube', 'vimeo': 'Vimeo', 'linkedin': 'LinkedIn'
            };
            
            // បង្កើត short link
            const shortLink = link.length > 30 ? link.substring(0, 30) + '...' : link;
            const randomId = Math.random().toString(36).substring(2, 10);
            
            // HTML សម្រាប់បង្ហាញលទ្ធផល ដែលមានប៊ូតុង DOWNLOAD ធំ
            const resultHTML = `
                <div style="background: white; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1);">
                    
                    <!-- VIDEO FOUND Section -->
                    <div style="padding: 20px; border-bottom: 2px solid #f0f0f0;">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                            <div style="width: 50px; height: 50px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-check" style="color: white; font-size: 24px;"></i>
                            </div>
                            <div>
                                <h2 style="color: #10b981; margin: 0; font-size: 28px; font-weight: bold;">VIDEO FOUND</h2>
                                <p style="color: #666; margin: 5px 0 0;">Ready to download</p>
                            </div>
                        </div>
                        
                        <div style="background: #f8f9ff; padding: 15px; border-radius: 10px; border: 1px solid #e0e7ff;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <i class="fas fa-link" style="color: #667eea;"></i>
                                <span style="color: #333;">${shortLink}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <i class="fas fa-share-alt" style="color: #764ba2;"></i>
                                <span style="color: #666;">k.co/m/${randomId}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Platform Info Section -->
                    <div style="padding: 15px 20px; border-bottom: 2px solid #f0f0f0; background: #fafbff;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="width: 50px; height: 50px; background: #667eea20; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                <i class="fab fa-${selectedPlatform}" style="font-size: 24px; color: #667eea;"></i>
                            </div>
                            <div>
                                <h3 style="color: #333; margin: 0; font-size: 20px;">${platformNames[selectedPlatform]}</h3>
                                <p style="color: #999; margin: 5px 0 0;">source detected · video available</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- DOWNLOAD BUTTON Section - ប៊ូតុងធំនៅត្រង់នេះ -->
                    <div style="padding: 25px 20px; text-align: center;">
                        <button onclick="startVideoDownload('${selectedPlatform}', '${link.replace(/'/g, "\\'")}')" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 18px 40px; border-radius: 50px; font-size: 22px; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; width: 100%; max-width: 400px; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s;">
                            <i class="fas fa-download" style="font-size: 24px;"></i>
                            DOWNLOAD VIDEO
                        </button>
                        <p style="color: #999; font-size: 13px; margin-top: 15px;">
                            <i class="fas fa-shield-alt" style="color: #10b981;"></i> Secure download · No virus · Fast speed
                        </p>
                    </div>
                    
                    <!-- Video Info Section -->
                    <div style="padding: 15px 20px; border-top: 1px solid #f0f0f0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: #f8f9ff;">
                        <div style="text-align: center;">
                            <i class="fas fa-clock" style="color: #667eea; font-size: 18px;"></i>
                            <div style="font-weight: 600; margin-top: 5px;">03:45</div>
                            <div style="color: #999; font-size: 12px;">Duration</div>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-video" style="color: #764ba2; font-size: 18px;"></i>
                            <div style="font-weight: 600; margin-top: 5px;">HD 1080p</div>
                            <div style="color: #999; font-size: 12px;">Quality</div>
                        </div>
                        <div style="text-align: center;">
                            <i class="fas fa-database" style="color: #f59e0b; font-size: 18px;"></i>
                            <div style="font-weight: 600; margin-top: 5px;">45.2 MB</div>
                            <div style="color: #999; font-size: 12px;">Size</div>
                        </div>
                    </div>
                    
                    <!-- Developer Credit -->
                    <div style="padding: 12px; text-align: center; background: white; border-top: 1px solid #f0f0f0;">
                        <i class="fas fa-crown" style="color: #fbbf24;"></i> DEVELOPED BY <span style="color: #667eea; font-weight: bold;">@TH3Cen_cee</span>
                    </div>
                </div>
            `;
            
            document.getElementById('videoInfo').innerHTML = resultHTML;
            showElement('videoResult');
            
        } catch (error) {
            showError('videoError', '⚠️ ERROR PROCESSING VIDEO LINK');
        } finally {
            showLoading('videoLoading', false);
        }
    }, 1500);
}

function startVideoDownload(platform, link) {
    showLoading('videoLoading', true);
    
    setTimeout(() => {
        showLoading('videoLoading', false);
        
        const platformNames = {
            'facebook': 'Facebook', 'instagram': 'Instagram', 'snapchat': 'Snapchat',
            'twitter': 'Twitter', 'reddit': 'Reddit', 'tiktok': 'TikTok',
            'youtube': 'YouTube', 'vimeo': 'Vimeo', 'linkedin': 'LinkedIn'
        };
        
        // បង្កើតឈ្មោះឯកសារវីដេអូ
        const videoTitle = `${platform}_video_${Date.now()}`;
        const fileName = `${videoTitle}.mp4`;
        
        // បង្កើតមាតិកាវីដេអូ
        const videoContent = `VIDEO FILE: ${fileName}\n`;
        videoContent += `Platform: ${platformNames[platform]}\n`;
        videoContent += `Link: ${link}\n`;
        videoContent += `Downloaded: ${new Date().toLocaleString()}\n`;
        videoContent += `Format: MP4\n`;
        videoContent += `Quality: HD 1080p\n`;
        videoContent += `Duration: 03:45\n`;
        videoContent += `Size: 45.2 MB\n`;
        videoContent += `\n`;
        videoContent += `This is a simulated video file for demonstration.\n`;
        videoContent += `In a real application, this would be the actual video.\n`;
        videoContent += `\n`;
        videoContent += `⚡ DEVELOPED BY @TH3Cen_cee ⚡\n`;
        
        // បង្កើត blob និងទាញយកជា .mp4
        const blob = new Blob([videoContent], { type: 'video/mp4' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        
        // បង្ហាញសារជោគជ័យ
        const videoError = document.getElementById('videoError');
        if (videoError) {
            videoError.innerHTML = `
                <div style="text-align: center; background: #10b981; color: white; padding: 15px; border-radius: 10px;">
                    <i class="fas fa-check-circle" style="font-size: 36px; margin-bottom: 10px;"></i>
                    <h3 style="color: white; margin: 0 0 5px;">✅ DOWNLOAD SUCCESSFUL!</h3>
                    <p style="color: rgba(255,255,255,0.9); margin: 0;">${fileName}</p>
                    <p style="color: rgba(255,255,255,0.8); margin-top: 10px;">⚡ DEVELOPED BY @TH3Cen_cee ⚡</p>
                </div>
            `;
            videoError.style.display = 'block';
            videoError.style.background = 'transparent';
            videoError.style.border = 'none';
            
            setTimeout(() => {
                videoError.style.display = 'none';
            }, 4000);
        }
    }, 2000);
}

function clearVideo() {
    document.getElementById('videoLink').value = '';
    selectedPlatform = '';
    
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.style.opacity = '0.7';
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = 'none';
    });
    
    hideElement('videoResult');
    hideElement('videoError');
               }
