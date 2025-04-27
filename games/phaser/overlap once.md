```js
this.physics.add.overlap(this.player, this.colorSpot, () => {
  const touching = !this.player.body.touching.none;
  const wasTouching = !this.player.body.wasTouching.none;

  if (touching && !wasTouching) {
	console.log('touched')
  }

  this.player.color = this.colorSpot.color;
});
```

```js
function create() {
  block.on("overlapstart", () => {});
  block.on("overlapend", () => {});
}

function update() {
  var touching = !block.body.touching.none;
  var wasTouching = !block.body.wasTouching.none;

  // If you want touching OR embedded then use:
  // var touching = !block.body.touching.none || block.body.embedded;

  if (touching && !wasTouching) block.emit("overlapstart");
  if (!touching && wasTouching) block.emit("overlapend");
}
```

