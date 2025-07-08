## Оптимизация
https://forum.cocosengine.org/t/scene-loading-slow-in-web/59653/2

## DragNDrop
```js
import { _decorator, Component, Node, input, EventTouch, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DragNDrop')

export class DragNDrop extends Component {
  protected onLoad(): void {
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }

  protected onTouchMove(event: EventTouch): void {
    const localPos = event.getLocation();
    this.node.setWorldPosition(localPos.x, localPos.y, 0);
  }

  protected onDestroy(): void {
    this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
  }
}
```


## Debug physics
https://docs.cocos.com/creator/3.8/manual/en/physics-2d/physics-2d-system.html#draw-physics-debugging-information