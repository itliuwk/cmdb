let data = [
    {
        id: 1,
        x: 305,
        y: 43,
        alarm: '业务服务：财务管理',
        src: require('./img/业务服务40x33.png'),
        targetIds: [
            {
                id: 2,
                name: '属于',
            },
        ],
    },
    {
        id: 2,
        x: 205,
        y: 143,
        alarm: '业务服务：财务管理',
        src: require('./img/业务服务40x33.png'),
        targetIds: [
            {
                id: 3,
                name: '依赖',
            },
        ],
    },
    {
        id: 3,
        x: 405,
        y: 183,
        alarm: '应用实例：FMS集团实例',
        src: require('./img/应用实例40x41.png'),
        targetIds: [
            {
                id: 4,
                name: '依赖',
            },
            {
                id: 5,
                name: '运行于',
            },
        ],
    },
    {
        id: 4,
        x: 265,
        y: 303,
        alarm: 'Weblogic 集群',
        src: require('./img/集群42x39.png'),
        targetIds: [
            {
                id: 5,
                name: '依赖',
            },
        ],
    },
    {
        id: 5,
        x: 505,
        y: 303,
        alarm: '数据库集群',
        src: require('./img/集群42x39.png'),
        targetIds: [],
    },
    {
        id: 6,
        x: 155,
        y: 420,
        alarm: '中间件实例：Weblogic',
        src: require('./img/中间件实例43x46.png'),
        targetIds: [
            {
                id: 4,
                name: '属于',
            },
            {
                id: 8,
                name: '运行于',
            },
        ],
    },
    {
        id: 7,
        x: 605,
        y: 420,
        alarm: '数据库实例：oracle',
        src: require('./img/数据库实例40x43.png'),
        targetIds: [
            {
                id: 5,
                name: '属于',
            },
            {
                id: 8,
                name: '运行于',
            },
        ],
    },
    {
        id: 8,
        x: 405,
        y: 553,
        alarm: '虚拟服务器',
        src: require('./img/服务器43x46.png'),
        targetIds: [],
    },
]




class Wktopo {
    constructor(config) {
        this.data = config.data
        this.canvas = document.getElementById(config.el);
        this.stage = null;
        this.scene = null;
        this._init()
    }

    _init() {
        let { canvas } = this
        let stage = new JTopo.Stage(canvas)
        let scene = new JTopo.Scene()
        scene.alpha = 1;
        scene.backgroundColor = "255,255,255";
        scene.mode = "select";
        // scene.areaSelect = false;
        this.scene = scene
        this.stage = stage
        this._handle()
    }

    _handle() {
        let { data, scene, stage, canvas } = this
        let { clientHeight, clientWidth } = canvas
        const that = this;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element.sNode = that.nodeImgText(element.x, element.y, element.src, element.alarm);
            element.allTargetId = that.allTargetId(element.targetIds)
        }
        data.map((item, idx) => {
            let targetIds = item.targetIds;
            if (targetIds && targetIds.length) {
                targetIds.map((tItem, tIdx) => {
                    let sNode = data.find(fItem => fItem.id == tItem.id)
                    that.newFoldLink(item.sNode, sNode.sNode, tItem.name);
                    return tItem;
                });
            }
            return item;
        });
        scene.addEventListener("click", that.eventHandler);



        that.newLink({
            cx: 0,
            cy: 120
        }, {
            cx: clientWidth,
            cy: 120
        }, '业务层');


        that.newLink({
            cx: 0,
            cy: 260
        }, {
            cx: clientWidth,
            cy: 260
        }, '应用层');


        stage.add(scene);
    }


    allTargetId(targetIds) {
        let all = []
        targetIds.map(item => {
            all.push(item.id)
        })
        return all
    }
    /**
     *点击事件
     * @param {*} e
     */
    eventHandler(e) {
        console.log(e.target);
    }

    /**
     *
     * @param {*} nodeA
     * @param {*} nodeZ
     * @param {*} text
     * @param {*} dashedPattern
     */
    newLink(nodeA, nodeZ, text) {
        let { scene } = this
        var link = new JTopo.Link(nodeA, nodeZ, text);
        link.font = 'bold 20px 微软雅黑';
        link.fontColor = "51,51,51";
        link.lineWidth = 1; // 线宽
        link.textOffsetX = 400; // 文本偏移量（向下3个像素）
        link.textOffsetY = -50; // 文本偏移量（向下3个像素）
        link.strokeColor = '68, 68, 68';
        scene.add(link);
        return link;
    }


    /**
     * 绘制图片 和 文字
     * @param {*} x
     * @param {*} y
     * @param {*} img
     * @param {*} text
     */
    nodeImgText(x, y, img, text) {
        let { scene } = this
        let node = new JTopo.Node();
        node.fontColor = "51,51,51";
        node.text = text;
        node.zIndex = 100;
        node.dragable = false
        node.setImage(img, true);
        node.setLocation(x, y);
        scene.add(node);
        return node;
    }

    /**
     *
     * @param {开始点} nodeA
     * @param {结束点} nodeZ
     * @param {开始和结束  中间的文字} text
     * @param {*} direction
     */
    newFoldLink(nodeA, nodeZ, text, direction) {
        let { scene } = this
        let link = new JTopo.Link(nodeA, nodeZ, text);
        link.font = "15px  Consolas";
        link.fontColor = "255,0,0";
        link.direction = direction || "horizontal";
        link.arrowsRadius = 5; //箭头大小
        link.lineWidth = 2; // 线宽
        link.bundleGap = 10; // 线条之间的间隔
        link.textOffsetY = 10; // 文本偏移量（向下3个像素）
        link.strokeColor = "255,0,0"; // 线条颜色随机
        // this.twoWay(link);
        scene.add(link);
        return link;
    }

    /**
     * 双向箭头
     * @param {*} link
     */
    twoWay(link) {
        link.getStartPosition = function () {
            var a;
            return (
                null != this.arrowsRadius &&
                (a = (function (thisl) {
                    var b = thisl.nodeA,
                        c = thisl.nodeZ;
                    var d = JTopo.util.lineF(b.cx, b.cy, c.cx, c.cy),
                        e = b.getBound(),
                        f = JTopo.util.intersectionLineBound(d, e);
                    return f;
                })(this)),
                null == a &&
                (a = {
                    x: this.nodeA.cx,
                    y: this.nodeA.cy,
                }),
                a
            );
        };

        link.paintPath = function (a, b) {
            if (this.nodeA === this.nodeZ) return void this.paintLoop(a);
            a.beginPath(), a.moveTo(b[0].x, b[0].y);
            for (var c = 1; c < b.length; c++) {
                null == this.dashedPattern
                    ? null == this.PointPathColor
                        ? a.lineTo(b[c].x, b[c].y)
                        : a.JtopoDrawPointPath(
                            b[c - 1].x,
                            b[c - 1].y,
                            b[c].x,
                            b[c].y,
                            a.strokeStyle,
                            this.PointPathColor
                        )
                    : a.JTopoDashedLineTo(
                        b[c - 1].x,
                        b[c - 1].y,
                        b[c].x,
                        b[c].y,
                        this.dashedPattern
                    );
            }
            if ((a.stroke(), a.closePath(), null != this.arrowsRadius)) {
                var d = b[b.length - 2],
                    e = b[b.length - 1];

                this.paintArrow(a, d, e);
                this.paintArrow(a, e, d);
            }
        };
    }
}


export default {
    data: data,
    Wktopo: Wktopo
}