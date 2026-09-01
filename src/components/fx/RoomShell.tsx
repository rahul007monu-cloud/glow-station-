/**
 * The room the whole site sits inside: ivory fluted panelling on the walls,
 * warm gold sconces, and a polished marble floor that catches the light.
 * Matches the salon's signboard palette (ivory · gold · charcoal).
 */
export default function RoomShell() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[9] overflow-hidden">
      {/* wall wash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #fffdf9 0%, #f8f4ec 42%, #efe8db 100%), radial-gradient(75% 45% at 50% 0%, rgba(208,169,85,0.16), transparent 70%)',
        }}
      />

      {/* fluted panelling */}
      <div
        className="fluted absolute inset-x-0 top-0 h-[70vh] opacity-40"
        style={{ maskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)' }}
      />

      {/* gold cornice line */}
      <div className="absolute inset-x-0 top-[11vh] h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent" />

      {/* wall sconces */}
      {[
        { side: 'left-[3%]', top: 'top-[24vh]' },
        { side: 'right-[3%]', top: 'top-[24vh]' },
        { side: 'left-[3%]', top: 'top-[74vh]' },
        { side: 'right-[3%]', top: 'top-[74vh]' },
      ].map((s, i) => (
        <div key={i} className={`absolute ${s.side} ${s.top} hidden lg:block`}>
          <span className="block h-20 w-20 animate-twinkle rounded-full bg-[radial-gradient(circle,rgba(208,169,85,0.30),transparent_70%)] blur-md" />
          <span className="mx-auto block h-9 w-[3px] bg-gradient-to-b from-gold-400/45 to-transparent" />
        </div>
      ))}

      {/* skirting + marble floor */}
      <div className="absolute inset-x-0 bottom-0 h-[24vh]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <div className="marble absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(239,232,219,0.85) 100%)',
          }}
        />
        {/* floor sheen */}
        <div
          className="absolute inset-x-0 top-0 h-full opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(100deg, rgba(255,255,255,0.7) 0px, transparent 4px, transparent 96px)',
            maskImage: 'linear-gradient(180deg, #000, transparent 75%)',
          }}
        />
      </div>
    </div>
  );
}
