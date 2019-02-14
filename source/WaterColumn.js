export default class WaterColumn {

    constructor (x = 0, y = 0, index = 0) {
        this.index = index;
        this.x = x;
        this.y = y;
        this.targetY = y;
        this.speed = 0.5;
    }

    update (dampening, tension) {
        const y = this.targetY - this.y;
        this.speed += tension * y - this.speed * dampening;
        this.y += this.speed;
    }

}
