import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, Keyboard } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { parseQrPayload } from "@/lib/qr-payload";
import { getInstitution, INSTITUTIONS } from "@/lib/fair-catalog";
import { getProfile, patchJourney } from "@/lib/profile";
import { getJourneyState } from "@/lib/journey-state";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [{ title: "Scanner un stand" }],
  }),
  component: ScanPage,
});

function ScanPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState("");
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerId = "qr-reader-region";

  const addInstitutionScan = (institutionId: string) => {
    const inst = getInstitution(institutionId);
    if (!inst) {
      setError("Établissement inconnu. Utilise la liste ou un QR valide.");
      return;
    }
    const j = getJourneyState(getProfile());
    const prev = j.scannedInstitutionIds ?? [];
    if (prev.includes(institutionId)) {
      navigate({ to: "/journey" });
      return;
    }
    patchJourney({ scannedInstitutionIds: [...prev, institutionId] });
    navigate({ to: "/journey" });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const start = async () => {
      setError(null);
      setScanning(true);
      try {
        const html5 = new Html5Qrcode(readerId);
        scannerRef.current = html5;
        await html5.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 260, height: 260 } },
          (decodedText) => {
            const id = parseQrPayload(decodedText);
            if (id && !cancelled) {
              html5.stop().catch(() => {});
              addInstitutionScan(id);
            }
          },
          () => {},
        );
      } catch {
        if (!cancelled)
          setError("Caméra indisponible. Utilise le code manuel ou autorise l’accès.");
      }
      if (!cancelled) setScanning(false);
    };
    start();
    return () => {
      cancelled = true;
      scannerRef.current?.stop().catch(() => {});
      scannerRef.current?.clear().catch(() => {});
      scannerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount once
  }, []);

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-5 pt-4 pb-6 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate({ to: "/journey" })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-4 flex items-center gap-2">
          <Camera className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Scanner un stand</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Les QR du salon encodent un établissement (format démo :{" "}
          <code className="text-xs bg-muted px-1 rounded">LETUDIANT:INST:inst-hec</code>).
        </p>

        <div id={readerId} className="mt-4 rounded-2xl overflow-hidden bg-black min-h-[260px]" />

        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
        {scanning && <p className="mt-2 text-xs text-muted-foreground">Caméra…</p>}

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex items-center gap-2 mb-2">
            <Keyboard className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-semibold">Sans caméra — choisir un établissement</p>
          </div>
          <select
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            className="w-full h-12 px-3 rounded-xl bg-muted border border-transparent text-sm"
          >
            <option value="">— Sélectionner —</option>
            {INSTITUTIONS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.shortName} — {i.name}
              </option>
            ))}
          </select>
          <Button
            type="button"
            className="w-full mt-3 rounded-xl"
            disabled={!manual}
            onClick={() => addInstitutionScan(manual)}
          >
            Valider cet établissement
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
