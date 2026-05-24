import qrImage from '../assets/images/https_wa_me_6282254707788.png';

export function ContactQR() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <img 
        src={qrImage} 
        alt="QR Code" 
        className="w-48 h-auto object-contain" 
      />
    </div>
  );
}
