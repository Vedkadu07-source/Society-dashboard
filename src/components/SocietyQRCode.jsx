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
    <div className="bg-white border border-surface-200 shadow-sm w-full min-w-0 p-6 flex flex-col items-center">
      <div className="text-center mb-8">
        <h3 className="font-bold text-surface-900 tracking-tight text-lg mb-1">Quick Access</h3>
        <p className="text-sm font-medium text-surface-500">Scan to open the workspace.</p>
      </div>
      
      <div className="bg-white p-4 border border-surface-200 mb-8 inline-block shadow-sm">
        <QRCodeSVG 
          id="society-qr"
          value={loginUrl} 
          size={180} 
          level="H"
          includeMargin={false}
          fgColor="#171A19" // Graphite
        />
      </div>
      
      <div className="flex items-center gap-3 w-full justify-center max-w-[280px]">
        <button 
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-50 text-surface-900 border border-surface-200 text-sm font-semibold hover:bg-surface-100 transition-colors"
        >
          <Copy size={16} />
          Copy
        </button>
        <button 
          onClick={downloadQR}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-surface-900 text-white border border-transparent text-sm font-semibold hover:bg-surface-800 transition-colors"
        >
          <Download size={16} />
          Save
        </button>
      </div>
    </div>
  );
}
