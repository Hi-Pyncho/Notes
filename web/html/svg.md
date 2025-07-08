```html
<svg width="200" height="200" viewBox="x y w h">
```

## фигуры 
```html
<circle cx='10px' cy='10px' r='10px' />
<ellipse rx='10px' ry='10px' cx='10px' cy='10px' />
<rect x='10' y='10' width="100" height="100" rx='10' ry='10'/>
<line x1='10px' y1='10px' x2='10px' y2='10px' />
<polyline points='10,20 20,30 30,40' />
<polygon points='10,20 20,30 30,40' /> 
```

```html
<path d='' />
```
`M` - начальная точка(абсолютная)
`m` - относительная
`Z,z` - закрыть путь
`L,l` - lineTo
`H,h` - horizontalLineTo
`V,v` - verticalLineTo
`Q,q` - quadratic Bézier curveto(x1,y1 x,y)(Q50,25 190,70)
`T,t` - shorthand/smooth quadratic Bézier curveto(x,y)(T290,150)
`C,c` - curveTo(x1,y1 x2,y2 x,y)(C60,10 140,10 190,70)
`S,s` - shorthand/smooth curveto(x2,y2 x,y)(S240,195 290,150)


## свойства
```html
fill='color'
stroke='color'
stroke-width='3'
stroke-dasharray = '20, 10, 5'
```

```html
stroke-linecap = ['butt', 'square', 'round']
butt - обрезает сразу по линии
square - продлевает на половину значения от stroke-width
round - закругляет

stroke-linejoin = ['mitter', 'round', 'bevel']
```



## градиенты
```html
<rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)"/> 
<defs>
  <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="red"/>
    <stop offset="50%" stop-color="black" stop-opacity="0,5"/>
    <stop offset="100%" stop-color="blue"/>
  </linearGradient>
</defs>

<defs>
  <radialGradient id="RadialGradient2" cx="0.25" cy="0.25" r="0.25">
    <stop offset="0%" stop-color="red"/>
    <stop offset="100%" stop-color="blue"/>
  </radialGradient>
</defs>
```

## паттерны
```html
<defs>
  <pattern id="Pattern" x="0" y="0" width=".25" height=".25">
    <rect x="0" y="0" width="50" height="50" fill="skyblue"/>
    <rect x="0" y="0" width="25" height="25" fill="url(#Gradient2)"/>
    <circle cx="25" cy="25" r="20" fill="url(#Gradient1)" fill-opacity="0.5"/>
  </pattern>
</defs>
```

## текст
```html
<text x="10" y="10">Hello World!</text>
text-anchor = 'start, middle, end или inherit'
<text>
  <tspan x='' y='' dx='' dy='' rotate='' font-weight="bold" fill="red">This is bold and red</tspan>
</text>

<path id="my_path" d="M 20,20 C 40,40 80,40 100,20" fill="transparent" />
<text>
  <textPath xlink:href="#my_path">This text follows a curve.</textPath>
</text>
```

## группировка
```html
<svg width="30" height="10">
    <g fill="red">
        <rect x="0" y="0" width="10" height="10" />
        <rect x="20" y="0" width="10" height="10" />
    </g>
</svg>
```
