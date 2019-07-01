import WaterColumn from './WaterColumn';

export default class WaterBody {

    constructor (
        context,
        x = 0,
        y = 0,
        w = 100,
        h = 100,
        depth = 150,
        {
            tension = 0.025,
            dampening = 0.025,
            spread = 0.25,
            texture,
        } = {}
    ) {
        if (typeof texture === 'undefined') {
            throw new Error('This version of WaterBody requires explicitly setting a texture');
        }

        this.debug = false;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.tension = tension;
        this.dampening = dampening;
        this.spread = spread;
        this.depth = Math.min(depth, this.h);
        this.texture = texture;

        const coords = [
            0,
            this.h - this.depth,
            this.w,
            this.h - this.depth
        ];
        const surface = new Phaser.Geom.Line(...coords);
        const points = surface.getPoints(0, 20);
        this.columns = [
            ...points,
            {
                x: this.w,
                y: coords[1]
            }
        ]
            .map(({ x, y }, i) =>
                new WaterColumn(x, y, i)
            );

        const data = this.columns
            .reduce((cache, { x, y }) => ([ ...cache, x, y ]), []);
        this.body = context.add.polygon(x, y, [
            coords[0], this.h,
            ...data,
            coords[2], this.h
        ])
            .setFillStyle(0x145dd1, 0)
            .setDepth(99)
            .setOrigin(0, 0);


        if (typeof texture === 'string') {
            this.background = context.add.tileSprite(this.x, this.y, this.w, this.h, this.texture)
                .setAlpha(0.75)
                .setDepth(99)
                .setOrigin(0, 0);

            this.background.mask = new Phaser.Display.Masks.GeometryMask(context, this.body);
        }

        this.sensor = context.matter.add.rectangle(
            this.x + (this.w / 2),
            this.y + this.h - (this.depth / 2),
            w,
            this.depth,
            {
                isSensor: true,
                isStatic: true,
                gameObject: this,
            }
        );

        this.debugGraphic = context.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        const emitterDeathZone = new Phaser.Geom.Polygon(
            Object.values(this.body.geom.points)
                .map(({ x, y }) => ([
                    this.x + x,
                    this.y + y
                ]))
        );
        this.emitter = context.add.particles('droplet').createEmitter({
            alpha: 1,
            tint: 0x0b5095,
            speed: {
                min: 100,
                max: 500,
            },
            gravityY: 1000,
            lifespan: 4000,
            quantity: 0,
            frequency: 1000,
            angle: {
                min: 240,
                max: 300,
            },
            scale: {
                min: .5,
                max: .1,
            },
            deathZone: {
                type: 'onEnter',
                source: emitterDeathZone,
            },
            deathCallbackScope: this,
            deathCallback: this.onDropletDeath,
        });

        context.sys.events.on('update', this.update, this);
    }

    update () {
        this.columns.forEach(column =>
            column.update(this.dampening, this.tension)
        );

        const data = this.columns
            .reduce((cache, { x, y }) => ([ ...cache, x, y ]), []);
        this.body.geom.setTo([
            0, this.h,
            ...data,
            this.w, this.h
        ]);
        this.body.updateData();

        this.debugGraphic.clear();
        if (this.debug) {
            this.columns.forEach(({ x, y }) =>
                this.debugGraphic.fillRect(this.x + x - 1, this.y + y - 1, 2, 2)
            );
        }

        let lDeltas = Array(this.columns.length).fill(0);
        let rDeltas = Array(this.columns.length).fill(0);

        for (let i = 0; i < 1; i++) {
            for (let j = 0; j < this.columns.length - 1; j++) {
                if (j > 0) {
                    const currColumn = this.columns[j];
                    const prevColumn = this.columns[j - 1];

                    lDeltas[j] = this.spread * (currColumn.y - prevColumn.y);
                    prevColumn.speed += lDeltas[j];
                }

                if (j < this.columns.length - 1) {
                    const currColumn = this.columns[j];
                    const nextColumn = this.columns[j + 1];

                    rDeltas[j] = this.spread * (currColumn.y - nextColumn.y);
                    nextColumn.speed += rDeltas[j];
                }
            }

            for (let j = 0; j < this.columns.length - 1; j++) {
                if (j > 0) {
                    const prevColumn = this.columns[j - 1];
                    prevColumn.y += lDeltas[j];
                }

                if (j < this.columns.length - 1) {
                    const nextColumn = this.columns[j + 1];
                    nextColumn.y += rDeltas[j];
                }
            }
        }
    }

    splash (index, speed = 1, numDroplets = 3) {
        let column = this.columns[index];
        column.speed = speed;

        this.emitter
            .explode(numDroplets, this.x + column.x, this.y + column.y)

        return this;
    }

    ripple (index, speed) {
        let column = this.columns[index];
        column.speed = speed;

        return this;
    }

    setDebug (bool) {
        this.debug = bool;

        return this;
    }

    onDropletDeath ({ x, }) {
        const minColumn = 0;
        const maxColumn = this.columns.length - 1;
        const targetColumn = this.columns.findIndex((col, i) => this.x + col.x >= x && i);
        const column = Phaser.Math.Clamp(targetColumn, minColumn, maxColumn);

        const speed = 0.5; // TODO: Calculate dynamic speed

        this.ripple(column, speed);
    }

}
