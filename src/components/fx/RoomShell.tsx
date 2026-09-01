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

      {/* warm wooden slat panelling, like the salon walls */}
      <div
        className="absolute inset-x-0 top-0 h-[62vh] opacity-[0.38]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #dcb884 0px, #c9945a 5px, #f0dcbc 11px, #a9743f 17px, #f0dcbc 23px)',
          maskImage: 'linear-gradient(180deg, #000 0%, rgba(0,0,0,0.55) 45%, transparent 100%)',
        }}
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
          <span className="block h-20 w-20 animate-twinkle rounded-full bg-[radial-gradient(circle,rgba(255,246,224,0.55),transparent_70%)] blur-md" />
          <span className="mx-auto block h-9 w-[3px] bg-gradient-to-b from-gold-400/45 to-transparent" />
        </div>
      ))}

      {/* skirting + marble floor */}
      <div className="absolute inset-x-0 bottom-0 h-[24vh]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        {/* wood-look floor */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(88deg, #dcb884 0px, #c9945a 60px, #f0dcbc 120px, #a9743f 180px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(255,253,249,0.75) 0%, rgba(239,232,219,0.9) 100%)',
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
