// 1. 获取用户的浏览器和操作系统信息
const parser = new UAParser();
const browserInfo = parser.getBrowser();
const osInfo = parser.getOS();
document.getElementById('browser').innerText = `${browserInfo.name} ${browserInfo.version}`;
document.getElementById('os').innerText = `${osInfo.name} ${osInfo.version}`;

// 2. 获取显卡信息
function getGraphicsInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
    }
    return "无法检测";
}
document.getElementById('gpu').innerText = getGraphicsInfo();

// 3. 使用 ipapi.co 获取访问信息
async function getVisitorInfo() {
    try {
        const response = await fetch('https://ipapi.co/json');
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();

        // 填充页面数据
        document.getElementById('ip').innerText = data.ip;
        document.getElementById('city').innerText = data.city;
        document.getElementById('region').innerText = data.region;
        document.getElementById('country').innerText = data.country_name;
        document.getElementById('latlong').innerText = `${data.latitude}, ${data.longitude}`;
        document.getElementById('postal').innerText = data.postal;
        document.getElementById('timezone').innerText = data.timezone;
        document.getElementById('country_code').innerText = data.country_code;
        document.getElementById('currency').innerText = `${data.currency_name} (${data.currency})`;
        document.getElementById('languages').innerText = data.languages;
        document.getElementById('isp').innerText = data.org;
        document.getElementById('tor').innerText = data.org.includes("Tor") ? "是" : "否";
    } catch (error) {
        console.error('无法获取访问信息:', error);
        document.getElementById('ip').innerText = "无法加载信息，请检查网络或 API 服务。";
    }
}
getVisitorInfo();
