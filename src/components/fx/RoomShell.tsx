/**
 * The room itself.
 *
 * A luxury salon is recognisable by three things: fluted wall panelling, warm
 * wall sconces, and a polished floor that reflects everything. This layer sits
 * behind all content so every section feels like it is *inside* the salon
 * rather than on a web page.
 */
export default function RoomShell() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[9] overflow-hidden">
      {/* warm wall wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #17101c 0%, #120c17 45%, #0c070f 100%), radial-gradient(80% 50% at 50% 0%, rgba(231,195,93,0.10), transparent 70%)',
        }}
      />

      {/* fluted panelling — the signature luxe salon wall */}
      <div
        className="absolute inset-x-0 top-0 h-[78vh] opacity-[0.55]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0px, rgba(255,255,255,0.012) 6px, rgba(0,0,0,0.35) 26px, rgba(255,255,255,0.03) 46px)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
        }}
      />

      {/* gold cornice line near the ceiling */}
      <div className="absolute inset-x-0 top-[12vh] h-px bg-gradient-to-r from-transparent via-gold-300/25 to-transparent" />

      {/* wall sconces */}
      {[
        { side: 'left-[4%]', top: 'top-[26vh]' },
        { side: 'right-[4%]', top: 'top-[26vh]' },
        { side: 'left-[4%]', top: 'top-[78vh]' },
        { side: 'right-[4%]', top: 'top-[78vh]' },
      ].map((s, i) => (
        <div key={i} className={`absolute ${s.side} ${s.top} hidden lg:block`}>
          <span className="block h-16 w-16 animate-twinkle rounded-full bg-[radial-gradient(circle,rgba(255,225,160,0.35),transparent_70%)] blur-md" />
          <span className="mx-auto block h-8 w-[3px] bg-gradient-to-b from-gold-200/50 to-transparent" />
        </div>
      ))}

      {/* skirting + polished floor with reflection */}
      <div className="absolute inset-x-0 bottom-0 h-[26vh]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(231,195,93,0.07) 0%, rgba(255,255,255,0.03) 18%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* floor sheen */}
        <div
          className="absolute inset-x-0 top-0 h-full opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(100deg, rgba(255,255,255,0.05) 0px, transparent 3px, transparent 90px)',
            maskImage: 'linear-gradient(180deg, #000, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
}
