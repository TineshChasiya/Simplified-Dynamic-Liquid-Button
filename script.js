const container = document.getElementById('btn-wrap');
const canvas = document.getElementById('liquid-canvas');
const ctx = canvas.getContext('2d');
let drops = [];
let width, height;
function resize(){
    const rect = container.getBoundingClientRect();
    width = rect.width + 120;
    height = rect.height + 120;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();
container.addEventListener('mousedown', (e) => {
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left + 60;
    const clickY = e.clientY - rect.top + 60;
    for(let i = 0; i < 15; i++){
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        drops.push({
            x: clickX,
            y: clickY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 15 + Math.random() * 10
        });
    }
});
function animate(){
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#4facfe';
    ctx.beginPath();
    ctx.roundRect(60, 60, width - 120, height - 120, 14);
    ctx.fill();
    for(let i = drops.length - 1; i >= 0; i--){
        let d = drops[i];
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.94;
        d.vy *= 0.94;
        d.size -= 0.35;
        if (d.size <= 0.5){
            drops.splice(i, 1);
            continue;
        }
        ctx.fillStyle = '#00f2fe';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animate);
}
animate();