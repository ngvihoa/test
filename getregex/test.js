const { spawnSync, spawn } = require('child_process');

const getRegex = (input) => {
    const pythonProcess = spawnSync('python3', ['./ocr/app.py', input]); 
    const data = pythonProcess.stdout;
    
    const text = JSON.parse(data.toString());
    console.log(`Done ${input}`);
    let reg = /(điểm\s([a-z]|\u0111)\s)*(khoản\s(\d+)\s)*(Điều\s(\d+)\s)*((Nghị quyết|Nghị định|Thông tư|Thông tư liên tịch|Quyết định|Luật|Luật Tổ chức Quốc hội|Tờ trình|Báo cáo thẩm tra|Báo cáo)\ssố\s)*\d{2,5}(\/\d*)*(\/|-)([A-Za-z]*(Đ)*[A-Za-z]*(-|\/)*)+(\d*)(,|\s)/g;
    return text.match(reg);
}

module.exports = getRegex;
