import qrImage from '../assets/images/https_wa_me_6285240174510.jpg';

export function ContactQR() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <img src={qrImage} alt="QR Code" className="w-48 h-48 rounded-xl border border-slate-200 shadow object-cover" />
      <p className="mt-2 text-center text-sm font-semibold text-slate-700">Scan Me</p>
    </div>
  );
}
