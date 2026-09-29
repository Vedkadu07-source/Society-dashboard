import { QRCodeSVG } from 'qrcode.react';
import { Copy, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SocietyQRCode() {
  const { addToast } = useApp();
  const loginUrl = `${window.location.origin}/login`;

  const copyLink = () => {
    navigator.clipboard.writeText(loginUrl);
    addToast('Link copied to clipboard!');
  };

  const downloadQR = () => {
    const svg = document.getElementById('society-qr');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'society-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-surface-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md w-full min-w-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/50 to-surface-900 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 w-full">
        <h3 className="font-bold text-white mb-1.5 text-lg">SocietyHub</h3>
        <p className="text-sm text-surface-300 mb-6 max-w-[250px] mx-auto">
          Scan to access your society portal instantly.
        </p>
        
        <div className="bg-white p-3.5 rounded-2xl shadow-lg mb-6 inline-block">
          <QRCodeSVG 
            id="society-qr"
            value={loginUrl} 
            size={160} 
            level="M"
            includeMargin={false}
            fgColor="#0f172a"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full justify-center">
          <button 
            onClick={copyLink}
            className="flex-1 max-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-800 text-white border border-surface-700 text-sm font-medium hover:bg-surface-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Copy size={16} />
            Copy
          </button>
          <button 
            onClick={downloadQR}
            className="flex-1 max-w-[120px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary-600 text-white border border-transparent text-sm font-medium hover:bg-primary-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Download size={16} />
            Save QR
          </button>
        </div>
      </div>
    </div>
  );
}
