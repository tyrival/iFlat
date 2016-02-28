window.onload = function() {
    iPaint.init();
}
var iPaint = {
    WINDOW_WIDTH: 0,
    WINDOW_HEIGHT: 0,
    canvas: null,  //画图板对象
    context: null,  //上下文对象
    model: null,  //用于储存即将要新增的模型
    curDot: null,  //储存当前选中的多边形节点，用于编辑节点
    dots: [],  //储存多边形的节点
    data: [],  //储存所有图形对象
    getContext: function() {
        return this.context;
    },
    setCanvasWidth: function(e) {
        this.canvas.width = e;
    },
    setCanvasHeight: function(e) {
        this.canvas.height = e;
    },

    //初始化控件
    init: function() {
        this.WINDOW_WIDTH = document.body.clientWidth;
        this.WINDOW_HEIGHT = document.documentElement.clientHeight;

        this.canvas = document.getElementById("canvas");
        this.setCanvasWidth(this.WINDOW_WIDTH);
        this.setCanvasHeight(this.WINDOW_HEIGHT);
        this.context = this.canvas.getContext("2d");

        this.initDataList();
    },
    //初始化数据列表
    initDataList: function() {
        var html = '';
        for(var i = 0; i < this.data.length; i++) {
            var type;
            switch(this.data[i]['type']) {
                case 'rectangle': '矩形';
                case 'polygon': '多边形';
            }
            html += '<tr><td>' + this.data[i]['fillText'] + '</td><td>' + type + '</td><td>' + this.data[i]['coordinate'] + '</td><td>' + this.data[i]['lineWidth'] + '</td><td>' + this.data[i]['font'] + '</td><td>编辑</td><td>删除</td></tr>';
        }
        $('#ipaint-data-list').html(html);
    },

    //保存图形数据
    saveData: function() {


    },
    //设置矩形数据
    setRectModel: function() {
        var name = $('#rectName').val();
        var font = parseInt($('#rectFont').val());
        var x = parseInt($('#rectX').val());
        var y = parseInt($('#rectY').val());
        var w = parseInt($('#rectW').val());
        var h = parseInt($('#rectH').val());
        var lineWidth = parseInt($('#rectL').val());
        if(isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h) || isNaN(font) || isNaN(lineWidth)) {
            alert("参数输入错误。");
            return false;
        }
        var dot1 = [x, y];
        var dot2 = [x + w, y];
        var dot3 = [x + w, y + h];
        var dot4 = [x, y + h];
        var coordinate = [dot1, dot2, dot3, dot4];
        this.model = null;
        this.model = {
            type: 'rectangle',
            font: font,
            coordinate: coordinate,
            lineWidth: lineWidth,
            name: name,
            fillText: this.trim(name)
        }
    },

    //设置多边形数据
    setPolyModel: function() {
        var name = $('#polyName').val();
        var font = parseInt($('#polyFont').val());
        var lineWidth = parseInt($('#polyL').val());
        if(isNaN(font) || isNaN(lineWidth)) {
            alert("参数输入错误。");
            return false;
        }
        var coordinate = this.dots;
        this.model = null;
        this.model = {
            type: 'polygon',
            font: font,
            coordinate: coordinate,
            lineWidth: lineWidth,
            name: name,
            fillText: this.trim(name)
        }
    },

    //新增多边形
    addPolygon: function() {
        this.setPolyModel();
        this.dataAdd();
    },

    //保存多边形的端点
    savePolygonDot: function() {
        var x = parseInt($('#polyDotX').val());
        var y = parseInt($('#polyDotY').val());
        if(!x || !y) {
            $('#addDot-alert').modal();
            return false;
        }
        var coord = [x, y];
        if(this.curDot == null) {
            var i = this.dots.length;
            var html = '<tr><td>' + x + '</td><td>' + y + '</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button index="' + i + '" class="am-btn am-btn-default am-btn-xs am-text-secondary" onclick="iPaint.editPolygonDot(this)"><span class="am-icon-pencil-square-o"></span></button><button index="' + i + '" class="am-btn am-btn-default am-btn-xs am-text-danger" onclick="iPaint.deletePolygonDot(this)"><span class="am-icon-trash-o"></span></button></div></div></td></tr>';
            $('#polygonlist').append(html);
            this.dots.push(coord);
        } else {
            var i = this.curDot.index;
            var html = '<td>' + x + '</td><td>' + y + '</td><td><div class="am-btn-toolbar"><div class="am-btn-group am-btn-group-xs"><button index="' + i + '" class="am-btn am-btn-default am-btn-xs am-text-secondary" onclick="iPaint.editPolygonDot(this)"><span class="am-icon-pencil-square-o"></span></button><button index="' + i + '" class="am-btn am-btn-default am-btn-xs am-text-danger" onclick="iPaint.deletePolygonDot(this)"><span class="am-icon-trash-o"></span></button></div></div></td>';
            var trs = $('#polygonlist').children();
            trs[i].innerHTML = html;
            this.dots.splice(i, 1, coord);
            this.curDot = null;
        }
        $('#polyDotX').val('');
        $('#polyDotY').val('');

    },

    //编辑多边形端点
    editPolygonDot: function(ele) {
        var i = ele.getAttribute("index");
        var tds = ele.parentElement.parentElement.parentElement.parentElement.children;
        var x = tds[0].innerText;
        var y = tds[1].innerText;
        this.curDot = {
            index: i,
            x: x,
            y: y,
        };
        $('#polyDotX').val(x);
        $('#polyDotY').val(y);

    },

    //删除多边形端点
    deletePolygonDot: function(ele) {
        var arr = this.dots;
        $('#deleteDot-confirm').modal({
            relatedTarget: this,
            onConfirm: function(options) {
                var i = ele.getAttribute("index");
                arr.splice(i, 1);
                var tds = $('#polygonlist').children();
                tds[i].remove();
            },
        });

    },

    //新增矩形
    addRectangle: function() {
        this.setRectModel();
        this.dataAdd();
    },

    //将新图形增加到数据集中，并在图上画出
    dataAdd: function() {
        if(!this.validate()) {
            return false;
        }
        this.data.push(this.model);
        this.draw();
    },

    //数据验证
    validate: function() {
        var fillText = this.model['fillText'];
        var name = this.model['name'];
        for(var i = 0; i < this.data.length; i++) {
            if(name == this.data[i]['fillText']) {
                alert("已存在同名的图形，请修改名称。");  //检查空格
                return false;
            }
            if(fillText == this.data[i]['fillText']) {
                alert("图形的名称去除两端空格后，与已存在的图形同名，请修改名称。");  //检查空格
                return false;
            }
        }
        return true;
    },

    //画图
    draw: function draw() {
        if(this.model['type'] == 'rectangle' || this.model['type'] == 'polygon') {
            this.drawPolygon(this.model)
        }
    },

    //画多边形，包括矩形
    drawPolygon: function() {
        this.context.beginPath();
        var sumX = 0;
        var sumY = 0;
        var coord = this.model['coordinate'];
        //起始点
        this.context.moveTo(coord[0][0], coord[0][1]);
        sumX += parseInt(coord[0][0]);
        sumY += parseInt(coord[0][1]);
        //划线
        for(var j = 1; j < coord.length; j++) {
            this.context.lineTo(coord[j][0], coord[j][1]);
            sumX += parseInt(coord[j][0]);
            sumY += parseInt(coord[j][1]);
        }
        this.context.closePath();
        this.context.lineWidth = this.model['lineWidth'];
        this.context.strokeStyle = this.model['strokeStyle'];
        this.context.stroke();
        //填充色
        var fs = this.model['fillStyle'];
        if(fs) {
            this.context.fillStyle = fs;
            this.context.fill();
        }
        //字体
        this.context.beginPath();
        this.context.font = this.model['font'] + 'px Consolas';
        this.context.fillStyle = this.model['fontStyle'];
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
        this.context.fillText(this.model['fillText'], sumX / coord.length, sumY / coord.length);
        this.context.fill();
    },

    //去除字符串两头的空格
    trim: function(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}

