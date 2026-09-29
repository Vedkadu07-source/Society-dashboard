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
    <div className="bg-white rounded-xl border border-surface-200 p-6 flex flex-col items-center justify-center text-center shadow-sm w-full min-w-0">
      <h3 className="font-semibold text-surface-900 mb-1">Society QR</h3>
      <p className="text-sm text-surface-500 mb-6 max-w-[250px]">
        Scan to quickly access your society portal.
      </p>
      
      <div className="bg-white p-3 rounded-xl border border-surface-200 shadow-sm mb-4 inline-block">
        <QRCodeSVG 
          id="society-qr"
          value={loginUrl} 
          size={160} 
          level="M"
          includeMargin={false}
          fgColor="#0f172a"
        />
      </div>
      
      <p className="text-sm font-medium text-surface-800 mb-5">Green Valley Society</p>
      
      <div className="flex items-center gap-3 w-full max-w-[260px]">
        <button 
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-surface-200 bg-white text-surface-700 text-sm font-medium hover:bg-surface-50 hover:border-surface-300 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        >
          <Copy size={16} />
          Copy Link
        </button>
        <button 
          onClick={downloadQR}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary-50 text-primary-700 border border-transparent text-sm font-medium hover:bg-primary-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </div>
  );
}
