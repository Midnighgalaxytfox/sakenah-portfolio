'use client';

import { Character } from '@/lib/progress-store';
import { getItem } from '@/lib/character-catalog';

type Props = { character: Character; size?: number };

const BG_GRADIENTS: Record<string, [string, string]> = {
  'background:dawn': ['#ffe3ee', '#fff6e2'],
  'background:sunset': ['#ff8fb1', '#ffc57a'],
  'background:library': ['#e2d4b2', '#b2916a'],
  'background:tokyo': ['#2f2a4a', '#ff7fb0'],
};

export function CharacterSvg({ character, size = 280 }: Props) {
  const skin = getItem(character?.skin ?? 'skin:peach')?.color ?? '#ffd3b5';
  const outfit = getItem(character?.outfit ?? 'outfit:tee')?.color ?? '#7ec6f0';
  const hairColor = getItem(character?.hairColor ?? 'hairColor:black')?.color ?? '#1f1420';
  const bg = BG_GRADIENTS[character?.background ?? 'background:dawn'] ?? BG_GRADIENTS['background:dawn'];

  return (
    <svg viewBox="0 0 320 360" width={size} height={size * (360 / 320)} xmlns="http://www.w3.org/2000/svg" className="select-none drop-shadow-xl">
      <defs>
        <linearGradient id="char-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="100%" stopColor={bg[1]} />
        </linearGradient>
        <radialGradient id="blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9cb8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff9cb8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="320" height="360" rx="24" fill="url(#char-bg)" />

      {/* Scenery by background */}
      {character?.background === 'background:dawn' && (
        <g opacity="0.8">
          <circle cx="60" cy="80" r="4" fill="#ff6fa6" />
          <circle cx="260" cy="50" r="3" fill="#ff9cb8" />
          <circle cx="200" cy="110" r="3" fill="#ff6fa6" />
          <circle cx="100" cy="40" r="3" fill="#ff9cb8" />
        </g>
      )}
      {character?.background === 'background:sunset' && (
        <g>
          <circle cx="160" cy="80" r="40" fill="#fff2c0" opacity="0.6" />
          <circle cx="160" cy="80" r="24" fill="#ffd27a" />
        </g>
      )}
      {character?.background === 'background:library' && (
        <g opacity="0.6">
          <rect x="18" y="60" width="14" height="60" fill="#a06346" />
          <rect x="32" y="45" width="12" height="75" fill="#c08566" />
          <rect x="44" y="55" width="14" height="65" fill="#8c5031" />
          <rect x="266" y="50" width="14" height="70" fill="#a06346" />
          <rect x="280" y="60" width="12" height="60" fill="#c08566" />
          <rect x="292" y="55" width="14" height="65" fill="#8c5031" />
        </g>
      )}
      {character?.background === 'background:tokyo' && (
        <g opacity="0.9">
          <rect x="18" y="70" width="18" height="60" fill="#4b3a6a" />
          <rect x="38" y="50" width="14" height="80" fill="#5f4a86" />
          <rect x="54" y="90" width="16" height="40" fill="#4b3a6a" />
          <rect x="258" y="60" width="16" height="70" fill="#5f4a86" />
          <rect x="276" y="75" width="14" height="55" fill="#4b3a6a" />
          <rect x="292" y="90" width="16" height="40" fill="#5f4a86" />
          {[28,46,64,268,284,300].map((x,i)=>(<rect key={i} x={x} y={90} width="3" height="3" fill="#ffe38a" />))}
        </g>
      )}

      {/* Body (t-shirt/outfit silhouette) */}
      <g transform="translate(160,250)">
        <path d="M-70,60 C-70,10 -40,-20 0,-20 C40,-20 70,10 70,60 L70,100 L-70,100 Z" fill={outfit} />
        {/* Collar/detail based on outfit */}
        {character?.outfit === 'outfit:blazer' && (
          <g>
            <path d="M-26,-18 L-10,10 L-18,30 Z" fill="#1a1530" />
            <path d="M26,-18 L10,10 L18,30 Z" fill="#1a1530" />
            <rect x="-3" y="-16" width="6" height="40" fill="#e8e6f1" />
          </g>
        )}
        {character?.outfit === 'outfit:hoodie' && (
          <g>
            <path d="M-40,-10 Q0,-40 40,-10 L40,10 L-40,10 Z" fill={outfit} stroke="#000" strokeOpacity="0.1" />
            <rect x="-18" y="25" width="36" height="30" fill={outfit} stroke="#000" strokeOpacity="0.1" />
          </g>
        )}
        {character?.outfit === 'outfit:dress' && (
          <path d="M-55,30 L-80,100 L80,100 L55,30 Z" fill="#ffb0c9" />
        )}
        {character?.outfit === 'outfit:kimono' && (
          <g>
            <path d="M-70,0 L-40,100 L0,100 L0,-20 Z" fill="#c13a62" />
            <path d="M70,0 L40,100 L0,100 L0,-20 Z" fill="#e94f7e" />
            <rect x="-14" y="20" width="28" height="24" fill="#ffd27a" />
          </g>
        )}
      </g>

      {/* Neck */}
      <rect x="150" y="210" width="20" height="30" fill={skin} />

      {/* Head */}
      <g transform="translate(160,160)">
        {/* back hair (long) */}
        {character?.hair === 'hair:long' && (
          <path d="M-68,-20 Q-80,80 -30,110 L30,110 Q80,80 68,-20 Z" fill={hairColor} />
        )}
        <ellipse cx="0" cy="0" rx="62" ry="68" fill={skin} />
        {/* blush */}
        <ellipse cx="-30" cy="15" rx="12" ry="6" fill="url(#blush)" />
        <ellipse cx="30" cy="15" rx="12" ry="6" fill="url(#blush)" />

        {/* Hair */}
        {character?.hair === 'hair:bob' && (
          <path d="M-64,-20 Q-70,-60 0,-70 Q70,-60 64,-20 L62,20 Q55,-2 40,-8 Q20,0 0,-2 Q-20,0 -40,-8 Q-55,-2 -62,20 Z" fill={hairColor} />
        )}
        {character?.hair === 'hair:bun' && (
          <g>
            <circle cx="0" cy="-62" r="20" fill={hairColor} />
            <path d="M-60,-20 Q-62,-50 0,-55 Q62,-50 60,-20 L58,0 L-58,0 Z" fill={hairColor} />
          </g>
        )}
        {character?.hair === 'hair:ponytail' && (
          <g>
            <path d="M-60,-20 Q-62,-60 0,-64 Q62,-60 60,-20 L58,10 L-58,10 Z" fill={hairColor} />
            <path d="M55,-15 Q85,10 80,55 L62,52 Q64,20 50,5 Z" fill={hairColor} />
          </g>
        )}
        {character?.hair === 'hair:short' && (
          <path d="M-58,-22 Q-60,-58 0,-62 Q60,-58 58,-22 L54,-8 Q30,-18 0,-16 Q-30,-18 -54,-8 Z" fill={hairColor} />
        )}
        {character?.hair === 'hair:long' && (
          <path d="M-62,-20 Q-66,-64 0,-68 Q66,-64 62,-20 L60,10 L-60,10 Z" fill={hairColor} />
        )}

        {/* Eyes (expression) */}
        {character?.expression === 'expression:smile' && (
          <g>
            <ellipse cx="-20" cy="0" rx="5" ry="6" fill="#1f1420" />
            <ellipse cx="20" cy="0" rx="5" ry="6" fill="#1f1420" />
            <circle cx="-18" cy="-2" r="1.6" fill="#fff" />
            <circle cx="22" cy="-2" r="1.6" fill="#fff" />
          </g>
        )}
        {character?.expression === 'expression:wink' && (
          <g>
            <path d="M-28,0 Q-20,-6 -12,0" stroke="#1f1420" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="20" cy="0" rx="5" ry="6" fill="#1f1420" />
            <circle cx="22" cy="-2" r="1.6" fill="#fff" />
          </g>
        )}
        {character?.expression === 'expression:focused' && (
          <g>
            <ellipse cx="-20" cy="0" rx="4" ry="3" fill="#1f1420" />
            <ellipse cx="20" cy="0" rx="4" ry="3" fill="#1f1420" />
            <path d="M-30,-12 L-10,-10" stroke="#1f1420" strokeWidth="2" />
            <path d="M30,-12 L10,-10" stroke="#1f1420" strokeWidth="2" />
          </g>
        )}
        {character?.expression === 'expression:joyful' && (
          <g>
            <path d="M-26,-2 Q-20,-10 -14,-2" stroke="#1f1420" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M14,-2 Q20,-10 26,-2" stroke="#1f1420" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Mouth */}
        {character?.expression === 'expression:focused' ? (
          <path d="M-10,24 L10,24" stroke="#9b4a5e" strokeWidth="2" strokeLinecap="round" />
        ) : character?.expression === 'expression:joyful' ? (
          <path d="M-18,18 Q0,34 18,18 Q10,30 0,30 Q-10,30 -18,18 Z" fill="#d94b6c" />
        ) : (
          <path d="M-14,20 Q0,30 14,20" stroke="#9b4a5e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* Accessory */}
        {character?.accessory === 'accessory:glasses' && (
          <g fill="none" stroke="#1f1420" strokeWidth="2.5">
            <circle cx="-20" cy="0" r="12" />
            <circle cx="20" cy="0" r="12" />
            <path d="M-8,0 L8,0" />
          </g>
        )}
        {character?.accessory === 'accessory:headphones' && (
          <g>
            <path d="M-62,0 Q-62,-48 0,-50 Q62,-48 62,0" stroke="#1f1420" strokeWidth="6" fill="none" />
            <rect x="-72" y="-8" width="14" height="26" rx="5" fill="#1f1420" />
            <rect x="58" y="-8" width="14" height="26" rx="5" fill="#1f1420" />
          </g>
        )}
        {character?.accessory === 'accessory:petal-crown' && (
          <g>
            {[-40,-20,0,20,40].map((x, i) => (
              <g key={i} transform={`translate(${x},-55)`}>
                <ellipse cx="0" cy="0" rx="6" ry="9" fill="#ff6fa6" transform={`rotate(${i * 20 - 40})`} />
              </g>
            ))}
          </g>
        )}
        {character?.accessory === 'accessory:laptop' && (
          <g transform="translate(60,72)">
            <rect x="-16" y="-10" width="32" height="22" rx="2" fill="#2a2a44" />
            <rect x="-14" y="-8" width="28" height="18" fill="#7ec6f0" />
            <rect x="-20" y="10" width="40" height="3" rx="1" fill="#2a2a44" />
          </g>
        )}
      </g>

      {/* floating petals */}
      <g opacity="0.8">
        <ellipse cx="40" cy="150" rx="5" ry="8" fill="#ff9cb8" transform="rotate(-20 40 150)" />
        <ellipse cx="285" cy="120" rx="4" ry="7" fill="#ff6fa6" transform="rotate(30 285 120)" />
        <ellipse cx="300" cy="260" rx="4" ry="7" fill="#ffb0c9" transform="rotate(-30 300 260)" />
      </g>
    </svg>
  );
}
