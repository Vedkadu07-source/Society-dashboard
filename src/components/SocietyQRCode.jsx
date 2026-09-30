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
    <div className="bg-white border border-surface-200/80 rounded-xl w-full min-w-0 p-5 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-surface-900 mb-1">Quick Access</h3>
      <p className="text-[11px] text-surface-400 mb-5">Scan to open the portal.</p>
      
      <div className="bg-white p-3 border border-surface-200 rounded-lg mb-5 inline-block">
        <QRCodeSVG 
          id="society-qr"
          value={loginUrl} 
          size={140} 
          level="H"
          includeMargin={false}
          fgColor="#0F172A"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full justify-center max-w-[240px]">
        <button 
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-50 text-surface-700 border border-surface-200 text-xs font-medium rounded-lg hover:bg-surface-100 transition-colors"
        >
          <Copy size={12} />
          Copy
        </button>
        <button 
          onClick={downloadQR}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-surface-900 text-white text-xs font-medium rounded-lg hover:bg-surface-800 transition-colors"
        >
          <Download size={12} />
          Save
        </button>
      </div>
    </div>
  );
}
