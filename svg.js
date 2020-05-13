<body>
  <svg width='300' height='150'>
    <rect width='100%' height='100%'  fill='red' ></rect>
    <circle r='70' fill='yellow' cx='150' cy='75'></circle>
    <text fill='black' x='150' y='90' font-size='40' text-anchor='middle' >SVG</text>
  </svg>
  <svg class="box2" width='300' height='150'>
    <rect width='300' height='150' fill='transparent' stroke='black' stroke-width='10'></rect>
    <rect width='100' height='100' x='100' y='25' fill='transparent' stroke='black' stroke-width='5'></rect>
    <circle class="circle" r='20' cx='150' cy='75' fill='transparent' stroke='black' stroke-width='5'></circle>
    <ellipse cx='50' cy='75' rx='30' ry='50'></ellipse>
    <circle cx='50' cy='75' fill='white' r='15'></circle>
    <ellipse cx='250' cy='75' rx='30' ry='50'></ellipse>
    <circle  cx='250' cy='75' fill='white' r='15'></circle>
    <line x1='100' y1='25' x2='200' y2='125' stroke='black' stroke-width='5'></line>
    <line x1='200' y1='25' x2='100' y2='125' stroke='black' stroke-width='5'></line>
    <polyline stroke='black' stroke-width='5' fill='transparent' points='0 0, 40 40, 260 40, 300 0'></polyline>
    <polyline stroke='black' stroke-width='5' fill='transparent' points='0 150, 40 110, 260 110, 300 150'></polyline>
    <polygon stroke='black' stroke-width='5' fill='transparent' points='150 10, 85 75, 150 140, 215 75'></polygon>
  </svg>
  <svg class="box2" width='300' height='150'>
    <path d='M 10 10 H 90 V 90 H 10 Z' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 10 20 H 90' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 10 30 H 90' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 10 40 H 90' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 10 50 l 25 0 l 25 10 l 0 10 l -25 10 l -25 0 Z' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 30 60 l 15 0 m 0 10 l -15 0' fill='transparent' stroke='black' stroke-width='4'></path>
    <path d='M 70 70 v 15 h 15 v -15 m -7 -6 v 15' fill='transparent' stroke='black' stroke-width='4'></path>
  </svg>
  <svg class="box2" width='300' height='150'>
    <path d='M 10 10 C 20 20, 40 20, 50 10' fill='transparent' stroke='black' stroke-width='2'></path>
    <circle r='2' cx='10' cy='10' fill='red'></circle>
    <circle r='2' cx='20' cy='20' fill='red'></circle>
    <circle r='2' cx='40' cy='20' fill='red'></circle>
    <circle r='2' cx='50' cy='10' fill='red'></circle>
    <path d='M 70 10 C 80 30, 100 30, 110 10' fill='transparent' stroke='black' stroke-width='2'></path>
    <path d='M 20 50 C 10 70, 60 70, 50 50' fill='transparent' stroke='black' stroke-width='2'></path>
  </svg>
  <svg class="box2" width='200' height='150'>
    <defs>
      <linearGradient id='gradient1'>
        <stop offset='5%' stop-color='white' />
        <stop offset='100%' stop-color='magenta' />
      </linearGradient>

      <pattern id='pattern1' width='0.25' height='0.25' x='0' y='0'>
        <rect fill='url(#gradient1)' width='50' height='50' />
        <circle cx='25' cy='25' r='10' fill='magenta' />
      </pattern>
    </defs>
    <rect fill='url(#pattern1)' stroke='black' width='200' height='200' />
  </svg>
  <svg class="box2" width='200' height='150'>
    <defs>
      <linearGradient id='gradient2' x1='0' x2='1' y1='0' y2='0'>
        <stop offset='0%' stop-color='red' />
        <stop offset='50%' stop-color='blue' stop-opacity='10%'/>
        <stop offset='100%' stop-color='yellow'/>
      </linearGradient>
      <radialGradient id='radial' cx='0.5' cy='0.15' r='0.7'>
        <stop offset='0%' stop-color='red'/>
        <stop offset='100%' stop-color='yellow' stop-opacity='30%'/>
      </radialGradient>
    </defs>
    <rect width='80' height='80' x='0' y='0' fill='url(#gradient2)' />
    <rect width='80' height='80' x='120' y='70' fill='url(#radial)' />
  </svg>
  <svg>
    <text id='example' x='20' y='50' fill='magenta' stroke='black' stroke-width='0.5' font-size='30' text-decoration='underline'>Hello World!</text>
    <text>
      <tspan font-size='20' font-weight='bold' fill='skyblue' stroke='blue' stroke-width='0.4' x='40' y='90'>Bye World</tspan>
      <tspan x='40' dy='20'>Again Hello!</tspan>
    </text>
    <text id="example">This is an example text.</text>
    <text>
        <tref xlink:href="#example"  />
    </text>
  </svg>
  <svg>
    <line x1='40' y1='30' x2='250' y2='30' stroke='black' stroke-width='10' stroke-linecap='round' />
    <line x1='40' y1='60' x2='250' y2='60' stroke='black' stroke-width='10' stroke-linecap='butt' />
    <line x1='40' y1='90' x2='250' y2='90' stroke='black' stroke-width='10' stroke-linecap='square' />
  </svg>
  <svg>
    <path d='M 50 100, 100 50, 150 100 Z' fill='transparent' stroke='black' stroke-width='5' stroke-linejoin='round' />
  </svg>
  <svg>
    <g fill='blue' id='group'>
      <rect x='20' y='20' width='100' height='100'></rect>
      <rect width='50' height='50' x='45' y='0'></rect>
    </g>
  </svg>
  <svg>
    <defs>
      <clipPath id='clipPath'>
        <rect width='200' height='100' x='0' y='0' />
      </clipPath>
    </defs>
    <circle cx='100' cy='100' r='100' clip-path='url(#clipPath)' />
  </svg>
  <svg>
    <defs>
      <linearGradient id='takeOpacity'>
        <stop offset='0' stop-color='black' stop-opacity='0' />
        <stop offset='1' stop-color='white' stop-opacity='1' />
      </linearGradient>
      <mask id='Mask'>
        <rect x='0' y='0' width='200' height='100' fill='url(#takeOpacity)' />
      </mask>
    </defs>
    <rect x='0' y='0' width='200' height='100' fill='blue' mask="url(#Mask)" />
  </svg>

  <svg>
    <path id='smile' d='M 50 50 C 60 30, 90 30, 100 50' stroke='black' stroke-width='3' fill='transparent' stroke-linecap='round' />
  </svg>
  
  <svg>
    <defs>
      <linearGradient id='gradlin'>
        <stop offset='0%' stop-color='blue' />
        <stop class='stop' offset='100%' stop-color='magenta' />
      </linearGradient>
      <linearGradient id='gradlin2'>
        <stop offset='0%' stop-color='blue' />
        <stop class='stop' offset='100%' stop-color='magenta' stop-opacity='20%' />
      </linearGradient>
    </defs>
    <rect class='recta' x='0' y='0' width='300' height='150' fill='url(#gradlin)' />
  </svg>

  <svg>
    <rect width='200' height='100' x='50' y='20' fill='transparent' stroke='black' stroke-width='3' rx='20' ry='50' />
  </svg>

</body>

//some changes