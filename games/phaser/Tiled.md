```js
preload() {
	this.load.image('tiles', 'assets/tiled/tiles.png');
	this.load.tilemapTiledJSON('map', 'assets/tiled/tiles.json');
}

create() {
	const map = this.make.tilemap({ key: 'map', tileWidth: 64, tileHeight: 64 });
	const tileset = map.addTilesetImage('tileset', 'tiles');
	const bottomLayer = map.createLayer('bottom', tileset, 0, 0);
	const topLayer = map.createLayer('top', tileset, 0, 0);

    this.player = this.physics.add.sprite(20, 20, 'player');
    this.player.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, topLayer);
    topLayer.setCollisionByProperty({ collides: true });
}
```