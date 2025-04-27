
сделать контейнер интерактивным
```js
this.container = this.add.container(300, 50);
this.container.add(this.add.rectangle(0, 0, 50, 50, 0xffffff).setOrigin(0.5));
this.container.add(this.add.text(0, 0, 'text', { color: 'red' }).setOrigin(0.5))

this.container
	.setSize(50, 50)
	.setInteractive({
		cursor: 'pointer'
	})
	.on('pointerdown', () => {
		console.log('j')
	});
	
// или так
this.container
	.setInteractive({
		hitArea: new Phaser.Geom.Rectangle(-25, -25, 50, 50),
		hitAreaCallback: Phaser.Geom.Rectangle.Contains,
		cursor: 'pointer'
	})
	.on('pointerdown', () => {
		console.log('j')
	});
```