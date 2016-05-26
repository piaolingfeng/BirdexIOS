(function ($) {
    var defaults = {
        label: ['省', '市', '区'],
        areaWheels: 'PCD',
        areasKey : ['Provinces', 'Cities', 'Districts']
    };
    $.mobiscroll.presetShort('area');
    $.mobiscroll.presets.area = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            wg = [],
            wheels = [],
            ttl;
        var areas = s.areaWheels.split(''), areasKey = s.areasKey;
        if (inst.settings.valueo) {
            var val = (inst.settings.valueo).split(' ');
            for (var i = 0; i < areas.length; i++) {
                genWheels(getAreaInfo(i, val[i-1]), s.label[i], i);
            }
        } else {
            for (var i = 0; i < areas.length; i++) {
                genWheels(getAreaInfo(i), s.label[i], i);
            }
        }

        wheels.push(wg);     
        function getAreaInfo(index,val) {
            var area, _p, _c;
            if (areas[index] === "P") {
                area = AddressInfo[areasKey[index]];
            }
            if (areas[index] === "C") {
                _p = val||wg[0].keys[0];
                area = AddressInfo[areasKey[index]][_p];
            }
            if (areas[index] === "D") {
                _c = val||wg[1].keys[0];
                area = AddressInfo[areasKey[index]][_c];
            }
            return area;
        }

        function genWheels(area, lbl, type, isRet) {
            var values = [], keys = [];
            type = areas[type];
            if (type == "P") {
                for (var i = 0; i < area.length; i++) {
                    values.push(area[i]['_proviceid']);
                    keys.push(area[i]['_provicename']);
                }
            }
            if (type == "C") {
                for (var i = 0; i < area.length; i++) {
                    values.push(area[i]['_cityid']);
                    keys.push(area[i]['_cityname']);
                }
            }
            if (type == "D") {
                for (var i = 0; i < area.length; i++) {
                    values.push(area[i]['_districtid']);
                    keys.push(area[i]['_districtname']);
                }
            }
            if (isRet) {
                return {
                    values: keys,
                    keys: values,
                    label: lbl
                };
            }
            addWheel(wg, values, keys, lbl);
        }

        function addWheel(wg, k, v, lbl) {
            wg.push({
                values: v,
                keys: k,
                label: lbl
            });
        }
        function getAreasResult(type, value, values){
            console.log("{type="+type+", value="+value+", values="+ values+"}");
            type = areas[type];
            var area;
            if (type == "P") {
                console.log(s.areasKey[type])
                area = AddressInfo[areasKey[type]];
                console.log(area);

                $.each(area, function(val, key){
                    console.log(val);
                    if(val === value){
                        return key;
                    }
                })
            }
            if (type == "C") {
                area = AddressInfo[values[type-1]];
                $.each(area, function(val, key){
                    if(val === value){
                        return key;
                    }
                });
            }
            if (type == "D") {
                area = AddressInfo[values[type-1]];
                $.each(area, function(val, key){
                    if(val === value){
                        return key;
                    }
                });
            }
        }
        return {
            wheels: wheels,
            onBeforeShow: function (dw) {
                s.wheels = wheels;
            },
            onSelect: function () {
                console.log(arguments);
            },
            onChange: function (index, val, wheel) {
                clearTimeout(ttl);
                //TODO:当前选择的省市区类型(0:省, 1：市)
                val = val.split(" ")[index];
                if (parseInt(index) >= 0 && index < s.label.length - 1) {
                    var data, idx = parseInt(index) + 1//(1:市， 2:区);
                    ttl = setTimeout(function () {
                        //TODO:要改变的省市区类型
                        data = genWheels(AddressInfo[areasKey[idx]][val], s.label[idx], idx ,true);
                        //设置要改变的省市区数据
                        wheel.setWheels(idx, data);
                        if(idx < s.label.length - 1){
                            var next = idx + 1, nextVal = data['keys'][0];
                            data = genWheels(AddressInfo[areasKey[next]][nextVal], s.label[next], next ,true);
                            wheel.setWheels(next, data);
                        }
                        // 切换改变动作
                        wheel.changeWheel([idx, idx+1], 0);
                    }, 500);
                }
            },
            onInit:function(){
                var val = $("#area").attr("areaid");
                val = val.split(" ");
                $("[data-val='"+val[0]+"']").attr("aria-selected","true")
                
            }
        }
    };
    var AddressInfo ={
        "Provinces": [
{
"_proviceid":4592,
"_provicename": "北京",
"_provincecode": "4592"
},
{
"_proviceid":4610,
"_provicename": "天津",
"_provincecode": "4610"
},
{
"_proviceid":4628,
"_provicename": "河北省",
"_provincecode": "4628"
},
{
"_proviceid":4812,
"_provicename": "山西省",
"_provincecode": "4812"
},
{
"_proviceid":4943,
"_provicename": "内蒙古自治区",
"_provincecode": "4943"
},
{
"_proviceid":5058,
"_provicename": "辽宁省",
"_provincecode": "5058"
},
{
"_proviceid":5174,
"_provicename": "吉林省",
"_provincecode": "5174"
},
{
"_proviceid":5244,
"_provicename": "黑龙江省",
"_provincecode": "5244"
},
{
"_proviceid":5390,
"_provicename": "上海",
"_provincecode": "5390"
},
{
"_proviceid":5410,
"_provicename": "江苏省",
"_provincecode": "5410"
},
{
"_proviceid":5524,
"_provicename": "浙江省",
"_provincecode": "5524"
},
{
"_proviceid":5626,
"_provicename": "安徽省",
"_provincecode": "5626"
},
{
"_proviceid":5748,
"_provicename": "福建省",
"_provincecode": "5748"
},
{
"_proviceid":5843,
"_provicename": "江西省",
"_provincecode": "5843"
},
{
"_proviceid":5957,
"_provicename": "山东省",
"_provincecode": "5957"
},
{
"_proviceid":6113,
"_provicename": "河南省",
"_provincecode": "6113"
},
{
"_proviceid":6291,
"_provicename": "湖北省",
"_provincecode": "6291"
},
{
"_proviceid":6408,
"_provicename": "湖南省",
"_provincecode": "6408"
},
{
"_proviceid":6545,
"_provicename": "广东省",
"_provincecode": "6545"
},
{
"_proviceid":6751,
"_provicename": "广西壮族自治区",
"_provincecode": "6751"
},
{
"_proviceid":6877,
"_provicename": "海南省",
"_provincecode": "6877"
},
{
"_proviceid":6904,
"_provicename": "重庆",
"_provincecode": "6904"
},
{
"_proviceid":6946,
"_provicename": "四川省",
"_provincecode": "6946"
},
{
"_proviceid":7151,
"_provicename": "贵州省",
"_provincecode": "7151"
},
{
"_proviceid":7249,
"_provicename": "云南省",
"_provincecode": "7249"
},
{
"_proviceid":7395,
"_provicename": "西藏自治区",
"_provincecode": "7395"
},
{
"_proviceid":7477,
"_provicename": "陕西省",
"_provincecode": "7477"
},
{
"_proviceid":7595,
"_provicename": "甘肃省",
"_provincecode": "7595"
},
{
"_proviceid":7696,
"_provicename": "青海省",
"_provincecode": "7696"
},
{
"_proviceid":7748,
"_provicename": "宁夏回族自治区",
"_provincecode": "7748"
},
{
"_proviceid":7776,
"_provicename": "新疆维吾尔自治区",
"_provincecode": "7776"
}
],
"Cities": {
"4592": [
{
"_cityid":4593,
"_proviceid":4592,
"_cityname": "北京市"
}
]
,
"4610": [
{
"_cityid":4611,
"_proviceid":4610,
"_cityname": "天津市"
}
]
,
"4628": [
{
"_cityid":4629,
"_proviceid":4628,
"_cityname": "石家庄市"
}
,{
"_cityid":4653,
"_proviceid":4628,
"_cityname": "唐山市"
}
,{
"_cityid":4668,
"_proviceid":4628,
"_cityname": "秦皇岛市"
}
,{
"_cityid":4676,
"_proviceid":4628,
"_cityname": "邯郸市"
}
,{
"_cityid":4696,
"_proviceid":4628,
"_cityname": "邢台市"
}
,{
"_cityid":4716,
"_proviceid":4628,
"_cityname": "保定市"
}
,{
"_cityid":4742,
"_proviceid":4628,
"_cityname": "张家口市"
}
,{
"_cityid":4760,
"_proviceid":4628,
"_cityname": "承德市"
}
,{
"_cityid":4772,
"_proviceid":4628,
"_cityname": "沧州市"
}
,{
"_cityid":4789,
"_proviceid":4628,
"_cityname": "廊坊市"
}
,{
"_cityid":4800,
"_proviceid":4628,
"_cityname": "衡水市"
}
]
,
"4812": [
{
"_cityid":4813,
"_proviceid":4812,
"_cityname": "太原市"
}
,{
"_cityid":4824,
"_proviceid":4812,
"_cityname": "大同市"
}
,{
"_cityid":4836,
"_proviceid":4812,
"_cityname": "阳泉市"
}
,{
"_cityid":4842,
"_proviceid":4812,
"_cityname": "长治市"
}
,{
"_cityid":4856,
"_proviceid":4812,
"_cityname": "晋城市"
}
,{
"_cityid":4863,
"_proviceid":4812,
"_cityname": "朔州市"
}
,{
"_cityid":4870,
"_proviceid":4812,
"_cityname": "晋中市"
}
,{
"_cityid":4882,
"_proviceid":4812,
"_cityname": "运城市"
}
,{
"_cityid":4896,
"_proviceid":4812,
"_cityname": "忻州市"
}
,{
"_cityid":4911,
"_proviceid":4812,
"_cityname": "临汾市"
}
,{
"_cityid":4929,
"_proviceid":4812,
"_cityname": "吕梁市"
}
]
,
"4943": [
{
"_cityid":4944,
"_proviceid":4943,
"_cityname": "呼和浩特市"
}
,{
"_cityid":4954,
"_proviceid":4943,
"_cityname": "包头市"
}
,{
"_cityid":4964,
"_proviceid":4943,
"_cityname": "乌海市"
}
,{
"_cityid":4968,
"_proviceid":4943,
"_cityname": "赤峰市"
}
,{
"_cityid":4981,
"_proviceid":4943,
"_cityname": "通辽市"
}
,{
"_cityid":4990,
"_proviceid":4943,
"_cityname": "鄂尔多斯市"
}
,{
"_cityid":4999,
"_proviceid":4943,
"_cityname": "呼伦贝尔市"
}
,{
"_cityid":5014,
"_proviceid":4943,
"_cityname": "巴彦淖尔市"
}
,{
"_cityid":5022,
"_proviceid":4943,
"_cityname": "乌兰察布市"
}
,{
"_cityid":5034,
"_proviceid":4943,
"_cityname": "兴安盟"
}
,{
"_cityid":5041,
"_proviceid":4943,
"_cityname": "锡林郭勒盟"
}
,{
"_cityid":5054,
"_proviceid":4943,
"_cityname": "阿拉善盟"
}
]
,
"5058": [
{
"_cityid":5059,
"_proviceid":5058,
"_cityname": "沈阳市"
}
,{
"_cityid":5074,
"_proviceid":5058,
"_cityname": "大连市"
}
,{
"_cityid":5085,
"_proviceid":5058,
"_cityname": "鞍山市"
}
,{
"_cityid":5093,
"_proviceid":5058,
"_cityname": "抚顺市"
}
,{
"_cityid":5101,
"_proviceid":5058,
"_cityname": "本溪市"
}
,{
"_cityid":5108,
"_proviceid":5058,
"_cityname": "丹东市"
}
,{
"_cityid":5115,
"_proviceid":5058,
"_cityname": "锦州市"
}
,{
"_cityid":5123,
"_proviceid":5058,
"_cityname": "营口市"
}
,{
"_cityid":5130,
"_proviceid":5058,
"_cityname": "阜新市"
}
,{
"_cityid":5138,
"_proviceid":5058,
"_cityname": "辽阳市"
}
,{
"_cityid":5146,
"_proviceid":5058,
"_cityname": "盘锦市"
}
,{
"_cityid":5151,
"_proviceid":5058,
"_cityname": "铁岭市"
}
,{
"_cityid":5159,
"_proviceid":5058,
"_cityname": "朝阳市"
}
,{
"_cityid":5167,
"_proviceid":5058,
"_cityname": "葫芦岛市"
}
]
,
"5174": [
{
"_cityid":5175,
"_proviceid":5174,
"_cityname": "长春市"
}
,{
"_cityid":5186,
"_proviceid":5174,
"_cityname": "吉林市"
}
,{
"_cityid":5196,
"_proviceid":5174,
"_cityname": "四平市"
}
,{
"_cityid":5203,
"_proviceid":5174,
"_cityname": "辽源市"
}
,{
"_cityid":5208,
"_proviceid":5174,
"_cityname": "通化市"
}
,{
"_cityid":5216,
"_proviceid":5174,
"_cityname": "白山市"
}
,{
"_cityid":5223,
"_proviceid":5174,
"_cityname": "松原市"
}
,{
"_cityid":5229,
"_proviceid":5174,
"_cityname": "白城市"
}
,{
"_cityid":5235,
"_proviceid":5174,
"_cityname": "延边朝鲜族自治州"
}
]
,
"5244": [
{
"_cityid":5245,
"_proviceid":5244,
"_cityname": "哈尔滨市"
}
,{
"_cityid":5264,
"_proviceid":5244,
"_cityname": "齐齐哈尔市"
}
,{
"_cityid":5281,
"_proviceid":5244,
"_cityname": "鸡西市"
}
,{
"_cityid":5291,
"_proviceid":5244,
"_cityname": "鹤岗市"
}
,{
"_cityid":5300,
"_proviceid":5244,
"_cityname": "双鸭山市"
}
,{
"_cityid":5309,
"_proviceid":5244,
"_cityname": "大庆市"
}
,{
"_cityid":5319,
"_proviceid":5244,
"_cityname": "伊春市"
}
,{
"_cityid":5337,
"_proviceid":5244,
"_cityname": "佳木斯市"
}
,{
"_cityid":5348,
"_proviceid":5244,
"_cityname": "七台河市"
}
,{
"_cityid":5353,
"_proviceid":5244,
"_cityname": "牡丹江市"
}
,{
"_cityid":5364,
"_proviceid":5244,
"_cityname": "黑河市"
}
,{
"_cityid":5371,
"_proviceid":5244,
"_cityname": "绥化市"
}
,{
"_cityid":5382,
"_proviceid":5244,
"_cityname": "大兴安岭地区"
}
]
,
"5390": [
{
"_cityid":5391,
"_proviceid":5390,
"_cityname": "上海市"
}
]
,
"5410": [
{
"_cityid":5411,
"_proviceid":5410,
"_cityname": "南京市"
}
,{
"_cityid":5423,
"_proviceid":5410,
"_cityname": "无锡市"
}
,{
"_cityid":5432,
"_proviceid":5410,
"_cityname": "徐州市"
}
,{
"_cityid":5443,
"_proviceid":5410,
"_cityname": "常州市"
}
,{
"_cityid":5451,
"_proviceid":5410,
"_cityname": "苏州市"
}
,{
"_cityid":5461,
"_proviceid":5410,
"_cityname": "南通市"
}
,{
"_cityid":5470,
"_proviceid":5410,
"_cityname": "连云港市"
}
,{
"_cityid":5478,
"_proviceid":5410,
"_cityname": "淮安市"
}
,{
"_cityid":5487,
"_proviceid":5410,
"_cityname": "盐城市"
}
,{
"_cityid":5497,
"_proviceid":5410,
"_cityname": "扬州市"
}
,{
"_cityid":5504,
"_proviceid":5410,
"_cityname": "镇江市"
}
,{
"_cityid":5511,
"_proviceid":5410,
"_cityname": "泰州市"
}
,{
"_cityid":5518,
"_proviceid":5410,
"_cityname": "宿迁市"
}
]
,
"5524": [
{
"_cityid":5525,
"_proviceid":5524,
"_cityname": "杭州市"
}
,{
"_cityid":5539,
"_proviceid":5524,
"_cityname": "宁波市"
}
,{
"_cityid":5551,
"_proviceid":5524,
"_cityname": "温州市"
}
,{
"_cityid":5563,
"_proviceid":5524,
"_cityname": "嘉兴市"
}
,{
"_cityid":5571,
"_proviceid":5524,
"_cityname": "湖州市"
}
,{
"_cityid":5577,
"_proviceid":5524,
"_cityname": "绍兴市"
}
,{
"_cityid":5584,
"_proviceid":5524,
"_cityname": "金华市"
}
,{
"_cityid":5594,
"_proviceid":5524,
"_cityname": "衢州市"
}
,{
"_cityid":5601,
"_proviceid":5524,
"_cityname": "舟山市"
}
,{
"_cityid":5606,
"_proviceid":5524,
"_cityname": "台州市"
}
,{
"_cityid":5616,
"_proviceid":5524,
"_cityname": "丽水市"
}
]
,
"5626": [
{
"_cityid":5627,
"_proviceid":5626,
"_cityname": "合肥市"
}
,{
"_cityid":5637,
"_proviceid":5626,
"_cityname": "芜湖市"
}
,{
"_cityid":5646,
"_proviceid":5626,
"_cityname": "蚌埠市"
}
,{
"_cityid":5654,
"_proviceid":5626,
"_cityname": "淮南市"
}
,{
"_cityid":5661,
"_proviceid":5626,
"_cityname": "马鞍山市"
}
,{
"_cityid":5668,
"_proviceid":5626,
"_cityname": "淮北市"
}
,{
"_cityid":5673,
"_proviceid":5626,
"_cityname": "铜陵市"
}
,{
"_cityid":5678,
"_proviceid":5626,
"_cityname": "安庆市"
}
,{
"_cityid":5690,
"_proviceid":5626,
"_cityname": "黄山市"
}
,{
"_cityid":5698,
"_proviceid":5626,
"_cityname": "滁州市"
}
,{
"_cityid":5707,
"_proviceid":5626,
"_cityname": "阜阳市"
}
,{
"_cityid":5716,
"_proviceid":5626,
"_cityname": "宿州市"
}
,{
"_cityid":5722,
"_proviceid":5626,
"_cityname": "六安市"
}
,{
"_cityid":5730,
"_proviceid":5626,
"_cityname": "亳州市"
}
,{
"_cityid":5735,
"_proviceid":5626,
"_cityname": "池州市"
}
,{
"_cityid":5740,
"_proviceid":5626,
"_cityname": "宣城市"
}
]
,
"5748": [
{
"_cityid":5749,
"_proviceid":5748,
"_cityname": "福州市"
}
,{
"_cityid":5763,
"_proviceid":5748,
"_cityname": "厦门市"
}
,{
"_cityid":5770,
"_proviceid":5748,
"_cityname": "莆田市"
}
,{
"_cityid":5776,
"_proviceid":5748,
"_cityname": "三明市"
}
,{
"_cityid":5789,
"_proviceid":5748,
"_cityname": "泉州市"
}
,{
"_cityid":5802,
"_proviceid":5748,
"_cityname": "漳州市"
}
,{
"_cityid":5814,
"_proviceid":5748,
"_cityname": "南平市"
}
,{
"_cityid":5825,
"_proviceid":5748,
"_cityname": "龙岩市"
}
,{
"_cityid":5833,
"_proviceid":5748,
"_cityname": "宁德市"
}
]
,
"5843": [
{
"_cityid":5844,
"_proviceid":5843,
"_cityname": "南昌市"
}
,{
"_cityid":5856,
"_proviceid":5843,
"_cityname": "景德镇市"
}
,{
"_cityid":5861,
"_proviceid":5843,
"_cityname": "萍乡市"
}
,{
"_cityid":5867,
"_proviceid":5843,
"_cityname": "九江市"
}
,{
"_cityid":5881,
"_proviceid":5843,
"_cityname": "新余市"
}
,{
"_cityid":5884,
"_proviceid":5843,
"_cityname": "鹰潭市"
}
,{
"_cityid":5888,
"_proviceid":5843,
"_cityname": "赣州市"
}
,{
"_cityid":5907,
"_proviceid":5843,
"_cityname": "吉安市"
}
,{
"_cityid":5921,
"_proviceid":5843,
"_cityname": "宜春市"
}
,{
"_cityid":5932,
"_proviceid":5843,
"_cityname": "抚州市"
}
,{
"_cityid":5944,
"_proviceid":5843,
"_cityname": "上饶市"
}
]
,
"5957": [
{
"_cityid":5958,
"_proviceid":5957,
"_cityname": "济南市"
}
,{
"_cityid":5969,
"_proviceid":5957,
"_cityname": "青岛市"
}
,{
"_cityid":5980,
"_proviceid":5957,
"_cityname": "淄博市"
}
,{
"_cityid":5989,
"_proviceid":5957,
"_cityname": "枣庄市"
}
,{
"_cityid":5996,
"_proviceid":5957,
"_cityname": "东营市"
}
,{
"_cityid":6002,
"_proviceid":5957,
"_cityname": "烟台市"
}
,{
"_cityid":6015,
"_proviceid":5957,
"_cityname": "潍坊市"
}
,{
"_cityid":6028,
"_proviceid":5957,
"_cityname": "济宁市"
}
,{
"_cityid":6041,
"_proviceid":5957,
"_cityname": "泰安市"
}
,{
"_cityid":6048,
"_proviceid":5957,
"_cityname": "威海市"
}
,{
"_cityid":6053,
"_proviceid":5957,
"_cityname": "日照市"
}
,{
"_cityid":6058,
"_proviceid":5957,
"_cityname": "莱芜市"
}
,{
"_cityid":6061,
"_proviceid":5957,
"_cityname": "临沂市"
}
,{
"_cityid":6074,
"_proviceid":5957,
"_cityname": "德州市"
}
,{
"_cityid":6086,
"_proviceid":5957,
"_cityname": "聊城市"
}
,{
"_cityid":6095,
"_proviceid":5957,
"_cityname": "滨州市"
}
,{
"_cityid":6103,
"_proviceid":5957,
"_cityname": "菏泽市"
}
,{
"_cityid":7892,
"_proviceid":5957,
"_cityname": "荷泽市"
}
]
,
"6113": [
{
"_cityid":6114,
"_proviceid":6113,
"_cityname": "郑州市"
}
,{
"_cityid":6128,
"_proviceid":6113,
"_cityname": "开封市"
}
,{
"_cityid":6139,
"_proviceid":6113,
"_cityname": "洛阳市"
}
,{
"_cityid":6155,
"_proviceid":6113,
"_cityname": "平顶山市"
}
,{
"_cityid":6166,
"_proviceid":6113,
"_cityname": "安阳市"
}
,{
"_cityid":6176,
"_proviceid":6113,
"_cityname": "鹤壁市"
}
,{
"_cityid":6182,
"_proviceid":6113,
"_cityname": "新乡市"
}
,{
"_cityid":6195,
"_proviceid":6113,
"_cityname": "焦作市"
}
,{
"_cityid":6206,
"_proviceid":6113,
"_cityname": "濮阳市"
}
,{
"_cityid":6213,
"_proviceid":6113,
"_cityname": "许昌市"
}
,{
"_cityid":6220,
"_proviceid":6113,
"_cityname": "漯河市"
}
,{
"_cityid":6226,
"_proviceid":6113,
"_cityname": "三门峡市"
}
,{
"_cityid":6233,
"_proviceid":6113,
"_cityname": "南阳市"
}
,{
"_cityid":6247,
"_proviceid":6113,
"_cityname": "商丘市"
}
,{
"_cityid":6257,
"_proviceid":6113,
"_cityname": "信阳市"
}
,{
"_cityid":6268,
"_proviceid":6113,
"_cityname": "周口市"
}
,{
"_cityid":6279,
"_proviceid":6113,
"_cityname": "驻马店市"
}
,{
"_cityid":6290,
"_proviceid":6113,
"_cityname": "济源市"
}
]
,
"6291": [
{
"_cityid":6292,
"_proviceid":6291,
"_cityname": "武汉市"
}
,{
"_cityid":6306,
"_proviceid":6291,
"_cityname": "黄石市"
}
,{
"_cityid":6313,
"_proviceid":6291,
"_cityname": "十堰市"
}
,{
"_cityid":6322,
"_proviceid":6291,
"_cityname": "宜昌市"
}
,{
"_cityid":6336,
"_proviceid":6291,
"_cityname": "襄阳市"
}
,{
"_cityid":6346,
"_proviceid":6291,
"_cityname": "鄂州市"
}
,{
"_cityid":6350,
"_proviceid":6291,
"_cityname": "荆门市"
}
,{
"_cityid":6356,
"_proviceid":6291,
"_cityname": "孝感市"
}
,{
"_cityid":6364,
"_proviceid":6291,
"_cityname": "荆州市"
}
,{
"_cityid":6373,
"_proviceid":6291,
"_cityname": "黄冈市"
}
,{
"_cityid":6384,
"_proviceid":6291,
"_cityname": "咸宁市"
}
,{
"_cityid":6391,
"_proviceid":6291,
"_cityname": "随州市"
}
,{
"_cityid":6395,
"_proviceid":6291,
"_cityname": "恩施土家族苗族自治州"
}
,{
"_cityid":6404,
"_proviceid":6291,
"_cityname": "仙桃市"
}
,{
"_cityid":6405,
"_proviceid":6291,
"_cityname": "潜江市"
}
,{
"_cityid":6406,
"_proviceid":6291,
"_cityname": "天门市"
}
,{
"_cityid":6407,
"_proviceid":6291,
"_cityname": "神农架林区"
}
]
,
"6408": [
{
"_cityid":6409,
"_proviceid":6408,
"_cityname": "长沙市"
}
,{
"_cityid":6419,
"_proviceid":6408,
"_cityname": "株洲市"
}
,{
"_cityid":6429,
"_proviceid":6408,
"_cityname": "湘潭市"
}
,{
"_cityid":6435,
"_proviceid":6408,
"_cityname": "衡阳市"
}
,{
"_cityid":6448,
"_proviceid":6408,
"_cityname": "邵阳市"
}
,{
"_cityid":6461,
"_proviceid":6408,
"_cityname": "岳阳市"
}
,{
"_cityid":6471,
"_proviceid":6408,
"_cityname": "常德市"
}
,{
"_cityid":6481,
"_proviceid":6408,
"_cityname": "张家界市"
}
,{
"_cityid":6486,
"_proviceid":6408,
"_cityname": "益阳市"
}
,{
"_cityid":6493,
"_proviceid":6408,
"_cityname": "郴州市"
}
,{
"_cityid":6505,
"_proviceid":6408,
"_cityname": "永州市"
}
,{
"_cityid":6517,
"_proviceid":6408,
"_cityname": "怀化市"
}
,{
"_cityid":6530,
"_proviceid":6408,
"_cityname": "娄底市"
}
,{
"_cityid":6536,
"_proviceid":6408,
"_cityname": "湘西土家族苗族自治州"
}
]
,
"6545": [
{
"_cityid":6546,
"_proviceid":6545,
"_cityname": "广州市"
}
,{
"_cityid":6559,
"_proviceid":6545,
"_cityname": "韶关市"
}
,{
"_cityid":6570,
"_proviceid":6545,
"_cityname": "深圳市"
}
,{
"_cityid":6581,
"_proviceid":6545,
"_cityname": "珠海市"
}
,{
"_cityid":6585,
"_proviceid":6545,
"_cityname": "汕头市"
}
,{
"_cityid":6593,
"_proviceid":6545,
"_cityname": "佛山市"
}
,{
"_cityid":6599,
"_proviceid":6545,
"_cityname": "江门市"
}
,{
"_cityid":6607,
"_proviceid":6545,
"_cityname": "湛江市"
}
,{
"_cityid":6617,
"_proviceid":6545,
"_cityname": "茂名市"
}
,{
"_cityid":6624,
"_proviceid":6545,
"_cityname": "肇庆市"
}
,{
"_cityid":6633,
"_proviceid":6545,
"_cityname": "惠州市"
}
,{
"_cityid":6639,
"_proviceid":6545,
"_cityname": "梅州市"
}
,{
"_cityid":6648,
"_proviceid":6545,
"_cityname": "汕尾市"
}
,{
"_cityid":6654,
"_proviceid":6545,
"_cityname": "河源市"
}
,{
"_cityid":6661,
"_proviceid":6545,
"_cityname": "阳江市"
}
,{
"_cityid":6666,
"_proviceid":6545,
"_cityname": "清远市"
}
,{
"_cityid":6675,
"_proviceid":6545,
"_cityname": "东莞市"
}
,{
"_cityid":6709,
"_proviceid":6545,
"_cityname": "中山市"
}
,{
"_cityid":6735,
"_proviceid":6545,
"_cityname": "潮州市"
}
,{
"_cityid":6739,
"_proviceid":6545,
"_cityname": "揭阳市"
}
,{
"_cityid":6745,
"_proviceid":6545,
"_cityname": "云浮市"
}
]
,
"6751": [
{
"_cityid":6752,
"_proviceid":6751,
"_cityname": "南宁市"
}
,{
"_cityid":6765,
"_proviceid":6751,
"_cityname": "柳州市"
}
,{
"_cityid":6776,
"_proviceid":6751,
"_cityname": "桂林市"
}
,{
"_cityid":6794,
"_proviceid":6751,
"_cityname": "梧州市"
}
,{
"_cityid":6802,
"_proviceid":6751,
"_cityname": "北海市"
}
,{
"_cityid":6807,
"_proviceid":6751,
"_cityname": "防城港市"
}
,{
"_cityid":6812,
"_proviceid":6751,
"_cityname": "钦州市"
}
,{
"_cityid":6817,
"_proviceid":6751,
"_cityname": "贵港市"
}
,{
"_cityid":6823,
"_proviceid":6751,
"_cityname": "玉林市"
}
,{
"_cityid":6831,
"_proviceid":6751,
"_cityname": "百色市"
}
,{
"_cityid":6844,
"_proviceid":6751,
"_cityname": "贺州市"
}
,{
"_cityid":6850,
"_proviceid":6751,
"_cityname": "河池市"
}
,{
"_cityid":6862,
"_proviceid":6751,
"_cityname": "来宾市"
}
,{
"_cityid":6869,
"_proviceid":6751,
"_cityname": "崇左市"
}
]
,
"6877": [
{
"_cityid":6878,
"_proviceid":6877,
"_cityname": "海口市"
}
,{
"_cityid":6883,
"_proviceid":6877,
"_cityname": "三亚市"
}
,{
"_cityid":6889,
"_proviceid":6877,
"_cityname": "三沙市"
}
,{
"_cityid":6893,
"_proviceid":6877,
"_cityname": "五指山市"
}
,{
"_cityid":6894,
"_proviceid":6877,
"_cityname": "琼海市"
}
,{
"_cityid":6895,
"_proviceid":6877,
"_cityname": "文昌市"
}
,{
"_cityid":6896,
"_proviceid":6877,
"_cityname": "万宁市"
}
,{
"_cityid":6897,
"_proviceid":6877,
"_cityname": "东方市"
}
,{
"_cityid":6898,
"_proviceid":6877,
"_cityname": "定安县"
}
,{
"_cityid":6899,
"_proviceid":6877,
"_cityname": "澄迈县"
}
,{
"_cityid":6900,
"_proviceid":6877,
"_cityname": "临高县"
}
,{
"_cityid":6901,
"_proviceid":6877,
"_cityname": "白沙黎族自治县"
}
,{
"_cityid":6902,
"_proviceid":6877,
"_cityname": "陵水黎族自治县"
}
,{
"_cityid":6903,
"_proviceid":6877,
"_cityname": "儋州市"
}
]
,
"6904": [
{
"_cityid":6905,
"_proviceid":6904,
"_cityname": "重庆市"
}
]
,
"6946": [
{
"_cityid":6947,
"_proviceid":6946,
"_cityname": "成都市"
}
,{
"_cityid":6967,
"_proviceid":6946,
"_cityname": "自贡市"
}
,{
"_cityid":6974,
"_proviceid":6946,
"_cityname": "攀枝花市"
}
,{
"_cityid":6980,
"_proviceid":6946,
"_cityname": "泸州市"
}
,{
"_cityid":6988,
"_proviceid":6946,
"_cityname": "德阳市"
}
,{
"_cityid":6995,
"_proviceid":6946,
"_cityname": "绵阳市"
}
,{
"_cityid":7005,
"_proviceid":6946,
"_cityname": "广元市"
}
,{
"_cityid":7013,
"_proviceid":6946,
"_cityname": "遂宁市"
}
,{
"_cityid":7019,
"_proviceid":6946,
"_cityname": "内江市"
}
,{
"_cityid":7025,
"_proviceid":6946,
"_cityname": "乐山市"
}
,{
"_cityid":7037,
"_proviceid":6946,
"_cityname": "南充市"
}
,{
"_cityid":7047,
"_proviceid":6946,
"_cityname": "眉山市"
}
,{
"_cityid":7054,
"_proviceid":6946,
"_cityname": "宜宾市"
}
,{
"_cityid":7065,
"_proviceid":6946,
"_cityname": "广安市"
}
,{
"_cityid":7072,
"_proviceid":6946,
"_cityname": "达州市"
}
,{
"_cityid":7080,
"_proviceid":6946,
"_cityname": "雅安市"
}
,{
"_cityid":7089,
"_proviceid":6946,
"_cityname": "巴中市"
}
,{
"_cityid":7095,
"_proviceid":6946,
"_cityname": "资阳市"
}
,{
"_cityid":7100,
"_proviceid":6946,
"_cityname": "阿坝藏族羌族自治州"
}
,{
"_cityid":7114,
"_proviceid":6946,
"_cityname": "甘孜藏族自治州"
}
,{
"_cityid":7133,
"_proviceid":6946,
"_cityname": "凉山彝族自治州"
}
]
,
"7151": [
{
"_cityid":7152,
"_proviceid":7151,
"_cityname": "贵阳市"
}
,{
"_cityid":7163,
"_proviceid":7151,
"_cityname": "六盘水市"
}
,{
"_cityid":7168,
"_proviceid":7151,
"_cityname": "遵义市"
}
,{
"_cityid":7183,
"_proviceid":7151,
"_cityname": "安顺市"
}
,{
"_cityid":7190,
"_proviceid":7151,
"_cityname": "毕节市"
}
,{
"_cityid":7199,
"_proviceid":7151,
"_cityname": "铜仁市"
}
,{
"_cityid":7210,
"_proviceid":7151,
"_cityname": "黔西南布依族苗族自治州"
}
,{
"_cityid":7219,
"_proviceid":7151,
"_cityname": "黔东南苗族侗族自治州"
}
,{
"_cityid":7236,
"_proviceid":7151,
"_cityname": "黔南布依族苗族自治州"
}
]
,
"7249": [
{
"_cityid":7250,
"_proviceid":7249,
"_cityname": "昆明市"
}
,{
"_cityid":7265,
"_proviceid":7249,
"_cityname": "曲靖市"
}
,{
"_cityid":7275,
"_proviceid":7249,
"_cityname": "玉溪市"
}
,{
"_cityid":7285,
"_proviceid":7249,
"_cityname": "保山市"
}
,{
"_cityid":7291,
"_proviceid":7249,
"_cityname": "昭通市"
}
,{
"_cityid":7303,
"_proviceid":7249,
"_cityname": "丽江市"
}
,{
"_cityid":7309,
"_proviceid":7249,
"_cityname": "普洱市"
}
,{
"_cityid":7320,
"_proviceid":7249,
"_cityname": "临沧市"
}
,{
"_cityid":7329,
"_proviceid":7249,
"_cityname": "楚雄彝族自治州"
}
,{
"_cityid":7340,
"_proviceid":7249,
"_cityname": "红河哈尼族彝族自治州"
}
,{
"_cityid":7354,
"_proviceid":7249,
"_cityname": "文山壮族苗族自治州"
}
,{
"_cityid":7363,
"_proviceid":7249,
"_cityname": "西双版纳傣族自治州"
}
,{
"_cityid":7367,
"_proviceid":7249,
"_cityname": "大理白族自治州"
}
,{
"_cityid":7380,
"_proviceid":7249,
"_cityname": "德宏傣族景颇族自治州"
}
,{
"_cityid":7386,
"_proviceid":7249,
"_cityname": "怒江傈僳族自治州"
}
,{
"_cityid":7391,
"_proviceid":7249,
"_cityname": "迪庆藏族自治州"
}
,{
"_cityid":7891,
"_proviceid":7249,
"_cityname": "思茅市"
}
]
,
"7395": [
{
"_cityid":7396,
"_proviceid":7395,
"_cityname": "拉萨市"
}
,{
"_cityid":7405,
"_proviceid":7395,
"_cityname": "昌都地区"
}
,{
"_cityid":7417,
"_proviceid":7395,
"_cityname": "山南地区"
}
,{
"_cityid":7430,
"_proviceid":7395,
"_cityname": "日喀则地区"
}
,{
"_cityid":7449,
"_proviceid":7395,
"_cityname": "那曲地区"
}
,{
"_cityid":7461,
"_proviceid":7395,
"_cityname": "阿里地区"
}
,{
"_cityid":7469,
"_proviceid":7395,
"_cityname": "林芝地区"
}
]
,
"7477": [
{
"_cityid":7478,
"_proviceid":7477,
"_cityname": "西安市"
}
,{
"_cityid":7492,
"_proviceid":7477,
"_cityname": "铜川市"
}
,{
"_cityid":7497,
"_proviceid":7477,
"_cityname": "宝鸡市"
}
,{
"_cityid":7510,
"_proviceid":7477,
"_cityname": "咸阳市"
}
,{
"_cityid":7525,
"_proviceid":7477,
"_cityname": "渭南市"
}
,{
"_cityid":7537,
"_proviceid":7477,
"_cityname": "延安市"
}
,{
"_cityid":7551,
"_proviceid":7477,
"_cityname": "汉中市"
}
,{
"_cityid":7563,
"_proviceid":7477,
"_cityname": "榆林市"
}
,{
"_cityid":7576,
"_proviceid":7477,
"_cityname": "安康市"
}
,{
"_cityid":7587,
"_proviceid":7477,
"_cityname": "商洛市"
}
]
,
"7595": [
{
"_cityid":7596,
"_proviceid":7595,
"_cityname": "兰州市"
}
,{
"_cityid":7605,
"_proviceid":7595,
"_cityname": "嘉峪关市"
}
,{
"_cityid":7606,
"_proviceid":7595,
"_cityname": "金昌市"
}
,{
"_cityid":7609,
"_proviceid":7595,
"_cityname": "白银市"
}
,{
"_cityid":7615,
"_proviceid":7595,
"_cityname": "天水市"
}
,{
"_cityid":7623,
"_proviceid":7595,
"_cityname": "武威市"
}
,{
"_cityid":7628,
"_proviceid":7595,
"_cityname": "张掖市"
}
,{
"_cityid":7635,
"_proviceid":7595,
"_cityname": "平凉市"
}
,{
"_cityid":7643,
"_proviceid":7595,
"_cityname": "酒泉市"
}
,{
"_cityid":7651,
"_proviceid":7595,
"_cityname": "庆阳市"
}
,{
"_cityid":7660,
"_proviceid":7595,
"_cityname": "定西市"
}
,{
"_cityid":7668,
"_proviceid":7595,
"_cityname": "陇南市"
}
,{
"_cityid":7678,
"_proviceid":7595,
"_cityname": "临夏回族自治州"
}
,{
"_cityid":7687,
"_proviceid":7595,
"_cityname": "甘南藏族自治州"
}
]
,
"7696": [
{
"_cityid":7697,
"_proviceid":7696,
"_cityname": "西宁市"
}
,{
"_cityid":7705,
"_proviceid":7696,
"_cityname": "海东市"
}
,{
"_cityid":7712,
"_proviceid":7696,
"_cityname": "海北藏族自治州"
}
,{
"_cityid":7717,
"_proviceid":7696,
"_cityname": "黄南藏族自治州"
}
,{
"_cityid":7722,
"_proviceid":7696,
"_cityname": "海南藏族自治州"
}
,{
"_cityid":7728,
"_proviceid":7696,
"_cityname": "果洛藏族自治州"
}
,{
"_cityid":7735,
"_proviceid":7696,
"_cityname": "玉树藏族自治州"
}
,{
"_cityid":7742,
"_proviceid":7696,
"_cityname": "海西蒙古族藏族自治州"
}
]
,
"7748": [
{
"_cityid":7749,
"_proviceid":7748,
"_cityname": "银川市"
}
,{
"_cityid":7756,
"_proviceid":7748,
"_cityname": "石嘴山市"
}
,{
"_cityid":7760,
"_proviceid":7748,
"_cityname": "吴忠市"
}
,{
"_cityid":7766,
"_proviceid":7748,
"_cityname": "固原市"
}
,{
"_cityid":7772,
"_proviceid":7748,
"_cityname": "中卫市"
}
]
,
"7776": [
{
"_cityid":7777,
"_proviceid":7776,
"_cityname": "乌鲁木齐市"
}
,{
"_cityid":7786,
"_proviceid":7776,
"_cityname": "克拉玛依市"
}
,{
"_cityid":7791,
"_proviceid":7776,
"_cityname": "吐鲁番地区"
}
,{
"_cityid":7795,
"_proviceid":7776,
"_cityname": "哈密地区"
}
,{
"_cityid":7799,
"_proviceid":7776,
"_cityname": "昌吉回族自治州"
}
,{
"_cityid":7808,
"_proviceid":7776,
"_cityname": "博尔塔拉蒙古自治州"
}
,{
"_cityid":7813,
"_proviceid":7776,
"_cityname": "巴音郭楞蒙古自治州"
}
,{
"_cityid":7823,
"_proviceid":7776,
"_cityname": "阿克苏地区"
}
,{
"_cityid":7833,
"_proviceid":7776,
"_cityname": "克孜勒苏柯尔克孜自治州"
}
,{
"_cityid":7838,
"_proviceid":7776,
"_cityname": "喀什地区"
}
,{
"_cityid":7851,
"_proviceid":7776,
"_cityname": "和田地区"
}
,{
"_cityid":7860,
"_proviceid":7776,
"_cityname": "伊犁哈萨克自治州"
}
,{
"_cityid":7871,
"_proviceid":7776,
"_cityname": "塔城地区"
}
,{
"_cityid":7879,
"_proviceid":7776,
"_cityname": "阿勒泰地区"
}
,{
"_cityid":7887,
"_proviceid":7776,
"_cityname": "石河子市"
}
,{
"_cityid":7888,
"_proviceid":7776,
"_cityname": "阿拉尔市"
}
,{
"_cityid":7889,
"_proviceid":7776,
"_cityname": "图木舒克市"
}
]
}
,"Districts": {
"4593": [
{
"_districtid":4594,
"_cityid":4593,
"_districtname": "东城区"
}
,{
"_districtid":4595,
"_cityid":4593,
"_districtname": "西城区"
}
,{
"_districtid":4596,
"_cityid":4593,
"_districtname": "朝阳区"
}
,{
"_districtid":4597,
"_cityid":4593,
"_districtname": "丰台区"
}
,{
"_districtid":4598,
"_cityid":4593,
"_districtname": "石景山区"
}
,{
"_districtid":4599,
"_cityid":4593,
"_districtname": "海淀区"
}
,{
"_districtid":4600,
"_cityid":4593,
"_districtname": "门头沟区"
}
,{
"_districtid":4601,
"_cityid":4593,
"_districtname": "房山区"
}
,{
"_districtid":4602,
"_cityid":4593,
"_districtname": "通州区"
}
,{
"_districtid":4603,
"_cityid":4593,
"_districtname": "顺义区"
}
,{
"_districtid":4604,
"_cityid":4593,
"_districtname": "昌平区"
}
,{
"_districtid":4605,
"_cityid":4593,
"_districtname": "大兴区"
}
,{
"_districtid":4606,
"_cityid":4593,
"_districtname": "怀柔区"
}
,{
"_districtid":4607,
"_cityid":4593,
"_districtname": "平谷区"
}
,{
"_districtid":4608,
"_cityid":4593,
"_districtname": "密云县"
}
,{
"_districtid":4609,
"_cityid":4593,
"_districtname": "延庆县"
}
]
,
"4611": [
{
"_districtid":4612,
"_cityid":4611,
"_districtname": "和平区"
}
,{
"_districtid":4613,
"_cityid":4611,
"_districtname": "河东区"
}
,{
"_districtid":4614,
"_cityid":4611,
"_districtname": "河西区"
}
,{
"_districtid":4615,
"_cityid":4611,
"_districtname": "南开区"
}
,{
"_districtid":4616,
"_cityid":4611,
"_districtname": "河北区"
}
,{
"_districtid":4617,
"_cityid":4611,
"_districtname": "红桥区"
}
,{
"_districtid":4618,
"_cityid":4611,
"_districtname": "东丽区"
}
,{
"_districtid":4619,
"_cityid":4611,
"_districtname": "西青区"
}
,{
"_districtid":4620,
"_cityid":4611,
"_districtname": "津南区"
}
,{
"_districtid":4621,
"_cityid":4611,
"_districtname": "北辰区"
}
,{
"_districtid":4622,
"_cityid":4611,
"_districtname": "武清区"
}
,{
"_districtid":4623,
"_cityid":4611,
"_districtname": "宝坻区"
}
,{
"_districtid":4624,
"_cityid":4611,
"_districtname": "滨海新区"
}
,{
"_districtid":4625,
"_cityid":4611,
"_districtname": "宁河县"
}
,{
"_districtid":4626,
"_cityid":4611,
"_districtname": "静海县"
}
,{
"_districtid":4627,
"_cityid":4611,
"_districtname": "蓟县"
}
]
,
"4629": [
{
"_districtid":4630,
"_cityid":4629,
"_districtname": "长安区"
}
,{
"_districtid":4631,
"_cityid":4629,
"_districtname": "桥东区"
}
,{
"_districtid":4632,
"_cityid":4629,
"_districtname": "桥西区"
}
,{
"_districtid":4633,
"_cityid":4629,
"_districtname": "新华区"
}
,{
"_districtid":4634,
"_cityid":4629,
"_districtname": "井陉矿区"
}
,{
"_districtid":4635,
"_cityid":4629,
"_districtname": "裕华区"
}
,{
"_districtid":4636,
"_cityid":4629,
"_districtname": "井陉县"
}
,{
"_districtid":4637,
"_cityid":4629,
"_districtname": "正定县"
}
,{
"_districtid":4638,
"_cityid":4629,
"_districtname": "栾城县"
}
,{
"_districtid":4639,
"_cityid":4629,
"_districtname": "行唐县"
}
,{
"_districtid":4640,
"_cityid":4629,
"_districtname": "灵寿县"
}
,{
"_districtid":4641,
"_cityid":4629,
"_districtname": "高邑县"
}
,{
"_districtid":4642,
"_cityid":4629,
"_districtname": "深泽县"
}
,{
"_districtid":4643,
"_cityid":4629,
"_districtname": "赞皇县"
}
,{
"_districtid":4644,
"_cityid":4629,
"_districtname": "无极县"
}
,{
"_districtid":4645,
"_cityid":4629,
"_districtname": "平山县"
}
,{
"_districtid":4646,
"_cityid":4629,
"_districtname": "元氏县"
}
,{
"_districtid":4647,
"_cityid":4629,
"_districtname": "赵县"
}
,{
"_districtid":4648,
"_cityid":4629,
"_districtname": "辛集市"
}
,{
"_districtid":4649,
"_cityid":4629,
"_districtname": "藁城市"
}
,{
"_districtid":4650,
"_cityid":4629,
"_districtname": "晋州市"
}
,{
"_districtid":4651,
"_cityid":4629,
"_districtname": "新乐市"
}
,{
"_districtid":4652,
"_cityid":4629,
"_districtname": "鹿泉市"
}
]
,
"4653": [
{
"_districtid":4654,
"_cityid":4653,
"_districtname": "路南区"
}
,{
"_districtid":4655,
"_cityid":4653,
"_districtname": "路北区"
}
,{
"_districtid":4656,
"_cityid":4653,
"_districtname": "古冶区"
}
,{
"_districtid":4657,
"_cityid":4653,
"_districtname": "开平区"
}
,{
"_districtid":4658,
"_cityid":4653,
"_districtname": "丰南区"
}
,{
"_districtid":4659,
"_cityid":4653,
"_districtname": "丰润区"
}
,{
"_districtid":4660,
"_cityid":4653,
"_districtname": "曹妃甸区"
}
,{
"_districtid":4661,
"_cityid":4653,
"_districtname": "滦县"
}
,{
"_districtid":4662,
"_cityid":4653,
"_districtname": "滦南县"
}
,{
"_districtid":4663,
"_cityid":4653,
"_districtname": "乐亭县"
}
,{
"_districtid":4664,
"_cityid":4653,
"_districtname": "迁西县"
}
,{
"_districtid":4665,
"_cityid":4653,
"_districtname": "玉田县"
}
,{
"_districtid":4666,
"_cityid":4653,
"_districtname": "遵化市"
}
,{
"_districtid":4667,
"_cityid":4653,
"_districtname": "迁安市"
}
]
,
"4668": [
{
"_districtid":4669,
"_cityid":4668,
"_districtname": "海港区"
}
,{
"_districtid":4670,
"_cityid":4668,
"_districtname": "山海关区"
}
,{
"_districtid":4671,
"_cityid":4668,
"_districtname": "北戴河区"
}
,{
"_districtid":4672,
"_cityid":4668,
"_districtname": "青龙满族自治县"
}
,{
"_districtid":4673,
"_cityid":4668,
"_districtname": "昌黎县"
}
,{
"_districtid":4674,
"_cityid":4668,
"_districtname": "抚宁县"
}
,{
"_districtid":4675,
"_cityid":4668,
"_districtname": "卢龙县"
}
]
,
"4676": [
{
"_districtid":4677,
"_cityid":4676,
"_districtname": "邯山区"
}
,{
"_districtid":4678,
"_cityid":4676,
"_districtname": "丛台区"
}
,{
"_districtid":4679,
"_cityid":4676,
"_districtname": "复兴区"
}
,{
"_districtid":4680,
"_cityid":4676,
"_districtname": "峰峰矿区"
}
,{
"_districtid":4681,
"_cityid":4676,
"_districtname": "邯郸县"
}
,{
"_districtid":4682,
"_cityid":4676,
"_districtname": "临漳县"
}
,{
"_districtid":4683,
"_cityid":4676,
"_districtname": "成安县"
}
,{
"_districtid":4684,
"_cityid":4676,
"_districtname": "大名县"
}
,{
"_districtid":4685,
"_cityid":4676,
"_districtname": "涉县"
}
,{
"_districtid":4686,
"_cityid":4676,
"_districtname": "磁县"
}
,{
"_districtid":4687,
"_cityid":4676,
"_districtname": "肥乡县"
}
,{
"_districtid":4688,
"_cityid":4676,
"_districtname": "永年县"
}
,{
"_districtid":4689,
"_cityid":4676,
"_districtname": "邱县"
}
,{
"_districtid":4690,
"_cityid":4676,
"_districtname": "鸡泽县"
}
,{
"_districtid":4691,
"_cityid":4676,
"_districtname": "广平县"
}
,{
"_districtid":4692,
"_cityid":4676,
"_districtname": "馆陶县"
}
,{
"_districtid":4693,
"_cityid":4676,
"_districtname": "魏县"
}
,{
"_districtid":4694,
"_cityid":4676,
"_districtname": "曲周县"
}
,{
"_districtid":4695,
"_cityid":4676,
"_districtname": "武安市"
}
]
,
"4696": [
{
"_districtid":4697,
"_cityid":4696,
"_districtname": "桥东区"
}
,{
"_districtid":4698,
"_cityid":4696,
"_districtname": "桥西区"
}
,{
"_districtid":4699,
"_cityid":4696,
"_districtname": "邢台县"
}
,{
"_districtid":4700,
"_cityid":4696,
"_districtname": "临城县"
}
,{
"_districtid":4701,
"_cityid":4696,
"_districtname": "内丘县"
}
,{
"_districtid":4702,
"_cityid":4696,
"_districtname": "柏乡县"
}
,{
"_districtid":4703,
"_cityid":4696,
"_districtname": "隆尧县"
}
,{
"_districtid":4704,
"_cityid":4696,
"_districtname": "任县"
}
,{
"_districtid":4705,
"_cityid":4696,
"_districtname": "南和县"
}
,{
"_districtid":4706,
"_cityid":4696,
"_districtname": "宁晋县"
}
,{
"_districtid":4707,
"_cityid":4696,
"_districtname": "巨鹿县"
}
,{
"_districtid":4708,
"_cityid":4696,
"_districtname": "新河县"
}
,{
"_districtid":4709,
"_cityid":4696,
"_districtname": "广宗县"
}
,{
"_districtid":4710,
"_cityid":4696,
"_districtname": "平乡县"
}
,{
"_districtid":4711,
"_cityid":4696,
"_districtname": "威县"
}
,{
"_districtid":4712,
"_cityid":4696,
"_districtname": "清河县"
}
,{
"_districtid":4713,
"_cityid":4696,
"_districtname": "临西县"
}
,{
"_districtid":4714,
"_cityid":4696,
"_districtname": "南宫市"
}
,{
"_districtid":4715,
"_cityid":4696,
"_districtname": "沙河市"
}
]
,
"4716": [
{
"_districtid":4717,
"_cityid":4716,
"_districtname": "新市区"
}
,{
"_districtid":4718,
"_cityid":4716,
"_districtname": "北市区"
}
,{
"_districtid":4719,
"_cityid":4716,
"_districtname": "南市区"
}
,{
"_districtid":4720,
"_cityid":4716,
"_districtname": "满城县"
}
,{
"_districtid":4721,
"_cityid":4716,
"_districtname": "清苑县"
}
,{
"_districtid":4722,
"_cityid":4716,
"_districtname": "涞水县"
}
,{
"_districtid":4723,
"_cityid":4716,
"_districtname": "阜平县"
}
,{
"_districtid":4724,
"_cityid":4716,
"_districtname": "徐水县"
}
,{
"_districtid":4725,
"_cityid":4716,
"_districtname": "定兴县"
}
,{
"_districtid":4726,
"_cityid":4716,
"_districtname": "唐县"
}
,{
"_districtid":4727,
"_cityid":4716,
"_districtname": "高阳县"
}
,{
"_districtid":4728,
"_cityid":4716,
"_districtname": "容城县"
}
,{
"_districtid":4729,
"_cityid":4716,
"_districtname": "涞源县"
}
,{
"_districtid":4730,
"_cityid":4716,
"_districtname": "望都县"
}
,{
"_districtid":4731,
"_cityid":4716,
"_districtname": "安新县"
}
,{
"_districtid":4732,
"_cityid":4716,
"_districtname": "易县"
}
,{
"_districtid":4733,
"_cityid":4716,
"_districtname": "曲阳县"
}
,{
"_districtid":4734,
"_cityid":4716,
"_districtname": "蠡县"
}
,{
"_districtid":4735,
"_cityid":4716,
"_districtname": "顺平县"
}
,{
"_districtid":4736,
"_cityid":4716,
"_districtname": "博野县"
}
,{
"_districtid":4737,
"_cityid":4716,
"_districtname": "雄县"
}
,{
"_districtid":4738,
"_cityid":4716,
"_districtname": "涿州市"
}
,{
"_districtid":4739,
"_cityid":4716,
"_districtname": "定州市"
}
,{
"_districtid":4740,
"_cityid":4716,
"_districtname": "安国市"
}
,{
"_districtid":4741,
"_cityid":4716,
"_districtname": "高碑店市"
}
]
,
"4742": [
{
"_districtid":4743,
"_cityid":4742,
"_districtname": "桥东区"
}
,{
"_districtid":4744,
"_cityid":4742,
"_districtname": "桥西区"
}
,{
"_districtid":4745,
"_cityid":4742,
"_districtname": "宣化区"
}
,{
"_districtid":4746,
"_cityid":4742,
"_districtname": "下花园区"
}
,{
"_districtid":4747,
"_cityid":4742,
"_districtname": "宣化县"
}
,{
"_districtid":4748,
"_cityid":4742,
"_districtname": "张北县"
}
,{
"_districtid":4749,
"_cityid":4742,
"_districtname": "康保县"
}
,{
"_districtid":4750,
"_cityid":4742,
"_districtname": "沽源县"
}
,{
"_districtid":4751,
"_cityid":4742,
"_districtname": "尚义县"
}
,{
"_districtid":4752,
"_cityid":4742,
"_districtname": "蔚县"
}
,{
"_districtid":4753,
"_cityid":4742,
"_districtname": "阳原县"
}
,{
"_districtid":4754,
"_cityid":4742,
"_districtname": "怀安县"
}
,{
"_districtid":4755,
"_cityid":4742,
"_districtname": "万全县"
}
,{
"_districtid":4756,
"_cityid":4742,
"_districtname": "怀来县"
}
,{
"_districtid":4757,
"_cityid":4742,
"_districtname": "涿鹿县"
}
,{
"_districtid":4758,
"_cityid":4742,
"_districtname": "赤城县"
}
,{
"_districtid":4759,
"_cityid":4742,
"_districtname": "崇礼县"
}
]
,
"4760": [
{
"_districtid":4761,
"_cityid":4760,
"_districtname": "双桥区"
}
,{
"_districtid":4762,
"_cityid":4760,
"_districtname": "双滦区"
}
,{
"_districtid":4763,
"_cityid":4760,
"_districtname": "鹰手营子矿区"
}
,{
"_districtid":4764,
"_cityid":4760,
"_districtname": "承德县"
}
,{
"_districtid":4765,
"_cityid":4760,
"_districtname": "兴隆县"
}
,{
"_districtid":4766,
"_cityid":4760,
"_districtname": "平泉县"
}
,{
"_districtid":4767,
"_cityid":4760,
"_districtname": "滦平县"
}
,{
"_districtid":4768,
"_cityid":4760,
"_districtname": "隆化县"
}
,{
"_districtid":4769,
"_cityid":4760,
"_districtname": "丰宁满族自治县"
}
,{
"_districtid":4770,
"_cityid":4760,
"_districtname": "宽城满族自治县"
}
,{
"_districtid":4771,
"_cityid":4760,
"_districtname": "围场满族蒙古族自治县"
}
]
,
"4772": [
{
"_districtid":4773,
"_cityid":4772,
"_districtname": "新华区"
}
,{
"_districtid":4774,
"_cityid":4772,
"_districtname": "运河区"
}
,{
"_districtid":4775,
"_cityid":4772,
"_districtname": "沧县"
}
,{
"_districtid":4776,
"_cityid":4772,
"_districtname": "青县"
}
,{
"_districtid":4777,
"_cityid":4772,
"_districtname": "东光县"
}
,{
"_districtid":4778,
"_cityid":4772,
"_districtname": "海兴县"
}
,{
"_districtid":4779,
"_cityid":4772,
"_districtname": "盐山县"
}
,{
"_districtid":4780,
"_cityid":4772,
"_districtname": "肃宁县"
}
,{
"_districtid":4781,
"_cityid":4772,
"_districtname": "南皮县"
}
,{
"_districtid":4782,
"_cityid":4772,
"_districtname": "吴桥县"
}
,{
"_districtid":4783,
"_cityid":4772,
"_districtname": "献县"
}
,{
"_districtid":4784,
"_cityid":4772,
"_districtname": "孟村回族自治县"
}
,{
"_districtid":4785,
"_cityid":4772,
"_districtname": "泊头市"
}
,{
"_districtid":4786,
"_cityid":4772,
"_districtname": "任丘市"
}
,{
"_districtid":4787,
"_cityid":4772,
"_districtname": "黄骅市"
}
,{
"_districtid":4788,
"_cityid":4772,
"_districtname": "河间市"
}
]
,
"4789": [
{
"_districtid":4790,
"_cityid":4789,
"_districtname": "安次区"
}
,{
"_districtid":4791,
"_cityid":4789,
"_districtname": "广阳区"
}
,{
"_districtid":4792,
"_cityid":4789,
"_districtname": "固安县"
}
,{
"_districtid":4793,
"_cityid":4789,
"_districtname": "永清县"
}
,{
"_districtid":4794,
"_cityid":4789,
"_districtname": "香河县"
}
,{
"_districtid":4795,
"_cityid":4789,
"_districtname": "大城县"
}
,{
"_districtid":4796,
"_cityid":4789,
"_districtname": "文安县"
}
,{
"_districtid":4797,
"_cityid":4789,
"_districtname": "大厂回族自治县"
}
,{
"_districtid":4798,
"_cityid":4789,
"_districtname": "霸州市"
}
,{
"_districtid":4799,
"_cityid":4789,
"_districtname": "三河市"
}
]
,
"4800": [
{
"_districtid":4801,
"_cityid":4800,
"_districtname": "桃城区"
}
,{
"_districtid":4802,
"_cityid":4800,
"_districtname": "枣强县"
}
,{
"_districtid":4803,
"_cityid":4800,
"_districtname": "武邑县"
}
,{
"_districtid":4804,
"_cityid":4800,
"_districtname": "武强县"
}
,{
"_districtid":4805,
"_cityid":4800,
"_districtname": "饶阳县"
}
,{
"_districtid":4806,
"_cityid":4800,
"_districtname": "安平县"
}
,{
"_districtid":4807,
"_cityid":4800,
"_districtname": "故城县"
}
,{
"_districtid":4808,
"_cityid":4800,
"_districtname": "景县"
}
,{
"_districtid":4809,
"_cityid":4800,
"_districtname": "阜城县"
}
,{
"_districtid":4810,
"_cityid":4800,
"_districtname": "冀州市"
}
,{
"_districtid":4811,
"_cityid":4800,
"_districtname": "深州市"
}
]
,
"4813": [
{
"_districtid":4814,
"_cityid":4813,
"_districtname": "小店区"
}
,{
"_districtid":4815,
"_cityid":4813,
"_districtname": "迎泽区"
}
,{
"_districtid":4816,
"_cityid":4813,
"_districtname": "杏花岭区"
}
,{
"_districtid":4817,
"_cityid":4813,
"_districtname": "尖草坪区"
}
,{
"_districtid":4818,
"_cityid":4813,
"_districtname": "万柏林区"
}
,{
"_districtid":4819,
"_cityid":4813,
"_districtname": "晋源区"
}
,{
"_districtid":4820,
"_cityid":4813,
"_districtname": "清徐县"
}
,{
"_districtid":4821,
"_cityid":4813,
"_districtname": "阳曲县"
}
,{
"_districtid":4822,
"_cityid":4813,
"_districtname": "娄烦县"
}
,{
"_districtid":4823,
"_cityid":4813,
"_districtname": "古交市"
}
]
,
"4824": [
{
"_districtid":4825,
"_cityid":4824,
"_districtname": "城区"
}
,{
"_districtid":4826,
"_cityid":4824,
"_districtname": "矿区"
}
,{
"_districtid":4827,
"_cityid":4824,
"_districtname": "南郊区"
}
,{
"_districtid":4828,
"_cityid":4824,
"_districtname": "新荣区"
}
,{
"_districtid":4829,
"_cityid":4824,
"_districtname": "阳高县"
}
,{
"_districtid":4830,
"_cityid":4824,
"_districtname": "天镇县"
}
,{
"_districtid":4831,
"_cityid":4824,
"_districtname": "广灵县"
}
,{
"_districtid":4832,
"_cityid":4824,
"_districtname": "灵丘县"
}
,{
"_districtid":4833,
"_cityid":4824,
"_districtname": "浑源县"
}
,{
"_districtid":4834,
"_cityid":4824,
"_districtname": "左云县"
}
,{
"_districtid":4835,
"_cityid":4824,
"_districtname": "大同县"
}
]
,
"4836": [
{
"_districtid":4837,
"_cityid":4836,
"_districtname": "城区"
}
,{
"_districtid":4838,
"_cityid":4836,
"_districtname": "矿区"
}
,{
"_districtid":4839,
"_cityid":4836,
"_districtname": "郊区"
}
,{
"_districtid":4840,
"_cityid":4836,
"_districtname": "平定县"
}
,{
"_districtid":4841,
"_cityid":4836,
"_districtname": "盂县"
}
]
,
"4842": [
{
"_districtid":4843,
"_cityid":4842,
"_districtname": "城区"
}
,{
"_districtid":4844,
"_cityid":4842,
"_districtname": "郊区"
}
,{
"_districtid":4845,
"_cityid":4842,
"_districtname": "长治县"
}
,{
"_districtid":4846,
"_cityid":4842,
"_districtname": "襄垣县"
}
,{
"_districtid":4847,
"_cityid":4842,
"_districtname": "屯留县"
}
,{
"_districtid":4848,
"_cityid":4842,
"_districtname": "平顺县"
}
,{
"_districtid":4849,
"_cityid":4842,
"_districtname": "黎城县"
}
,{
"_districtid":4850,
"_cityid":4842,
"_districtname": "壶关县"
}
,{
"_districtid":4851,
"_cityid":4842,
"_districtname": "长子县"
}
,{
"_districtid":4852,
"_cityid":4842,
"_districtname": "武乡县"
}
,{
"_districtid":4853,
"_cityid":4842,
"_districtname": "沁县"
}
,{
"_districtid":4854,
"_cityid":4842,
"_districtname": "沁源县"
}
,{
"_districtid":4855,
"_cityid":4842,
"_districtname": "潞城市"
}
]
,
"4856": [
{
"_districtid":4857,
"_cityid":4856,
"_districtname": "城区"
}
,{
"_districtid":4858,
"_cityid":4856,
"_districtname": "沁水县"
}
,{
"_districtid":4859,
"_cityid":4856,
"_districtname": "阳城县"
}
,{
"_districtid":4860,
"_cityid":4856,
"_districtname": "陵川县"
}
,{
"_districtid":4861,
"_cityid":4856,
"_districtname": "泽州县"
}
,{
"_districtid":4862,
"_cityid":4856,
"_districtname": "高平市"
}
]
,
"4863": [
{
"_districtid":4864,
"_cityid":4863,
"_districtname": "朔城区"
}
,{
"_districtid":4865,
"_cityid":4863,
"_districtname": "平鲁区"
}
,{
"_districtid":4866,
"_cityid":4863,
"_districtname": "山阴县"
}
,{
"_districtid":4867,
"_cityid":4863,
"_districtname": "应县"
}
,{
"_districtid":4868,
"_cityid":4863,
"_districtname": "右玉县"
}
,{
"_districtid":4869,
"_cityid":4863,
"_districtname": "怀仁县"
}
]
,
"4870": [
{
"_districtid":4871,
"_cityid":4870,
"_districtname": "榆次区"
}
,{
"_districtid":4872,
"_cityid":4870,
"_districtname": "榆社县"
}
,{
"_districtid":4873,
"_cityid":4870,
"_districtname": "左权县"
}
,{
"_districtid":4874,
"_cityid":4870,
"_districtname": "和顺县"
}
,{
"_districtid":4875,
"_cityid":4870,
"_districtname": "昔阳县"
}
,{
"_districtid":4876,
"_cityid":4870,
"_districtname": "寿阳县"
}
,{
"_districtid":4877,
"_cityid":4870,
"_districtname": "太谷县"
}
,{
"_districtid":4878,
"_cityid":4870,
"_districtname": "祁县"
}
,{
"_districtid":4879,
"_cityid":4870,
"_districtname": "平遥县"
}
,{
"_districtid":4880,
"_cityid":4870,
"_districtname": "灵石县"
}
,{
"_districtid":4881,
"_cityid":4870,
"_districtname": "介休市"
}
]
,
"4882": [
{
"_districtid":4883,
"_cityid":4882,
"_districtname": "盐湖区"
}
,{
"_districtid":4884,
"_cityid":4882,
"_districtname": "临猗县"
}
,{
"_districtid":4885,
"_cityid":4882,
"_districtname": "万荣县"
}
,{
"_districtid":4886,
"_cityid":4882,
"_districtname": "闻喜县"
}
,{
"_districtid":4887,
"_cityid":4882,
"_districtname": "稷山县"
}
,{
"_districtid":4888,
"_cityid":4882,
"_districtname": "新绛县"
}
,{
"_districtid":4889,
"_cityid":4882,
"_districtname": "绛县"
}
,{
"_districtid":4890,
"_cityid":4882,
"_districtname": "垣曲县"
}
,{
"_districtid":4891,
"_cityid":4882,
"_districtname": "夏县"
}
,{
"_districtid":4892,
"_cityid":4882,
"_districtname": "平陆县"
}
,{
"_districtid":4893,
"_cityid":4882,
"_districtname": "芮城县"
}
,{
"_districtid":4894,
"_cityid":4882,
"_districtname": "永济市"
}
,{
"_districtid":4895,
"_cityid":4882,
"_districtname": "河津市"
}
]
,
"4896": [
{
"_districtid":4897,
"_cityid":4896,
"_districtname": "忻府区"
}
,{
"_districtid":4898,
"_cityid":4896,
"_districtname": "定襄县"
}
,{
"_districtid":4899,
"_cityid":4896,
"_districtname": "五台县"
}
,{
"_districtid":4900,
"_cityid":4896,
"_districtname": "代县"
}
,{
"_districtid":4901,
"_cityid":4896,
"_districtname": "繁峙县"
}
,{
"_districtid":4902,
"_cityid":4896,
"_districtname": "宁武县"
}
,{
"_districtid":4903,
"_cityid":4896,
"_districtname": "静乐县"
}
,{
"_districtid":4904,
"_cityid":4896,
"_districtname": "神池县"
}
,{
"_districtid":4905,
"_cityid":4896,
"_districtname": "五寨县"
}
,{
"_districtid":4906,
"_cityid":4896,
"_districtname": "岢岚县"
}
,{
"_districtid":4907,
"_cityid":4896,
"_districtname": "河曲县"
}
,{
"_districtid":4908,
"_cityid":4896,
"_districtname": "保德县"
}
,{
"_districtid":4909,
"_cityid":4896,
"_districtname": "偏关县"
}
,{
"_districtid":4910,
"_cityid":4896,
"_districtname": "原平市"
}
]
,
"4911": [
{
"_districtid":4912,
"_cityid":4911,
"_districtname": "尧都区"
}
,{
"_districtid":4913,
"_cityid":4911,
"_districtname": "曲沃县"
}
,{
"_districtid":4914,
"_cityid":4911,
"_districtname": "翼城县"
}
,{
"_districtid":4915,
"_cityid":4911,
"_districtname": "襄汾县"
}
,{
"_districtid":4916,
"_cityid":4911,
"_districtname": "洪洞县"
}
,{
"_districtid":4917,
"_cityid":4911,
"_districtname": "古县"
}
,{
"_districtid":4918,
"_cityid":4911,
"_districtname": "安泽县"
}
,{
"_districtid":4919,
"_cityid":4911,
"_districtname": "浮山县"
}
,{
"_districtid":4920,
"_cityid":4911,
"_districtname": "吉县"
}
,{
"_districtid":4921,
"_cityid":4911,
"_districtname": "乡宁县"
}
,{
"_districtid":4922,
"_cityid":4911,
"_districtname": "大宁县"
}
,{
"_districtid":4923,
"_cityid":4911,
"_districtname": "隰县"
}
,{
"_districtid":4924,
"_cityid":4911,
"_districtname": "永和县"
}
,{
"_districtid":4925,
"_cityid":4911,
"_districtname": "蒲县"
}
,{
"_districtid":4926,
"_cityid":4911,
"_districtname": "汾西县"
}
,{
"_districtid":4927,
"_cityid":4911,
"_districtname": "侯马市"
}
,{
"_districtid":4928,
"_cityid":4911,
"_districtname": "霍州市"
}
]
,
"4929": [
{
"_districtid":4930,
"_cityid":4929,
"_districtname": "离石区"
}
,{
"_districtid":4931,
"_cityid":4929,
"_districtname": "文水县"
}
,{
"_districtid":4932,
"_cityid":4929,
"_districtname": "交城县"
}
,{
"_districtid":4933,
"_cityid":4929,
"_districtname": "兴县"
}
,{
"_districtid":4934,
"_cityid":4929,
"_districtname": "临县"
}
,{
"_districtid":4935,
"_cityid":4929,
"_districtname": "柳林县"
}
,{
"_districtid":4936,
"_cityid":4929,
"_districtname": "石楼县"
}
,{
"_districtid":4937,
"_cityid":4929,
"_districtname": "岚县"
}
,{
"_districtid":4938,
"_cityid":4929,
"_districtname": "方山县"
}
,{
"_districtid":4939,
"_cityid":4929,
"_districtname": "中阳县"
}
,{
"_districtid":4940,
"_cityid":4929,
"_districtname": "交口县"
}
,{
"_districtid":4941,
"_cityid":4929,
"_districtname": "孝义市"
}
,{
"_districtid":4942,
"_cityid":4929,
"_districtname": "汾阳市"
}
]
,
"4944": [
{
"_districtid":4945,
"_cityid":4944,
"_districtname": "新城区"
}
,{
"_districtid":4946,
"_cityid":4944,
"_districtname": "回民区"
}
,{
"_districtid":4947,
"_cityid":4944,
"_districtname": "玉泉区"
}
,{
"_districtid":4948,
"_cityid":4944,
"_districtname": "赛罕区"
}
,{
"_districtid":4949,
"_cityid":4944,
"_districtname": "土默特左旗"
}
,{
"_districtid":4950,
"_cityid":4944,
"_districtname": "托克托县"
}
,{
"_districtid":4951,
"_cityid":4944,
"_districtname": "和林格尔县"
}
,{
"_districtid":4952,
"_cityid":4944,
"_districtname": "清水河县"
}
,{
"_districtid":4953,
"_cityid":4944,
"_districtname": "武川县"
}
]
,
"4954": [
{
"_districtid":4955,
"_cityid":4954,
"_districtname": "东河区"
}
,{
"_districtid":4956,
"_cityid":4954,
"_districtname": "昆都仑区"
}
,{
"_districtid":4957,
"_cityid":4954,
"_districtname": "青山区"
}
,{
"_districtid":4958,
"_cityid":4954,
"_districtname": "石拐区"
}
,{
"_districtid":4959,
"_cityid":4954,
"_districtname": "白云鄂博矿区"
}
,{
"_districtid":4960,
"_cityid":4954,
"_districtname": "九原区"
}
,{
"_districtid":4961,
"_cityid":4954,
"_districtname": "土默特右旗"
}
,{
"_districtid":4962,
"_cityid":4954,
"_districtname": "固阳县"
}
,{
"_districtid":4963,
"_cityid":4954,
"_districtname": "达尔罕茂明安联合旗"
}
]
,
"4964": [
{
"_districtid":4965,
"_cityid":4964,
"_districtname": "海勃湾区"
}
,{
"_districtid":4966,
"_cityid":4964,
"_districtname": "海南区"
}
,{
"_districtid":4967,
"_cityid":4964,
"_districtname": "乌达区"
}
]
,
"4968": [
{
"_districtid":4969,
"_cityid":4968,
"_districtname": "红山区"
}
,{
"_districtid":4970,
"_cityid":4968,
"_districtname": "元宝山区"
}
,{
"_districtid":4971,
"_cityid":4968,
"_districtname": "松山区"
}
,{
"_districtid":4972,
"_cityid":4968,
"_districtname": "阿鲁科尔沁旗"
}
,{
"_districtid":4973,
"_cityid":4968,
"_districtname": "巴林左旗"
}
,{
"_districtid":4974,
"_cityid":4968,
"_districtname": "巴林右旗"
}
,{
"_districtid":4975,
"_cityid":4968,
"_districtname": "林西县"
}
,{
"_districtid":4976,
"_cityid":4968,
"_districtname": "克什克腾旗"
}
,{
"_districtid":4977,
"_cityid":4968,
"_districtname": "翁牛特旗"
}
,{
"_districtid":4978,
"_cityid":4968,
"_districtname": "喀喇沁旗"
}
,{
"_districtid":4979,
"_cityid":4968,
"_districtname": "宁城县"
}
,{
"_districtid":4980,
"_cityid":4968,
"_districtname": "敖汉旗"
}
]
,
"4981": [
{
"_districtid":4982,
"_cityid":4981,
"_districtname": "科尔沁区"
}
,{
"_districtid":4983,
"_cityid":4981,
"_districtname": "科尔沁左翼中旗"
}
,{
"_districtid":4984,
"_cityid":4981,
"_districtname": "科尔沁左翼后旗"
}
,{
"_districtid":4985,
"_cityid":4981,
"_districtname": "开鲁县"
}
,{
"_districtid":4986,
"_cityid":4981,
"_districtname": "库伦旗"
}
,{
"_districtid":4987,
"_cityid":4981,
"_districtname": "奈曼旗"
}
,{
"_districtid":4988,
"_cityid":4981,
"_districtname": "扎鲁特旗"
}
,{
"_districtid":4989,
"_cityid":4981,
"_districtname": "霍林郭勒市"
}
]
,
"4990": [
{
"_districtid":4991,
"_cityid":4990,
"_districtname": "东胜区"
}
,{
"_districtid":4992,
"_cityid":4990,
"_districtname": "达拉特旗"
}
,{
"_districtid":4993,
"_cityid":4990,
"_districtname": "准格尔旗"
}
,{
"_districtid":4994,
"_cityid":4990,
"_districtname": "鄂托克前旗"
}
,{
"_districtid":4995,
"_cityid":4990,
"_districtname": "鄂托克旗"
}
,{
"_districtid":4996,
"_cityid":4990,
"_districtname": "杭锦旗"
}
,{
"_districtid":4997,
"_cityid":4990,
"_districtname": "乌审旗"
}
,{
"_districtid":4998,
"_cityid":4990,
"_districtname": "伊金霍洛旗"
}
]
,
"4999": [
{
"_districtid":5000,
"_cityid":4999,
"_districtname": "海拉尔区"
}
,{
"_districtid":5001,
"_cityid":4999,
"_districtname": "扎赉诺尔区"
}
,{
"_districtid":5002,
"_cityid":4999,
"_districtname": "阿荣旗"
}
,{
"_districtid":5003,
"_cityid":4999,
"_districtname": "莫力达瓦达斡尔族自治旗"
}
,{
"_districtid":5004,
"_cityid":4999,
"_districtname": "鄂伦春自治旗"
}
,{
"_districtid":5005,
"_cityid":4999,
"_districtname": "鄂温克族自治旗"
}
,{
"_districtid":5006,
"_cityid":4999,
"_districtname": "陈巴尔虎旗"
}
,{
"_districtid":5007,
"_cityid":4999,
"_districtname": "新巴尔虎左旗"
}
,{
"_districtid":5008,
"_cityid":4999,
"_districtname": "新巴尔虎右旗"
}
,{
"_districtid":5009,
"_cityid":4999,
"_districtname": "满洲里市"
}
,{
"_districtid":5010,
"_cityid":4999,
"_districtname": "牙克石市"
}
,{
"_districtid":5011,
"_cityid":4999,
"_districtname": "扎兰屯市"
}
,{
"_districtid":5012,
"_cityid":4999,
"_districtname": "额尔古纳市"
}
,{
"_districtid":5013,
"_cityid":4999,
"_districtname": "根河市"
}
]
,
"5014": [
{
"_districtid":5015,
"_cityid":5014,
"_districtname": "临河区"
}
,{
"_districtid":5016,
"_cityid":5014,
"_districtname": "五原县"
}
,{
"_districtid":5017,
"_cityid":5014,
"_districtname": "磴口县"
}
,{
"_districtid":5018,
"_cityid":5014,
"_districtname": "乌拉特前旗"
}
,{
"_districtid":5019,
"_cityid":5014,
"_districtname": "乌拉特中旗"
}
,{
"_districtid":5020,
"_cityid":5014,
"_districtname": "乌拉特后旗"
}
,{
"_districtid":5021,
"_cityid":5014,
"_districtname": "杭锦后旗"
}
]
,
"5022": [
{
"_districtid":5023,
"_cityid":5022,
"_districtname": "集宁区"
}
,{
"_districtid":5024,
"_cityid":5022,
"_districtname": "卓资县"
}
,{
"_districtid":5025,
"_cityid":5022,
"_districtname": "化德县"
}
,{
"_districtid":5026,
"_cityid":5022,
"_districtname": "商都县"
}
,{
"_districtid":5027,
"_cityid":5022,
"_districtname": "兴和县"
}
,{
"_districtid":5028,
"_cityid":5022,
"_districtname": "凉城县"
}
,{
"_districtid":5029,
"_cityid":5022,
"_districtname": "察哈尔右翼前旗"
}
,{
"_districtid":5030,
"_cityid":5022,
"_districtname": "察哈尔右翼中旗"
}
,{
"_districtid":5031,
"_cityid":5022,
"_districtname": "察哈尔右翼后旗"
}
,{
"_districtid":5032,
"_cityid":5022,
"_districtname": "四子王旗"
}
,{
"_districtid":5033,
"_cityid":5022,
"_districtname": "丰镇市"
}
]
,
"5034": [
{
"_districtid":5035,
"_cityid":5034,
"_districtname": "乌兰浩特市"
}
,{
"_districtid":5036,
"_cityid":5034,
"_districtname": "阿尔山市"
}
,{
"_districtid":5037,
"_cityid":5034,
"_districtname": "科尔沁右翼前旗"
}
,{
"_districtid":5038,
"_cityid":5034,
"_districtname": "科尔沁右翼中旗"
}
,{
"_districtid":5039,
"_cityid":5034,
"_districtname": "扎赉特旗"
}
,{
"_districtid":5040,
"_cityid":5034,
"_districtname": "突泉县"
}
]
,
"5041": [
{
"_districtid":5042,
"_cityid":5041,
"_districtname": "二连浩特市"
}
,{
"_districtid":5043,
"_cityid":5041,
"_districtname": "锡林浩特市"
}
,{
"_districtid":5044,
"_cityid":5041,
"_districtname": "阿巴嘎旗"
}
,{
"_districtid":5045,
"_cityid":5041,
"_districtname": "苏尼特左旗"
}
,{
"_districtid":5046,
"_cityid":5041,
"_districtname": "苏尼特右旗"
}
,{
"_districtid":5047,
"_cityid":5041,
"_districtname": "东乌珠穆沁旗"
}
,{
"_districtid":5048,
"_cityid":5041,
"_districtname": "西乌珠穆沁旗"
}
,{
"_districtid":5049,
"_cityid":5041,
"_districtname": "太仆寺旗"
}
,{
"_districtid":5050,
"_cityid":5041,
"_districtname": "镶黄旗"
}
,{
"_districtid":5051,
"_cityid":5041,
"_districtname": "正镶白旗"
}
,{
"_districtid":5052,
"_cityid":5041,
"_districtname": "正蓝旗"
}
,{
"_districtid":5053,
"_cityid":5041,
"_districtname": "多伦县"
}
]
,
"5054": [
{
"_districtid":5055,
"_cityid":5054,
"_districtname": "阿拉善左旗"
}
,{
"_districtid":5056,
"_cityid":5054,
"_districtname": "阿拉善右旗"
}
,{
"_districtid":5057,
"_cityid":5054,
"_districtname": "额济纳旗"
}
]
,
"5059": [
{
"_districtid":5060,
"_cityid":5059,
"_districtname": "和平区"
}
,{
"_districtid":5061,
"_cityid":5059,
"_districtname": "沈河区"
}
,{
"_districtid":5062,
"_cityid":5059,
"_districtname": "大东区"
}
,{
"_districtid":5063,
"_cityid":5059,
"_districtname": "皇姑区"
}
,{
"_districtid":5064,
"_cityid":5059,
"_districtname": "铁西区"
}
,{
"_districtid":5065,
"_cityid":5059,
"_districtname": "苏家屯区"
}
,{
"_districtid":5066,
"_cityid":5059,
"_districtname": "东陵区"
}
,{
"_districtid":5067,
"_cityid":5059,
"_districtname": "沈北新区"
}
,{
"_districtid":5068,
"_cityid":5059,
"_districtname": "于洪区"
}
,{
"_districtid":5069,
"_cityid":5059,
"_districtname": "辽中县"
}
,{
"_districtid":5070,
"_cityid":5059,
"_districtname": "康平县"
}
,{
"_districtid":5071,
"_cityid":5059,
"_districtname": "法库县"
}
,{
"_districtid":5072,
"_cityid":5059,
"_districtname": "新民市"
}
,{
"_districtid":5073,
"_cityid":5059,
"_districtname": "浑南区"
}
]
,
"5074": [
{
"_districtid":5075,
"_cityid":5074,
"_districtname": "中山区"
}
,{
"_districtid":5076,
"_cityid":5074,
"_districtname": "西岗区"
}
,{
"_districtid":5077,
"_cityid":5074,
"_districtname": "沙河口区"
}
,{
"_districtid":5078,
"_cityid":5074,
"_districtname": "甘井子区"
}
,{
"_districtid":5079,
"_cityid":5074,
"_districtname": "旅顺口区"
}
,{
"_districtid":5080,
"_cityid":5074,
"_districtname": "金州区"
}
,{
"_districtid":5081,
"_cityid":5074,
"_districtname": "长海县"
}
,{
"_districtid":5082,
"_cityid":5074,
"_districtname": "瓦房店市"
}
,{
"_districtid":5083,
"_cityid":5074,
"_districtname": "普兰店市"
}
,{
"_districtid":5084,
"_cityid":5074,
"_districtname": "庄河市"
}
,{
"_districtid":7890,
"_cityid":5074,
"_districtname": "开发区"
}
]
,
"5085": [
{
"_districtid":5086,
"_cityid":5085,
"_districtname": "铁东区"
}
,{
"_districtid":5087,
"_cityid":5085,
"_districtname": "铁西区"
}
,{
"_districtid":5088,
"_cityid":5085,
"_districtname": "立山区"
}
,{
"_districtid":5089,
"_cityid":5085,
"_districtname": "千山区"
}
,{
"_districtid":5090,
"_cityid":5085,
"_districtname": "台安县"
}
,{
"_districtid":5091,
"_cityid":5085,
"_districtname": "岫岩满族自治县"
}
,{
"_districtid":5092,
"_cityid":5085,
"_districtname": "海城市"
}
]
,
"5093": [
{
"_districtid":5094,
"_cityid":5093,
"_districtname": "新抚区"
}
,{
"_districtid":5095,
"_cityid":5093,
"_districtname": "东洲区"
}
,{
"_districtid":5096,
"_cityid":5093,
"_districtname": "望花区"
}
,{
"_districtid":5097,
"_cityid":5093,
"_districtname": "顺城区"
}
,{
"_districtid":5098,
"_cityid":5093,
"_districtname": "抚顺县"
}
,{
"_districtid":5099,
"_cityid":5093,
"_districtname": "新宾满族自治县"
}
,{
"_districtid":5100,
"_cityid":5093,
"_districtname": "清原满族自治县"
}
]
,
"5101": [
{
"_districtid":5102,
"_cityid":5101,
"_districtname": "平山区"
}
,{
"_districtid":5103,
"_cityid":5101,
"_districtname": "溪湖区"
}
,{
"_districtid":5104,
"_cityid":5101,
"_districtname": "明山区"
}
,{
"_districtid":5105,
"_cityid":5101,
"_districtname": "南芬区"
}
,{
"_districtid":5106,
"_cityid":5101,
"_districtname": "本溪满族自治县"
}
,{
"_districtid":5107,
"_cityid":5101,
"_districtname": "桓仁满族自治县"
}
]
,
"5108": [
{
"_districtid":5109,
"_cityid":5108,
"_districtname": "元宝区"
}
,{
"_districtid":5110,
"_cityid":5108,
"_districtname": "振兴区"
}
,{
"_districtid":5111,
"_cityid":5108,
"_districtname": "振安区"
}
,{
"_districtid":5112,
"_cityid":5108,
"_districtname": "宽甸满族自治县"
}
,{
"_districtid":5113,
"_cityid":5108,
"_districtname": "东港市"
}
,{
"_districtid":5114,
"_cityid":5108,
"_districtname": "凤城市"
}
]
,
"5115": [
{
"_districtid":5116,
"_cityid":5115,
"_districtname": "古塔区"
}
,{
"_districtid":5117,
"_cityid":5115,
"_districtname": "凌河区"
}
,{
"_districtid":5118,
"_cityid":5115,
"_districtname": "太和区"
}
,{
"_districtid":5119,
"_cityid":5115,
"_districtname": "黑山县"
}
,{
"_districtid":5120,
"_cityid":5115,
"_districtname": "义县"
}
,{
"_districtid":5121,
"_cityid":5115,
"_districtname": "凌海市"
}
,{
"_districtid":5122,
"_cityid":5115,
"_districtname": "北镇市"
}
]
,
"5123": [
{
"_districtid":5124,
"_cityid":5123,
"_districtname": "站前区"
}
,{
"_districtid":5125,
"_cityid":5123,
"_districtname": "西市区"
}
,{
"_districtid":5126,
"_cityid":5123,
"_districtname": "鲅鱼圈区"
}
,{
"_districtid":5127,
"_cityid":5123,
"_districtname": "老边区"
}
,{
"_districtid":5128,
"_cityid":5123,
"_districtname": "盖州市"
}
,{
"_districtid":5129,
"_cityid":5123,
"_districtname": "大石桥市"
}
]
,
"5130": [
{
"_districtid":5131,
"_cityid":5130,
"_districtname": "海州区"
}
,{
"_districtid":5132,
"_cityid":5130,
"_districtname": "新邱区"
}
,{
"_districtid":5133,
"_cityid":5130,
"_districtname": "太平区"
}
,{
"_districtid":5134,
"_cityid":5130,
"_districtname": "清河门区"
}
,{
"_districtid":5135,
"_cityid":5130,
"_districtname": "细河区"
}
,{
"_districtid":5136,
"_cityid":5130,
"_districtname": "阜新蒙古族自治县"
}
,{
"_districtid":5137,
"_cityid":5130,
"_districtname": "彰武县"
}
]
,
"5138": [
{
"_districtid":5139,
"_cityid":5138,
"_districtname": "白塔区"
}
,{
"_districtid":5140,
"_cityid":5138,
"_districtname": "文圣区"
}
,{
"_districtid":5141,
"_cityid":5138,
"_districtname": "宏伟区"
}
,{
"_districtid":5142,
"_cityid":5138,
"_districtname": "弓长岭区"
}
,{
"_districtid":5143,
"_cityid":5138,
"_districtname": "太子河区"
}
,{
"_districtid":5144,
"_cityid":5138,
"_districtname": "辽阳县"
}
,{
"_districtid":5145,
"_cityid":5138,
"_districtname": "灯塔市"
}
]
,
"5146": [
{
"_districtid":5147,
"_cityid":5146,
"_districtname": "双台子区"
}
,{
"_districtid":5148,
"_cityid":5146,
"_districtname": "兴隆台区"
}
,{
"_districtid":5149,
"_cityid":5146,
"_districtname": "大洼县"
}
,{
"_districtid":5150,
"_cityid":5146,
"_districtname": "盘山县"
}
]
,
"5151": [
{
"_districtid":5152,
"_cityid":5151,
"_districtname": "银州区"
}
,{
"_districtid":5153,
"_cityid":5151,
"_districtname": "清河区"
}
,{
"_districtid":5154,
"_cityid":5151,
"_districtname": "铁岭县"
}
,{
"_districtid":5155,
"_cityid":5151,
"_districtname": "西丰县"
}
,{
"_districtid":5156,
"_cityid":5151,
"_districtname": "昌图县"
}
,{
"_districtid":5157,
"_cityid":5151,
"_districtname": "调兵山市"
}
,{
"_districtid":5158,
"_cityid":5151,
"_districtname": "开原市"
}
]
,
"5159": [
{
"_districtid":5160,
"_cityid":5159,
"_districtname": "双塔区"
}
,{
"_districtid":5161,
"_cityid":5159,
"_districtname": "龙城区"
}
,{
"_districtid":5162,
"_cityid":5159,
"_districtname": "朝阳县"
}
,{
"_districtid":5163,
"_cityid":5159,
"_districtname": "建平县"
}
,{
"_districtid":5164,
"_cityid":5159,
"_districtname": "喀喇沁左翼蒙古族自治县"
}
,{
"_districtid":5165,
"_cityid":5159,
"_districtname": "北票市"
}
,{
"_districtid":5166,
"_cityid":5159,
"_districtname": "凌源市"
}
]
,
"5167": [
{
"_districtid":5168,
"_cityid":5167,
"_districtname": "连山区"
}
,{
"_districtid":5169,
"_cityid":5167,
"_districtname": "龙港区"
}
,{
"_districtid":5170,
"_cityid":5167,
"_districtname": "南票区"
}
,{
"_districtid":5171,
"_cityid":5167,
"_districtname": "绥中县"
}
,{
"_districtid":5172,
"_cityid":5167,
"_districtname": "建昌县"
}
,{
"_districtid":5173,
"_cityid":5167,
"_districtname": "兴城市"
}
]
,
"5175": [
{
"_districtid":5176,
"_cityid":5175,
"_districtname": "南关区"
}
,{
"_districtid":5177,
"_cityid":5175,
"_districtname": "宽城区"
}
,{
"_districtid":5178,
"_cityid":5175,
"_districtname": "朝阳区"
}
,{
"_districtid":5179,
"_cityid":5175,
"_districtname": "二道区"
}
,{
"_districtid":5180,
"_cityid":5175,
"_districtname": "绿园区"
}
,{
"_districtid":5181,
"_cityid":5175,
"_districtname": "双阳区"
}
,{
"_districtid":5182,
"_cityid":5175,
"_districtname": "农安县"
}
,{
"_districtid":5183,
"_cityid":5175,
"_districtname": "九台市"
}
,{
"_districtid":5184,
"_cityid":5175,
"_districtname": "榆树市"
}
,{
"_districtid":5185,
"_cityid":5175,
"_districtname": "德惠市"
}
]
,
"5186": [
{
"_districtid":5187,
"_cityid":5186,
"_districtname": "昌邑区"
}
,{
"_districtid":5188,
"_cityid":5186,
"_districtname": "龙潭区"
}
,{
"_districtid":5189,
"_cityid":5186,
"_districtname": "船营区"
}
,{
"_districtid":5190,
"_cityid":5186,
"_districtname": "丰满区"
}
,{
"_districtid":5191,
"_cityid":5186,
"_districtname": "永吉县"
}
,{
"_districtid":5192,
"_cityid":5186,
"_districtname": "蛟河市"
}
,{
"_districtid":5193,
"_cityid":5186,
"_districtname": "桦甸市"
}
,{
"_districtid":5194,
"_cityid":5186,
"_districtname": "舒兰市"
}
,{
"_districtid":5195,
"_cityid":5186,
"_districtname": "磐石市"
}
]
,
"5196": [
{
"_districtid":5197,
"_cityid":5196,
"_districtname": "铁西区"
}
,{
"_districtid":5198,
"_cityid":5196,
"_districtname": "铁东区"
}
,{
"_districtid":5199,
"_cityid":5196,
"_districtname": "梨树县"
}
,{
"_districtid":5200,
"_cityid":5196,
"_districtname": "伊通满族自治县"
}
,{
"_districtid":5201,
"_cityid":5196,
"_districtname": "公主岭市"
}
,{
"_districtid":5202,
"_cityid":5196,
"_districtname": "双辽市"
}
]
,
"5203": [
{
"_districtid":5204,
"_cityid":5203,
"_districtname": "龙山区"
}
,{
"_districtid":5205,
"_cityid":5203,
"_districtname": "西安区"
}
,{
"_districtid":5206,
"_cityid":5203,
"_districtname": "东丰县"
}
,{
"_districtid":5207,
"_cityid":5203,
"_districtname": "东辽县"
}
]
,
"5208": [
{
"_districtid":5209,
"_cityid":5208,
"_districtname": "东昌区"
}
,{
"_districtid":5210,
"_cityid":5208,
"_districtname": "二道江区"
}
,{
"_districtid":5211,
"_cityid":5208,
"_districtname": "通化县"
}
,{
"_districtid":5212,
"_cityid":5208,
"_districtname": "辉南县"
}
,{
"_districtid":5213,
"_cityid":5208,
"_districtname": "柳河县"
}
,{
"_districtid":5214,
"_cityid":5208,
"_districtname": "梅河口市"
}
,{
"_districtid":5215,
"_cityid":5208,
"_districtname": "集安市"
}
]
,
"5216": [
{
"_districtid":5217,
"_cityid":5216,
"_districtname": "浑江区"
}
,{
"_districtid":5218,
"_cityid":5216,
"_districtname": "江源区"
}
,{
"_districtid":5219,
"_cityid":5216,
"_districtname": "抚松县"
}
,{
"_districtid":5220,
"_cityid":5216,
"_districtname": "靖宇县"
}
,{
"_districtid":5221,
"_cityid":5216,
"_districtname": "长白朝鲜族自治县"
}
,{
"_districtid":5222,
"_cityid":5216,
"_districtname": "临江市"
}
]
,
"5223": [
{
"_districtid":5224,
"_cityid":5223,
"_districtname": "宁江区"
}
,{
"_districtid":5225,
"_cityid":5223,
"_districtname": "前郭尔罗斯蒙古族自治县"
}
,{
"_districtid":5226,
"_cityid":5223,
"_districtname": "长岭县"
}
,{
"_districtid":5227,
"_cityid":5223,
"_districtname": "乾安县"
}
,{
"_districtid":5228,
"_cityid":5223,
"_districtname": "扶余市"
}
]
,
"5229": [
{
"_districtid":5230,
"_cityid":5229,
"_districtname": "洮北区"
}
,{
"_districtid":5231,
"_cityid":5229,
"_districtname": "镇赉县"
}
,{
"_districtid":5232,
"_cityid":5229,
"_districtname": "通榆县"
}
,{
"_districtid":5233,
"_cityid":5229,
"_districtname": "洮南市"
}
,{
"_districtid":5234,
"_cityid":5229,
"_districtname": "大安市"
}
]
,
"5235": [
{
"_districtid":5236,
"_cityid":5235,
"_districtname": "延吉市"
}
,{
"_districtid":5237,
"_cityid":5235,
"_districtname": "图们市"
}
,{
"_districtid":5238,
"_cityid":5235,
"_districtname": "敦化市"
}
,{
"_districtid":5239,
"_cityid":5235,
"_districtname": "珲春市"
}
,{
"_districtid":5240,
"_cityid":5235,
"_districtname": "龙井市"
}
,{
"_districtid":5241,
"_cityid":5235,
"_districtname": "和龙市"
}
,{
"_districtid":5242,
"_cityid":5235,
"_districtname": "汪清县"
}
,{
"_districtid":5243,
"_cityid":5235,
"_districtname": "安图县"
}
]
,
"5245": [
{
"_districtid":5246,
"_cityid":5245,
"_districtname": "道里区"
}
,{
"_districtid":5247,
"_cityid":5245,
"_districtname": "南岗区"
}
,{
"_districtid":5248,
"_cityid":5245,
"_districtname": "道外区"
}
,{
"_districtid":5249,
"_cityid":5245,
"_districtname": "平房区"
}
,{
"_districtid":5250,
"_cityid":5245,
"_districtname": "松北区"
}
,{
"_districtid":5251,
"_cityid":5245,
"_districtname": "香坊区"
}
,{
"_districtid":5252,
"_cityid":5245,
"_districtname": "呼兰区"
}
,{
"_districtid":5253,
"_cityid":5245,
"_districtname": "阿城区"
}
,{
"_districtid":5254,
"_cityid":5245,
"_districtname": "依兰县"
}
,{
"_districtid":5255,
"_cityid":5245,
"_districtname": "方正县"
}
,{
"_districtid":5256,
"_cityid":5245,
"_districtname": "宾县"
}
,{
"_districtid":5257,
"_cityid":5245,
"_districtname": "巴彦县"
}
,{
"_districtid":5258,
"_cityid":5245,
"_districtname": "木兰县"
}
,{
"_districtid":5259,
"_cityid":5245,
"_districtname": "通河县"
}
,{
"_districtid":5260,
"_cityid":5245,
"_districtname": "延寿县"
}
,{
"_districtid":5261,
"_cityid":5245,
"_districtname": "双城市"
}
,{
"_districtid":5262,
"_cityid":5245,
"_districtname": "尚志市"
}
,{
"_districtid":5263,
"_cityid":5245,
"_districtname": "五常市"
}
]
,
"5264": [
{
"_districtid":5265,
"_cityid":5264,
"_districtname": "龙沙区"
}
,{
"_districtid":5266,
"_cityid":5264,
"_districtname": "建华区"
}
,{
"_districtid":5267,
"_cityid":5264,
"_districtname": "铁锋区"
}
,{
"_districtid":5268,
"_cityid":5264,
"_districtname": "昂昂溪区"
}
,{
"_districtid":5269,
"_cityid":5264,
"_districtname": "富拉尔基区"
}
,{
"_districtid":5270,
"_cityid":5264,
"_districtname": "碾子山区"
}
,{
"_districtid":5271,
"_cityid":5264,
"_districtname": "梅里斯达斡尔族区"
}
,{
"_districtid":5272,
"_cityid":5264,
"_districtname": "龙江县"
}
,{
"_districtid":5273,
"_cityid":5264,
"_districtname": "依安县"
}
,{
"_districtid":5274,
"_cityid":5264,
"_districtname": "泰来县"
}
,{
"_districtid":5275,
"_cityid":5264,
"_districtname": "甘南县"
}
,{
"_districtid":5276,
"_cityid":5264,
"_districtname": "富裕县"
}
,{
"_districtid":5277,
"_cityid":5264,
"_districtname": "克山县"
}
,{
"_districtid":5278,
"_cityid":5264,
"_districtname": "克东县"
}
,{
"_districtid":5279,
"_cityid":5264,
"_districtname": "拜泉县"
}
,{
"_districtid":5280,
"_cityid":5264,
"_districtname": "讷河市"
}
]
,
"5281": [
{
"_districtid":5282,
"_cityid":5281,
"_districtname": "鸡冠区"
}
,{
"_districtid":5283,
"_cityid":5281,
"_districtname": "恒山区"
}
,{
"_districtid":5284,
"_cityid":5281,
"_districtname": "滴道区"
}
,{
"_districtid":5285,
"_cityid":5281,
"_districtname": "梨树区"
}
,{
"_districtid":5286,
"_cityid":5281,
"_districtname": "城子河区"
}
,{
"_districtid":5287,
"_cityid":5281,
"_districtname": "麻山区"
}
,{
"_districtid":5288,
"_cityid":5281,
"_districtname": "鸡东县"
}
,{
"_districtid":5289,
"_cityid":5281,
"_districtname": "虎林市"
}
,{
"_districtid":5290,
"_cityid":5281,
"_districtname": "密山市"
}
]
,
"5291": [
{
"_districtid":5292,
"_cityid":5291,
"_districtname": "向阳区"
}
,{
"_districtid":5293,
"_cityid":5291,
"_districtname": "工农区"
}
,{
"_districtid":5294,
"_cityid":5291,
"_districtname": "南山区"
}
,{
"_districtid":5295,
"_cityid":5291,
"_districtname": "兴安区"
}
,{
"_districtid":5296,
"_cityid":5291,
"_districtname": "东山区"
}
,{
"_districtid":5297,
"_cityid":5291,
"_districtname": "兴山区"
}
,{
"_districtid":5298,
"_cityid":5291,
"_districtname": "萝北县"
}
,{
"_districtid":5299,
"_cityid":5291,
"_districtname": "绥滨县"
}
]
,
"5300": [
{
"_districtid":5301,
"_cityid":5300,
"_districtname": "尖山区"
}
,{
"_districtid":5302,
"_cityid":5300,
"_districtname": "岭东区"
}
,{
"_districtid":5303,
"_cityid":5300,
"_districtname": "四方台区"
}
,{
"_districtid":5304,
"_cityid":5300,
"_districtname": "宝山区"
}
,{
"_districtid":5305,
"_cityid":5300,
"_districtname": "集贤县"
}
,{
"_districtid":5306,
"_cityid":5300,
"_districtname": "友谊县"
}
,{
"_districtid":5307,
"_cityid":5300,
"_districtname": "宝清县"
}
,{
"_districtid":5308,
"_cityid":5300,
"_districtname": "饶河县"
}
]
,
"5309": [
{
"_districtid":5310,
"_cityid":5309,
"_districtname": "萨尔图区"
}
,{
"_districtid":5311,
"_cityid":5309,
"_districtname": "龙凤区"
}
,{
"_districtid":5312,
"_cityid":5309,
"_districtname": "让胡路区"
}
,{
"_districtid":5313,
"_cityid":5309,
"_districtname": "红岗区"
}
,{
"_districtid":5314,
"_cityid":5309,
"_districtname": "大同区"
}
,{
"_districtid":5315,
"_cityid":5309,
"_districtname": "肇州县"
}
,{
"_districtid":5316,
"_cityid":5309,
"_districtname": "肇源县"
}
,{
"_districtid":5317,
"_cityid":5309,
"_districtname": "林甸县"
}
,{
"_districtid":5318,
"_cityid":5309,
"_districtname": "杜尔伯特蒙古族自治县"
}
]
,
"5319": [
{
"_districtid":5320,
"_cityid":5319,
"_districtname": "伊春区"
}
,{
"_districtid":5321,
"_cityid":5319,
"_districtname": "南岔区"
}
,{
"_districtid":5322,
"_cityid":5319,
"_districtname": "友好区"
}
,{
"_districtid":5323,
"_cityid":5319,
"_districtname": "西林区"
}
,{
"_districtid":5324,
"_cityid":5319,
"_districtname": "翠峦区"
}
,{
"_districtid":5325,
"_cityid":5319,
"_districtname": "新青区"
}
,{
"_districtid":5326,
"_cityid":5319,
"_districtname": "美溪区"
}
,{
"_districtid":5327,
"_cityid":5319,
"_districtname": "金山屯区"
}
,{
"_districtid":5328,
"_cityid":5319,
"_districtname": "五营区"
}
,{
"_districtid":5329,
"_cityid":5319,
"_districtname": "乌马河区"
}
,{
"_districtid":5330,
"_cityid":5319,
"_districtname": "汤旺河区"
}
,{
"_districtid":5331,
"_cityid":5319,
"_districtname": "带岭区"
}
,{
"_districtid":5332,
"_cityid":5319,
"_districtname": "乌伊岭区"
}
,{
"_districtid":5333,
"_cityid":5319,
"_districtname": "红星区"
}
,{
"_districtid":5334,
"_cityid":5319,
"_districtname": "上甘岭区"
}
,{
"_districtid":5335,
"_cityid":5319,
"_districtname": "嘉荫县"
}
,{
"_districtid":5336,
"_cityid":5319,
"_districtname": "铁力市"
}
]
,
"5337": [
{
"_districtid":5338,
"_cityid":5337,
"_districtname": "向阳区"
}
,{
"_districtid":5339,
"_cityid":5337,
"_districtname": "前进区"
}
,{
"_districtid":5340,
"_cityid":5337,
"_districtname": "东风区"
}
,{
"_districtid":5341,
"_cityid":5337,
"_districtname": "郊区"
}
,{
"_districtid":5342,
"_cityid":5337,
"_districtname": "桦南县"
}
,{
"_districtid":5343,
"_cityid":5337,
"_districtname": "桦川县"
}
,{
"_districtid":5344,
"_cityid":5337,
"_districtname": "汤原县"
}
,{
"_districtid":5345,
"_cityid":5337,
"_districtname": "抚远县"
}
,{
"_districtid":5346,
"_cityid":5337,
"_districtname": "同江市"
}
,{
"_districtid":5347,
"_cityid":5337,
"_districtname": "富锦市"
}
]
,
"5348": [
{
"_districtid":5349,
"_cityid":5348,
"_districtname": "新兴区"
}
,{
"_districtid":5350,
"_cityid":5348,
"_districtname": "桃山区"
}
,{
"_districtid":5351,
"_cityid":5348,
"_districtname": "茄子河区"
}
,{
"_districtid":5352,
"_cityid":5348,
"_districtname": "勃利县"
}
]
,
"5353": [
{
"_districtid":5354,
"_cityid":5353,
"_districtname": "东安区"
}
,{
"_districtid":5355,
"_cityid":5353,
"_districtname": "阳明区"
}
,{
"_districtid":5356,
"_cityid":5353,
"_districtname": "爱民区"
}
,{
"_districtid":5357,
"_cityid":5353,
"_districtname": "西安区"
}
,{
"_districtid":5358,
"_cityid":5353,
"_districtname": "东宁县"
}
,{
"_districtid":5359,
"_cityid":5353,
"_districtname": "林口县"
}
,{
"_districtid":5360,
"_cityid":5353,
"_districtname": "绥芬河市"
}
,{
"_districtid":5361,
"_cityid":5353,
"_districtname": "海林市"
}
,{
"_districtid":5362,
"_cityid":5353,
"_districtname": "宁安市"
}
,{
"_districtid":5363,
"_cityid":5353,
"_districtname": "穆棱市"
}
]
,
"5364": [
{
"_districtid":5365,
"_cityid":5364,
"_districtname": "爱辉区"
}
,{
"_districtid":5366,
"_cityid":5364,
"_districtname": "嫩江县"
}
,{
"_districtid":5367,
"_cityid":5364,
"_districtname": "逊克县"
}
,{
"_districtid":5368,
"_cityid":5364,
"_districtname": "孙吴县"
}
,{
"_districtid":5369,
"_cityid":5364,
"_districtname": "北安市"
}
,{
"_districtid":5370,
"_cityid":5364,
"_districtname": "五大连池市"
}
]
,
"5371": [
{
"_districtid":5372,
"_cityid":5371,
"_districtname": "北林区"
}
,{
"_districtid":5373,
"_cityid":5371,
"_districtname": "望奎县"
}
,{
"_districtid":5374,
"_cityid":5371,
"_districtname": "兰西县"
}
,{
"_districtid":5375,
"_cityid":5371,
"_districtname": "青冈县"
}
,{
"_districtid":5376,
"_cityid":5371,
"_districtname": "庆安县"
}
,{
"_districtid":5377,
"_cityid":5371,
"_districtname": "明水县"
}
,{
"_districtid":5378,
"_cityid":5371,
"_districtname": "绥棱县"
}
,{
"_districtid":5379,
"_cityid":5371,
"_districtname": "安达市"
}
,{
"_districtid":5380,
"_cityid":5371,
"_districtname": "肇东市"
}
,{
"_districtid":5381,
"_cityid":5371,
"_districtname": "海伦市"
}
]
,
"5382": [
{
"_districtid":5383,
"_cityid":5382,
"_districtname": "加格达奇区"
}
,{
"_districtid":5384,
"_cityid":5382,
"_districtname": "松岭区"
}
,{
"_districtid":5385,
"_cityid":5382,
"_districtname": "新林区"
}
,{
"_districtid":5386,
"_cityid":5382,
"_districtname": "呼中区"
}
,{
"_districtid":5387,
"_cityid":5382,
"_districtname": "呼玛县"
}
,{
"_districtid":5388,
"_cityid":5382,
"_districtname": "塔河县"
}
,{
"_districtid":5389,
"_cityid":5382,
"_districtname": "漠河县"
}
]
,
"5391": [
{
"_districtid":5392,
"_cityid":5391,
"_districtname": "黄浦区"
}
,{
"_districtid":5393,
"_cityid":5391,
"_districtname": "徐汇区"
}
,{
"_districtid":5394,
"_cityid":5391,
"_districtname": "长宁区"
}
,{
"_districtid":5395,
"_cityid":5391,
"_districtname": "静安区"
}
,{
"_districtid":5396,
"_cityid":5391,
"_districtname": "普陀区"
}
,{
"_districtid":5397,
"_cityid":5391,
"_districtname": "闸北区"
}
,{
"_districtid":5398,
"_cityid":5391,
"_districtname": "虹口区"
}
,{
"_districtid":5399,
"_cityid":5391,
"_districtname": "杨浦区"
}
,{
"_districtid":5400,
"_cityid":5391,
"_districtname": "闵行区"
}
,{
"_districtid":5401,
"_cityid":5391,
"_districtname": "宝山区"
}
,{
"_districtid":5402,
"_cityid":5391,
"_districtname": "嘉定区"
}
,{
"_districtid":5403,
"_cityid":5391,
"_districtname": "浦东新区"
}
,{
"_districtid":5404,
"_cityid":5391,
"_districtname": "金山区"
}
,{
"_districtid":5405,
"_cityid":5391,
"_districtname": "松江区"
}
,{
"_districtid":5406,
"_cityid":5391,
"_districtname": "青浦区"
}
,{
"_districtid":5407,
"_cityid":5391,
"_districtname": "奉贤区"
}
,{
"_districtid":5408,
"_cityid":5391,
"_districtname": "崇明县"
}
,{
"_districtid":5409,
"_cityid":5391,
"_districtname": "南汇区"
}
]
,
"5411": [
{
"_districtid":5412,
"_cityid":5411,
"_districtname": "玄武区"
}
,{
"_districtid":5413,
"_cityid":5411,
"_districtname": "秦淮区"
}
,{
"_districtid":5414,
"_cityid":5411,
"_districtname": "建邺区"
}
,{
"_districtid":5415,
"_cityid":5411,
"_districtname": "鼓楼区"
}
,{
"_districtid":5416,
"_cityid":5411,
"_districtname": "浦口区"
}
,{
"_districtid":5417,
"_cityid":5411,
"_districtname": "栖霞区"
}
,{
"_districtid":5418,
"_cityid":5411,
"_districtname": "雨花台区"
}
,{
"_districtid":5419,
"_cityid":5411,
"_districtname": "江宁区"
}
,{
"_districtid":5420,
"_cityid":5411,
"_districtname": "六合区"
}
,{
"_districtid":5421,
"_cityid":5411,
"_districtname": "溧水区"
}
,{
"_districtid":5422,
"_cityid":5411,
"_districtname": "高淳区"
}
]
,
"5423": [
{
"_districtid":5424,
"_cityid":5423,
"_districtname": "崇安区"
}
,{
"_districtid":5425,
"_cityid":5423,
"_districtname": "南长区"
}
,{
"_districtid":5426,
"_cityid":5423,
"_districtname": "北塘区"
}
,{
"_districtid":5427,
"_cityid":5423,
"_districtname": "锡山区"
}
,{
"_districtid":5428,
"_cityid":5423,
"_districtname": "惠山区"
}
,{
"_districtid":5429,
"_cityid":5423,
"_districtname": "滨湖区"
}
,{
"_districtid":5430,
"_cityid":5423,
"_districtname": "江阴市"
}
,{
"_districtid":5431,
"_cityid":5423,
"_districtname": "宜兴市"
}
]
,
"5432": [
{
"_districtid":5433,
"_cityid":5432,
"_districtname": "鼓楼区"
}
,{
"_districtid":5434,
"_cityid":5432,
"_districtname": "云龙区"
}
,{
"_districtid":5435,
"_cityid":5432,
"_districtname": "贾汪区"
}
,{
"_districtid":5436,
"_cityid":5432,
"_districtname": "泉山区"
}
,{
"_districtid":5437,
"_cityid":5432,
"_districtname": "铜山区"
}
,{
"_districtid":5438,
"_cityid":5432,
"_districtname": "丰县"
}
,{
"_districtid":5439,
"_cityid":5432,
"_districtname": "沛县"
}
,{
"_districtid":5440,
"_cityid":5432,
"_districtname": "睢宁县"
}
,{
"_districtid":5441,
"_cityid":5432,
"_districtname": "新沂市"
}
,{
"_districtid":5442,
"_cityid":5432,
"_districtname": "邳州市"
}
]
,
"5443": [
{
"_districtid":5444,
"_cityid":5443,
"_districtname": "天宁区"
}
,{
"_districtid":5445,
"_cityid":5443,
"_districtname": "钟楼区"
}
,{
"_districtid":5446,
"_cityid":5443,
"_districtname": "戚墅堰区"
}
,{
"_districtid":5447,
"_cityid":5443,
"_districtname": "新北区"
}
,{
"_districtid":5448,
"_cityid":5443,
"_districtname": "武进区"
}
,{
"_districtid":5449,
"_cityid":5443,
"_districtname": "溧阳市"
}
,{
"_districtid":5450,
"_cityid":5443,
"_districtname": "金坛市"
}
]
,
"5451": [
{
"_districtid":5452,
"_cityid":5451,
"_districtname": "虎丘区"
}
,{
"_districtid":5453,
"_cityid":5451,
"_districtname": "吴中区"
}
,{
"_districtid":5454,
"_cityid":5451,
"_districtname": "相城区"
}
,{
"_districtid":5455,
"_cityid":5451,
"_districtname": "姑苏区"
}
,{
"_districtid":5456,
"_cityid":5451,
"_districtname": "吴江区"
}
,{
"_districtid":5457,
"_cityid":5451,
"_districtname": "常熟市"
}
,{
"_districtid":5458,
"_cityid":5451,
"_districtname": "张家港市"
}
,{
"_districtid":5459,
"_cityid":5451,
"_districtname": "昆山市"
}
,{
"_districtid":5460,
"_cityid":5451,
"_districtname": "太仓市"
}
]
,
"5461": [
{
"_districtid":5462,
"_cityid":5461,
"_districtname": "崇川区"
}
,{
"_districtid":5463,
"_cityid":5461,
"_districtname": "港闸区"
}
,{
"_districtid":5464,
"_cityid":5461,
"_districtname": "通州区"
}
,{
"_districtid":5465,
"_cityid":5461,
"_districtname": "海安县"
}
,{
"_districtid":5466,
"_cityid":5461,
"_districtname": "如东县"
}
,{
"_districtid":5467,
"_cityid":5461,
"_districtname": "启东市"
}
,{
"_districtid":5468,
"_cityid":5461,
"_districtname": "如皋市"
}
,{
"_districtid":5469,
"_cityid":5461,
"_districtname": "海门市"
}
]
,
"5470": [
{
"_districtid":5471,
"_cityid":5470,
"_districtname": "连云区"
}
,{
"_districtid":5472,
"_cityid":5470,
"_districtname": "新浦区"
}
,{
"_districtid":5473,
"_cityid":5470,
"_districtname": "海州区"
}
,{
"_districtid":5474,
"_cityid":5470,
"_districtname": "赣榆县"
}
,{
"_districtid":5475,
"_cityid":5470,
"_districtname": "东海县"
}
,{
"_districtid":5476,
"_cityid":5470,
"_districtname": "灌云县"
}
,{
"_districtid":5477,
"_cityid":5470,
"_districtname": "灌南县"
}
]
,
"5478": [
{
"_districtid":5479,
"_cityid":5478,
"_districtname": "清河区"
}
,{
"_districtid":5480,
"_cityid":5478,
"_districtname": "淮安区"
}
,{
"_districtid":5481,
"_cityid":5478,
"_districtname": "淮阴区"
}
,{
"_districtid":5482,
"_cityid":5478,
"_districtname": "清浦区"
}
,{
"_districtid":5483,
"_cityid":5478,
"_districtname": "涟水县"
}
,{
"_districtid":5484,
"_cityid":5478,
"_districtname": "洪泽县"
}
,{
"_districtid":5485,
"_cityid":5478,
"_districtname": "盱眙县"
}
,{
"_districtid":5486,
"_cityid":5478,
"_districtname": "金湖县"
}
]
,
"5487": [
{
"_districtid":5488,
"_cityid":5487,
"_districtname": "亭湖区"
}
,{
"_districtid":5489,
"_cityid":5487,
"_districtname": "盐都区"
}
,{
"_districtid":5490,
"_cityid":5487,
"_districtname": "响水县"
}
,{
"_districtid":5491,
"_cityid":5487,
"_districtname": "滨海县"
}
,{
"_districtid":5492,
"_cityid":5487,
"_districtname": "阜宁县"
}
,{
"_districtid":5493,
"_cityid":5487,
"_districtname": "射阳县"
}
,{
"_districtid":5494,
"_cityid":5487,
"_districtname": "建湖县"
}
,{
"_districtid":5495,
"_cityid":5487,
"_districtname": "东台市"
}
,{
"_districtid":5496,
"_cityid":5487,
"_districtname": "大丰市"
}
]
,
"5497": [
{
"_districtid":5498,
"_cityid":5497,
"_districtname": "广陵区"
}
,{
"_districtid":5499,
"_cityid":5497,
"_districtname": "邗江区"
}
,{
"_districtid":5500,
"_cityid":5497,
"_districtname": "江都区"
}
,{
"_districtid":5501,
"_cityid":5497,
"_districtname": "宝应县"
}
,{
"_districtid":5502,
"_cityid":5497,
"_districtname": "仪征市"
}
,{
"_districtid":5503,
"_cityid":5497,
"_districtname": "高邮市"
}
]
,
"5504": [
{
"_districtid":5505,
"_cityid":5504,
"_districtname": "京口区"
}
,{
"_districtid":5506,
"_cityid":5504,
"_districtname": "润州区"
}
,{
"_districtid":5507,
"_cityid":5504,
"_districtname": "丹徒区"
}
,{
"_districtid":5508,
"_cityid":5504,
"_districtname": "丹阳市"
}
,{
"_districtid":5509,
"_cityid":5504,
"_districtname": "扬中市"
}
,{
"_districtid":5510,
"_cityid":5504,
"_districtname": "句容市"
}
]
,
"5511": [
{
"_districtid":5512,
"_cityid":5511,
"_districtname": "海陵区"
}
,{
"_districtid":5513,
"_cityid":5511,
"_districtname": "高港区"
}
,{
"_districtid":5514,
"_cityid":5511,
"_districtname": "兴化市"
}
,{
"_districtid":5515,
"_cityid":5511,
"_districtname": "靖江市"
}
,{
"_districtid":5516,
"_cityid":5511,
"_districtname": "泰兴市"
}
,{
"_districtid":5517,
"_cityid":5511,
"_districtname": "姜堰区"
}
]
,
"5518": [
{
"_districtid":5519,
"_cityid":5518,
"_districtname": "宿城区"
}
,{
"_districtid":5520,
"_cityid":5518,
"_districtname": "宿豫区"
}
,{
"_districtid":5521,
"_cityid":5518,
"_districtname": "沭阳县"
}
,{
"_districtid":5522,
"_cityid":5518,
"_districtname": "泗阳县"
}
,{
"_districtid":5523,
"_cityid":5518,
"_districtname": "泗洪县"
}
]
,
"5525": [
{
"_districtid":5526,
"_cityid":5525,
"_districtname": "上城区"
}
,{
"_districtid":5527,
"_cityid":5525,
"_districtname": "下城区"
}
,{
"_districtid":5528,
"_cityid":5525,
"_districtname": "江干区"
}
,{
"_districtid":5529,
"_cityid":5525,
"_districtname": "拱墅区"
}
,{
"_districtid":5530,
"_cityid":5525,
"_districtname": "西湖区"
}
,{
"_districtid":5531,
"_cityid":5525,
"_districtname": "滨江区"
}
,{
"_districtid":5532,
"_cityid":5525,
"_districtname": "萧山区"
}
,{
"_districtid":5533,
"_cityid":5525,
"_districtname": "余杭区"
}
,{
"_districtid":5534,
"_cityid":5525,
"_districtname": "桐庐县"
}
,{
"_districtid":5535,
"_cityid":5525,
"_districtname": "淳安县"
}
,{
"_districtid":5536,
"_cityid":5525,
"_districtname": "建德市"
}
,{
"_districtid":5537,
"_cityid":5525,
"_districtname": "富阳市"
}
,{
"_districtid":5538,
"_cityid":5525,
"_districtname": "临安市"
}
]
,
"5539": [
{
"_districtid":5540,
"_cityid":5539,
"_districtname": "海曙区"
}
,{
"_districtid":5541,
"_cityid":5539,
"_districtname": "江东区"
}
,{
"_districtid":5542,
"_cityid":5539,
"_districtname": "江北区"
}
,{
"_districtid":5543,
"_cityid":5539,
"_districtname": "北仑区"
}
,{
"_districtid":5544,
"_cityid":5539,
"_districtname": "镇海区"
}
,{
"_districtid":5545,
"_cityid":5539,
"_districtname": "鄞州区"
}
,{
"_districtid":5546,
"_cityid":5539,
"_districtname": "象山县"
}
,{
"_districtid":5547,
"_cityid":5539,
"_districtname": "宁海县"
}
,{
"_districtid":5548,
"_cityid":5539,
"_districtname": "余姚市"
}
,{
"_districtid":5549,
"_cityid":5539,
"_districtname": "慈溪市"
}
,{
"_districtid":5550,
"_cityid":5539,
"_districtname": "奉化市"
}
]
,
"5551": [
{
"_districtid":5552,
"_cityid":5551,
"_districtname": "鹿城区"
}
,{
"_districtid":5553,
"_cityid":5551,
"_districtname": "龙湾区"
}
,{
"_districtid":5554,
"_cityid":5551,
"_districtname": "瓯海区"
}
,{
"_districtid":5555,
"_cityid":5551,
"_districtname": "洞头县"
}
,{
"_districtid":5556,
"_cityid":5551,
"_districtname": "永嘉县"
}
,{
"_districtid":5557,
"_cityid":5551,
"_districtname": "平阳县"
}
,{
"_districtid":5558,
"_cityid":5551,
"_districtname": "苍南县"
}
,{
"_districtid":5559,
"_cityid":5551,
"_districtname": "文成县"
}
,{
"_districtid":5560,
"_cityid":5551,
"_districtname": "泰顺县"
}
,{
"_districtid":5561,
"_cityid":5551,
"_districtname": "瑞安市"
}
,{
"_districtid":5562,
"_cityid":5551,
"_districtname": "乐清市"
}
]
,
"5563": [
{
"_districtid":5564,
"_cityid":5563,
"_districtname": "南湖区"
}
,{
"_districtid":5565,
"_cityid":5563,
"_districtname": "秀洲区"
}
,{
"_districtid":5566,
"_cityid":5563,
"_districtname": "嘉善县"
}
,{
"_districtid":5567,
"_cityid":5563,
"_districtname": "海盐县"
}
,{
"_districtid":5568,
"_cityid":5563,
"_districtname": "海宁市"
}
,{
"_districtid":5569,
"_cityid":5563,
"_districtname": "平湖市"
}
,{
"_districtid":5570,
"_cityid":5563,
"_districtname": "桐乡市"
}
]
,
"5571": [
{
"_districtid":5572,
"_cityid":5571,
"_districtname": "吴兴区"
}
,{
"_districtid":5573,
"_cityid":5571,
"_districtname": "南浔区"
}
,{
"_districtid":5574,
"_cityid":5571,
"_districtname": "德清县"
}
,{
"_districtid":5575,
"_cityid":5571,
"_districtname": "长兴县"
}
,{
"_districtid":5576,
"_cityid":5571,
"_districtname": "安吉县"
}
]
,
"5577": [
{
"_districtid":5578,
"_cityid":5577,
"_districtname": "越城区"
}
,{
"_districtid":5579,
"_cityid":5577,
"_districtname": "绍兴县"
}
,{
"_districtid":5580,
"_cityid":5577,
"_districtname": "新昌县"
}
,{
"_districtid":5581,
"_cityid":5577,
"_districtname": "诸暨市"
}
,{
"_districtid":5582,
"_cityid":5577,
"_districtname": "上虞市"
}
,{
"_districtid":5583,
"_cityid":5577,
"_districtname": "嵊州市"
}
]
,
"5584": [
{
"_districtid":5585,
"_cityid":5584,
"_districtname": "婺城区"
}
,{
"_districtid":5586,
"_cityid":5584,
"_districtname": "金东区"
}
,{
"_districtid":5587,
"_cityid":5584,
"_districtname": "武义县"
}
,{
"_districtid":5588,
"_cityid":5584,
"_districtname": "浦江县"
}
,{
"_districtid":5589,
"_cityid":5584,
"_districtname": "磐安县"
}
,{
"_districtid":5590,
"_cityid":5584,
"_districtname": "兰溪市"
}
,{
"_districtid":5591,
"_cityid":5584,
"_districtname": "义乌市"
}
,{
"_districtid":5592,
"_cityid":5584,
"_districtname": "东阳市"
}
,{
"_districtid":5593,
"_cityid":5584,
"_districtname": "永康市"
}
]
,
"5594": [
{
"_districtid":5595,
"_cityid":5594,
"_districtname": "柯城区"
}
,{
"_districtid":5596,
"_cityid":5594,
"_districtname": "衢江区"
}
,{
"_districtid":5597,
"_cityid":5594,
"_districtname": "常山县"
}
,{
"_districtid":5598,
"_cityid":5594,
"_districtname": "开化县"
}
,{
"_districtid":5599,
"_cityid":5594,
"_districtname": "龙游县"
}
,{
"_districtid":5600,
"_cityid":5594,
"_districtname": "江山市"
}
]
,
"5601": [
{
"_districtid":5602,
"_cityid":5601,
"_districtname": "定海区"
}
,{
"_districtid":5603,
"_cityid":5601,
"_districtname": "普陀区"
}
,{
"_districtid":5604,
"_cityid":5601,
"_districtname": "岱山县"
}
,{
"_districtid":5605,
"_cityid":5601,
"_districtname": "嵊泗县"
}
]
,
"5606": [
{
"_districtid":5607,
"_cityid":5606,
"_districtname": "椒江区"
}
,{
"_districtid":5608,
"_cityid":5606,
"_districtname": "黄岩区"
}
,{
"_districtid":5609,
"_cityid":5606,
"_districtname": "路桥区"
}
,{
"_districtid":5610,
"_cityid":5606,
"_districtname": "玉环县"
}
,{
"_districtid":5611,
"_cityid":5606,
"_districtname": "三门县"
}
,{
"_districtid":5612,
"_cityid":5606,
"_districtname": "天台县"
}
,{
"_districtid":5613,
"_cityid":5606,
"_districtname": "仙居县"
}
,{
"_districtid":5614,
"_cityid":5606,
"_districtname": "温岭市"
}
,{
"_districtid":5615,
"_cityid":5606,
"_districtname": "临海市"
}
]
,
"5616": [
{
"_districtid":5617,
"_cityid":5616,
"_districtname": "莲都区"
}
,{
"_districtid":5618,
"_cityid":5616,
"_districtname": "青田县"
}
,{
"_districtid":5619,
"_cityid":5616,
"_districtname": "缙云县"
}
,{
"_districtid":5620,
"_cityid":5616,
"_districtname": "遂昌县"
}
,{
"_districtid":5621,
"_cityid":5616,
"_districtname": "松阳县"
}
,{
"_districtid":5622,
"_cityid":5616,
"_districtname": "云和县"
}
,{
"_districtid":5623,
"_cityid":5616,
"_districtname": "庆元县"
}
,{
"_districtid":5624,
"_cityid":5616,
"_districtname": "景宁畲族自治县"
}
,{
"_districtid":5625,
"_cityid":5616,
"_districtname": "龙泉市"
}
]
,
"5627": [
{
"_districtid":5628,
"_cityid":5627,
"_districtname": "瑶海区"
}
,{
"_districtid":5629,
"_cityid":5627,
"_districtname": "庐阳区"
}
,{
"_districtid":5630,
"_cityid":5627,
"_districtname": "蜀山区"
}
,{
"_districtid":5631,
"_cityid":5627,
"_districtname": "包河区"
}
,{
"_districtid":5632,
"_cityid":5627,
"_districtname": "长丰县"
}
,{
"_districtid":5633,
"_cityid":5627,
"_districtname": "肥东县"
}
,{
"_districtid":5634,
"_cityid":5627,
"_districtname": "肥西县"
}
,{
"_districtid":5635,
"_cityid":5627,
"_districtname": "庐江县"
}
,{
"_districtid":5636,
"_cityid":5627,
"_districtname": "巢湖市"
}
]
,
"5637": [
{
"_districtid":5638,
"_cityid":5637,
"_districtname": "镜湖区"
}
,{
"_districtid":5639,
"_cityid":5637,
"_districtname": "弋江区"
}
,{
"_districtid":5640,
"_cityid":5637,
"_districtname": "鸠江区"
}
,{
"_districtid":5641,
"_cityid":5637,
"_districtname": "三山区"
}
,{
"_districtid":5642,
"_cityid":5637,
"_districtname": "芜湖县"
}
,{
"_districtid":5643,
"_cityid":5637,
"_districtname": "繁昌县"
}
,{
"_districtid":5644,
"_cityid":5637,
"_districtname": "南陵县"
}
,{
"_districtid":5645,
"_cityid":5637,
"_districtname": "无为县"
}
]
,
"5646": [
{
"_districtid":5647,
"_cityid":5646,
"_districtname": "龙子湖区"
}
,{
"_districtid":5648,
"_cityid":5646,
"_districtname": "蚌山区"
}
,{
"_districtid":5649,
"_cityid":5646,
"_districtname": "禹会区"
}
,{
"_districtid":5650,
"_cityid":5646,
"_districtname": "淮上区"
}
,{
"_districtid":5651,
"_cityid":5646,
"_districtname": "怀远县"
}
,{
"_districtid":5652,
"_cityid":5646,
"_districtname": "五河县"
}
,{
"_districtid":5653,
"_cityid":5646,
"_districtname": "固镇县"
}
]
,
"5654": [
{
"_districtid":5655,
"_cityid":5654,
"_districtname": "大通区"
}
,{
"_districtid":5656,
"_cityid":5654,
"_districtname": "田家庵区"
}
,{
"_districtid":5657,
"_cityid":5654,
"_districtname": "谢家集区"
}
,{
"_districtid":5658,
"_cityid":5654,
"_districtname": "八公山区"
}
,{
"_districtid":5659,
"_cityid":5654,
"_districtname": "潘集区"
}
,{
"_districtid":5660,
"_cityid":5654,
"_districtname": "凤台县"
}
]
,
"5661": [
{
"_districtid":5662,
"_cityid":5661,
"_districtname": "花山区"
}
,{
"_districtid":5663,
"_cityid":5661,
"_districtname": "雨山区"
}
,{
"_districtid":5664,
"_cityid":5661,
"_districtname": "博望区"
}
,{
"_districtid":5665,
"_cityid":5661,
"_districtname": "当涂县"
}
,{
"_districtid":5666,
"_cityid":5661,
"_districtname": "含山县"
}
,{
"_districtid":5667,
"_cityid":5661,
"_districtname": "和县"
}
]
,
"5668": [
{
"_districtid":5669,
"_cityid":5668,
"_districtname": "杜集区"
}
,{
"_districtid":5670,
"_cityid":5668,
"_districtname": "相山区"
}
,{
"_districtid":5671,
"_cityid":5668,
"_districtname": "烈山区"
}
,{
"_districtid":5672,
"_cityid":5668,
"_districtname": "濉溪县"
}
]
,
"5673": [
{
"_districtid":5674,
"_cityid":5673,
"_districtname": "铜官山区"
}
,{
"_districtid":5675,
"_cityid":5673,
"_districtname": "狮子山区"
}
,{
"_districtid":5676,
"_cityid":5673,
"_districtname": "郊区"
}
,{
"_districtid":5677,
"_cityid":5673,
"_districtname": "铜陵县"
}
]
,
"5678": [
{
"_districtid":5679,
"_cityid":5678,
"_districtname": "迎江区"
}
,{
"_districtid":5680,
"_cityid":5678,
"_districtname": "大观区"
}
,{
"_districtid":5681,
"_cityid":5678,
"_districtname": "宜秀区"
}
,{
"_districtid":5682,
"_cityid":5678,
"_districtname": "怀宁县"
}
,{
"_districtid":5683,
"_cityid":5678,
"_districtname": "枞阳县"
}
,{
"_districtid":5684,
"_cityid":5678,
"_districtname": "潜山县"
}
,{
"_districtid":5685,
"_cityid":5678,
"_districtname": "太湖县"
}
,{
"_districtid":5686,
"_cityid":5678,
"_districtname": "宿松县"
}
,{
"_districtid":5687,
"_cityid":5678,
"_districtname": "望江县"
}
,{
"_districtid":5688,
"_cityid":5678,
"_districtname": "岳西县"
}
,{
"_districtid":5689,
"_cityid":5678,
"_districtname": "桐城市"
}
]
,
"5690": [
{
"_districtid":5691,
"_cityid":5690,
"_districtname": "屯溪区"
}
,{
"_districtid":5692,
"_cityid":5690,
"_districtname": "黄山区"
}
,{
"_districtid":5693,
"_cityid":5690,
"_districtname": "徽州区"
}
,{
"_districtid":5694,
"_cityid":5690,
"_districtname": "歙县"
}
,{
"_districtid":5695,
"_cityid":5690,
"_districtname": "休宁县"
}
,{
"_districtid":5696,
"_cityid":5690,
"_districtname": "黟县"
}
,{
"_districtid":5697,
"_cityid":5690,
"_districtname": "祁门县"
}
]
,
"5698": [
{
"_districtid":5699,
"_cityid":5698,
"_districtname": "琅琊区"
}
,{
"_districtid":5700,
"_cityid":5698,
"_districtname": "南谯区"
}
,{
"_districtid":5701,
"_cityid":5698,
"_districtname": "来安县"
}
,{
"_districtid":5702,
"_cityid":5698,
"_districtname": "全椒县"
}
,{
"_districtid":5703,
"_cityid":5698,
"_districtname": "定远县"
}
,{
"_districtid":5704,
"_cityid":5698,
"_districtname": "凤阳县"
}
,{
"_districtid":5705,
"_cityid":5698,
"_districtname": "天长市"
}
,{
"_districtid":5706,
"_cityid":5698,
"_districtname": "明光市"
}
]
,
"5707": [
{
"_districtid":5708,
"_cityid":5707,
"_districtname": "颍州区"
}
,{
"_districtid":5709,
"_cityid":5707,
"_districtname": "颍东区"
}
,{
"_districtid":5710,
"_cityid":5707,
"_districtname": "颍泉区"
}
,{
"_districtid":5711,
"_cityid":5707,
"_districtname": "临泉县"
}
,{
"_districtid":5712,
"_cityid":5707,
"_districtname": "太和县"
}
,{
"_districtid":5713,
"_cityid":5707,
"_districtname": "阜南县"
}
,{
"_districtid":5714,
"_cityid":5707,
"_districtname": "颍上县"
}
,{
"_districtid":5715,
"_cityid":5707,
"_districtname": "界首市"
}
]
,
"5716": [
{
"_districtid":5717,
"_cityid":5716,
"_districtname": "埇桥区"
}
,{
"_districtid":5718,
"_cityid":5716,
"_districtname": "砀山县"
}
,{
"_districtid":5719,
"_cityid":5716,
"_districtname": "萧县"
}
,{
"_districtid":5720,
"_cityid":5716,
"_districtname": "灵璧县"
}
,{
"_districtid":5721,
"_cityid":5716,
"_districtname": "泗县"
}
]
,
"5722": [
{
"_districtid":5723,
"_cityid":5722,
"_districtname": "金安区"
}
,{
"_districtid":5724,
"_cityid":5722,
"_districtname": "裕安区"
}
,{
"_districtid":5725,
"_cityid":5722,
"_districtname": "寿县"
}
,{
"_districtid":5726,
"_cityid":5722,
"_districtname": "霍邱县"
}
,{
"_districtid":5727,
"_cityid":5722,
"_districtname": "舒城县"
}
,{
"_districtid":5728,
"_cityid":5722,
"_districtname": "金寨县"
}
,{
"_districtid":5729,
"_cityid":5722,
"_districtname": "霍山县"
}
]
,
"5730": [
{
"_districtid":5731,
"_cityid":5730,
"_districtname": "谯城区"
}
,{
"_districtid":5732,
"_cityid":5730,
"_districtname": "涡阳县"
}
,{
"_districtid":5733,
"_cityid":5730,
"_districtname": "蒙城县"
}
,{
"_districtid":5734,
"_cityid":5730,
"_districtname": "利辛县"
}
]
,
"5735": [
{
"_districtid":5736,
"_cityid":5735,
"_districtname": "贵池区"
}
,{
"_districtid":5737,
"_cityid":5735,
"_districtname": "东至县"
}
,{
"_districtid":5738,
"_cityid":5735,
"_districtname": "石台县"
}
,{
"_districtid":5739,
"_cityid":5735,
"_districtname": "青阳县"
}
]
,
"5740": [
{
"_districtid":5741,
"_cityid":5740,
"_districtname": "宣州区"
}
,{
"_districtid":5742,
"_cityid":5740,
"_districtname": "郎溪县"
}
,{
"_districtid":5743,
"_cityid":5740,
"_districtname": "广德县"
}
,{
"_districtid":5744,
"_cityid":5740,
"_districtname": "泾县"
}
,{
"_districtid":5745,
"_cityid":5740,
"_districtname": "绩溪县"
}
,{
"_districtid":5746,
"_cityid":5740,
"_districtname": "旌德县"
}
,{
"_districtid":5747,
"_cityid":5740,
"_districtname": "宁国市"
}
]
,
"5749": [
{
"_districtid":5750,
"_cityid":5749,
"_districtname": "鼓楼区"
}
,{
"_districtid":5751,
"_cityid":5749,
"_districtname": "台江区"
}
,{
"_districtid":5752,
"_cityid":5749,
"_districtname": "仓山区"
}
,{
"_districtid":5753,
"_cityid":5749,
"_districtname": "马尾区"
}
,{
"_districtid":5754,
"_cityid":5749,
"_districtname": "晋安区"
}
,{
"_districtid":5755,
"_cityid":5749,
"_districtname": "闽侯县"
}
,{
"_districtid":5756,
"_cityid":5749,
"_districtname": "连江县"
}
,{
"_districtid":5757,
"_cityid":5749,
"_districtname": "罗源县"
}
,{
"_districtid":5758,
"_cityid":5749,
"_districtname": "闽清县"
}
,{
"_districtid":5759,
"_cityid":5749,
"_districtname": "永泰县"
}
,{
"_districtid":5760,
"_cityid":5749,
"_districtname": "平潭县"
}
,{
"_districtid":5761,
"_cityid":5749,
"_districtname": "福清市"
}
,{
"_districtid":5762,
"_cityid":5749,
"_districtname": "长乐市"
}
]
,
"5763": [
{
"_districtid":5764,
"_cityid":5763,
"_districtname": "思明区"
}
,{
"_districtid":5765,
"_cityid":5763,
"_districtname": "海沧区"
}
,{
"_districtid":5766,
"_cityid":5763,
"_districtname": "湖里区"
}
,{
"_districtid":5767,
"_cityid":5763,
"_districtname": "集美区"
}
,{
"_districtid":5768,
"_cityid":5763,
"_districtname": "同安区"
}
,{
"_districtid":5769,
"_cityid":5763,
"_districtname": "翔安区"
}
]
,
"5770": [
{
"_districtid":5771,
"_cityid":5770,
"_districtname": "城厢区"
}
,{
"_districtid":5772,
"_cityid":5770,
"_districtname": "涵江区"
}
,{
"_districtid":5773,
"_cityid":5770,
"_districtname": "荔城区"
}
,{
"_districtid":5774,
"_cityid":5770,
"_districtname": "秀屿区"
}
,{
"_districtid":5775,
"_cityid":5770,
"_districtname": "仙游县"
}
]
,
"5776": [
{
"_districtid":5777,
"_cityid":5776,
"_districtname": "梅列区"
}
,{
"_districtid":5778,
"_cityid":5776,
"_districtname": "三元区"
}
,{
"_districtid":5779,
"_cityid":5776,
"_districtname": "明溪县"
}
,{
"_districtid":5780,
"_cityid":5776,
"_districtname": "清流县"
}
,{
"_districtid":5781,
"_cityid":5776,
"_districtname": "宁化县"
}
,{
"_districtid":5782,
"_cityid":5776,
"_districtname": "大田县"
}
,{
"_districtid":5783,
"_cityid":5776,
"_districtname": "尤溪县"
}
,{
"_districtid":5784,
"_cityid":5776,
"_districtname": "沙县"
}
,{
"_districtid":5785,
"_cityid":5776,
"_districtname": "将乐县"
}
,{
"_districtid":5786,
"_cityid":5776,
"_districtname": "泰宁县"
}
,{
"_districtid":5787,
"_cityid":5776,
"_districtname": "建宁县"
}
,{
"_districtid":5788,
"_cityid":5776,
"_districtname": "永安市"
}
]
,
"5789": [
{
"_districtid":5790,
"_cityid":5789,
"_districtname": "鲤城区"
}
,{
"_districtid":5791,
"_cityid":5789,
"_districtname": "丰泽区"
}
,{
"_districtid":5792,
"_cityid":5789,
"_districtname": "洛江区"
}
,{
"_districtid":5793,
"_cityid":5789,
"_districtname": "泉港区"
}
,{
"_districtid":5794,
"_cityid":5789,
"_districtname": "惠安县"
}
,{
"_districtid":5795,
"_cityid":5789,
"_districtname": "安溪县"
}
,{
"_districtid":5796,
"_cityid":5789,
"_districtname": "永春县"
}
,{
"_districtid":5797,
"_cityid":5789,
"_districtname": "德化县"
}
,{
"_districtid":5798,
"_cityid":5789,
"_districtname": "金门县"
}
,{
"_districtid":5799,
"_cityid":5789,
"_districtname": "石狮市"
}
,{
"_districtid":5800,
"_cityid":5789,
"_districtname": "晋江市"
}
,{
"_districtid":5801,
"_cityid":5789,
"_districtname": "南安市"
}
]
,
"5802": [
{
"_districtid":5803,
"_cityid":5802,
"_districtname": "芗城区"
}
,{
"_districtid":5804,
"_cityid":5802,
"_districtname": "龙文区"
}
,{
"_districtid":5805,
"_cityid":5802,
"_districtname": "云霄县"
}
,{
"_districtid":5806,
"_cityid":5802,
"_districtname": "漳浦县"
}
,{
"_districtid":5807,
"_cityid":5802,
"_districtname": "诏安县"
}
,{
"_districtid":5808,
"_cityid":5802,
"_districtname": "长泰县"
}
,{
"_districtid":5809,
"_cityid":5802,
"_districtname": "东山县"
}
,{
"_districtid":5810,
"_cityid":5802,
"_districtname": "南靖县"
}
,{
"_districtid":5811,
"_cityid":5802,
"_districtname": "平和县"
}
,{
"_districtid":5812,
"_cityid":5802,
"_districtname": "华安县"
}
,{
"_districtid":5813,
"_cityid":5802,
"_districtname": "龙海市"
}
]
,
"5814": [
{
"_districtid":5815,
"_cityid":5814,
"_districtname": "延平区"
}
,{
"_districtid":5816,
"_cityid":5814,
"_districtname": "顺昌县"
}
,{
"_districtid":5817,
"_cityid":5814,
"_districtname": "浦城县"
}
,{
"_districtid":5818,
"_cityid":5814,
"_districtname": "光泽县"
}
,{
"_districtid":5819,
"_cityid":5814,
"_districtname": "松溪县"
}
,{
"_districtid":5820,
"_cityid":5814,
"_districtname": "政和县"
}
,{
"_districtid":5821,
"_cityid":5814,
"_districtname": "邵武市"
}
,{
"_districtid":5822,
"_cityid":5814,
"_districtname": "武夷山市"
}
,{
"_districtid":5823,
"_cityid":5814,
"_districtname": "建瓯市"
}
,{
"_districtid":5824,
"_cityid":5814,
"_districtname": "建阳市"
}
]
,
"5825": [
{
"_districtid":5826,
"_cityid":5825,
"_districtname": "新罗区"
}
,{
"_districtid":5827,
"_cityid":5825,
"_districtname": "长汀县"
}
,{
"_districtid":5828,
"_cityid":5825,
"_districtname": "永定县"
}
,{
"_districtid":5829,
"_cityid":5825,
"_districtname": "上杭县"
}
,{
"_districtid":5830,
"_cityid":5825,
"_districtname": "武平县"
}
,{
"_districtid":5831,
"_cityid":5825,
"_districtname": "连城县"
}
,{
"_districtid":5832,
"_cityid":5825,
"_districtname": "漳平市"
}
]
,
"5833": [
{
"_districtid":5834,
"_cityid":5833,
"_districtname": "蕉城区"
}
,{
"_districtid":5835,
"_cityid":5833,
"_districtname": "霞浦县"
}
,{
"_districtid":5836,
"_cityid":5833,
"_districtname": "古田县"
}
,{
"_districtid":5837,
"_cityid":5833,
"_districtname": "屏南县"
}
,{
"_districtid":5838,
"_cityid":5833,
"_districtname": "寿宁县"
}
,{
"_districtid":5839,
"_cityid":5833,
"_districtname": "周宁县"
}
,{
"_districtid":5840,
"_cityid":5833,
"_districtname": "柘荣县"
}
,{
"_districtid":5841,
"_cityid":5833,
"_districtname": "福安市"
}
,{
"_districtid":5842,
"_cityid":5833,
"_districtname": "福鼎市"
}
]
,
"5844": [
{
"_districtid":5845,
"_cityid":5844,
"_districtname": "东湖区"
}
,{
"_districtid":5846,
"_cityid":5844,
"_districtname": "西湖区"
}
,{
"_districtid":5847,
"_cityid":5844,
"_districtname": "青云谱区"
}
,{
"_districtid":5848,
"_cityid":5844,
"_districtname": "湾里区"
}
,{
"_districtid":5849,
"_cityid":5844,
"_districtname": "青山湖区"
}
,{
"_districtid":5850,
"_cityid":5844,
"_districtname": "南昌县"
}
,{
"_districtid":5851,
"_cityid":5844,
"_districtname": "新建县"
}
,{
"_districtid":5852,
"_cityid":5844,
"_districtname": "安义县"
}
,{
"_districtid":5853,
"_cityid":5844,
"_districtname": "进贤县"
}
,{
"_districtid":5854,
"_cityid":5844,
"_districtname": "红谷滩新区"
}
,{
"_districtid":5855,
"_cityid":5844,
"_districtname": "南昌经济技术开发区"
}
]
,
"5856": [
{
"_districtid":5857,
"_cityid":5856,
"_districtname": "昌江区"
}
,{
"_districtid":5858,
"_cityid":5856,
"_districtname": "珠山区"
}
,{
"_districtid":5859,
"_cityid":5856,
"_districtname": "浮梁县"
}
,{
"_districtid":5860,
"_cityid":5856,
"_districtname": "乐平市"
}
]
,
"5861": [
{
"_districtid":5862,
"_cityid":5861,
"_districtname": "安源区"
}
,{
"_districtid":5863,
"_cityid":5861,
"_districtname": "湘东区"
}
,{
"_districtid":5864,
"_cityid":5861,
"_districtname": "莲花县"
}
,{
"_districtid":5865,
"_cityid":5861,
"_districtname": "上栗县"
}
,{
"_districtid":5866,
"_cityid":5861,
"_districtname": "芦溪县"
}
]
,
"5867": [
{
"_districtid":5868,
"_cityid":5867,
"_districtname": "庐山区"
}
,{
"_districtid":5869,
"_cityid":5867,
"_districtname": "浔阳区"
}
,{
"_districtid":5870,
"_cityid":5867,
"_districtname": "九江县"
}
,{
"_districtid":5871,
"_cityid":5867,
"_districtname": "武宁县"
}
,{
"_districtid":5872,
"_cityid":5867,
"_districtname": "修水县"
}
,{
"_districtid":5873,
"_cityid":5867,
"_districtname": "永修县"
}
,{
"_districtid":5874,
"_cityid":5867,
"_districtname": "德安县"
}
,{
"_districtid":5875,
"_cityid":5867,
"_districtname": "星子县"
}
,{
"_districtid":5876,
"_cityid":5867,
"_districtname": "都昌县"
}
,{
"_districtid":5877,
"_cityid":5867,
"_districtname": "湖口县"
}
,{
"_districtid":5878,
"_cityid":5867,
"_districtname": "彭泽县"
}
,{
"_districtid":5879,
"_cityid":5867,
"_districtname": "瑞昌市"
}
,{
"_districtid":5880,
"_cityid":5867,
"_districtname": "共青城市"
}
]
,
"5881": [
{
"_districtid":5882,
"_cityid":5881,
"_districtname": "渝水区"
}
,{
"_districtid":5883,
"_cityid":5881,
"_districtname": "分宜县"
}
]
,
"5884": [
{
"_districtid":5885,
"_cityid":5884,
"_districtname": "月湖区"
}
,{
"_districtid":5886,
"_cityid":5884,
"_districtname": "余江县"
}
,{
"_districtid":5887,
"_cityid":5884,
"_districtname": "贵溪市"
}
]
,
"5888": [
{
"_districtid":5889,
"_cityid":5888,
"_districtname": "章贡区"
}
,{
"_districtid":5890,
"_cityid":5888,
"_districtname": "赣县"
}
,{
"_districtid":5891,
"_cityid":5888,
"_districtname": "信丰县"
}
,{
"_districtid":5892,
"_cityid":5888,
"_districtname": "大余县"
}
,{
"_districtid":5893,
"_cityid":5888,
"_districtname": "上犹县"
}
,{
"_districtid":5894,
"_cityid":5888,
"_districtname": "崇义县"
}
,{
"_districtid":5895,
"_cityid":5888,
"_districtname": "安远县"
}
,{
"_districtid":5896,
"_cityid":5888,
"_districtname": "龙南县"
}
,{
"_districtid":5897,
"_cityid":5888,
"_districtname": "定南县"
}
,{
"_districtid":5898,
"_cityid":5888,
"_districtname": "全南县"
}
,{
"_districtid":5899,
"_cityid":5888,
"_districtname": "宁都县"
}
,{
"_districtid":5900,
"_cityid":5888,
"_districtname": "于都县"
}
,{
"_districtid":5901,
"_cityid":5888,
"_districtname": "兴国县"
}
,{
"_districtid":5902,
"_cityid":5888,
"_districtname": "会昌县"
}
,{
"_districtid":5903,
"_cityid":5888,
"_districtname": "寻乌县"
}
,{
"_districtid":5904,
"_cityid":5888,
"_districtname": "石城县"
}
,{
"_districtid":5905,
"_cityid":5888,
"_districtname": "瑞金市"
}
,{
"_districtid":5906,
"_cityid":5888,
"_districtname": "南康市"
}
]
,
"5907": [
{
"_districtid":5908,
"_cityid":5907,
"_districtname": "吉州区"
}
,{
"_districtid":5909,
"_cityid":5907,
"_districtname": "青原区"
}
,{
"_districtid":5910,
"_cityid":5907,
"_districtname": "吉安县"
}
,{
"_districtid":5911,
"_cityid":5907,
"_districtname": "吉水县"
}
,{
"_districtid":5912,
"_cityid":5907,
"_districtname": "峡江县"
}
,{
"_districtid":5913,
"_cityid":5907,
"_districtname": "新干县"
}
,{
"_districtid":5914,
"_cityid":5907,
"_districtname": "永丰县"
}
,{
"_districtid":5915,
"_cityid":5907,
"_districtname": "泰和县"
}
,{
"_districtid":5916,
"_cityid":5907,
"_districtname": "遂川县"
}
,{
"_districtid":5917,
"_cityid":5907,
"_districtname": "万安县"
}
,{
"_districtid":5918,
"_cityid":5907,
"_districtname": "安福县"
}
,{
"_districtid":5919,
"_cityid":5907,
"_districtname": "永新县"
}
,{
"_districtid":5920,
"_cityid":5907,
"_districtname": "井冈山市"
}
]
,
"5921": [
{
"_districtid":5922,
"_cityid":5921,
"_districtname": "袁州区"
}
,{
"_districtid":5923,
"_cityid":5921,
"_districtname": "奉新县"
}
,{
"_districtid":5924,
"_cityid":5921,
"_districtname": "万载县"
}
,{
"_districtid":5925,
"_cityid":5921,
"_districtname": "上高县"
}
,{
"_districtid":5926,
"_cityid":5921,
"_districtname": "宜丰县"
}
,{
"_districtid":5927,
"_cityid":5921,
"_districtname": "靖安县"
}
,{
"_districtid":5928,
"_cityid":5921,
"_districtname": "铜鼓县"
}
,{
"_districtid":5929,
"_cityid":5921,
"_districtname": "丰城市"
}
,{
"_districtid":5930,
"_cityid":5921,
"_districtname": "樟树市"
}
,{
"_districtid":5931,
"_cityid":5921,
"_districtname": "高安市"
}
]
,
"5932": [
{
"_districtid":5933,
"_cityid":5932,
"_districtname": "临川区"
}
,{
"_districtid":5934,
"_cityid":5932,
"_districtname": "南城县"
}
,{
"_districtid":5935,
"_cityid":5932,
"_districtname": "黎川县"
}
,{
"_districtid":5936,
"_cityid":5932,
"_districtname": "南丰县"
}
,{
"_districtid":5937,
"_cityid":5932,
"_districtname": "崇仁县"
}
,{
"_districtid":5938,
"_cityid":5932,
"_districtname": "乐安县"
}
,{
"_districtid":5939,
"_cityid":5932,
"_districtname": "宜黄县"
}
,{
"_districtid":5940,
"_cityid":5932,
"_districtname": "金溪县"
}
,{
"_districtid":5941,
"_cityid":5932,
"_districtname": "资溪县"
}
,{
"_districtid":5942,
"_cityid":5932,
"_districtname": "东乡县"
}
,{
"_districtid":5943,
"_cityid":5932,
"_districtname": "广昌县"
}
]
,
"5944": [
{
"_districtid":5945,
"_cityid":5944,
"_districtname": "信州区"
}
,{
"_districtid":5946,
"_cityid":5944,
"_districtname": "上饶县"
}
,{
"_districtid":5947,
"_cityid":5944,
"_districtname": "广丰县"
}
,{
"_districtid":5948,
"_cityid":5944,
"_districtname": "玉山县"
}
,{
"_districtid":5949,
"_cityid":5944,
"_districtname": "铅山县"
}
,{
"_districtid":5950,
"_cityid":5944,
"_districtname": "横峰县"
}
,{
"_districtid":5951,
"_cityid":5944,
"_districtname": "弋阳县"
}
,{
"_districtid":5952,
"_cityid":5944,
"_districtname": "余干县"
}
,{
"_districtid":5953,
"_cityid":5944,
"_districtname": "鄱阳县"
}
,{
"_districtid":5954,
"_cityid":5944,
"_districtname": "万年县"
}
,{
"_districtid":5955,
"_cityid":5944,
"_districtname": "婺源县"
}
,{
"_districtid":5956,
"_cityid":5944,
"_districtname": "德兴市"
}
]
,
"5958": [
{
"_districtid":5959,
"_cityid":5958,
"_districtname": "历下区"
}
,{
"_districtid":5960,
"_cityid":5958,
"_districtname": "市中区"
}
,{
"_districtid":5961,
"_cityid":5958,
"_districtname": "槐荫区"
}
,{
"_districtid":5962,
"_cityid":5958,
"_districtname": "天桥区"
}
,{
"_districtid":5963,
"_cityid":5958,
"_districtname": "历城区"
}
,{
"_districtid":5964,
"_cityid":5958,
"_districtname": "长清区"
}
,{
"_districtid":5965,
"_cityid":5958,
"_districtname": "平阴县"
}
,{
"_districtid":5966,
"_cityid":5958,
"_districtname": "济阳县"
}
,{
"_districtid":5967,
"_cityid":5958,
"_districtname": "商河县"
}
,{
"_districtid":5968,
"_cityid":5958,
"_districtname": "章丘市"
}
]
,
"5969": [
{
"_districtid":5970,
"_cityid":5969,
"_districtname": "市南区"
}
,{
"_districtid":5971,
"_cityid":5969,
"_districtname": "市北区"
}
,{
"_districtid":5972,
"_cityid":5969,
"_districtname": "黄岛区"
}
,{
"_districtid":5973,
"_cityid":5969,
"_districtname": "崂山区"
}
,{
"_districtid":5974,
"_cityid":5969,
"_districtname": "李沧区"
}
,{
"_districtid":5975,
"_cityid":5969,
"_districtname": "城阳区"
}
,{
"_districtid":5976,
"_cityid":5969,
"_districtname": "胶州市"
}
,{
"_districtid":5977,
"_cityid":5969,
"_districtname": "即墨市"
}
,{
"_districtid":5978,
"_cityid":5969,
"_districtname": "平度市"
}
,{
"_districtid":5979,
"_cityid":5969,
"_districtname": "莱西市"
}
]
,
"5980": [
{
"_districtid":5981,
"_cityid":5980,
"_districtname": "淄川区"
}
,{
"_districtid":5982,
"_cityid":5980,
"_districtname": "张店区"
}
,{
"_districtid":5983,
"_cityid":5980,
"_districtname": "博山区"
}
,{
"_districtid":5984,
"_cityid":5980,
"_districtname": "临淄区"
}
,{
"_districtid":5985,
"_cityid":5980,
"_districtname": "周村区"
}
,{
"_districtid":5986,
"_cityid":5980,
"_districtname": "桓台县"
}
,{
"_districtid":5987,
"_cityid":5980,
"_districtname": "高青县"
}
,{
"_districtid":5988,
"_cityid":5980,
"_districtname": "沂源县"
}
]
,
"5989": [
{
"_districtid":5990,
"_cityid":5989,
"_districtname": "市中区"
}
,{
"_districtid":5991,
"_cityid":5989,
"_districtname": "薛城区"
}
,{
"_districtid":5992,
"_cityid":5989,
"_districtname": "峄城区"
}
,{
"_districtid":5993,
"_cityid":5989,
"_districtname": "台儿庄区"
}
,{
"_districtid":5994,
"_cityid":5989,
"_districtname": "山亭区"
}
,{
"_districtid":5995,
"_cityid":5989,
"_districtname": "滕州市"
}
]
,
"5996": [
{
"_districtid":5997,
"_cityid":5996,
"_districtname": "东营区"
}
,{
"_districtid":5998,
"_cityid":5996,
"_districtname": "河口区"
}
,{
"_districtid":5999,
"_cityid":5996,
"_districtname": "垦利县"
}
,{
"_districtid":6000,
"_cityid":5996,
"_districtname": "利津县"
}
,{
"_districtid":6001,
"_cityid":5996,
"_districtname": "广饶县"
}
]
,
"6002": [
{
"_districtid":6003,
"_cityid":6002,
"_districtname": "芝罘区"
}
,{
"_districtid":6004,
"_cityid":6002,
"_districtname": "福山区"
}
,{
"_districtid":6005,
"_cityid":6002,
"_districtname": "牟平区"
}
,{
"_districtid":6006,
"_cityid":6002,
"_districtname": "莱山区"
}
,{
"_districtid":6007,
"_cityid":6002,
"_districtname": "长岛县"
}
,{
"_districtid":6008,
"_cityid":6002,
"_districtname": "龙口市"
}
,{
"_districtid":6009,
"_cityid":6002,
"_districtname": "莱阳市"
}
,{
"_districtid":6010,
"_cityid":6002,
"_districtname": "莱州市"
}
,{
"_districtid":6011,
"_cityid":6002,
"_districtname": "蓬莱市"
}
,{
"_districtid":6012,
"_cityid":6002,
"_districtname": "招远市"
}
,{
"_districtid":6013,
"_cityid":6002,
"_districtname": "栖霞市"
}
,{
"_districtid":6014,
"_cityid":6002,
"_districtname": "海阳市"
}
]
,
"6015": [
{
"_districtid":6016,
"_cityid":6015,
"_districtname": "潍城区"
}
,{
"_districtid":6017,
"_cityid":6015,
"_districtname": "寒亭区"
}
,{
"_districtid":6018,
"_cityid":6015,
"_districtname": "坊子区"
}
,{
"_districtid":6019,
"_cityid":6015,
"_districtname": "奎文区"
}
,{
"_districtid":6020,
"_cityid":6015,
"_districtname": "临朐县"
}
,{
"_districtid":6021,
"_cityid":6015,
"_districtname": "昌乐县"
}
,{
"_districtid":6022,
"_cityid":6015,
"_districtname": "青州市"
}
,{
"_districtid":6023,
"_cityid":6015,
"_districtname": "诸城市"
}
,{
"_districtid":6024,
"_cityid":6015,
"_districtname": "寿光市"
}
,{
"_districtid":6025,
"_cityid":6015,
"_districtname": "安丘市"
}
,{
"_districtid":6026,
"_cityid":6015,
"_districtname": "高密市"
}
,{
"_districtid":6027,
"_cityid":6015,
"_districtname": "昌邑市"
}
]
,
"6028": [
{
"_districtid":6029,
"_cityid":6028,
"_districtname": "市中区"
}
,{
"_districtid":6030,
"_cityid":6028,
"_districtname": "任城区"
}
,{
"_districtid":6031,
"_cityid":6028,
"_districtname": "微山县"
}
,{
"_districtid":6032,
"_cityid":6028,
"_districtname": "鱼台县"
}
,{
"_districtid":6033,
"_cityid":6028,
"_districtname": "金乡县"
}
,{
"_districtid":6034,
"_cityid":6028,
"_districtname": "嘉祥县"
}
,{
"_districtid":6035,
"_cityid":6028,
"_districtname": "汶上县"
}
,{
"_districtid":6036,
"_cityid":6028,
"_districtname": "泗水县"
}
,{
"_districtid":6037,
"_cityid":6028,
"_districtname": "梁山县"
}
,{
"_districtid":6038,
"_cityid":6028,
"_districtname": "曲阜市"
}
,{
"_districtid":6039,
"_cityid":6028,
"_districtname": "兖州市"
}
,{
"_districtid":6040,
"_cityid":6028,
"_districtname": "邹城市"
}
]
,
"6041": [
{
"_districtid":6042,
"_cityid":6041,
"_districtname": "泰山区"
}
,{
"_districtid":6043,
"_cityid":6041,
"_districtname": "岱岳区"
}
,{
"_districtid":6044,
"_cityid":6041,
"_districtname": "宁阳县"
}
,{
"_districtid":6045,
"_cityid":6041,
"_districtname": "东平县"
}
,{
"_districtid":6046,
"_cityid":6041,
"_districtname": "新泰市"
}
,{
"_districtid":6047,
"_cityid":6041,
"_districtname": "肥城市"
}
]
,
"6048": [
{
"_districtid":6049,
"_cityid":6048,
"_districtname": "环翠区"
}
,{
"_districtid":6050,
"_cityid":6048,
"_districtname": "文登市"
}
,{
"_districtid":6051,
"_cityid":6048,
"_districtname": "荣成市"
}
,{
"_districtid":6052,
"_cityid":6048,
"_districtname": "乳山市"
}
]
,
"6053": [
{
"_districtid":6054,
"_cityid":6053,
"_districtname": "东港区"
}
,{
"_districtid":6055,
"_cityid":6053,
"_districtname": "岚山区"
}
,{
"_districtid":6056,
"_cityid":6053,
"_districtname": "五莲县"
}
,{
"_districtid":6057,
"_cityid":6053,
"_districtname": "莒县"
}
]
,
"6058": [
{
"_districtid":6059,
"_cityid":6058,
"_districtname": "莱城区"
}
,{
"_districtid":6060,
"_cityid":6058,
"_districtname": "钢城区"
}
]
,
"6061": [
{
"_districtid":6062,
"_cityid":6061,
"_districtname": "兰山区"
}
,{
"_districtid":6063,
"_cityid":6061,
"_districtname": "罗庄区"
}
,{
"_districtid":6064,
"_cityid":6061,
"_districtname": "河东区"
}
,{
"_districtid":6065,
"_cityid":6061,
"_districtname": "沂南县"
}
,{
"_districtid":6066,
"_cityid":6061,
"_districtname": "郯城县"
}
,{
"_districtid":6067,
"_cityid":6061,
"_districtname": "沂水县"
}
,{
"_districtid":6068,
"_cityid":6061,
"_districtname": "苍山县"
}
,{
"_districtid":6069,
"_cityid":6061,
"_districtname": "费县"
}
,{
"_districtid":6070,
"_cityid":6061,
"_districtname": "平邑县"
}
,{
"_districtid":6071,
"_cityid":6061,
"_districtname": "莒南县"
}
,{
"_districtid":6072,
"_cityid":6061,
"_districtname": "蒙阴县"
}
,{
"_districtid":6073,
"_cityid":6061,
"_districtname": "临沭县"
}
]
,
"6074": [
{
"_districtid":6075,
"_cityid":6074,
"_districtname": "德城区"
}
,{
"_districtid":6076,
"_cityid":6074,
"_districtname": "陵县"
}
,{
"_districtid":6077,
"_cityid":6074,
"_districtname": "宁津县"
}
,{
"_districtid":6078,
"_cityid":6074,
"_districtname": "庆云县"
}
,{
"_districtid":6079,
"_cityid":6074,
"_districtname": "临邑县"
}
,{
"_districtid":6080,
"_cityid":6074,
"_districtname": "齐河县"
}
,{
"_districtid":6081,
"_cityid":6074,
"_districtname": "平原县"
}
,{
"_districtid":6082,
"_cityid":6074,
"_districtname": "夏津县"
}
,{
"_districtid":6083,
"_cityid":6074,
"_districtname": "武城县"
}
,{
"_districtid":6084,
"_cityid":6074,
"_districtname": "乐陵市"
}
,{
"_districtid":6085,
"_cityid":6074,
"_districtname": "禹城市"
}
]
,
"6086": [
{
"_districtid":6087,
"_cityid":6086,
"_districtname": "东昌府区"
}
,{
"_districtid":6088,
"_cityid":6086,
"_districtname": "阳谷县"
}
,{
"_districtid":6089,
"_cityid":6086,
"_districtname": "莘县"
}
,{
"_districtid":6090,
"_cityid":6086,
"_districtname": "茌平县"
}
,{
"_districtid":6091,
"_cityid":6086,
"_districtname": "东阿县"
}
,{
"_districtid":6092,
"_cityid":6086,
"_districtname": "冠县"
}
,{
"_districtid":6093,
"_cityid":6086,
"_districtname": "高唐县"
}
,{
"_districtid":6094,
"_cityid":6086,
"_districtname": "临清市"
}
]
,
"6095": [
{
"_districtid":6096,
"_cityid":6095,
"_districtname": "滨城区"
}
,{
"_districtid":6097,
"_cityid":6095,
"_districtname": "惠民县"
}
,{
"_districtid":6098,
"_cityid":6095,
"_districtname": "阳信县"
}
,{
"_districtid":6099,
"_cityid":6095,
"_districtname": "无棣县"
}
,{
"_districtid":6100,
"_cityid":6095,
"_districtname": "沾化县"
}
,{
"_districtid":6101,
"_cityid":6095,
"_districtname": "博兴县"
}
,{
"_districtid":6102,
"_cityid":6095,
"_districtname": "邹平县"
}
]
,
"6103": [
{
"_districtid":6104,
"_cityid":6103,
"_districtname": "牡丹区"
}
,{
"_districtid":6105,
"_cityid":6103,
"_districtname": "曹县"
}
,{
"_districtid":6106,
"_cityid":6103,
"_districtname": "单县"
}
,{
"_districtid":6107,
"_cityid":6103,
"_districtname": "成武县"
}
,{
"_districtid":6108,
"_cityid":6103,
"_districtname": "巨野县"
}
,{
"_districtid":6109,
"_cityid":6103,
"_districtname": "郓城县"
}
,{
"_districtid":6110,
"_cityid":6103,
"_districtname": "鄄城县"
}
,{
"_districtid":6111,
"_cityid":6103,
"_districtname": "定陶县"
}
,{
"_districtid":6112,
"_cityid":6103,
"_districtname": "东明县"
}
]
,
"7892": [
]
,
"6114": [
{
"_districtid":6115,
"_cityid":6114,
"_districtname": "中原区"
}
,{
"_districtid":6116,
"_cityid":6114,
"_districtname": "二七区"
}
,{
"_districtid":6117,
"_cityid":6114,
"_districtname": "管城回族区"
}
,{
"_districtid":6118,
"_cityid":6114,
"_districtname": "金水区"
}
,{
"_districtid":6119,
"_cityid":6114,
"_districtname": "上街区"
}
,{
"_districtid":6120,
"_cityid":6114,
"_districtname": "惠济区"
}
,{
"_districtid":6121,
"_cityid":6114,
"_districtname": "中牟县"
}
,{
"_districtid":6122,
"_cityid":6114,
"_districtname": "巩义市"
}
,{
"_districtid":6123,
"_cityid":6114,
"_districtname": "荥阳市"
}
,{
"_districtid":6124,
"_cityid":6114,
"_districtname": "新密市"
}
,{
"_districtid":6125,
"_cityid":6114,
"_districtname": "新郑市"
}
,{
"_districtid":6126,
"_cityid":6114,
"_districtname": "登封市"
}
,{
"_districtid":6127,
"_cityid":6114,
"_districtname": "郑州新区"
}
]
,
"6128": [
{
"_districtid":6129,
"_cityid":6128,
"_districtname": "龙亭区"
}
,{
"_districtid":6130,
"_cityid":6128,
"_districtname": "顺河回族区"
}
,{
"_districtid":6131,
"_cityid":6128,
"_districtname": "鼓楼区"
}
,{
"_districtid":6132,
"_cityid":6128,
"_districtname": "禹王台区"
}
,{
"_districtid":6133,
"_cityid":6128,
"_districtname": "金明区"
}
,{
"_districtid":6134,
"_cityid":6128,
"_districtname": "杞县"
}
,{
"_districtid":6135,
"_cityid":6128,
"_districtname": "通许县"
}
,{
"_districtid":6136,
"_cityid":6128,
"_districtname": "尉氏县"
}
,{
"_districtid":6137,
"_cityid":6128,
"_districtname": "开封县"
}
,{
"_districtid":6138,
"_cityid":6128,
"_districtname": "兰考县"
}
]
,
"6139": [
{
"_districtid":6140,
"_cityid":6139,
"_districtname": "老城区"
}
,{
"_districtid":6141,
"_cityid":6139,
"_districtname": "西工区"
}
,{
"_districtid":6142,
"_cityid":6139,
"_districtname": "瀍河回族区"
}
,{
"_districtid":6143,
"_cityid":6139,
"_districtname": "涧西区"
}
,{
"_districtid":6144,
"_cityid":6139,
"_districtname": "吉利区"
}
,{
"_districtid":6145,
"_cityid":6139,
"_districtname": "洛龙区"
}
,{
"_districtid":6146,
"_cityid":6139,
"_districtname": "孟津县"
}
,{
"_districtid":6147,
"_cityid":6139,
"_districtname": "新安县"
}
,{
"_districtid":6148,
"_cityid":6139,
"_districtname": "栾川县"
}
,{
"_districtid":6149,
"_cityid":6139,
"_districtname": "嵩县"
}
,{
"_districtid":6150,
"_cityid":6139,
"_districtname": "汝阳县"
}
,{
"_districtid":6151,
"_cityid":6139,
"_districtname": "宜阳县"
}
,{
"_districtid":6152,
"_cityid":6139,
"_districtname": "洛宁县"
}
,{
"_districtid":6153,
"_cityid":6139,
"_districtname": "伊川县"
}
,{
"_districtid":6154,
"_cityid":6139,
"_districtname": "偃师市"
}
]
,
"6155": [
{
"_districtid":6156,
"_cityid":6155,
"_districtname": "新华区"
}
,{
"_districtid":6157,
"_cityid":6155,
"_districtname": "卫东区"
}
,{
"_districtid":6158,
"_cityid":6155,
"_districtname": "石龙区"
}
,{
"_districtid":6159,
"_cityid":6155,
"_districtname": "湛河区"
}
,{
"_districtid":6160,
"_cityid":6155,
"_districtname": "宝丰县"
}
,{
"_districtid":6161,
"_cityid":6155,
"_districtname": "叶县"
}
,{
"_districtid":6162,
"_cityid":6155,
"_districtname": "鲁山县"
}
,{
"_districtid":6163,
"_cityid":6155,
"_districtname": "郏县"
}
,{
"_districtid":6164,
"_cityid":6155,
"_districtname": "舞钢市"
}
,{
"_districtid":6165,
"_cityid":6155,
"_districtname": "汝州市"
}
]
,
"6166": [
{
"_districtid":6167,
"_cityid":6166,
"_districtname": "文峰区"
}
,{
"_districtid":6168,
"_cityid":6166,
"_districtname": "北关区"
}
,{
"_districtid":6169,
"_cityid":6166,
"_districtname": "殷都区"
}
,{
"_districtid":6170,
"_cityid":6166,
"_districtname": "龙安区"
}
,{
"_districtid":6171,
"_cityid":6166,
"_districtname": "安阳县"
}
,{
"_districtid":6172,
"_cityid":6166,
"_districtname": "汤阴县"
}
,{
"_districtid":6173,
"_cityid":6166,
"_districtname": "滑县"
}
,{
"_districtid":6174,
"_cityid":6166,
"_districtname": "内黄县"
}
,{
"_districtid":6175,
"_cityid":6166,
"_districtname": "林州市"
}
]
,
"6176": [
{
"_districtid":6177,
"_cityid":6176,
"_districtname": "鹤山区"
}
,{
"_districtid":6178,
"_cityid":6176,
"_districtname": "山城区"
}
,{
"_districtid":6179,
"_cityid":6176,
"_districtname": "淇滨区"
}
,{
"_districtid":6180,
"_cityid":6176,
"_districtname": "浚县"
}
,{
"_districtid":6181,
"_cityid":6176,
"_districtname": "淇县"
}
]
,
"6182": [
{
"_districtid":6183,
"_cityid":6182,
"_districtname": "红旗区"
}
,{
"_districtid":6184,
"_cityid":6182,
"_districtname": "卫滨区"
}
,{
"_districtid":6185,
"_cityid":6182,
"_districtname": "凤泉区"
}
,{
"_districtid":6186,
"_cityid":6182,
"_districtname": "牧野区"
}
,{
"_districtid":6187,
"_cityid":6182,
"_districtname": "新乡县"
}
,{
"_districtid":6188,
"_cityid":6182,
"_districtname": "获嘉县"
}
,{
"_districtid":6189,
"_cityid":6182,
"_districtname": "原阳县"
}
,{
"_districtid":6190,
"_cityid":6182,
"_districtname": "延津县"
}
,{
"_districtid":6191,
"_cityid":6182,
"_districtname": "封丘县"
}
,{
"_districtid":6192,
"_cityid":6182,
"_districtname": "长垣县"
}
,{
"_districtid":6193,
"_cityid":6182,
"_districtname": "卫辉市"
}
,{
"_districtid":6194,
"_cityid":6182,
"_districtname": "辉县市"
}
]
,
"6195": [
{
"_districtid":6196,
"_cityid":6195,
"_districtname": "解放区"
}
,{
"_districtid":6197,
"_cityid":6195,
"_districtname": "中站区"
}
,{
"_districtid":6198,
"_cityid":6195,
"_districtname": "马村区"
}
,{
"_districtid":6199,
"_cityid":6195,
"_districtname": "山阳区"
}
,{
"_districtid":6200,
"_cityid":6195,
"_districtname": "修武县"
}
,{
"_districtid":6201,
"_cityid":6195,
"_districtname": "博爱县"
}
,{
"_districtid":6202,
"_cityid":6195,
"_districtname": "武陟县"
}
,{
"_districtid":6203,
"_cityid":6195,
"_districtname": "温县"
}
,{
"_districtid":6204,
"_cityid":6195,
"_districtname": "沁阳市"
}
,{
"_districtid":6205,
"_cityid":6195,
"_districtname": "孟州市"
}
]
,
"6206": [
{
"_districtid":6207,
"_cityid":6206,
"_districtname": "华龙区"
}
,{
"_districtid":6208,
"_cityid":6206,
"_districtname": "清丰县"
}
,{
"_districtid":6209,
"_cityid":6206,
"_districtname": "南乐县"
}
,{
"_districtid":6210,
"_cityid":6206,
"_districtname": "范县"
}
,{
"_districtid":6211,
"_cityid":6206,
"_districtname": "台前县"
}
,{
"_districtid":6212,
"_cityid":6206,
"_districtname": "濮阳县"
}
]
,
"6213": [
{
"_districtid":6214,
"_cityid":6213,
"_districtname": "魏都区"
}
,{
"_districtid":6215,
"_cityid":6213,
"_districtname": "许昌县"
}
,{
"_districtid":6216,
"_cityid":6213,
"_districtname": "鄢陵县"
}
,{
"_districtid":6217,
"_cityid":6213,
"_districtname": "襄城县"
}
,{
"_districtid":6218,
"_cityid":6213,
"_districtname": "禹州市"
}
,{
"_districtid":6219,
"_cityid":6213,
"_districtname": "长葛市"
}
]
,
"6220": [
{
"_districtid":6221,
"_cityid":6220,
"_districtname": "源汇区"
}
,{
"_districtid":6222,
"_cityid":6220,
"_districtname": "郾城区"
}
,{
"_districtid":6223,
"_cityid":6220,
"_districtname": "召陵区"
}
,{
"_districtid":6224,
"_cityid":6220,
"_districtname": "舞阳县"
}
,{
"_districtid":6225,
"_cityid":6220,
"_districtname": "临颍县"
}
]
,
"6226": [
{
"_districtid":6227,
"_cityid":6226,
"_districtname": "湖滨区"
}
,{
"_districtid":6228,
"_cityid":6226,
"_districtname": "渑池县"
}
,{
"_districtid":6229,
"_cityid":6226,
"_districtname": "陕县"
}
,{
"_districtid":6230,
"_cityid":6226,
"_districtname": "卢氏县"
}
,{
"_districtid":6231,
"_cityid":6226,
"_districtname": "义马市"
}
,{
"_districtid":6232,
"_cityid":6226,
"_districtname": "灵宝市"
}
]
,
"6233": [
{
"_districtid":6234,
"_cityid":6233,
"_districtname": "宛城区"
}
,{
"_districtid":6235,
"_cityid":6233,
"_districtname": "卧龙区"
}
,{
"_districtid":6236,
"_cityid":6233,
"_districtname": "南召县"
}
,{
"_districtid":6237,
"_cityid":6233,
"_districtname": "方城县"
}
,{
"_districtid":6238,
"_cityid":6233,
"_districtname": "西峡县"
}
,{
"_districtid":6239,
"_cityid":6233,
"_districtname": "镇平县"
}
,{
"_districtid":6240,
"_cityid":6233,
"_districtname": "内乡县"
}
,{
"_districtid":6241,
"_cityid":6233,
"_districtname": "淅川县"
}
,{
"_districtid":6242,
"_cityid":6233,
"_districtname": "社旗县"
}
,{
"_districtid":6243,
"_cityid":6233,
"_districtname": "唐河县"
}
,{
"_districtid":6244,
"_cityid":6233,
"_districtname": "新野县"
}
,{
"_districtid":6245,
"_cityid":6233,
"_districtname": "桐柏县"
}
,{
"_districtid":6246,
"_cityid":6233,
"_districtname": "邓州市"
}
]
,
"6247": [
{
"_districtid":6248,
"_cityid":6247,
"_districtname": "梁园区"
}
,{
"_districtid":6249,
"_cityid":6247,
"_districtname": "睢阳区"
}
,{
"_districtid":6250,
"_cityid":6247,
"_districtname": "民权县"
}
,{
"_districtid":6251,
"_cityid":6247,
"_districtname": "睢县"
}
,{
"_districtid":6252,
"_cityid":6247,
"_districtname": "宁陵县"
}
,{
"_districtid":6253,
"_cityid":6247,
"_districtname": "柘城县"
}
,{
"_districtid":6254,
"_cityid":6247,
"_districtname": "虞城县"
}
,{
"_districtid":6255,
"_cityid":6247,
"_districtname": "夏邑县"
}
,{
"_districtid":6256,
"_cityid":6247,
"_districtname": "永城市"
}
]
,
"6257": [
{
"_districtid":6258,
"_cityid":6257,
"_districtname": "浉河区"
}
,{
"_districtid":6259,
"_cityid":6257,
"_districtname": "平桥区"
}
,{
"_districtid":6260,
"_cityid":6257,
"_districtname": "罗山县"
}
,{
"_districtid":6261,
"_cityid":6257,
"_districtname": "光山县"
}
,{
"_districtid":6262,
"_cityid":6257,
"_districtname": "新县"
}
,{
"_districtid":6263,
"_cityid":6257,
"_districtname": "商城县"
}
,{
"_districtid":6264,
"_cityid":6257,
"_districtname": "固始县"
}
,{
"_districtid":6265,
"_cityid":6257,
"_districtname": "潢川县"
}
,{
"_districtid":6266,
"_cityid":6257,
"_districtname": "淮滨县"
}
,{
"_districtid":6267,
"_cityid":6257,
"_districtname": "息县"
}
]
,
"6268": [
{
"_districtid":6269,
"_cityid":6268,
"_districtname": "川汇区"
}
,{
"_districtid":6270,
"_cityid":6268,
"_districtname": "扶沟县"
}
,{
"_districtid":6271,
"_cityid":6268,
"_districtname": "西华县"
}
,{
"_districtid":6272,
"_cityid":6268,
"_districtname": "商水县"
}
,{
"_districtid":6273,
"_cityid":6268,
"_districtname": "沈丘县"
}
,{
"_districtid":6274,
"_cityid":6268,
"_districtname": "郸城县"
}
,{
"_districtid":6275,
"_cityid":6268,
"_districtname": "淮阳县"
}
,{
"_districtid":6276,
"_cityid":6268,
"_districtname": "太康县"
}
,{
"_districtid":6277,
"_cityid":6268,
"_districtname": "鹿邑县"
}
,{
"_districtid":6278,
"_cityid":6268,
"_districtname": "项城市"
}
]
,
"6279": [
{
"_districtid":6280,
"_cityid":6279,
"_districtname": "驿城区"
}
,{
"_districtid":6281,
"_cityid":6279,
"_districtname": "西平县"
}
,{
"_districtid":6282,
"_cityid":6279,
"_districtname": "上蔡县"
}
,{
"_districtid":6283,
"_cityid":6279,
"_districtname": "平舆县"
}
,{
"_districtid":6284,
"_cityid":6279,
"_districtname": "正阳县"
}
,{
"_districtid":6285,
"_cityid":6279,
"_districtname": "确山县"
}
,{
"_districtid":6286,
"_cityid":6279,
"_districtname": "泌阳县"
}
,{
"_districtid":6287,
"_cityid":6279,
"_districtname": "汝南县"
}
,{
"_districtid":6288,
"_cityid":6279,
"_districtname": "遂平县"
}
,{
"_districtid":6289,
"_cityid":6279,
"_districtname": "新蔡县"
}
]
,
"6290": [
]
,
"6292": [
{
"_districtid":6293,
"_cityid":6292,
"_districtname": "江岸区"
}
,{
"_districtid":6294,
"_cityid":6292,
"_districtname": "江汉区"
}
,{
"_districtid":6295,
"_cityid":6292,
"_districtname": "硚口区"
}
,{
"_districtid":6296,
"_cityid":6292,
"_districtname": "汉阳区"
}
,{
"_districtid":6297,
"_cityid":6292,
"_districtname": "武昌区"
}
,{
"_districtid":6298,
"_cityid":6292,
"_districtname": "青山区"
}
,{
"_districtid":6299,
"_cityid":6292,
"_districtname": "洪山区"
}
,{
"_districtid":6300,
"_cityid":6292,
"_districtname": "东西湖区"
}
,{
"_districtid":6301,
"_cityid":6292,
"_districtname": "汉南区"
}
,{
"_districtid":6302,
"_cityid":6292,
"_districtname": "蔡甸区"
}
,{
"_districtid":6303,
"_cityid":6292,
"_districtname": "江夏区"
}
,{
"_districtid":6304,
"_cityid":6292,
"_districtname": "黄陂区"
}
,{
"_districtid":6305,
"_cityid":6292,
"_districtname": "新洲区"
}
]
,
"6306": [
{
"_districtid":6307,
"_cityid":6306,
"_districtname": "黄石港区"
}
,{
"_districtid":6308,
"_cityid":6306,
"_districtname": "西塞山区"
}
,{
"_districtid":6309,
"_cityid":6306,
"_districtname": "下陆区"
}
,{
"_districtid":6310,
"_cityid":6306,
"_districtname": "铁山区"
}
,{
"_districtid":6311,
"_cityid":6306,
"_districtname": "阳新县"
}
,{
"_districtid":6312,
"_cityid":6306,
"_districtname": "大冶市"
}
]
,
"6313": [
{
"_districtid":6314,
"_cityid":6313,
"_districtname": "茅箭区"
}
,{
"_districtid":6315,
"_cityid":6313,
"_districtname": "张湾区"
}
,{
"_districtid":6316,
"_cityid":6313,
"_districtname": "郧县"
}
,{
"_districtid":6317,
"_cityid":6313,
"_districtname": "郧西县"
}
,{
"_districtid":6318,
"_cityid":6313,
"_districtname": "竹山县"
}
,{
"_districtid":6319,
"_cityid":6313,
"_districtname": "竹溪县"
}
,{
"_districtid":6320,
"_cityid":6313,
"_districtname": "房县"
}
,{
"_districtid":6321,
"_cityid":6313,
"_districtname": "丹江口市"
}
]
,
"6322": [
{
"_districtid":6323,
"_cityid":6322,
"_districtname": "西陵区"
}
,{
"_districtid":6324,
"_cityid":6322,
"_districtname": "伍家岗区"
}
,{
"_districtid":6325,
"_cityid":6322,
"_districtname": "点军区"
}
,{
"_districtid":6326,
"_cityid":6322,
"_districtname": "猇亭区"
}
,{
"_districtid":6327,
"_cityid":6322,
"_districtname": "夷陵区"
}
,{
"_districtid":6328,
"_cityid":6322,
"_districtname": "远安县"
}
,{
"_districtid":6329,
"_cityid":6322,
"_districtname": "兴山县"
}
,{
"_districtid":6330,
"_cityid":6322,
"_districtname": "秭归县"
}
,{
"_districtid":6331,
"_cityid":6322,
"_districtname": "长阳土家族自治县"
}
,{
"_districtid":6332,
"_cityid":6322,
"_districtname": "五峰土家族自治县"
}
,{
"_districtid":6333,
"_cityid":6322,
"_districtname": "宜都市"
}
,{
"_districtid":6334,
"_cityid":6322,
"_districtname": "当阳市"
}
,{
"_districtid":6335,
"_cityid":6322,
"_districtname": "枝江市"
}
]
,
"6336": [
{
"_districtid":6337,
"_cityid":6336,
"_districtname": "襄城区"
}
,{
"_districtid":6338,
"_cityid":6336,
"_districtname": "樊城区"
}
,{
"_districtid":6339,
"_cityid":6336,
"_districtname": "襄州区"
}
,{
"_districtid":6340,
"_cityid":6336,
"_districtname": "南漳县"
}
,{
"_districtid":6341,
"_cityid":6336,
"_districtname": "谷城县"
}
,{
"_districtid":6342,
"_cityid":6336,
"_districtname": "保康县"
}
,{
"_districtid":6343,
"_cityid":6336,
"_districtname": "老河口市"
}
,{
"_districtid":6344,
"_cityid":6336,
"_districtname": "枣阳市"
}
,{
"_districtid":6345,
"_cityid":6336,
"_districtname": "宜城市"
}
]
,
"6346": [
{
"_districtid":6347,
"_cityid":6346,
"_districtname": "梁子湖区"
}
,{
"_districtid":6348,
"_cityid":6346,
"_districtname": "华容区"
}
,{
"_districtid":6349,
"_cityid":6346,
"_districtname": "鄂城区"
}
]
,
"6350": [
{
"_districtid":6351,
"_cityid":6350,
"_districtname": "东宝区"
}
,{
"_districtid":6352,
"_cityid":6350,
"_districtname": "掇刀区"
}
,{
"_districtid":6353,
"_cityid":6350,
"_districtname": "京山县"
}
,{
"_districtid":6354,
"_cityid":6350,
"_districtname": "沙洋县"
}
,{
"_districtid":6355,
"_cityid":6350,
"_districtname": "钟祥市"
}
]
,
"6356": [
{
"_districtid":6357,
"_cityid":6356,
"_districtname": "孝南区"
}
,{
"_districtid":6358,
"_cityid":6356,
"_districtname": "孝昌县"
}
,{
"_districtid":6359,
"_cityid":6356,
"_districtname": "大悟县"
}
,{
"_districtid":6360,
"_cityid":6356,
"_districtname": "云梦县"
}
,{
"_districtid":6361,
"_cityid":6356,
"_districtname": "应城市"
}
,{
"_districtid":6362,
"_cityid":6356,
"_districtname": "安陆市"
}
,{
"_districtid":6363,
"_cityid":6356,
"_districtname": "汉川市"
}
]
,
"6364": [
{
"_districtid":6365,
"_cityid":6364,
"_districtname": "沙市区"
}
,{
"_districtid":6366,
"_cityid":6364,
"_districtname": "荆州区"
}
,{
"_districtid":6367,
"_cityid":6364,
"_districtname": "公安县"
}
,{
"_districtid":6368,
"_cityid":6364,
"_districtname": "监利县"
}
,{
"_districtid":6369,
"_cityid":6364,
"_districtname": "江陵县"
}
,{
"_districtid":6370,
"_cityid":6364,
"_districtname": "石首市"
}
,{
"_districtid":6371,
"_cityid":6364,
"_districtname": "洪湖市"
}
,{
"_districtid":6372,
"_cityid":6364,
"_districtname": "松滋市"
}
]
,
"6373": [
{
"_districtid":6374,
"_cityid":6373,
"_districtname": "黄州区"
}
,{
"_districtid":6375,
"_cityid":6373,
"_districtname": "团风县"
}
,{
"_districtid":6376,
"_cityid":6373,
"_districtname": "红安县"
}
,{
"_districtid":6377,
"_cityid":6373,
"_districtname": "罗田县"
}
,{
"_districtid":6378,
"_cityid":6373,
"_districtname": "英山县"
}
,{
"_districtid":6379,
"_cityid":6373,
"_districtname": "浠水县"
}
,{
"_districtid":6380,
"_cityid":6373,
"_districtname": "蕲春县"
}
,{
"_districtid":6381,
"_cityid":6373,
"_districtname": "黄梅县"
}
,{
"_districtid":6382,
"_cityid":6373,
"_districtname": "麻城市"
}
,{
"_districtid":6383,
"_cityid":6373,
"_districtname": "武穴市"
}
]
,
"6384": [
{
"_districtid":6385,
"_cityid":6384,
"_districtname": "咸安区"
}
,{
"_districtid":6386,
"_cityid":6384,
"_districtname": "嘉鱼县"
}
,{
"_districtid":6387,
"_cityid":6384,
"_districtname": "通城县"
}
,{
"_districtid":6388,
"_cityid":6384,
"_districtname": "崇阳县"
}
,{
"_districtid":6389,
"_cityid":6384,
"_districtname": "通山县"
}
,{
"_districtid":6390,
"_cityid":6384,
"_districtname": "赤壁市"
}
]
,
"6391": [
{
"_districtid":6392,
"_cityid":6391,
"_districtname": "曾都区"
}
,{
"_districtid":6393,
"_cityid":6391,
"_districtname": "随县"
}
,{
"_districtid":6394,
"_cityid":6391,
"_districtname": "广水市"
}
]
,
"6395": [
{
"_districtid":6396,
"_cityid":6395,
"_districtname": "恩施市"
}
,{
"_districtid":6397,
"_cityid":6395,
"_districtname": "利川市"
}
,{
"_districtid":6398,
"_cityid":6395,
"_districtname": "建始县"
}
,{
"_districtid":6399,
"_cityid":6395,
"_districtname": "巴东县"
}
,{
"_districtid":6400,
"_cityid":6395,
"_districtname": "宣恩县"
}
,{
"_districtid":6401,
"_cityid":6395,
"_districtname": "咸丰县"
}
,{
"_districtid":6402,
"_cityid":6395,
"_districtname": "来凤县"
}
,{
"_districtid":6403,
"_cityid":6395,
"_districtname": "鹤峰县"
}
]
,
"6404": [
]
,
"6405": [
]
,
"6406": [
]
,
"6407": [
]
,
"6409": [
{
"_districtid":6410,
"_cityid":6409,
"_districtname": "芙蓉区"
}
,{
"_districtid":6411,
"_cityid":6409,
"_districtname": "天心区"
}
,{
"_districtid":6412,
"_cityid":6409,
"_districtname": "岳麓区"
}
,{
"_districtid":6413,
"_cityid":6409,
"_districtname": "开福区"
}
,{
"_districtid":6414,
"_cityid":6409,
"_districtname": "雨花区"
}
,{
"_districtid":6415,
"_cityid":6409,
"_districtname": "望城区"
}
,{
"_districtid":6416,
"_cityid":6409,
"_districtname": "长沙县"
}
,{
"_districtid":6417,
"_cityid":6409,
"_districtname": "宁乡县"
}
,{
"_districtid":6418,
"_cityid":6409,
"_districtname": "浏阳市"
}
]
,
"6419": [
{
"_districtid":6420,
"_cityid":6419,
"_districtname": "荷塘区"
}
,{
"_districtid":6421,
"_cityid":6419,
"_districtname": "芦淞区"
}
,{
"_districtid":6422,
"_cityid":6419,
"_districtname": "石峰区"
}
,{
"_districtid":6423,
"_cityid":6419,
"_districtname": "天元区"
}
,{
"_districtid":6424,
"_cityid":6419,
"_districtname": "株洲县"
}
,{
"_districtid":6425,
"_cityid":6419,
"_districtname": "攸县"
}
,{
"_districtid":6426,
"_cityid":6419,
"_districtname": "茶陵县"
}
,{
"_districtid":6427,
"_cityid":6419,
"_districtname": "炎陵县"
}
,{
"_districtid":6428,
"_cityid":6419,
"_districtname": "醴陵市"
}
]
,
"6429": [
{
"_districtid":6430,
"_cityid":6429,
"_districtname": "雨湖区"
}
,{
"_districtid":6431,
"_cityid":6429,
"_districtname": "岳塘区"
}
,{
"_districtid":6432,
"_cityid":6429,
"_districtname": "湘潭县"
}
,{
"_districtid":6433,
"_cityid":6429,
"_districtname": "湘乡市"
}
,{
"_districtid":6434,
"_cityid":6429,
"_districtname": "韶山市"
}
]
,
"6435": [
{
"_districtid":6436,
"_cityid":6435,
"_districtname": "珠晖区"
}
,{
"_districtid":6437,
"_cityid":6435,
"_districtname": "雁峰区"
}
,{
"_districtid":6438,
"_cityid":6435,
"_districtname": "石鼓区"
}
,{
"_districtid":6439,
"_cityid":6435,
"_districtname": "蒸湘区"
}
,{
"_districtid":6440,
"_cityid":6435,
"_districtname": "南岳区"
}
,{
"_districtid":6441,
"_cityid":6435,
"_districtname": "衡阳县"
}
,{
"_districtid":6442,
"_cityid":6435,
"_districtname": "衡南县"
}
,{
"_districtid":6443,
"_cityid":6435,
"_districtname": "衡山县"
}
,{
"_districtid":6444,
"_cityid":6435,
"_districtname": "衡东县"
}
,{
"_districtid":6445,
"_cityid":6435,
"_districtname": "祁东县"
}
,{
"_districtid":6446,
"_cityid":6435,
"_districtname": "耒阳市"
}
,{
"_districtid":6447,
"_cityid":6435,
"_districtname": "常宁市"
}
]
,
"6448": [
{
"_districtid":6449,
"_cityid":6448,
"_districtname": "双清区"
}
,{
"_districtid":6450,
"_cityid":6448,
"_districtname": "大祥区"
}
,{
"_districtid":6451,
"_cityid":6448,
"_districtname": "北塔区"
}
,{
"_districtid":6452,
"_cityid":6448,
"_districtname": "邵东县"
}
,{
"_districtid":6453,
"_cityid":6448,
"_districtname": "新邵县"
}
,{
"_districtid":6454,
"_cityid":6448,
"_districtname": "邵阳县"
}
,{
"_districtid":6455,
"_cityid":6448,
"_districtname": "隆回县"
}
,{
"_districtid":6456,
"_cityid":6448,
"_districtname": "洞口县"
}
,{
"_districtid":6457,
"_cityid":6448,
"_districtname": "绥宁县"
}
,{
"_districtid":6458,
"_cityid":6448,
"_districtname": "新宁县"
}
,{
"_districtid":6459,
"_cityid":6448,
"_districtname": "城步苗族自治县"
}
,{
"_districtid":6460,
"_cityid":6448,
"_districtname": "武冈市"
}
]
,
"6461": [
{
"_districtid":6462,
"_cityid":6461,
"_districtname": "岳阳楼区"
}
,{
"_districtid":6463,
"_cityid":6461,
"_districtname": "云溪区"
}
,{
"_districtid":6464,
"_cityid":6461,
"_districtname": "君山区"
}
,{
"_districtid":6465,
"_cityid":6461,
"_districtname": "岳阳县"
}
,{
"_districtid":6466,
"_cityid":6461,
"_districtname": "华容县"
}
,{
"_districtid":6467,
"_cityid":6461,
"_districtname": "湘阴县"
}
,{
"_districtid":6468,
"_cityid":6461,
"_districtname": "平江县"
}
,{
"_districtid":6469,
"_cityid":6461,
"_districtname": "汨罗市"
}
,{
"_districtid":6470,
"_cityid":6461,
"_districtname": "临湘市"
}
]
,
"6471": [
{
"_districtid":6472,
"_cityid":6471,
"_districtname": "武陵区"
}
,{
"_districtid":6473,
"_cityid":6471,
"_districtname": "鼎城区"
}
,{
"_districtid":6474,
"_cityid":6471,
"_districtname": "安乡县"
}
,{
"_districtid":6475,
"_cityid":6471,
"_districtname": "汉寿县"
}
,{
"_districtid":6476,
"_cityid":6471,
"_districtname": "澧县"
}
,{
"_districtid":6477,
"_cityid":6471,
"_districtname": "临澧县"
}
,{
"_districtid":6478,
"_cityid":6471,
"_districtname": "桃源县"
}
,{
"_districtid":6479,
"_cityid":6471,
"_districtname": "石门县"
}
,{
"_districtid":6480,
"_cityid":6471,
"_districtname": "津市市"
}
]
,
"6481": [
{
"_districtid":6482,
"_cityid":6481,
"_districtname": "永定区"
}
,{
"_districtid":6483,
"_cityid":6481,
"_districtname": "武陵源区"
}
,{
"_districtid":6484,
"_cityid":6481,
"_districtname": "慈利县"
}
,{
"_districtid":6485,
"_cityid":6481,
"_districtname": "桑植县"
}
]
,
"6486": [
{
"_districtid":6487,
"_cityid":6486,
"_districtname": "资阳区"
}
,{
"_districtid":6488,
"_cityid":6486,
"_districtname": "赫山区"
}
,{
"_districtid":6489,
"_cityid":6486,
"_districtname": "南县"
}
,{
"_districtid":6490,
"_cityid":6486,
"_districtname": "桃江县"
}
,{
"_districtid":6491,
"_cityid":6486,
"_districtname": "安化县"
}
,{
"_districtid":6492,
"_cityid":6486,
"_districtname": "沅江市"
}
]
,
"6493": [
{
"_districtid":6494,
"_cityid":6493,
"_districtname": "北湖区"
}
,{
"_districtid":6495,
"_cityid":6493,
"_districtname": "苏仙区"
}
,{
"_districtid":6496,
"_cityid":6493,
"_districtname": "桂阳县"
}
,{
"_districtid":6497,
"_cityid":6493,
"_districtname": "宜章县"
}
,{
"_districtid":6498,
"_cityid":6493,
"_districtname": "永兴县"
}
,{
"_districtid":6499,
"_cityid":6493,
"_districtname": "嘉禾县"
}
,{
"_districtid":6500,
"_cityid":6493,
"_districtname": "临武县"
}
,{
"_districtid":6501,
"_cityid":6493,
"_districtname": "汝城县"
}
,{
"_districtid":6502,
"_cityid":6493,
"_districtname": "桂东县"
}
,{
"_districtid":6503,
"_cityid":6493,
"_districtname": "安仁县"
}
,{
"_districtid":6504,
"_cityid":6493,
"_districtname": "资兴市"
}
]
,
"6505": [
{
"_districtid":6506,
"_cityid":6505,
"_districtname": "零陵区"
}
,{
"_districtid":6507,
"_cityid":6505,
"_districtname": "冷水滩区"
}
,{
"_districtid":6508,
"_cityid":6505,
"_districtname": "祁阳县"
}
,{
"_districtid":6509,
"_cityid":6505,
"_districtname": "东安县"
}
,{
"_districtid":6510,
"_cityid":6505,
"_districtname": "双牌县"
}
,{
"_districtid":6511,
"_cityid":6505,
"_districtname": "道县"
}
,{
"_districtid":6512,
"_cityid":6505,
"_districtname": "江永县"
}
,{
"_districtid":6513,
"_cityid":6505,
"_districtname": "宁远县"
}
,{
"_districtid":6514,
"_cityid":6505,
"_districtname": "蓝山县"
}
,{
"_districtid":6515,
"_cityid":6505,
"_districtname": "新田县"
}
,{
"_districtid":6516,
"_cityid":6505,
"_districtname": "江华瑶族自治县"
}
]
,
"6517": [
{
"_districtid":6518,
"_cityid":6517,
"_districtname": "鹤城区"
}
,{
"_districtid":6519,
"_cityid":6517,
"_districtname": "中方县"
}
,{
"_districtid":6520,
"_cityid":6517,
"_districtname": "沅陵县"
}
,{
"_districtid":6521,
"_cityid":6517,
"_districtname": "辰溪县"
}
,{
"_districtid":6522,
"_cityid":6517,
"_districtname": "溆浦县"
}
,{
"_districtid":6523,
"_cityid":6517,
"_districtname": "会同县"
}
,{
"_districtid":6524,
"_cityid":6517,
"_districtname": "麻阳苗族自治县"
}
,{
"_districtid":6525,
"_cityid":6517,
"_districtname": "新晃侗族自治县"
}
,{
"_districtid":6526,
"_cityid":6517,
"_districtname": "芷江侗族自治县"
}
,{
"_districtid":6527,
"_cityid":6517,
"_districtname": "靖州苗族侗族自治县"
}
,{
"_districtid":6528,
"_cityid":6517,
"_districtname": "通道侗族自治县"
}
,{
"_districtid":6529,
"_cityid":6517,
"_districtname": "洪江市"
}
]
,
"6530": [
{
"_districtid":6531,
"_cityid":6530,
"_districtname": "娄星区"
}
,{
"_districtid":6532,
"_cityid":6530,
"_districtname": "双峰县"
}
,{
"_districtid":6533,
"_cityid":6530,
"_districtname": "新化县"
}
,{
"_districtid":6534,
"_cityid":6530,
"_districtname": "冷水江市"
}
,{
"_districtid":6535,
"_cityid":6530,
"_districtname": "涟源市"
}
]
,
"6536": [
{
"_districtid":6537,
"_cityid":6536,
"_districtname": "吉首市"
}
,{
"_districtid":6538,
"_cityid":6536,
"_districtname": "泸溪县"
}
,{
"_districtid":6539,
"_cityid":6536,
"_districtname": "凤凰县"
}
,{
"_districtid":6540,
"_cityid":6536,
"_districtname": "花垣县"
}
,{
"_districtid":6541,
"_cityid":6536,
"_districtname": "保靖县"
}
,{
"_districtid":6542,
"_cityid":6536,
"_districtname": "古丈县"
}
,{
"_districtid":6543,
"_cityid":6536,
"_districtname": "永顺县"
}
,{
"_districtid":6544,
"_cityid":6536,
"_districtname": "龙山县"
}
]
,
"6546": [
{
"_districtid":6547,
"_cityid":6546,
"_districtname": "荔湾区"
}
,{
"_districtid":6548,
"_cityid":6546,
"_districtname": "越秀区"
}
,{
"_districtid":6549,
"_cityid":6546,
"_districtname": "海珠区"
}
,{
"_districtid":6550,
"_cityid":6546,
"_districtname": "天河区"
}
,{
"_districtid":6551,
"_cityid":6546,
"_districtname": "白云区"
}
,{
"_districtid":6552,
"_cityid":6546,
"_districtname": "黄埔区"
}
,{
"_districtid":6553,
"_cityid":6546,
"_districtname": "番禺区"
}
,{
"_districtid":6554,
"_cityid":6546,
"_districtname": "花都区"
}
,{
"_districtid":6555,
"_cityid":6546,
"_districtname": "南沙区"
}
,{
"_districtid":6556,
"_cityid":6546,
"_districtname": "萝岗区"
}
,{
"_districtid":6557,
"_cityid":6546,
"_districtname": "增城市"
}
,{
"_districtid":6558,
"_cityid":6546,
"_districtname": "从化市"
}
]
,
"6559": [
{
"_districtid":6560,
"_cityid":6559,
"_districtname": "武江区"
}
,{
"_districtid":6561,
"_cityid":6559,
"_districtname": "浈江区"
}
,{
"_districtid":6562,
"_cityid":6559,
"_districtname": "曲江区"
}
,{
"_districtid":6563,
"_cityid":6559,
"_districtname": "始兴县"
}
,{
"_districtid":6564,
"_cityid":6559,
"_districtname": "仁化县"
}
,{
"_districtid":6565,
"_cityid":6559,
"_districtname": "翁源县"
}
,{
"_districtid":6566,
"_cityid":6559,
"_districtname": "乳源瑶族自治县"
}
,{
"_districtid":6567,
"_cityid":6559,
"_districtname": "新丰县"
}
,{
"_districtid":6568,
"_cityid":6559,
"_districtname": "乐昌市"
}
,{
"_districtid":6569,
"_cityid":6559,
"_districtname": "南雄市"
}
]
,
"6570": [
{
"_districtid":6571,
"_cityid":6570,
"_districtname": "罗湖区"
}
,{
"_districtid":6572,
"_cityid":6570,
"_districtname": "福田区"
}
,{
"_districtid":6573,
"_cityid":6570,
"_districtname": "南山区"
}
,{
"_districtid":6574,
"_cityid":6570,
"_districtname": "宝安区"
}
,{
"_districtid":6575,
"_cityid":6570,
"_districtname": "龙岗区"
}
,{
"_districtid":6576,
"_cityid":6570,
"_districtname": "光明新区"
}
,{
"_districtid":6577,
"_cityid":6570,
"_districtname": "龙华新区"
}
,{
"_districtid":6578,
"_cityid":6570,
"_districtname": "坪山新区"
}
,{
"_districtid":6579,
"_cityid":6570,
"_districtname": "大鹏新区"
}
,{
"_districtid":6580,
"_cityid":6570,
"_districtname": "盐田区"
}
]
,
"6581": [
{
"_districtid":6582,
"_cityid":6581,
"_districtname": "香洲区"
}
,{
"_districtid":6583,
"_cityid":6581,
"_districtname": "斗门区"
}
,{
"_districtid":6584,
"_cityid":6581,
"_districtname": "金湾区"
}
]
,
"6585": [
{
"_districtid":6586,
"_cityid":6585,
"_districtname": "龙湖区"
}
,{
"_districtid":6587,
"_cityid":6585,
"_districtname": "金平区"
}
,{
"_districtid":6588,
"_cityid":6585,
"_districtname": "濠江区"
}
,{
"_districtid":6589,
"_cityid":6585,
"_districtname": "潮阳区"
}
,{
"_districtid":6590,
"_cityid":6585,
"_districtname": "潮南区"
}
,{
"_districtid":6591,
"_cityid":6585,
"_districtname": "澄海区"
}
,{
"_districtid":6592,
"_cityid":6585,
"_districtname": "南澳县"
}
]
,
"6593": [
{
"_districtid":6594,
"_cityid":6593,
"_districtname": "禅城区"
}
,{
"_districtid":6595,
"_cityid":6593,
"_districtname": "南海区"
}
,{
"_districtid":6596,
"_cityid":6593,
"_districtname": "顺德区"
}
,{
"_districtid":6597,
"_cityid":6593,
"_districtname": "三水区"
}
,{
"_districtid":6598,
"_cityid":6593,
"_districtname": "高明区"
}
]
,
"6599": [
{
"_districtid":6600,
"_cityid":6599,
"_districtname": "蓬江区"
}
,{
"_districtid":6601,
"_cityid":6599,
"_districtname": "江海区"
}
,{
"_districtid":6602,
"_cityid":6599,
"_districtname": "新会区"
}
,{
"_districtid":6603,
"_cityid":6599,
"_districtname": "台山市"
}
,{
"_districtid":6604,
"_cityid":6599,
"_districtname": "开平市"
}
,{
"_districtid":6605,
"_cityid":6599,
"_districtname": "鹤山市"
}
,{
"_districtid":6606,
"_cityid":6599,
"_districtname": "恩平市"
}
]
,
"6607": [
{
"_districtid":6608,
"_cityid":6607,
"_districtname": "赤坎区"
}
,{
"_districtid":6609,
"_cityid":6607,
"_districtname": "霞山区"
}
,{
"_districtid":6610,
"_cityid":6607,
"_districtname": "坡头区"
}
,{
"_districtid":6611,
"_cityid":6607,
"_districtname": "麻章区"
}
,{
"_districtid":6612,
"_cityid":6607,
"_districtname": "遂溪县"
}
,{
"_districtid":6613,
"_cityid":6607,
"_districtname": "徐闻县"
}
,{
"_districtid":6614,
"_cityid":6607,
"_districtname": "廉江市"
}
,{
"_districtid":6615,
"_cityid":6607,
"_districtname": "雷州市"
}
,{
"_districtid":6616,
"_cityid":6607,
"_districtname": "吴川市"
}
]
,
"6617": [
{
"_districtid":6618,
"_cityid":6617,
"_districtname": "茂南区"
}
,{
"_districtid":6619,
"_cityid":6617,
"_districtname": "茂港区"
}
,{
"_districtid":6620,
"_cityid":6617,
"_districtname": "电白县"
}
,{
"_districtid":6621,
"_cityid":6617,
"_districtname": "高州市"
}
,{
"_districtid":6622,
"_cityid":6617,
"_districtname": "化州市"
}
,{
"_districtid":6623,
"_cityid":6617,
"_districtname": "信宜市"
}
]
,
"6624": [
{
"_districtid":6625,
"_cityid":6624,
"_districtname": "端州区"
}
,{
"_districtid":6626,
"_cityid":6624,
"_districtname": "鼎湖区"
}
,{
"_districtid":6627,
"_cityid":6624,
"_districtname": "广宁县"
}
,{
"_districtid":6628,
"_cityid":6624,
"_districtname": "怀集县"
}
,{
"_districtid":6629,
"_cityid":6624,
"_districtname": "封开县"
}
,{
"_districtid":6630,
"_cityid":6624,
"_districtname": "德庆县"
}
,{
"_districtid":6631,
"_cityid":6624,
"_districtname": "高要市"
}
,{
"_districtid":6632,
"_cityid":6624,
"_districtname": "四会市"
}
]
,
"6633": [
{
"_districtid":6634,
"_cityid":6633,
"_districtname": "惠城区"
}
,{
"_districtid":6635,
"_cityid":6633,
"_districtname": "惠阳区"
}
,{
"_districtid":6636,
"_cityid":6633,
"_districtname": "博罗县"
}
,{
"_districtid":6637,
"_cityid":6633,
"_districtname": "惠东县"
}
,{
"_districtid":6638,
"_cityid":6633,
"_districtname": "龙门县"
}
]
,
"6639": [
{
"_districtid":6640,
"_cityid":6639,
"_districtname": "梅江区"
}
,{
"_districtid":6641,
"_cityid":6639,
"_districtname": "梅县"
}
,{
"_districtid":6642,
"_cityid":6639,
"_districtname": "大埔县"
}
,{
"_districtid":6643,
"_cityid":6639,
"_districtname": "丰顺县"
}
,{
"_districtid":6644,
"_cityid":6639,
"_districtname": "五华县"
}
,{
"_districtid":6645,
"_cityid":6639,
"_districtname": "平远县"
}
,{
"_districtid":6646,
"_cityid":6639,
"_districtname": "蕉岭县"
}
,{
"_districtid":6647,
"_cityid":6639,
"_districtname": "兴宁市"
}
]
,
"6648": [
{
"_districtid":6649,
"_cityid":6648,
"_districtname": "城区"
}
,{
"_districtid":6650,
"_cityid":6648,
"_districtname": "海丰县"
}
,{
"_districtid":6651,
"_cityid":6648,
"_districtname": "陆河县"
}
,{
"_districtid":6652,
"_cityid":6648,
"_districtname": "陆丰市"
}
,{
"_districtid":6653,
"_cityid":6648,
"_districtname": "东沙群岛"
}
]
,
"6654": [
{
"_districtid":6655,
"_cityid":6654,
"_districtname": "源城区"
}
,{
"_districtid":6656,
"_cityid":6654,
"_districtname": "紫金县"
}
,{
"_districtid":6657,
"_cityid":6654,
"_districtname": "龙川县"
}
,{
"_districtid":6658,
"_cityid":6654,
"_districtname": "连平县"
}
,{
"_districtid":6659,
"_cityid":6654,
"_districtname": "和平县"
}
,{
"_districtid":6660,
"_cityid":6654,
"_districtname": "东源县"
}
]
,
"6661": [
{
"_districtid":6662,
"_cityid":6661,
"_districtname": "江城区"
}
,{
"_districtid":6663,
"_cityid":6661,
"_districtname": "阳西县"
}
,{
"_districtid":6664,
"_cityid":6661,
"_districtname": "阳东县"
}
,{
"_districtid":6665,
"_cityid":6661,
"_districtname": "阳春市"
}
]
,
"6666": [
{
"_districtid":6667,
"_cityid":6666,
"_districtname": "清城区"
}
,{
"_districtid":6668,
"_cityid":6666,
"_districtname": "佛冈县"
}
,{
"_districtid":6669,
"_cityid":6666,
"_districtname": "阳山县"
}
,{
"_districtid":6670,
"_cityid":6666,
"_districtname": "连山壮族瑶族自治县"
}
,{
"_districtid":6671,
"_cityid":6666,
"_districtname": "连南瑶族自治县"
}
,{
"_districtid":6672,
"_cityid":6666,
"_districtname": "清新区"
}
,{
"_districtid":6673,
"_cityid":6666,
"_districtname": "英德市"
}
,{
"_districtid":6674,
"_cityid":6666,
"_districtname": "连州市"
}
]
,
"6675": [
{
"_districtid":6676,
"_cityid":6675,
"_districtname": "中堂镇"
}
,{
"_districtid":6677,
"_cityid":6675,
"_districtname": "东坑镇"
}
,{
"_districtid":6678,
"_cityid":6675,
"_districtname": "道滘镇"
}
,{
"_districtid":6679,
"_cityid":6675,
"_districtname": "沙田镇"
}
,{
"_districtid":6680,
"_cityid":6675,
"_districtname": "高埗镇"
}
,{
"_districtid":6681,
"_cityid":6675,
"_districtname": "石龙镇"
}
,{
"_districtid":6682,
"_cityid":6675,
"_districtname": "石排镇"
}
,{
"_districtid":6683,
"_cityid":6675,
"_districtname": "企石镇"
}
,{
"_districtid":6684,
"_cityid":6675,
"_districtname": "石碣镇"
}
,{
"_districtid":6685,
"_cityid":6675,
"_districtname": "洪梅镇"
}
,{
"_districtid":6686,
"_cityid":6675,
"_districtname": "麻涌镇"
}
,{
"_districtid":6687,
"_cityid":6675,
"_districtname": "桥头镇"
}
,{
"_districtid":6688,
"_cityid":6675,
"_districtname": "望牛墩镇"
}
,{
"_districtid":6689,
"_cityid":6675,
"_districtname": "茶山镇"
}
,{
"_districtid":6690,
"_cityid":6675,
"_districtname": "谢岗镇"
}
,{
"_districtid":6691,
"_cityid":6675,
"_districtname": "松山湖"
}
,{
"_districtid":6692,
"_cityid":6675,
"_districtname": "莞城区"
}
,{
"_districtid":6693,
"_cityid":6675,
"_districtname": "南城区"
}
,{
"_districtid":6694,
"_cityid":6675,
"_districtname": "长安镇"
}
,{
"_districtid":6695,
"_cityid":6675,
"_districtname": "寮步镇"
}
,{
"_districtid":6696,
"_cityid":6675,
"_districtname": "大岭山镇"
}
,{
"_districtid":6697,
"_cityid":6675,
"_districtname": "常平镇"
}
,{
"_districtid":6698,
"_cityid":6675,
"_districtname": "厚街镇"
}
,{
"_districtid":6699,
"_cityid":6675,
"_districtname": "万江区"
}
,{
"_districtid":6700,
"_cityid":6675,
"_districtname": "樟木头镇"
}
,{
"_districtid":6701,
"_cityid":6675,
"_districtname": "大朗镇"
}
,{
"_districtid":6702,
"_cityid":6675,
"_districtname": "塘厦镇"
}
,{
"_districtid":6703,
"_cityid":6675,
"_districtname": "凤岗镇"
}
,{
"_districtid":6704,
"_cityid":6675,
"_districtname": "清溪镇"
}
,{
"_districtid":6705,
"_cityid":6675,
"_districtname": "横沥镇"
}
,{
"_districtid":6706,
"_cityid":6675,
"_districtname": "东城区"
}
,{
"_districtid":6707,
"_cityid":6675,
"_districtname": "黄江镇"
}
,{
"_districtid":6708,
"_cityid":6675,
"_districtname": "虎门镇"
}
]
,
"6709": [
{
"_districtid":6710,
"_cityid":6709,
"_districtname": "南朗镇"
}
,{
"_districtid":6711,
"_cityid":6709,
"_districtname": "小榄镇"
}
,{
"_districtid":6712,
"_cityid":6709,
"_districtname": "古镇"
}
,{
"_districtid":6713,
"_cityid":6709,
"_districtname": "坦洲镇"
}
,{
"_districtid":6714,
"_cityid":6709,
"_districtname": "黄圃镇"
}
,{
"_districtid":6715,
"_cityid":6709,
"_districtname": "三乡镇"
}
,{
"_districtid":6716,
"_cityid":6709,
"_districtname": "东凤镇"
}
,{
"_districtid":6717,
"_cityid":6709,
"_districtname": "横栏镇"
}
,{
"_districtid":6718,
"_cityid":6709,
"_districtname": "三角镇"
}
,{
"_districtid":6719,
"_cityid":6709,
"_districtname": "南头镇"
}
,{
"_districtid":6720,
"_cityid":6709,
"_districtname": "沙溪镇"
}
,{
"_districtid":6721,
"_cityid":6709,
"_districtname": "五桂山镇"
}
,{
"_districtid":6722,
"_cityid":6709,
"_districtname": "阜沙镇"
}
,{
"_districtid":6723,
"_cityid":6709,
"_districtname": "东升镇"
}
,{
"_districtid":6724,
"_cityid":6709,
"_districtname": "板芙镇"
}
,{
"_districtid":6725,
"_cityid":6709,
"_districtname": "神湾镇"
}
,{
"_districtid":6726,
"_cityid":6709,
"_districtname": "港口镇"
}
,{
"_districtid":6727,
"_cityid":6709,
"_districtname": "大涌镇"
}
,{
"_districtid":6728,
"_cityid":6709,
"_districtname": "火炬开发区"
}
,{
"_districtid":6729,
"_cityid":6709,
"_districtname": "民众镇"
}
,{
"_districtid":6730,
"_cityid":6709,
"_districtname": "东区街道"
}
,{
"_districtid":6731,
"_cityid":6709,
"_districtname": "西区街道"
}
,{
"_districtid":6732,
"_cityid":6709,
"_districtname": "南区街道"
}
,{
"_districtid":6733,
"_cityid":6709,
"_districtname": "石岐区街道"
}
,{
"_districtid":6734,
"_cityid":6709,
"_districtname": "沙朗镇"
}
]
,
"6735": [
{
"_districtid":6736,
"_cityid":6735,
"_districtname": "湘桥区"
}
,{
"_districtid":6737,
"_cityid":6735,
"_districtname": "潮安区"
}
,{
"_districtid":6738,
"_cityid":6735,
"_districtname": "饶平县"
}
]
,
"6739": [
{
"_districtid":6740,
"_cityid":6739,
"_districtname": "榕城区"
}
,{
"_districtid":6741,
"_cityid":6739,
"_districtname": "揭东区"
}
,{
"_districtid":6742,
"_cityid":6739,
"_districtname": "揭西县"
}
,{
"_districtid":6743,
"_cityid":6739,
"_districtname": "惠来县"
}
,{
"_districtid":6744,
"_cityid":6739,
"_districtname": "普宁市"
}
]
,
"6745": [
{
"_districtid":6746,
"_cityid":6745,
"_districtname": "云城区"
}
,{
"_districtid":6747,
"_cityid":6745,
"_districtname": "新兴县"
}
,{
"_districtid":6748,
"_cityid":6745,
"_districtname": "郁南县"
}
,{
"_districtid":6749,
"_cityid":6745,
"_districtname": "云安县"
}
,{
"_districtid":6750,
"_cityid":6745,
"_districtname": "罗定市"
}
]
,
"6752": [
{
"_districtid":6753,
"_cityid":6752,
"_districtname": "兴宁区"
}
,{
"_districtid":6754,
"_cityid":6752,
"_districtname": "青秀区"
}
,{
"_districtid":6755,
"_cityid":6752,
"_districtname": "江南区"
}
,{
"_districtid":6756,
"_cityid":6752,
"_districtname": "西乡塘区"
}
,{
"_districtid":6757,
"_cityid":6752,
"_districtname": "良庆区"
}
,{
"_districtid":6758,
"_cityid":6752,
"_districtname": "邕宁区"
}
,{
"_districtid":6759,
"_cityid":6752,
"_districtname": "武鸣县"
}
,{
"_districtid":6760,
"_cityid":6752,
"_districtname": "隆安县"
}
,{
"_districtid":6761,
"_cityid":6752,
"_districtname": "马山县"
}
,{
"_districtid":6762,
"_cityid":6752,
"_districtname": "上林县"
}
,{
"_districtid":6763,
"_cityid":6752,
"_districtname": "宾阳县"
}
,{
"_districtid":6764,
"_cityid":6752,
"_districtname": "横县"
}
]
,
"6765": [
{
"_districtid":6766,
"_cityid":6765,
"_districtname": "城中区"
}
,{
"_districtid":6767,
"_cityid":6765,
"_districtname": "鱼峰区"
}
,{
"_districtid":6768,
"_cityid":6765,
"_districtname": "柳南区"
}
,{
"_districtid":6769,
"_cityid":6765,
"_districtname": "柳北区"
}
,{
"_districtid":6770,
"_cityid":6765,
"_districtname": "柳江县"
}
,{
"_districtid":6771,
"_cityid":6765,
"_districtname": "柳城县"
}
,{
"_districtid":6772,
"_cityid":6765,
"_districtname": "鹿寨县"
}
,{
"_districtid":6773,
"_cityid":6765,
"_districtname": "融安县"
}
,{
"_districtid":6774,
"_cityid":6765,
"_districtname": "融水苗族自治县"
}
,{
"_districtid":6775,
"_cityid":6765,
"_districtname": "三江侗族自治县"
}
]
,
"6776": [
{
"_districtid":6777,
"_cityid":6776,
"_districtname": "秀峰区"
}
,{
"_districtid":6778,
"_cityid":6776,
"_districtname": "叠彩区"
}
,{
"_districtid":6779,
"_cityid":6776,
"_districtname": "象山区"
}
,{
"_districtid":6780,
"_cityid":6776,
"_districtname": "七星区"
}
,{
"_districtid":6781,
"_cityid":6776,
"_districtname": "雁山区"
}
,{
"_districtid":6782,
"_cityid":6776,
"_districtname": "阳朔县"
}
,{
"_districtid":6783,
"_cityid":6776,
"_districtname": "临桂区"
}
,{
"_districtid":6784,
"_cityid":6776,
"_districtname": "灵川县"
}
,{
"_districtid":6785,
"_cityid":6776,
"_districtname": "全州县"
}
,{
"_districtid":6786,
"_cityid":6776,
"_districtname": "兴安县"
}
,{
"_districtid":6787,
"_cityid":6776,
"_districtname": "永福县"
}
,{
"_districtid":6788,
"_cityid":6776,
"_districtname": "灌阳县"
}
,{
"_districtid":6789,
"_cityid":6776,
"_districtname": "龙胜各族自治县"
}
,{
"_districtid":6790,
"_cityid":6776,
"_districtname": "资源县"
}
,{
"_districtid":6791,
"_cityid":6776,
"_districtname": "平乐县"
}
,{
"_districtid":6792,
"_cityid":6776,
"_districtname": "荔浦县"
}
,{
"_districtid":6793,
"_cityid":6776,
"_districtname": "恭城瑶族自治县"
}
]
,
"6794": [
{
"_districtid":6795,
"_cityid":6794,
"_districtname": "万秀区"
}
,{
"_districtid":6796,
"_cityid":6794,
"_districtname": "长洲区"
}
,{
"_districtid":6797,
"_cityid":6794,
"_districtname": "龙圩区"
}
,{
"_districtid":6798,
"_cityid":6794,
"_districtname": "苍梧县"
}
,{
"_districtid":6799,
"_cityid":6794,
"_districtname": "藤县"
}
,{
"_districtid":6800,
"_cityid":6794,
"_districtname": "蒙山县"
}
,{
"_districtid":6801,
"_cityid":6794,
"_districtname": "岑溪市"
}
]
,
"6802": [
{
"_districtid":6803,
"_cityid":6802,
"_districtname": "海城区"
}
,{
"_districtid":6804,
"_cityid":6802,
"_districtname": "银海区"
}
,{
"_districtid":6805,
"_cityid":6802,
"_districtname": "铁山港区"
}
,{
"_districtid":6806,
"_cityid":6802,
"_districtname": "合浦县"
}
]
,
"6807": [
{
"_districtid":6808,
"_cityid":6807,
"_districtname": "港口区"
}
,{
"_districtid":6809,
"_cityid":6807,
"_districtname": "防城区"
}
,{
"_districtid":6810,
"_cityid":6807,
"_districtname": "上思县"
}
,{
"_districtid":6811,
"_cityid":6807,
"_districtname": "东兴市"
}
]
,
"6812": [
{
"_districtid":6813,
"_cityid":6812,
"_districtname": "钦南区"
}
,{
"_districtid":6814,
"_cityid":6812,
"_districtname": "钦北区"
}
,{
"_districtid":6815,
"_cityid":6812,
"_districtname": "灵山县"
}
,{
"_districtid":6816,
"_cityid":6812,
"_districtname": "浦北县"
}
]
,
"6817": [
{
"_districtid":6818,
"_cityid":6817,
"_districtname": "港北区"
}
,{
"_districtid":6819,
"_cityid":6817,
"_districtname": "港南区"
}
,{
"_districtid":6820,
"_cityid":6817,
"_districtname": "覃塘区"
}
,{
"_districtid":6821,
"_cityid":6817,
"_districtname": "平南县"
}
,{
"_districtid":6822,
"_cityid":6817,
"_districtname": "桂平市"
}
]
,
"6823": [
{
"_districtid":6824,
"_cityid":6823,
"_districtname": "玉州区"
}
,{
"_districtid":6825,
"_cityid":6823,
"_districtname": "福绵区"
}
,{
"_districtid":6826,
"_cityid":6823,
"_districtname": "容县"
}
,{
"_districtid":6827,
"_cityid":6823,
"_districtname": "陆川县"
}
,{
"_districtid":6828,
"_cityid":6823,
"_districtname": "博白县"
}
,{
"_districtid":6829,
"_cityid":6823,
"_districtname": "兴业县"
}
,{
"_districtid":6830,
"_cityid":6823,
"_districtname": "北流市"
}
]
,
"6831": [
{
"_districtid":6832,
"_cityid":6831,
"_districtname": "右江区"
}
,{
"_districtid":6833,
"_cityid":6831,
"_districtname": "田阳县"
}
,{
"_districtid":6834,
"_cityid":6831,
"_districtname": "田东县"
}
,{
"_districtid":6835,
"_cityid":6831,
"_districtname": "平果县"
}
,{
"_districtid":6836,
"_cityid":6831,
"_districtname": "德保县"
}
,{
"_districtid":6837,
"_cityid":6831,
"_districtname": "靖西县"
}
,{
"_districtid":6838,
"_cityid":6831,
"_districtname": "那坡县"
}
,{
"_districtid":6839,
"_cityid":6831,
"_districtname": "凌云县"
}
,{
"_districtid":6840,
"_cityid":6831,
"_districtname": "乐业县"
}
,{
"_districtid":6841,
"_cityid":6831,
"_districtname": "田林县"
}
,{
"_districtid":6842,
"_cityid":6831,
"_districtname": "西林县"
}
,{
"_districtid":6843,
"_cityid":6831,
"_districtname": "隆林各族自治县"
}
]
,
"6844": [
{
"_districtid":6845,
"_cityid":6844,
"_districtname": "八步区"
}
,{
"_districtid":6846,
"_cityid":6844,
"_districtname": "平桂管理区"
}
,{
"_districtid":6847,
"_cityid":6844,
"_districtname": "昭平县"
}
,{
"_districtid":6848,
"_cityid":6844,
"_districtname": "钟山县"
}
,{
"_districtid":6849,
"_cityid":6844,
"_districtname": "富川瑶族自治县"
}
]
,
"6850": [
{
"_districtid":6851,
"_cityid":6850,
"_districtname": "金城江区"
}
,{
"_districtid":6852,
"_cityid":6850,
"_districtname": "南丹县"
}
,{
"_districtid":6853,
"_cityid":6850,
"_districtname": "天峨县"
}
,{
"_districtid":6854,
"_cityid":6850,
"_districtname": "凤山县"
}
,{
"_districtid":6855,
"_cityid":6850,
"_districtname": "东兰县"
}
,{
"_districtid":6856,
"_cityid":6850,
"_districtname": "罗城仫佬族自治县"
}
,{
"_districtid":6857,
"_cityid":6850,
"_districtname": "环江毛南族自治县"
}
,{
"_districtid":6858,
"_cityid":6850,
"_districtname": "巴马瑶族自治县"
}
,{
"_districtid":6859,
"_cityid":6850,
"_districtname": "都安瑶族自治县"
}
,{
"_districtid":6860,
"_cityid":6850,
"_districtname": "大化瑶族自治县"
}
,{
"_districtid":6861,
"_cityid":6850,
"_districtname": "宜州市"
}
]
,
"6862": [
{
"_districtid":6863,
"_cityid":6862,
"_districtname": "兴宾区"
}
,{
"_districtid":6864,
"_cityid":6862,
"_districtname": "忻城县"
}
,{
"_districtid":6865,
"_cityid":6862,
"_districtname": "象州县"
}
,{
"_districtid":6866,
"_cityid":6862,
"_districtname": "武宣县"
}
,{
"_districtid":6867,
"_cityid":6862,
"_districtname": "金秀瑶族自治县"
}
,{
"_districtid":6868,
"_cityid":6862,
"_districtname": "合山市"
}
]
,
"6869": [
{
"_districtid":6870,
"_cityid":6869,
"_districtname": "江州区"
}
,{
"_districtid":6871,
"_cityid":6869,
"_districtname": "扶绥县"
}
,{
"_districtid":6872,
"_cityid":6869,
"_districtname": "宁明县"
}
,{
"_districtid":6873,
"_cityid":6869,
"_districtname": "龙州县"
}
,{
"_districtid":6874,
"_cityid":6869,
"_districtname": "大新县"
}
,{
"_districtid":6875,
"_cityid":6869,
"_districtname": "天等县"
}
,{
"_districtid":6876,
"_cityid":6869,
"_districtname": "凭祥市"
}
]
,
"6878": [
{
"_districtid":6879,
"_cityid":6878,
"_districtname": "秀英区"
}
,{
"_districtid":6880,
"_cityid":6878,
"_districtname": "龙华区"
}
,{
"_districtid":6881,
"_cityid":6878,
"_districtname": "琼山区"
}
,{
"_districtid":6882,
"_cityid":6878,
"_districtname": "美兰区"
}
]
,
"6883": [
{
"_districtid":6884,
"_cityid":6883,
"_districtname": "屯昌县"
}
,{
"_districtid":6885,
"_cityid":6883,
"_districtname": "昌江黎族自治县"
}
,{
"_districtid":6886,
"_cityid":6883,
"_districtname": "乐东黎族自治县"
}
,{
"_districtid":6887,
"_cityid":6883,
"_districtname": "保亭黎族苗族自治县"
}
,{
"_districtid":6888,
"_cityid":6883,
"_districtname": "琼中黎族苗族自治县"
}
]
,
"6889": [
{
"_districtid":6890,
"_cityid":6889,
"_districtname": "西沙群岛"
}
,{
"_districtid":6891,
"_cityid":6889,
"_districtname": "南沙群岛"
}
,{
"_districtid":6892,
"_cityid":6889,
"_districtname": "中沙群岛的岛礁及其海域"
}
]
,
"6893": [
]
,
"6894": [
]
,
"6895": [
]
,
"6896": [
]
,
"6897": [
]
,
"6898": [
]
,
"6899": [
]
,
"6900": [
]
,
"6901": [
]
,
"6902": [
]
,
"6903": [
]
,
"6905": [
{
"_districtid":6906,
"_cityid":6905,
"_districtname": "万州区"
}
,{
"_districtid":6907,
"_cityid":6905,
"_districtname": "涪陵区"
}
,{
"_districtid":6908,
"_cityid":6905,
"_districtname": "渝中区"
}
,{
"_districtid":6909,
"_cityid":6905,
"_districtname": "大渡口区"
}
,{
"_districtid":6910,
"_cityid":6905,
"_districtname": "江北区"
}
,{
"_districtid":6911,
"_cityid":6905,
"_districtname": "沙坪坝区"
}
,{
"_districtid":6912,
"_cityid":6905,
"_districtname": "九龙坡区"
}
,{
"_districtid":6913,
"_cityid":6905,
"_districtname": "南岸区"
}
,{
"_districtid":6914,
"_cityid":6905,
"_districtname": "北碚区"
}
,{
"_districtid":6915,
"_cityid":6905,
"_districtname": "綦江区"
}
,{
"_districtid":6916,
"_cityid":6905,
"_districtname": "大足区"
}
,{
"_districtid":6917,
"_cityid":6905,
"_districtname": "双桥区"
}
,{
"_districtid":6918,
"_cityid":6905,
"_districtname": "万盛区"
}
,{
"_districtid":6919,
"_cityid":6905,
"_districtname": "渝北区"
}
,{
"_districtid":6920,
"_cityid":6905,
"_districtname": "巴南区"
}
,{
"_districtid":6921,
"_cityid":6905,
"_districtname": "黔江区"
}
,{
"_districtid":6922,
"_cityid":6905,
"_districtname": "长寿区"
}
,{
"_districtid":6923,
"_cityid":6905,
"_districtname": "江津区"
}
,{
"_districtid":6924,
"_cityid":6905,
"_districtname": "合川区"
}
,{
"_districtid":6925,
"_cityid":6905,
"_districtname": "永川区"
}
,{
"_districtid":6926,
"_cityid":6905,
"_districtname": "南川区"
}
,{
"_districtid":6927,
"_cityid":6905,
"_districtname": "潼南县"
}
,{
"_districtid":6928,
"_cityid":6905,
"_districtname": "铜梁县"
}
,{
"_districtid":6929,
"_cityid":6905,
"_districtname": "荣昌县"
}
,{
"_districtid":6930,
"_cityid":6905,
"_districtname": "璧山县"
}
,{
"_districtid":6931,
"_cityid":6905,
"_districtname": "梁平县"
}
,{
"_districtid":6932,
"_cityid":6905,
"_districtname": "城口县"
}
,{
"_districtid":6933,
"_cityid":6905,
"_districtname": "丰都县"
}
,{
"_districtid":6934,
"_cityid":6905,
"_districtname": "垫江县"
}
,{
"_districtid":6935,
"_cityid":6905,
"_districtname": "武隆县"
}
,{
"_districtid":6936,
"_cityid":6905,
"_districtname": "忠县"
}
,{
"_districtid":6937,
"_cityid":6905,
"_districtname": "开县"
}
,{
"_districtid":6938,
"_cityid":6905,
"_districtname": "云阳县"
}
,{
"_districtid":6939,
"_cityid":6905,
"_districtname": "奉节县"
}
,{
"_districtid":6940,
"_cityid":6905,
"_districtname": "巫山县"
}
,{
"_districtid":6941,
"_cityid":6905,
"_districtname": "巫溪县"
}
,{
"_districtid":6942,
"_cityid":6905,
"_districtname": "石柱土家族自治县"
}
,{
"_districtid":6943,
"_cityid":6905,
"_districtname": "秀山土家族苗族自治县"
}
,{
"_districtid":6944,
"_cityid":6905,
"_districtname": "酉阳土家族苗族自治县"
}
,{
"_districtid":6945,
"_cityid":6905,
"_districtname": "彭水苗族土家族自治县"
}
]
,
"6947": [
{
"_districtid":6948,
"_cityid":6947,
"_districtname": "锦江区"
}
,{
"_districtid":6949,
"_cityid":6947,
"_districtname": "青羊区"
}
,{
"_districtid":6950,
"_cityid":6947,
"_districtname": "金牛区"
}
,{
"_districtid":6951,
"_cityid":6947,
"_districtname": "武侯区"
}
,{
"_districtid":6952,
"_cityid":6947,
"_districtname": "成华区"
}
,{
"_districtid":6953,
"_cityid":6947,
"_districtname": "龙泉驿区"
}
,{
"_districtid":6954,
"_cityid":6947,
"_districtname": "青白江区"
}
,{
"_districtid":6955,
"_cityid":6947,
"_districtname": "新都区"
}
,{
"_districtid":6956,
"_cityid":6947,
"_districtname": "温江区"
}
,{
"_districtid":6957,
"_cityid":6947,
"_districtname": "金堂县"
}
,{
"_districtid":6958,
"_cityid":6947,
"_districtname": "双流县"
}
,{
"_districtid":6959,
"_cityid":6947,
"_districtname": "郫县"
}
,{
"_districtid":6960,
"_cityid":6947,
"_districtname": "大邑县"
}
,{
"_districtid":6961,
"_cityid":6947,
"_districtname": "蒲江县"
}
,{
"_districtid":6962,
"_cityid":6947,
"_districtname": "新津县"
}
,{
"_districtid":6963,
"_cityid":6947,
"_districtname": "都江堰市"
}
,{
"_districtid":6964,
"_cityid":6947,
"_districtname": "彭州市"
}
,{
"_districtid":6965,
"_cityid":6947,
"_districtname": "邛崃市"
}
,{
"_districtid":6966,
"_cityid":6947,
"_districtname": "崇州市"
}
]
,
"6967": [
{
"_districtid":6968,
"_cityid":6967,
"_districtname": "自流井区"
}
,{
"_districtid":6969,
"_cityid":6967,
"_districtname": "贡井区"
}
,{
"_districtid":6970,
"_cityid":6967,
"_districtname": "大安区"
}
,{
"_districtid":6971,
"_cityid":6967,
"_districtname": "沿滩区"
}
,{
"_districtid":6972,
"_cityid":6967,
"_districtname": "荣县"
}
,{
"_districtid":6973,
"_cityid":6967,
"_districtname": "富顺县"
}
]
,
"6974": [
{
"_districtid":6975,
"_cityid":6974,
"_districtname": "东区"
}
,{
"_districtid":6976,
"_cityid":6974,
"_districtname": "西区"
}
,{
"_districtid":6977,
"_cityid":6974,
"_districtname": "仁和区"
}
,{
"_districtid":6978,
"_cityid":6974,
"_districtname": "米易县"
}
,{
"_districtid":6979,
"_cityid":6974,
"_districtname": "盐边县"
}
]
,
"6980": [
{
"_districtid":6981,
"_cityid":6980,
"_districtname": "江阳区"
}
,{
"_districtid":6982,
"_cityid":6980,
"_districtname": "纳溪区"
}
,{
"_districtid":6983,
"_cityid":6980,
"_districtname": "龙马潭区"
}
,{
"_districtid":6984,
"_cityid":6980,
"_districtname": "泸县"
}
,{
"_districtid":6985,
"_cityid":6980,
"_districtname": "合江县"
}
,{
"_districtid":6986,
"_cityid":6980,
"_districtname": "叙永县"
}
,{
"_districtid":6987,
"_cityid":6980,
"_districtname": "古蔺县"
}
]
,
"6988": [
{
"_districtid":6989,
"_cityid":6988,
"_districtname": "旌阳区"
}
,{
"_districtid":6990,
"_cityid":6988,
"_districtname": "中江县"
}
,{
"_districtid":6991,
"_cityid":6988,
"_districtname": "罗江县"
}
,{
"_districtid":6992,
"_cityid":6988,
"_districtname": "广汉市"
}
,{
"_districtid":6993,
"_cityid":6988,
"_districtname": "什邡市"
}
,{
"_districtid":6994,
"_cityid":6988,
"_districtname": "绵竹市"
}
]
,
"6995": [
{
"_districtid":6996,
"_cityid":6995,
"_districtname": "涪城区"
}
,{
"_districtid":6997,
"_cityid":6995,
"_districtname": "游仙区"
}
,{
"_districtid":6998,
"_cityid":6995,
"_districtname": "三台县"
}
,{
"_districtid":6999,
"_cityid":6995,
"_districtname": "盐亭县"
}
,{
"_districtid":7000,
"_cityid":6995,
"_districtname": "安县"
}
,{
"_districtid":7001,
"_cityid":6995,
"_districtname": "梓潼县"
}
,{
"_districtid":7002,
"_cityid":6995,
"_districtname": "北川羌族自治县"
}
,{
"_districtid":7003,
"_cityid":6995,
"_districtname": "平武县"
}
,{
"_districtid":7004,
"_cityid":6995,
"_districtname": "江油市"
}
]
,
"7005": [
{
"_districtid":7006,
"_cityid":7005,
"_districtname": "利州区"
}
,{
"_districtid":7007,
"_cityid":7005,
"_districtname": "昭化区"
}
,{
"_districtid":7008,
"_cityid":7005,
"_districtname": "朝天区"
}
,{
"_districtid":7009,
"_cityid":7005,
"_districtname": "旺苍县"
}
,{
"_districtid":7010,
"_cityid":7005,
"_districtname": "青川县"
}
,{
"_districtid":7011,
"_cityid":7005,
"_districtname": "剑阁县"
}
,{
"_districtid":7012,
"_cityid":7005,
"_districtname": "苍溪县"
}
]
,
"7013": [
{
"_districtid":7014,
"_cityid":7013,
"_districtname": "船山区"
}
,{
"_districtid":7015,
"_cityid":7013,
"_districtname": "安居区"
}
,{
"_districtid":7016,
"_cityid":7013,
"_districtname": "蓬溪县"
}
,{
"_districtid":7017,
"_cityid":7013,
"_districtname": "射洪县"
}
,{
"_districtid":7018,
"_cityid":7013,
"_districtname": "大英县"
}
]
,
"7019": [
{
"_districtid":7020,
"_cityid":7019,
"_districtname": "市中区"
}
,{
"_districtid":7021,
"_cityid":7019,
"_districtname": "东兴区"
}
,{
"_districtid":7022,
"_cityid":7019,
"_districtname": "威远县"
}
,{
"_districtid":7023,
"_cityid":7019,
"_districtname": "资中县"
}
,{
"_districtid":7024,
"_cityid":7019,
"_districtname": "隆昌县"
}
]
,
"7025": [
{
"_districtid":7026,
"_cityid":7025,
"_districtname": "市中区"
}
,{
"_districtid":7027,
"_cityid":7025,
"_districtname": "沙湾区"
}
,{
"_districtid":7028,
"_cityid":7025,
"_districtname": "五通桥区"
}
,{
"_districtid":7029,
"_cityid":7025,
"_districtname": "金口河区"
}
,{
"_districtid":7030,
"_cityid":7025,
"_districtname": "犍为县"
}
,{
"_districtid":7031,
"_cityid":7025,
"_districtname": "井研县"
}
,{
"_districtid":7032,
"_cityid":7025,
"_districtname": "夹江县"
}
,{
"_districtid":7033,
"_cityid":7025,
"_districtname": "沐川县"
}
,{
"_districtid":7034,
"_cityid":7025,
"_districtname": "峨边彝族自治县"
}
,{
"_districtid":7035,
"_cityid":7025,
"_districtname": "马边彝族自治县"
}
,{
"_districtid":7036,
"_cityid":7025,
"_districtname": "峨眉山市"
}
]
,
"7037": [
{
"_districtid":7038,
"_cityid":7037,
"_districtname": "顺庆区"
}
,{
"_districtid":7039,
"_cityid":7037,
"_districtname": "高坪区"
}
,{
"_districtid":7040,
"_cityid":7037,
"_districtname": "嘉陵区"
}
,{
"_districtid":7041,
"_cityid":7037,
"_districtname": "南部县"
}
,{
"_districtid":7042,
"_cityid":7037,
"_districtname": "营山县"
}
,{
"_districtid":7043,
"_cityid":7037,
"_districtname": "蓬安县"
}
,{
"_districtid":7044,
"_cityid":7037,
"_districtname": "仪陇县"
}
,{
"_districtid":7045,
"_cityid":7037,
"_districtname": "西充县"
}
,{
"_districtid":7046,
"_cityid":7037,
"_districtname": "阆中市"
}
]
,
"7047": [
{
"_districtid":7048,
"_cityid":7047,
"_districtname": "东坡区"
}
,{
"_districtid":7049,
"_cityid":7047,
"_districtname": "仁寿县"
}
,{
"_districtid":7050,
"_cityid":7047,
"_districtname": "彭山县"
}
,{
"_districtid":7051,
"_cityid":7047,
"_districtname": "洪雅县"
}
,{
"_districtid":7052,
"_cityid":7047,
"_districtname": "丹棱县"
}
,{
"_districtid":7053,
"_cityid":7047,
"_districtname": "青神县"
}
]
,
"7054": [
{
"_districtid":7055,
"_cityid":7054,
"_districtname": "翠屏区"
}
,{
"_districtid":7056,
"_cityid":7054,
"_districtname": "南溪区"
}
,{
"_districtid":7057,
"_cityid":7054,
"_districtname": "宜宾县"
}
,{
"_districtid":7058,
"_cityid":7054,
"_districtname": "江安县"
}
,{
"_districtid":7059,
"_cityid":7054,
"_districtname": "长宁县"
}
,{
"_districtid":7060,
"_cityid":7054,
"_districtname": "高县"
}
,{
"_districtid":7061,
"_cityid":7054,
"_districtname": "珙县"
}
,{
"_districtid":7062,
"_cityid":7054,
"_districtname": "筠连县"
}
,{
"_districtid":7063,
"_cityid":7054,
"_districtname": "兴文县"
}
,{
"_districtid":7064,
"_cityid":7054,
"_districtname": "屏山县"
}
]
,
"7065": [
{
"_districtid":7066,
"_cityid":7065,
"_districtname": "广安区"
}
,{
"_districtid":7067,
"_cityid":7065,
"_districtname": "前锋区"
}
,{
"_districtid":7068,
"_cityid":7065,
"_districtname": "岳池县"
}
,{
"_districtid":7069,
"_cityid":7065,
"_districtname": "武胜县"
}
,{
"_districtid":7070,
"_cityid":7065,
"_districtname": "邻水县"
}
,{
"_districtid":7071,
"_cityid":7065,
"_districtname": "华蓥市"
}
]
,
"7072": [
{
"_districtid":7073,
"_cityid":7072,
"_districtname": "通川区"
}
,{
"_districtid":7074,
"_cityid":7072,
"_districtname": "达川区"
}
,{
"_districtid":7075,
"_cityid":7072,
"_districtname": "宣汉县"
}
,{
"_districtid":7076,
"_cityid":7072,
"_districtname": "开江县"
}
,{
"_districtid":7077,
"_cityid":7072,
"_districtname": "大竹县"
}
,{
"_districtid":7078,
"_cityid":7072,
"_districtname": "渠县"
}
,{
"_districtid":7079,
"_cityid":7072,
"_districtname": "万源市"
}
]
,
"7080": [
{
"_districtid":7081,
"_cityid":7080,
"_districtname": "雨城区"
}
,{
"_districtid":7082,
"_cityid":7080,
"_districtname": "名山区"
}
,{
"_districtid":7083,
"_cityid":7080,
"_districtname": "荥经县"
}
,{
"_districtid":7084,
"_cityid":7080,
"_districtname": "汉源县"
}
,{
"_districtid":7085,
"_cityid":7080,
"_districtname": "石棉县"
}
,{
"_districtid":7086,
"_cityid":7080,
"_districtname": "天全县"
}
,{
"_districtid":7087,
"_cityid":7080,
"_districtname": "芦山县"
}
,{
"_districtid":7088,
"_cityid":7080,
"_districtname": "宝兴县"
}
]
,
"7089": [
{
"_districtid":7090,
"_cityid":7089,
"_districtname": "巴州区"
}
,{
"_districtid":7091,
"_cityid":7089,
"_districtname": "恩阳区"
}
,{
"_districtid":7092,
"_cityid":7089,
"_districtname": "通江县"
}
,{
"_districtid":7093,
"_cityid":7089,
"_districtname": "南江县"
}
,{
"_districtid":7094,
"_cityid":7089,
"_districtname": "平昌县"
}
]
,
"7095": [
{
"_districtid":7096,
"_cityid":7095,
"_districtname": "雁江区"
}
,{
"_districtid":7097,
"_cityid":7095,
"_districtname": "安岳县"
}
,{
"_districtid":7098,
"_cityid":7095,
"_districtname": "乐至县"
}
,{
"_districtid":7099,
"_cityid":7095,
"_districtname": "简阳市"
}
]
,
"7100": [
{
"_districtid":7101,
"_cityid":7100,
"_districtname": "汶川县"
}
,{
"_districtid":7102,
"_cityid":7100,
"_districtname": "理县"
}
,{
"_districtid":7103,
"_cityid":7100,
"_districtname": "茂县"
}
,{
"_districtid":7104,
"_cityid":7100,
"_districtname": "松潘县"
}
,{
"_districtid":7105,
"_cityid":7100,
"_districtname": "九寨沟县"
}
,{
"_districtid":7106,
"_cityid":7100,
"_districtname": "金川县"
}
,{
"_districtid":7107,
"_cityid":7100,
"_districtname": "小金县"
}
,{
"_districtid":7108,
"_cityid":7100,
"_districtname": "黑水县"
}
,{
"_districtid":7109,
"_cityid":7100,
"_districtname": "马尔康县"
}
,{
"_districtid":7110,
"_cityid":7100,
"_districtname": "壤塘县"
}
,{
"_districtid":7111,
"_cityid":7100,
"_districtname": "阿坝县"
}
,{
"_districtid":7112,
"_cityid":7100,
"_districtname": "若尔盖县"
}
,{
"_districtid":7113,
"_cityid":7100,
"_districtname": "红原县"
}
]
,
"7114": [
{
"_districtid":7115,
"_cityid":7114,
"_districtname": "康定县"
}
,{
"_districtid":7116,
"_cityid":7114,
"_districtname": "泸定县"
}
,{
"_districtid":7117,
"_cityid":7114,
"_districtname": "丹巴县"
}
,{
"_districtid":7118,
"_cityid":7114,
"_districtname": "九龙县"
}
,{
"_districtid":7119,
"_cityid":7114,
"_districtname": "雅江县"
}
,{
"_districtid":7120,
"_cityid":7114,
"_districtname": "道孚县"
}
,{
"_districtid":7121,
"_cityid":7114,
"_districtname": "炉霍县"
}
,{
"_districtid":7122,
"_cityid":7114,
"_districtname": "甘孜县"
}
,{
"_districtid":7123,
"_cityid":7114,
"_districtname": "新龙县"
}
,{
"_districtid":7124,
"_cityid":7114,
"_districtname": "德格县"
}
,{
"_districtid":7125,
"_cityid":7114,
"_districtname": "白玉县"
}
,{
"_districtid":7126,
"_cityid":7114,
"_districtname": "石渠县"
}
,{
"_districtid":7127,
"_cityid":7114,
"_districtname": "色达县"
}
,{
"_districtid":7128,
"_cityid":7114,
"_districtname": "理塘县"
}
,{
"_districtid":7129,
"_cityid":7114,
"_districtname": "巴塘县"
}
,{
"_districtid":7130,
"_cityid":7114,
"_districtname": "乡城县"
}
,{
"_districtid":7131,
"_cityid":7114,
"_districtname": "稻城县"
}
,{
"_districtid":7132,
"_cityid":7114,
"_districtname": "得荣县"
}
]
,
"7133": [
{
"_districtid":7134,
"_cityid":7133,
"_districtname": "西昌市"
}
,{
"_districtid":7135,
"_cityid":7133,
"_districtname": "木里藏族自治县"
}
,{
"_districtid":7136,
"_cityid":7133,
"_districtname": "盐源县"
}
,{
"_districtid":7137,
"_cityid":7133,
"_districtname": "德昌县"
}
,{
"_districtid":7138,
"_cityid":7133,
"_districtname": "会理县"
}
,{
"_districtid":7139,
"_cityid":7133,
"_districtname": "会东县"
}
,{
"_districtid":7140,
"_cityid":7133,
"_districtname": "宁南县"
}
,{
"_districtid":7141,
"_cityid":7133,
"_districtname": "普格县"
}
,{
"_districtid":7142,
"_cityid":7133,
"_districtname": "布拖县"
}
,{
"_districtid":7143,
"_cityid":7133,
"_districtname": "金阳县"
}
,{
"_districtid":7144,
"_cityid":7133,
"_districtname": "昭觉县"
}
,{
"_districtid":7145,
"_cityid":7133,
"_districtname": "喜德县"
}
,{
"_districtid":7146,
"_cityid":7133,
"_districtname": "冕宁县"
}
,{
"_districtid":7147,
"_cityid":7133,
"_districtname": "越西县"
}
,{
"_districtid":7148,
"_cityid":7133,
"_districtname": "甘洛县"
}
,{
"_districtid":7149,
"_cityid":7133,
"_districtname": "美姑县"
}
,{
"_districtid":7150,
"_cityid":7133,
"_districtname": "雷波县"
}
]
,
"7152": [
{
"_districtid":7153,
"_cityid":7152,
"_districtname": "南明区"
}
,{
"_districtid":7154,
"_cityid":7152,
"_districtname": "观山湖区"
}
,{
"_districtid":7155,
"_cityid":7152,
"_districtname": "云岩区"
}
,{
"_districtid":7156,
"_cityid":7152,
"_districtname": "花溪区"
}
,{
"_districtid":7157,
"_cityid":7152,
"_districtname": "乌当区"
}
,{
"_districtid":7158,
"_cityid":7152,
"_districtname": "白云区"
}
,{
"_districtid":7159,
"_cityid":7152,
"_districtname": "开阳县"
}
,{
"_districtid":7160,
"_cityid":7152,
"_districtname": "息烽县"
}
,{
"_districtid":7161,
"_cityid":7152,
"_districtname": "修文县"
}
,{
"_districtid":7162,
"_cityid":7152,
"_districtname": "清镇市"
}
]
,
"7163": [
{
"_districtid":7164,
"_cityid":7163,
"_districtname": "钟山区"
}
,{
"_districtid":7165,
"_cityid":7163,
"_districtname": "六枝特区"
}
,{
"_districtid":7166,
"_cityid":7163,
"_districtname": "水城县"
}
,{
"_districtid":7167,
"_cityid":7163,
"_districtname": "盘县"
}
]
,
"7168": [
{
"_districtid":7169,
"_cityid":7168,
"_districtname": "红花岗区"
}
,{
"_districtid":7170,
"_cityid":7168,
"_districtname": "汇川区"
}
,{
"_districtid":7171,
"_cityid":7168,
"_districtname": "遵义县"
}
,{
"_districtid":7172,
"_cityid":7168,
"_districtname": "桐梓县"
}
,{
"_districtid":7173,
"_cityid":7168,
"_districtname": "绥阳县"
}
,{
"_districtid":7174,
"_cityid":7168,
"_districtname": "正安县"
}
,{
"_districtid":7175,
"_cityid":7168,
"_districtname": "道真仡佬族苗族自治县"
}
,{
"_districtid":7176,
"_cityid":7168,
"_districtname": "务川仡佬族苗族自治县"
}
,{
"_districtid":7177,
"_cityid":7168,
"_districtname": "凤冈县"
}
,{
"_districtid":7178,
"_cityid":7168,
"_districtname": "湄潭县"
}
,{
"_districtid":7179,
"_cityid":7168,
"_districtname": "余庆县"
}
,{
"_districtid":7180,
"_cityid":7168,
"_districtname": "习水县"
}
,{
"_districtid":7181,
"_cityid":7168,
"_districtname": "赤水市"
}
,{
"_districtid":7182,
"_cityid":7168,
"_districtname": "仁怀市"
}
]
,
"7183": [
{
"_districtid":7184,
"_cityid":7183,
"_districtname": "西秀区"
}
,{
"_districtid":7185,
"_cityid":7183,
"_districtname": "平坝县"
}
,{
"_districtid":7186,
"_cityid":7183,
"_districtname": "普定县"
}
,{
"_districtid":7187,
"_cityid":7183,
"_districtname": "镇宁布依族苗族自治县"
}
,{
"_districtid":7188,
"_cityid":7183,
"_districtname": "关岭布依族苗族自治县"
}
,{
"_districtid":7189,
"_cityid":7183,
"_districtname": "紫云苗族布依族自治县"
}
]
,
"7190": [
{
"_districtid":7191,
"_cityid":7190,
"_districtname": "七星关区"
}
,{
"_districtid":7192,
"_cityid":7190,
"_districtname": "大方县"
}
,{
"_districtid":7193,
"_cityid":7190,
"_districtname": "黔西县"
}
,{
"_districtid":7194,
"_cityid":7190,
"_districtname": "金沙县"
}
,{
"_districtid":7195,
"_cityid":7190,
"_districtname": "织金县"
}
,{
"_districtid":7196,
"_cityid":7190,
"_districtname": "纳雍县"
}
,{
"_districtid":7197,
"_cityid":7190,
"_districtname": "威宁彝族回族苗族自治县"
}
,{
"_districtid":7198,
"_cityid":7190,
"_districtname": "赫章县"
}
]
,
"7199": [
{
"_districtid":7200,
"_cityid":7199,
"_districtname": "碧江区"
}
,{
"_districtid":7201,
"_cityid":7199,
"_districtname": "万山区"
}
,{
"_districtid":7202,
"_cityid":7199,
"_districtname": "江口县"
}
,{
"_districtid":7203,
"_cityid":7199,
"_districtname": "玉屏侗族自治县"
}
,{
"_districtid":7204,
"_cityid":7199,
"_districtname": "石阡县"
}
,{
"_districtid":7205,
"_cityid":7199,
"_districtname": "思南县"
}
,{
"_districtid":7206,
"_cityid":7199,
"_districtname": "印江土家族苗族自治县"
}
,{
"_districtid":7207,
"_cityid":7199,
"_districtname": "德江县"
}
,{
"_districtid":7208,
"_cityid":7199,
"_districtname": "沿河土家族自治县"
}
,{
"_districtid":7209,
"_cityid":7199,
"_districtname": "松桃苗族自治县"
}
]
,
"7210": [
{
"_districtid":7211,
"_cityid":7210,
"_districtname": "兴义市"
}
,{
"_districtid":7212,
"_cityid":7210,
"_districtname": "兴仁县"
}
,{
"_districtid":7213,
"_cityid":7210,
"_districtname": "普安县"
}
,{
"_districtid":7214,
"_cityid":7210,
"_districtname": "晴隆县"
}
,{
"_districtid":7215,
"_cityid":7210,
"_districtname": "贞丰县"
}
,{
"_districtid":7216,
"_cityid":7210,
"_districtname": "望谟县"
}
,{
"_districtid":7217,
"_cityid":7210,
"_districtname": "册亨县"
}
,{
"_districtid":7218,
"_cityid":7210,
"_districtname": "安龙县"
}
]
,
"7219": [
{
"_districtid":7220,
"_cityid":7219,
"_districtname": "凯里市"
}
,{
"_districtid":7221,
"_cityid":7219,
"_districtname": "黄平县"
}
,{
"_districtid":7222,
"_cityid":7219,
"_districtname": "施秉县"
}
,{
"_districtid":7223,
"_cityid":7219,
"_districtname": "三穗县"
}
,{
"_districtid":7224,
"_cityid":7219,
"_districtname": "镇远县"
}
,{
"_districtid":7225,
"_cityid":7219,
"_districtname": "岑巩县"
}
,{
"_districtid":7226,
"_cityid":7219,
"_districtname": "天柱县"
}
,{
"_districtid":7227,
"_cityid":7219,
"_districtname": "锦屏县"
}
,{
"_districtid":7228,
"_cityid":7219,
"_districtname": "剑河县"
}
,{
"_districtid":7229,
"_cityid":7219,
"_districtname": "台江县"
}
,{
"_districtid":7230,
"_cityid":7219,
"_districtname": "黎平县"
}
,{
"_districtid":7231,
"_cityid":7219,
"_districtname": "榕江县"
}
,{
"_districtid":7232,
"_cityid":7219,
"_districtname": "从江县"
}
,{
"_districtid":7233,
"_cityid":7219,
"_districtname": "雷山县"
}
,{
"_districtid":7234,
"_cityid":7219,
"_districtname": "麻江县"
}
,{
"_districtid":7235,
"_cityid":7219,
"_districtname": "丹寨县"
}
]
,
"7236": [
{
"_districtid":7237,
"_cityid":7236,
"_districtname": "都匀市"
}
,{
"_districtid":7238,
"_cityid":7236,
"_districtname": "福泉市"
}
,{
"_districtid":7239,
"_cityid":7236,
"_districtname": "荔波县"
}
,{
"_districtid":7240,
"_cityid":7236,
"_districtname": "贵定县"
}
,{
"_districtid":7241,
"_cityid":7236,
"_districtname": "瓮安县"
}
,{
"_districtid":7242,
"_cityid":7236,
"_districtname": "独山县"
}
,{
"_districtid":7243,
"_cityid":7236,
"_districtname": "平塘县"
}
,{
"_districtid":7244,
"_cityid":7236,
"_districtname": "罗甸县"
}
,{
"_districtid":7245,
"_cityid":7236,
"_districtname": "长顺县"
}
,{
"_districtid":7246,
"_cityid":7236,
"_districtname": "龙里县"
}
,{
"_districtid":7247,
"_cityid":7236,
"_districtname": "惠水县"
}
,{
"_districtid":7248,
"_cityid":7236,
"_districtname": "三都水族自治县"
}
]
,
"7250": [
{
"_districtid":7251,
"_cityid":7250,
"_districtname": "五华区"
}
,{
"_districtid":7252,
"_cityid":7250,
"_districtname": "盘龙区"
}
,{
"_districtid":7253,
"_cityid":7250,
"_districtname": "官渡区"
}
,{
"_districtid":7254,
"_cityid":7250,
"_districtname": "西山区"
}
,{
"_districtid":7255,
"_cityid":7250,
"_districtname": "东川区"
}
,{
"_districtid":7256,
"_cityid":7250,
"_districtname": "呈贡区"
}
,{
"_districtid":7257,
"_cityid":7250,
"_districtname": "晋宁县"
}
,{
"_districtid":7258,
"_cityid":7250,
"_districtname": "富民县"
}
,{
"_districtid":7259,
"_cityid":7250,
"_districtname": "宜良县"
}
,{
"_districtid":7260,
"_cityid":7250,
"_districtname": "石林彝族自治县"
}
,{
"_districtid":7261,
"_cityid":7250,
"_districtname": "嵩明县"
}
,{
"_districtid":7262,
"_cityid":7250,
"_districtname": "禄劝彝族苗族自治县"
}
,{
"_districtid":7263,
"_cityid":7250,
"_districtname": "寻甸回族彝族自治县"
}
,{
"_districtid":7264,
"_cityid":7250,
"_districtname": "安宁市"
}
]
,
"7265": [
{
"_districtid":7266,
"_cityid":7265,
"_districtname": "麒麟区"
}
,{
"_districtid":7267,
"_cityid":7265,
"_districtname": "马龙县"
}
,{
"_districtid":7268,
"_cityid":7265,
"_districtname": "陆良县"
}
,{
"_districtid":7269,
"_cityid":7265,
"_districtname": "师宗县"
}
,{
"_districtid":7270,
"_cityid":7265,
"_districtname": "罗平县"
}
,{
"_districtid":7271,
"_cityid":7265,
"_districtname": "富源县"
}
,{
"_districtid":7272,
"_cityid":7265,
"_districtname": "会泽县"
}
,{
"_districtid":7273,
"_cityid":7265,
"_districtname": "沾益县"
}
,{
"_districtid":7274,
"_cityid":7265,
"_districtname": "宣威市"
}
]
,
"7275": [
{
"_districtid":7276,
"_cityid":7275,
"_districtname": "红塔区"
}
,{
"_districtid":7277,
"_cityid":7275,
"_districtname": "江川县"
}
,{
"_districtid":7278,
"_cityid":7275,
"_districtname": "澄江县"
}
,{
"_districtid":7279,
"_cityid":7275,
"_districtname": "通海县"
}
,{
"_districtid":7280,
"_cityid":7275,
"_districtname": "华宁县"
}
,{
"_districtid":7281,
"_cityid":7275,
"_districtname": "易门县"
}
,{
"_districtid":7282,
"_cityid":7275,
"_districtname": "峨山彝族自治县"
}
,{
"_districtid":7283,
"_cityid":7275,
"_districtname": "新平彝族傣族自治县"
}
,{
"_districtid":7284,
"_cityid":7275,
"_districtname": "元江哈尼族彝族傣族自治县"
}
]
,
"7285": [
{
"_districtid":7286,
"_cityid":7285,
"_districtname": "隆阳区"
}
,{
"_districtid":7287,
"_cityid":7285,
"_districtname": "施甸县"
}
,{
"_districtid":7288,
"_cityid":7285,
"_districtname": "腾冲县"
}
,{
"_districtid":7289,
"_cityid":7285,
"_districtname": "龙陵县"
}
,{
"_districtid":7290,
"_cityid":7285,
"_districtname": "昌宁县"
}
]
,
"7291": [
{
"_districtid":7292,
"_cityid":7291,
"_districtname": "昭阳区"
}
,{
"_districtid":7293,
"_cityid":7291,
"_districtname": "鲁甸县"
}
,{
"_districtid":7294,
"_cityid":7291,
"_districtname": "巧家县"
}
,{
"_districtid":7295,
"_cityid":7291,
"_districtname": "盐津县"
}
,{
"_districtid":7296,
"_cityid":7291,
"_districtname": "大关县"
}
,{
"_districtid":7297,
"_cityid":7291,
"_districtname": "永善县"
}
,{
"_districtid":7298,
"_cityid":7291,
"_districtname": "绥江县"
}
,{
"_districtid":7299,
"_cityid":7291,
"_districtname": "镇雄县"
}
,{
"_districtid":7300,
"_cityid":7291,
"_districtname": "彝良县"
}
,{
"_districtid":7301,
"_cityid":7291,
"_districtname": "威信县"
}
,{
"_districtid":7302,
"_cityid":7291,
"_districtname": "水富县"
}
]
,
"7303": [
{
"_districtid":7304,
"_cityid":7303,
"_districtname": "古城区"
}
,{
"_districtid":7305,
"_cityid":7303,
"_districtname": "玉龙纳西族自治县"
}
,{
"_districtid":7306,
"_cityid":7303,
"_districtname": "永胜县"
}
,{
"_districtid":7307,
"_cityid":7303,
"_districtname": "华坪县"
}
,{
"_districtid":7308,
"_cityid":7303,
"_districtname": "宁蒗彝族自治县"
}
]
,
"7309": [
{
"_districtid":7310,
"_cityid":7309,
"_districtname": "思茅区"
}
,{
"_districtid":7311,
"_cityid":7309,
"_districtname": "宁洱哈尼族彝族自治县"
}
,{
"_districtid":7312,
"_cityid":7309,
"_districtname": "墨江哈尼族自治县"
}
,{
"_districtid":7313,
"_cityid":7309,
"_districtname": "景东彝族自治县"
}
,{
"_districtid":7314,
"_cityid":7309,
"_districtname": "景谷傣族彝族自治县"
}
,{
"_districtid":7315,
"_cityid":7309,
"_districtname": "镇沅彝族哈尼族拉祜族自治县"
}
,{
"_districtid":7316,
"_cityid":7309,
"_districtname": "江城哈尼族彝族自治县"
}
,{
"_districtid":7317,
"_cityid":7309,
"_districtname": "孟连傣族拉祜族佤族自治县"
}
,{
"_districtid":7318,
"_cityid":7309,
"_districtname": "澜沧拉祜族自治县"
}
,{
"_districtid":7319,
"_cityid":7309,
"_districtname": "西盟佤族自治县"
}
]
,
"7320": [
{
"_districtid":7321,
"_cityid":7320,
"_districtname": "临翔区"
}
,{
"_districtid":7322,
"_cityid":7320,
"_districtname": "凤庆县"
}
,{
"_districtid":7323,
"_cityid":7320,
"_districtname": "云县"
}
,{
"_districtid":7324,
"_cityid":7320,
"_districtname": "永德县"
}
,{
"_districtid":7325,
"_cityid":7320,
"_districtname": "镇康县"
}
,{
"_districtid":7326,
"_cityid":7320,
"_districtname": "双江拉祜族佤族布朗族傣族自治县"
}
,{
"_districtid":7327,
"_cityid":7320,
"_districtname": "耿马傣族佤族自治县"
}
,{
"_districtid":7328,
"_cityid":7320,
"_districtname": "沧源佤族自治县"
}
]
,
"7329": [
{
"_districtid":7330,
"_cityid":7329,
"_districtname": "楚雄市"
}
,{
"_districtid":7331,
"_cityid":7329,
"_districtname": "双柏县"
}
,{
"_districtid":7332,
"_cityid":7329,
"_districtname": "牟定县"
}
,{
"_districtid":7333,
"_cityid":7329,
"_districtname": "南华县"
}
,{
"_districtid":7334,
"_cityid":7329,
"_districtname": "姚安县"
}
,{
"_districtid":7335,
"_cityid":7329,
"_districtname": "大姚县"
}
,{
"_districtid":7336,
"_cityid":7329,
"_districtname": "永仁县"
}
,{
"_districtid":7337,
"_cityid":7329,
"_districtname": "元谋县"
}
,{
"_districtid":7338,
"_cityid":7329,
"_districtname": "武定县"
}
,{
"_districtid":7339,
"_cityid":7329,
"_districtname": "禄丰县"
}
]
,
"7340": [
{
"_districtid":7341,
"_cityid":7340,
"_districtname": "个旧市"
}
,{
"_districtid":7342,
"_cityid":7340,
"_districtname": "开远市"
}
,{
"_districtid":7343,
"_cityid":7340,
"_districtname": "蒙自市"
}
,{
"_districtid":7344,
"_cityid":7340,
"_districtname": "屏边苗族自治县"
}
,{
"_districtid":7345,
"_cityid":7340,
"_districtname": "建水县"
}
,{
"_districtid":7346,
"_cityid":7340,
"_districtname": "石屏县"
}
,{
"_districtid":7347,
"_cityid":7340,
"_districtname": "弥勒市"
}
,{
"_districtid":7348,
"_cityid":7340,
"_districtname": "泸西县"
}
,{
"_districtid":7349,
"_cityid":7340,
"_districtname": "元阳县"
}
,{
"_districtid":7350,
"_cityid":7340,
"_districtname": "红河县"
}
,{
"_districtid":7351,
"_cityid":7340,
"_districtname": "金平苗族瑶族傣族自治县"
}
,{
"_districtid":7352,
"_cityid":7340,
"_districtname": "绿春县"
}
,{
"_districtid":7353,
"_cityid":7340,
"_districtname": "河口瑶族自治县"
}
]
,
"7354": [
{
"_districtid":7355,
"_cityid":7354,
"_districtname": "文山市"
}
,{
"_districtid":7356,
"_cityid":7354,
"_districtname": "砚山县"
}
,{
"_districtid":7357,
"_cityid":7354,
"_districtname": "西畴县"
}
,{
"_districtid":7358,
"_cityid":7354,
"_districtname": "麻栗坡县"
}
,{
"_districtid":7359,
"_cityid":7354,
"_districtname": "马关县"
}
,{
"_districtid":7360,
"_cityid":7354,
"_districtname": "丘北县"
}
,{
"_districtid":7361,
"_cityid":7354,
"_districtname": "广南县"
}
,{
"_districtid":7362,
"_cityid":7354,
"_districtname": "富宁县"
}
]
,
"7363": [
{
"_districtid":7364,
"_cityid":7363,
"_districtname": "景洪市"
}
,{
"_districtid":7365,
"_cityid":7363,
"_districtname": "勐海县"
}
,{
"_districtid":7366,
"_cityid":7363,
"_districtname": "勐腊县"
}
]
,
"7367": [
{
"_districtid":7368,
"_cityid":7367,
"_districtname": "大理市"
}
,{
"_districtid":7369,
"_cityid":7367,
"_districtname": "漾濞彝族自治县"
}
,{
"_districtid":7370,
"_cityid":7367,
"_districtname": "祥云县"
}
,{
"_districtid":7371,
"_cityid":7367,
"_districtname": "宾川县"
}
,{
"_districtid":7372,
"_cityid":7367,
"_districtname": "弥渡县"
}
,{
"_districtid":7373,
"_cityid":7367,
"_districtname": "南涧彝族自治县"
}
,{
"_districtid":7374,
"_cityid":7367,
"_districtname": "巍山彝族回族自治县"
}
,{
"_districtid":7375,
"_cityid":7367,
"_districtname": "永平县"
}
,{
"_districtid":7376,
"_cityid":7367,
"_districtname": "云龙县"
}
,{
"_districtid":7377,
"_cityid":7367,
"_districtname": "洱源县"
}
,{
"_districtid":7378,
"_cityid":7367,
"_districtname": "剑川县"
}
,{
"_districtid":7379,
"_cityid":7367,
"_districtname": "鹤庆县"
}
]
,
"7380": [
{
"_districtid":7381,
"_cityid":7380,
"_districtname": "瑞丽市"
}
,{
"_districtid":7382,
"_cityid":7380,
"_districtname": "芒市"
}
,{
"_districtid":7383,
"_cityid":7380,
"_districtname": "梁河县"
}
,{
"_districtid":7384,
"_cityid":7380,
"_districtname": "盈江县"
}
,{
"_districtid":7385,
"_cityid":7380,
"_districtname": "陇川县"
}
]
,
"7386": [
{
"_districtid":7387,
"_cityid":7386,
"_districtname": "泸水县"
}
,{
"_districtid":7388,
"_cityid":7386,
"_districtname": "福贡县"
}
,{
"_districtid":7389,
"_cityid":7386,
"_districtname": "贡山独龙族怒族自治县"
}
,{
"_districtid":7390,
"_cityid":7386,
"_districtname": "兰坪白族普米族自治县"
}
]
,
"7391": [
{
"_districtid":7392,
"_cityid":7391,
"_districtname": "香格里拉县"
}
,{
"_districtid":7393,
"_cityid":7391,
"_districtname": "德钦县"
}
,{
"_districtid":7394,
"_cityid":7391,
"_districtname": "维西傈僳族自治县"
}
]
,
"7891": [
]
,
"7396": [
{
"_districtid":7397,
"_cityid":7396,
"_districtname": "城关区"
}
,{
"_districtid":7398,
"_cityid":7396,
"_districtname": "林周县"
}
,{
"_districtid":7399,
"_cityid":7396,
"_districtname": "当雄县"
}
,{
"_districtid":7400,
"_cityid":7396,
"_districtname": "尼木县"
}
,{
"_districtid":7401,
"_cityid":7396,
"_districtname": "曲水县"
}
,{
"_districtid":7402,
"_cityid":7396,
"_districtname": "堆龙德庆县"
}
,{
"_districtid":7403,
"_cityid":7396,
"_districtname": "达孜县"
}
,{
"_districtid":7404,
"_cityid":7396,
"_districtname": "墨竹工卡县"
}
]
,
"7405": [
{
"_districtid":7406,
"_cityid":7405,
"_districtname": "昌都县"
}
,{
"_districtid":7407,
"_cityid":7405,
"_districtname": "江达县"
}
,{
"_districtid":7408,
"_cityid":7405,
"_districtname": "贡觉县"
}
,{
"_districtid":7409,
"_cityid":7405,
"_districtname": "类乌齐县"
}
,{
"_districtid":7410,
"_cityid":7405,
"_districtname": "丁青县"
}
,{
"_districtid":7411,
"_cityid":7405,
"_districtname": "察雅县"
}
,{
"_districtid":7412,
"_cityid":7405,
"_districtname": "八宿县"
}
,{
"_districtid":7413,
"_cityid":7405,
"_districtname": "左贡县"
}
,{
"_districtid":7414,
"_cityid":7405,
"_districtname": "芒康县"
}
,{
"_districtid":7415,
"_cityid":7405,
"_districtname": "洛隆县"
}
,{
"_districtid":7416,
"_cityid":7405,
"_districtname": "边坝县"
}
]
,
"7417": [
{
"_districtid":7418,
"_cityid":7417,
"_districtname": "乃东县"
}
,{
"_districtid":7419,
"_cityid":7417,
"_districtname": "扎囊县"
}
,{
"_districtid":7420,
"_cityid":7417,
"_districtname": "贡嘎县"
}
,{
"_districtid":7421,
"_cityid":7417,
"_districtname": "桑日县"
}
,{
"_districtid":7422,
"_cityid":7417,
"_districtname": "琼结县"
}
,{
"_districtid":7423,
"_cityid":7417,
"_districtname": "曲松县"
}
,{
"_districtid":7424,
"_cityid":7417,
"_districtname": "措美县"
}
,{
"_districtid":7425,
"_cityid":7417,
"_districtname": "洛扎县"
}
,{
"_districtid":7426,
"_cityid":7417,
"_districtname": "加查县"
}
,{
"_districtid":7427,
"_cityid":7417,
"_districtname": "隆子县"
}
,{
"_districtid":7428,
"_cityid":7417,
"_districtname": "错那县"
}
,{
"_districtid":7429,
"_cityid":7417,
"_districtname": "浪卡子县"
}
]
,
"7430": [
{
"_districtid":7431,
"_cityid":7430,
"_districtname": "日喀则市"
}
,{
"_districtid":7432,
"_cityid":7430,
"_districtname": "南木林县"
}
,{
"_districtid":7433,
"_cityid":7430,
"_districtname": "江孜县"
}
,{
"_districtid":7434,
"_cityid":7430,
"_districtname": "定日县"
}
,{
"_districtid":7435,
"_cityid":7430,
"_districtname": "萨迦县"
}
,{
"_districtid":7436,
"_cityid":7430,
"_districtname": "拉孜县"
}
,{
"_districtid":7437,
"_cityid":7430,
"_districtname": "昂仁县"
}
,{
"_districtid":7438,
"_cityid":7430,
"_districtname": "谢通门县"
}
,{
"_districtid":7439,
"_cityid":7430,
"_districtname": "白朗县"
}
,{
"_districtid":7440,
"_cityid":7430,
"_districtname": "仁布县"
}
,{
"_districtid":7441,
"_cityid":7430,
"_districtname": "康马县"
}
,{
"_districtid":7442,
"_cityid":7430,
"_districtname": "定结县"
}
,{
"_districtid":7443,
"_cityid":7430,
"_districtname": "仲巴县"
}
,{
"_districtid":7444,
"_cityid":7430,
"_districtname": "亚东县"
}
,{
"_districtid":7445,
"_cityid":7430,
"_districtname": "吉隆县"
}
,{
"_districtid":7446,
"_cityid":7430,
"_districtname": "聂拉木县"
}
,{
"_districtid":7447,
"_cityid":7430,
"_districtname": "萨嘎县"
}
,{
"_districtid":7448,
"_cityid":7430,
"_districtname": "岗巴县"
}
]
,
"7449": [
{
"_districtid":7450,
"_cityid":7449,
"_districtname": "那曲县"
}
,{
"_districtid":7451,
"_cityid":7449,
"_districtname": "双湖县"
}
,{
"_districtid":7452,
"_cityid":7449,
"_districtname": "嘉黎县"
}
,{
"_districtid":7453,
"_cityid":7449,
"_districtname": "比如县"
}
,{
"_districtid":7454,
"_cityid":7449,
"_districtname": "聂荣县"
}
,{
"_districtid":7455,
"_cityid":7449,
"_districtname": "安多县"
}
,{
"_districtid":7456,
"_cityid":7449,
"_districtname": "申扎县"
}
,{
"_districtid":7457,
"_cityid":7449,
"_districtname": "索县"
}
,{
"_districtid":7458,
"_cityid":7449,
"_districtname": "班戈县"
}
,{
"_districtid":7459,
"_cityid":7449,
"_districtname": "巴青县"
}
,{
"_districtid":7460,
"_cityid":7449,
"_districtname": "尼玛县"
}
]
,
"7461": [
{
"_districtid":7462,
"_cityid":7461,
"_districtname": "普兰县"
}
,{
"_districtid":7463,
"_cityid":7461,
"_districtname": "札达县"
}
,{
"_districtid":7464,
"_cityid":7461,
"_districtname": "噶尔县"
}
,{
"_districtid":7465,
"_cityid":7461,
"_districtname": "日土县"
}
,{
"_districtid":7466,
"_cityid":7461,
"_districtname": "革吉县"
}
,{
"_districtid":7467,
"_cityid":7461,
"_districtname": "改则县"
}
,{
"_districtid":7468,
"_cityid":7461,
"_districtname": "措勤县"
}
]
,
"7469": [
{
"_districtid":7470,
"_cityid":7469,
"_districtname": "林芝县"
}
,{
"_districtid":7471,
"_cityid":7469,
"_districtname": "工布江达县"
}
,{
"_districtid":7472,
"_cityid":7469,
"_districtname": "米林县"
}
,{
"_districtid":7473,
"_cityid":7469,
"_districtname": "墨脱县"
}
,{
"_districtid":7474,
"_cityid":7469,
"_districtname": "波密县"
}
,{
"_districtid":7475,
"_cityid":7469,
"_districtname": "察隅县"
}
,{
"_districtid":7476,
"_cityid":7469,
"_districtname": "朗县"
}
]
,
"7478": [
{
"_districtid":7479,
"_cityid":7478,
"_districtname": "新城区"
}
,{
"_districtid":7480,
"_cityid":7478,
"_districtname": "碑林区"
}
,{
"_districtid":7481,
"_cityid":7478,
"_districtname": "莲湖区"
}
,{
"_districtid":7482,
"_cityid":7478,
"_districtname": "灞桥区"
}
,{
"_districtid":7483,
"_cityid":7478,
"_districtname": "未央区"
}
,{
"_districtid":7484,
"_cityid":7478,
"_districtname": "雁塔区"
}
,{
"_districtid":7485,
"_cityid":7478,
"_districtname": "阎良区"
}
,{
"_districtid":7486,
"_cityid":7478,
"_districtname": "临潼区"
}
,{
"_districtid":7487,
"_cityid":7478,
"_districtname": "长安区"
}
,{
"_districtid":7488,
"_cityid":7478,
"_districtname": "蓝田县"
}
,{
"_districtid":7489,
"_cityid":7478,
"_districtname": "周至县"
}
,{
"_districtid":7490,
"_cityid":7478,
"_districtname": "户县"
}
,{
"_districtid":7491,
"_cityid":7478,
"_districtname": "高陵县"
}
]
,
"7492": [
{
"_districtid":7493,
"_cityid":7492,
"_districtname": "王益区"
}
,{
"_districtid":7494,
"_cityid":7492,
"_districtname": "印台区"
}
,{
"_districtid":7495,
"_cityid":7492,
"_districtname": "耀州区"
}
,{
"_districtid":7496,
"_cityid":7492,
"_districtname": "宜君县"
}
]
,
"7497": [
{
"_districtid":7498,
"_cityid":7497,
"_districtname": "渭滨区"
}
,{
"_districtid":7499,
"_cityid":7497,
"_districtname": "金台区"
}
,{
"_districtid":7500,
"_cityid":7497,
"_districtname": "陈仓区"
}
,{
"_districtid":7501,
"_cityid":7497,
"_districtname": "凤翔县"
}
,{
"_districtid":7502,
"_cityid":7497,
"_districtname": "岐山县"
}
,{
"_districtid":7503,
"_cityid":7497,
"_districtname": "扶风县"
}
,{
"_districtid":7504,
"_cityid":7497,
"_districtname": "眉县"
}
,{
"_districtid":7505,
"_cityid":7497,
"_districtname": "陇县"
}
,{
"_districtid":7506,
"_cityid":7497,
"_districtname": "千阳县"
}
,{
"_districtid":7507,
"_cityid":7497,
"_districtname": "麟游县"
}
,{
"_districtid":7508,
"_cityid":7497,
"_districtname": "凤县"
}
,{
"_districtid":7509,
"_cityid":7497,
"_districtname": "太白县"
}
]
,
"7510": [
{
"_districtid":7511,
"_cityid":7510,
"_districtname": "秦都区"
}
,{
"_districtid":7512,
"_cityid":7510,
"_districtname": "杨陵区"
}
,{
"_districtid":7513,
"_cityid":7510,
"_districtname": "渭城区"
}
,{
"_districtid":7514,
"_cityid":7510,
"_districtname": "三原县"
}
,{
"_districtid":7515,
"_cityid":7510,
"_districtname": "泾阳县"
}
,{
"_districtid":7516,
"_cityid":7510,
"_districtname": "乾县"
}
,{
"_districtid":7517,
"_cityid":7510,
"_districtname": "礼泉县"
}
,{
"_districtid":7518,
"_cityid":7510,
"_districtname": "永寿县"
}
,{
"_districtid":7519,
"_cityid":7510,
"_districtname": "彬县"
}
,{
"_districtid":7520,
"_cityid":7510,
"_districtname": "长武县"
}
,{
"_districtid":7521,
"_cityid":7510,
"_districtname": "旬邑县"
}
,{
"_districtid":7522,
"_cityid":7510,
"_districtname": "淳化县"
}
,{
"_districtid":7523,
"_cityid":7510,
"_districtname": "武功县"
}
,{
"_districtid":7524,
"_cityid":7510,
"_districtname": "兴平市"
}
]
,
"7525": [
{
"_districtid":7526,
"_cityid":7525,
"_districtname": "临渭区"
}
,{
"_districtid":7527,
"_cityid":7525,
"_districtname": "华县"
}
,{
"_districtid":7528,
"_cityid":7525,
"_districtname": "潼关县"
}
,{
"_districtid":7529,
"_cityid":7525,
"_districtname": "大荔县"
}
,{
"_districtid":7530,
"_cityid":7525,
"_districtname": "合阳县"
}
,{
"_districtid":7531,
"_cityid":7525,
"_districtname": "澄城县"
}
,{
"_districtid":7532,
"_cityid":7525,
"_districtname": "蒲城县"
}
,{
"_districtid":7533,
"_cityid":7525,
"_districtname": "白水县"
}
,{
"_districtid":7534,
"_cityid":7525,
"_districtname": "富平县"
}
,{
"_districtid":7535,
"_cityid":7525,
"_districtname": "韩城市"
}
,{
"_districtid":7536,
"_cityid":7525,
"_districtname": "华阴市"
}
]
,
"7537": [
{
"_districtid":7538,
"_cityid":7537,
"_districtname": "宝塔区"
}
,{
"_districtid":7539,
"_cityid":7537,
"_districtname": "延长县"
}
,{
"_districtid":7540,
"_cityid":7537,
"_districtname": "延川县"
}
,{
"_districtid":7541,
"_cityid":7537,
"_districtname": "子长县"
}
,{
"_districtid":7542,
"_cityid":7537,
"_districtname": "安塞县"
}
,{
"_districtid":7543,
"_cityid":7537,
"_districtname": "志丹县"
}
,{
"_districtid":7544,
"_cityid":7537,
"_districtname": "吴起县"
}
,{
"_districtid":7545,
"_cityid":7537,
"_districtname": "甘泉县"
}
,{
"_districtid":7546,
"_cityid":7537,
"_districtname": "富县"
}
,{
"_districtid":7547,
"_cityid":7537,
"_districtname": "洛川县"
}
,{
"_districtid":7548,
"_cityid":7537,
"_districtname": "宜川县"
}
,{
"_districtid":7549,
"_cityid":7537,
"_districtname": "黄龙县"
}
,{
"_districtid":7550,
"_cityid":7537,
"_districtname": "黄陵县"
}
]
,
"7551": [
{
"_districtid":7552,
"_cityid":7551,
"_districtname": "汉台区"
}
,{
"_districtid":7553,
"_cityid":7551,
"_districtname": "南郑县"
}
,{
"_districtid":7554,
"_cityid":7551,
"_districtname": "城固县"
}
,{
"_districtid":7555,
"_cityid":7551,
"_districtname": "洋县"
}
,{
"_districtid":7556,
"_cityid":7551,
"_districtname": "西乡县"
}
,{
"_districtid":7557,
"_cityid":7551,
"_districtname": "勉县"
}
,{
"_districtid":7558,
"_cityid":7551,
"_districtname": "宁强县"
}
,{
"_districtid":7559,
"_cityid":7551,
"_districtname": "略阳县"
}
,{
"_districtid":7560,
"_cityid":7551,
"_districtname": "镇巴县"
}
,{
"_districtid":7561,
"_cityid":7551,
"_districtname": "留坝县"
}
,{
"_districtid":7562,
"_cityid":7551,
"_districtname": "佛坪县"
}
]
,
"7563": [
{
"_districtid":7564,
"_cityid":7563,
"_districtname": "榆阳区"
}
,{
"_districtid":7565,
"_cityid":7563,
"_districtname": "神木县"
}
,{
"_districtid":7566,
"_cityid":7563,
"_districtname": "府谷县"
}
,{
"_districtid":7567,
"_cityid":7563,
"_districtname": "横山县"
}
,{
"_districtid":7568,
"_cityid":7563,
"_districtname": "靖边县"
}
,{
"_districtid":7569,
"_cityid":7563,
"_districtname": "定边县"
}
,{
"_districtid":7570,
"_cityid":7563,
"_districtname": "绥德县"
}
,{
"_districtid":7571,
"_cityid":7563,
"_districtname": "米脂县"
}
,{
"_districtid":7572,
"_cityid":7563,
"_districtname": "佳县"
}
,{
"_districtid":7573,
"_cityid":7563,
"_districtname": "吴堡县"
}
,{
"_districtid":7574,
"_cityid":7563,
"_districtname": "清涧县"
}
,{
"_districtid":7575,
"_cityid":7563,
"_districtname": "子洲县"
}
]
,
"7576": [
{
"_districtid":7577,
"_cityid":7576,
"_districtname": "汉滨区"
}
,{
"_districtid":7578,
"_cityid":7576,
"_districtname": "汉阴县"
}
,{
"_districtid":7579,
"_cityid":7576,
"_districtname": "石泉县"
}
,{
"_districtid":7580,
"_cityid":7576,
"_districtname": "宁陕县"
}
,{
"_districtid":7581,
"_cityid":7576,
"_districtname": "紫阳县"
}
,{
"_districtid":7582,
"_cityid":7576,
"_districtname": "岚皋县"
}
,{
"_districtid":7583,
"_cityid":7576,
"_districtname": "平利县"
}
,{
"_districtid":7584,
"_cityid":7576,
"_districtname": "镇坪县"
}
,{
"_districtid":7585,
"_cityid":7576,
"_districtname": "旬阳县"
}
,{
"_districtid":7586,
"_cityid":7576,
"_districtname": "白河县"
}
]
,
"7587": [
{
"_districtid":7588,
"_cityid":7587,
"_districtname": "商州区"
}
,{
"_districtid":7589,
"_cityid":7587,
"_districtname": "洛南县"
}
,{
"_districtid":7590,
"_cityid":7587,
"_districtname": "丹凤县"
}
,{
"_districtid":7591,
"_cityid":7587,
"_districtname": "商南县"
}
,{
"_districtid":7592,
"_cityid":7587,
"_districtname": "山阳县"
}
,{
"_districtid":7593,
"_cityid":7587,
"_districtname": "镇安县"
}
,{
"_districtid":7594,
"_cityid":7587,
"_districtname": "柞水县"
}
]
,
"7596": [
{
"_districtid":7597,
"_cityid":7596,
"_districtname": "城关区"
}
,{
"_districtid":7598,
"_cityid":7596,
"_districtname": "七里河区"
}
,{
"_districtid":7599,
"_cityid":7596,
"_districtname": "西固区"
}
,{
"_districtid":7600,
"_cityid":7596,
"_districtname": "安宁区"
}
,{
"_districtid":7601,
"_cityid":7596,
"_districtname": "红古区"
}
,{
"_districtid":7602,
"_cityid":7596,
"_districtname": "永登县"
}
,{
"_districtid":7603,
"_cityid":7596,
"_districtname": "皋兰县"
}
,{
"_districtid":7604,
"_cityid":7596,
"_districtname": "榆中县"
}
]
,
"7605": [
]
,
"7606": [
{
"_districtid":7607,
"_cityid":7606,
"_districtname": "金川区"
}
,{
"_districtid":7608,
"_cityid":7606,
"_districtname": "永昌县"
}
]
,
"7609": [
{
"_districtid":7610,
"_cityid":7609,
"_districtname": "白银区"
}
,{
"_districtid":7611,
"_cityid":7609,
"_districtname": "平川区"
}
,{
"_districtid":7612,
"_cityid":7609,
"_districtname": "靖远县"
}
,{
"_districtid":7613,
"_cityid":7609,
"_districtname": "会宁县"
}
,{
"_districtid":7614,
"_cityid":7609,
"_districtname": "景泰县"
}
]
,
"7615": [
{
"_districtid":7616,
"_cityid":7615,
"_districtname": "秦州区"
}
,{
"_districtid":7617,
"_cityid":7615,
"_districtname": "麦积区"
}
,{
"_districtid":7618,
"_cityid":7615,
"_districtname": "清水县"
}
,{
"_districtid":7619,
"_cityid":7615,
"_districtname": "秦安县"
}
,{
"_districtid":7620,
"_cityid":7615,
"_districtname": "甘谷县"
}
,{
"_districtid":7621,
"_cityid":7615,
"_districtname": "武山县"
}
,{
"_districtid":7622,
"_cityid":7615,
"_districtname": "张家川回族自治县"
}
]
,
"7623": [
{
"_districtid":7624,
"_cityid":7623,
"_districtname": "凉州区"
}
,{
"_districtid":7625,
"_cityid":7623,
"_districtname": "民勤县"
}
,{
"_districtid":7626,
"_cityid":7623,
"_districtname": "古浪县"
}
,{
"_districtid":7627,
"_cityid":7623,
"_districtname": "天祝藏族自治县"
}
]
,
"7628": [
{
"_districtid":7629,
"_cityid":7628,
"_districtname": "甘州区"
}
,{
"_districtid":7630,
"_cityid":7628,
"_districtname": "肃南裕固族自治县"
}
,{
"_districtid":7631,
"_cityid":7628,
"_districtname": "民乐县"
}
,{
"_districtid":7632,
"_cityid":7628,
"_districtname": "临泽县"
}
,{
"_districtid":7633,
"_cityid":7628,
"_districtname": "高台县"
}
,{
"_districtid":7634,
"_cityid":7628,
"_districtname": "山丹县"
}
]
,
"7635": [
{
"_districtid":7636,
"_cityid":7635,
"_districtname": "崆峒区"
}
,{
"_districtid":7637,
"_cityid":7635,
"_districtname": "泾川县"
}
,{
"_districtid":7638,
"_cityid":7635,
"_districtname": "灵台县"
}
,{
"_districtid":7639,
"_cityid":7635,
"_districtname": "崇信县"
}
,{
"_districtid":7640,
"_cityid":7635,
"_districtname": "华亭县"
}
,{
"_districtid":7641,
"_cityid":7635,
"_districtname": "庄浪县"
}
,{
"_districtid":7642,
"_cityid":7635,
"_districtname": "静宁县"
}
]
,
"7643": [
{
"_districtid":7644,
"_cityid":7643,
"_districtname": "肃州区"
}
,{
"_districtid":7645,
"_cityid":7643,
"_districtname": "金塔县"
}
,{
"_districtid":7646,
"_cityid":7643,
"_districtname": "瓜州县"
}
,{
"_districtid":7647,
"_cityid":7643,
"_districtname": "肃北蒙古族自治县"
}
,{
"_districtid":7648,
"_cityid":7643,
"_districtname": "阿克塞哈萨克族自治县"
}
,{
"_districtid":7649,
"_cityid":7643,
"_districtname": "玉门市"
}
,{
"_districtid":7650,
"_cityid":7643,
"_districtname": "敦煌市"
}
]
,
"7651": [
{
"_districtid":7652,
"_cityid":7651,
"_districtname": "西峰区"
}
,{
"_districtid":7653,
"_cityid":7651,
"_districtname": "庆城县"
}
,{
"_districtid":7654,
"_cityid":7651,
"_districtname": "环县"
}
,{
"_districtid":7655,
"_cityid":7651,
"_districtname": "华池县"
}
,{
"_districtid":7656,
"_cityid":7651,
"_districtname": "合水县"
}
,{
"_districtid":7657,
"_cityid":7651,
"_districtname": "正宁县"
}
,{
"_districtid":7658,
"_cityid":7651,
"_districtname": "宁县"
}
,{
"_districtid":7659,
"_cityid":7651,
"_districtname": "镇原县"
}
]
,
"7660": [
{
"_districtid":7661,
"_cityid":7660,
"_districtname": "安定区"
}
,{
"_districtid":7662,
"_cityid":7660,
"_districtname": "通渭县"
}
,{
"_districtid":7663,
"_cityid":7660,
"_districtname": "陇西县"
}
,{
"_districtid":7664,
"_cityid":7660,
"_districtname": "渭源县"
}
,{
"_districtid":7665,
"_cityid":7660,
"_districtname": "临洮县"
}
,{
"_districtid":7666,
"_cityid":7660,
"_districtname": "漳县"
}
,{
"_districtid":7667,
"_cityid":7660,
"_districtname": "岷县"
}
]
,
"7668": [
{
"_districtid":7669,
"_cityid":7668,
"_districtname": "武都区"
}
,{
"_districtid":7670,
"_cityid":7668,
"_districtname": "成县"
}
,{
"_districtid":7671,
"_cityid":7668,
"_districtname": "文县"
}
,{
"_districtid":7672,
"_cityid":7668,
"_districtname": "宕昌县"
}
,{
"_districtid":7673,
"_cityid":7668,
"_districtname": "康县"
}
,{
"_districtid":7674,
"_cityid":7668,
"_districtname": "西和县"
}
,{
"_districtid":7675,
"_cityid":7668,
"_districtname": "礼县"
}
,{
"_districtid":7676,
"_cityid":7668,
"_districtname": "徽县"
}
,{
"_districtid":7677,
"_cityid":7668,
"_districtname": "两当县"
}
]
,
"7678": [
{
"_districtid":7679,
"_cityid":7678,
"_districtname": "临夏市"
}
,{
"_districtid":7680,
"_cityid":7678,
"_districtname": "临夏县"
}
,{
"_districtid":7681,
"_cityid":7678,
"_districtname": "康乐县"
}
,{
"_districtid":7682,
"_cityid":7678,
"_districtname": "永靖县"
}
,{
"_districtid":7683,
"_cityid":7678,
"_districtname": "广河县"
}
,{
"_districtid":7684,
"_cityid":7678,
"_districtname": "和政县"
}
,{
"_districtid":7685,
"_cityid":7678,
"_districtname": "东乡族自治县"
}
,{
"_districtid":7686,
"_cityid":7678,
"_districtname": "积石山保安族东乡族撒拉族自治县"
}
]
,
"7687": [
{
"_districtid":7688,
"_cityid":7687,
"_districtname": "合作市"
}
,{
"_districtid":7689,
"_cityid":7687,
"_districtname": "临潭县"
}
,{
"_districtid":7690,
"_cityid":7687,
"_districtname": "卓尼县"
}
,{
"_districtid":7691,
"_cityid":7687,
"_districtname": "舟曲县"
}
,{
"_districtid":7692,
"_cityid":7687,
"_districtname": "迭部县"
}
,{
"_districtid":7693,
"_cityid":7687,
"_districtname": "玛曲县"
}
,{
"_districtid":7694,
"_cityid":7687,
"_districtname": "碌曲县"
}
,{
"_districtid":7695,
"_cityid":7687,
"_districtname": "夏河县"
}
]
,
"7697": [
{
"_districtid":7698,
"_cityid":7697,
"_districtname": "城东区"
}
,{
"_districtid":7699,
"_cityid":7697,
"_districtname": "城中区"
}
,{
"_districtid":7700,
"_cityid":7697,
"_districtname": "城西区"
}
,{
"_districtid":7701,
"_cityid":7697,
"_districtname": "城北区"
}
,{
"_districtid":7702,
"_cityid":7697,
"_districtname": "大通回族土族自治县"
}
,{
"_districtid":7703,
"_cityid":7697,
"_districtname": "湟中县"
}
,{
"_districtid":7704,
"_cityid":7697,
"_districtname": "湟源县"
}
]
,
"7705": [
{
"_districtid":7706,
"_cityid":7705,
"_districtname": "平安县"
}
,{
"_districtid":7707,
"_cityid":7705,
"_districtname": "民和回族土族自治县"
}
,{
"_districtid":7708,
"_cityid":7705,
"_districtname": "乐都区"
}
,{
"_districtid":7709,
"_cityid":7705,
"_districtname": "互助土族自治县"
}
,{
"_districtid":7710,
"_cityid":7705,
"_districtname": "化隆回族自治县"
}
,{
"_districtid":7711,
"_cityid":7705,
"_districtname": "循化撒拉族自治县"
}
]
,
"7712": [
{
"_districtid":7713,
"_cityid":7712,
"_districtname": "门源回族自治县"
}
,{
"_districtid":7714,
"_cityid":7712,
"_districtname": "祁连县"
}
,{
"_districtid":7715,
"_cityid":7712,
"_districtname": "海晏县"
}
,{
"_districtid":7716,
"_cityid":7712,
"_districtname": "刚察县"
}
]
,
"7717": [
{
"_districtid":7718,
"_cityid":7717,
"_districtname": "同仁县"
}
,{
"_districtid":7719,
"_cityid":7717,
"_districtname": "尖扎县"
}
,{
"_districtid":7720,
"_cityid":7717,
"_districtname": "泽库县"
}
,{
"_districtid":7721,
"_cityid":7717,
"_districtname": "河南蒙古族自治县"
}
]
,
"7722": [
{
"_districtid":7723,
"_cityid":7722,
"_districtname": "共和县"
}
,{
"_districtid":7724,
"_cityid":7722,
"_districtname": "同德县"
}
,{
"_districtid":7725,
"_cityid":7722,
"_districtname": "贵德县"
}
,{
"_districtid":7726,
"_cityid":7722,
"_districtname": "兴海县"
}
,{
"_districtid":7727,
"_cityid":7722,
"_districtname": "贵南县"
}
]
,
"7728": [
{
"_districtid":7729,
"_cityid":7728,
"_districtname": "玛沁县"
}
,{
"_districtid":7730,
"_cityid":7728,
"_districtname": "班玛县"
}
,{
"_districtid":7731,
"_cityid":7728,
"_districtname": "甘德县"
}
,{
"_districtid":7732,
"_cityid":7728,
"_districtname": "达日县"
}
,{
"_districtid":7733,
"_cityid":7728,
"_districtname": "久治县"
}
,{
"_districtid":7734,
"_cityid":7728,
"_districtname": "玛多县"
}
]
,
"7735": [
{
"_districtid":7736,
"_cityid":7735,
"_districtname": "玉树市"
}
,{
"_districtid":7737,
"_cityid":7735,
"_districtname": "杂多县"
}
,{
"_districtid":7738,
"_cityid":7735,
"_districtname": "称多县"
}
,{
"_districtid":7739,
"_cityid":7735,
"_districtname": "治多县"
}
,{
"_districtid":7740,
"_cityid":7735,
"_districtname": "囊谦县"
}
,{
"_districtid":7741,
"_cityid":7735,
"_districtname": "曲麻莱县"
}
]
,
"7742": [
{
"_districtid":7743,
"_cityid":7742,
"_districtname": "格尔木市"
}
,{
"_districtid":7744,
"_cityid":7742,
"_districtname": "德令哈市"
}
,{
"_districtid":7745,
"_cityid":7742,
"_districtname": "乌兰县"
}
,{
"_districtid":7746,
"_cityid":7742,
"_districtname": "都兰县"
}
,{
"_districtid":7747,
"_cityid":7742,
"_districtname": "天峻县"
}
]
,
"7749": [
{
"_districtid":7750,
"_cityid":7749,
"_districtname": "兴庆区"
}
,{
"_districtid":7751,
"_cityid":7749,
"_districtname": "西夏区"
}
,{
"_districtid":7752,
"_cityid":7749,
"_districtname": "金凤区"
}
,{
"_districtid":7753,
"_cityid":7749,
"_districtname": "永宁县"
}
,{
"_districtid":7754,
"_cityid":7749,
"_districtname": "贺兰县"
}
,{
"_districtid":7755,
"_cityid":7749,
"_districtname": "灵武市"
}
]
,
"7756": [
{
"_districtid":7757,
"_cityid":7756,
"_districtname": "大武口区"
}
,{
"_districtid":7758,
"_cityid":7756,
"_districtname": "惠农区"
}
,{
"_districtid":7759,
"_cityid":7756,
"_districtname": "平罗县"
}
]
,
"7760": [
{
"_districtid":7761,
"_cityid":7760,
"_districtname": "利通区"
}
,{
"_districtid":7762,
"_cityid":7760,
"_districtname": "红寺堡区"
}
,{
"_districtid":7763,
"_cityid":7760,
"_districtname": "盐池县"
}
,{
"_districtid":7764,
"_cityid":7760,
"_districtname": "同心县"
}
,{
"_districtid":7765,
"_cityid":7760,
"_districtname": "青铜峡市"
}
]
,
"7766": [
{
"_districtid":7767,
"_cityid":7766,
"_districtname": "原州区"
}
,{
"_districtid":7768,
"_cityid":7766,
"_districtname": "西吉县"
}
,{
"_districtid":7769,
"_cityid":7766,
"_districtname": "隆德县"
}
,{
"_districtid":7770,
"_cityid":7766,
"_districtname": "泾源县"
}
,{
"_districtid":7771,
"_cityid":7766,
"_districtname": "彭阳县"
}
]
,
"7772": [
{
"_districtid":7773,
"_cityid":7772,
"_districtname": "沙坡头区"
}
,{
"_districtid":7774,
"_cityid":7772,
"_districtname": "中宁县"
}
,{
"_districtid":7775,
"_cityid":7772,
"_districtname": "海原县"
}
]
,
"7777": [
{
"_districtid":7778,
"_cityid":7777,
"_districtname": "天山区"
}
,{
"_districtid":7779,
"_cityid":7777,
"_districtname": "沙依巴克区"
}
,{
"_districtid":7780,
"_cityid":7777,
"_districtname": "新市区"
}
,{
"_districtid":7781,
"_cityid":7777,
"_districtname": "水磨沟区"
}
,{
"_districtid":7782,
"_cityid":7777,
"_districtname": "头屯河区"
}
,{
"_districtid":7783,
"_cityid":7777,
"_districtname": "达坂城区"
}
,{
"_districtid":7784,
"_cityid":7777,
"_districtname": "米东区"
}
,{
"_districtid":7785,
"_cityid":7777,
"_districtname": "乌鲁木齐县"
}
]
,
"7786": [
{
"_districtid":7787,
"_cityid":7786,
"_districtname": "独山子区"
}
,{
"_districtid":7788,
"_cityid":7786,
"_districtname": "克拉玛依区"
}
,{
"_districtid":7789,
"_cityid":7786,
"_districtname": "白碱滩区"
}
,{
"_districtid":7790,
"_cityid":7786,
"_districtname": "乌尔禾区"
}
]
,
"7791": [
{
"_districtid":7792,
"_cityid":7791,
"_districtname": "吐鲁番市"
}
,{
"_districtid":7793,
"_cityid":7791,
"_districtname": "鄯善县"
}
,{
"_districtid":7794,
"_cityid":7791,
"_districtname": "托克逊县"
}
]
,
"7795": [
{
"_districtid":7796,
"_cityid":7795,
"_districtname": "哈密市"
}
,{
"_districtid":7797,
"_cityid":7795,
"_districtname": "巴里坤哈萨克自治县"
}
,{
"_districtid":7798,
"_cityid":7795,
"_districtname": "伊吾县"
}
]
,
"7799": [
{
"_districtid":7800,
"_cityid":7799,
"_districtname": "昌吉市"
}
,{
"_districtid":7801,
"_cityid":7799,
"_districtname": "阜康市"
}
,{
"_districtid":7802,
"_cityid":7799,
"_districtname": "呼图壁县"
}
,{
"_districtid":7803,
"_cityid":7799,
"_districtname": "玛纳斯县"
}
,{
"_districtid":7804,
"_cityid":7799,
"_districtname": "奇台县"
}
,{
"_districtid":7805,
"_cityid":7799,
"_districtname": "吉木萨尔县"
}
,{
"_districtid":7806,
"_cityid":7799,
"_districtname": "木垒哈萨克自治县"
}
,{
"_districtid":7807,
"_cityid":7799,
"_districtname": "五家渠市"
}
]
,
"7808": [
{
"_districtid":7809,
"_cityid":7808,
"_districtname": "博乐市"
}
,{
"_districtid":7810,
"_cityid":7808,
"_districtname": "阿拉山口市"
}
,{
"_districtid":7811,
"_cityid":7808,
"_districtname": "精河县"
}
,{
"_districtid":7812,
"_cityid":7808,
"_districtname": "温泉县"
}
]
,
"7813": [
{
"_districtid":7814,
"_cityid":7813,
"_districtname": "库尔勒市"
}
,{
"_districtid":7815,
"_cityid":7813,
"_districtname": "轮台县"
}
,{
"_districtid":7816,
"_cityid":7813,
"_districtname": "尉犁县"
}
,{
"_districtid":7817,
"_cityid":7813,
"_districtname": "若羌县"
}
,{
"_districtid":7818,
"_cityid":7813,
"_districtname": "且末县"
}
,{
"_districtid":7819,
"_cityid":7813,
"_districtname": "焉耆回族自治县"
}
,{
"_districtid":7820,
"_cityid":7813,
"_districtname": "和静县"
}
,{
"_districtid":7821,
"_cityid":7813,
"_districtname": "和硕县"
}
,{
"_districtid":7822,
"_cityid":7813,
"_districtname": "博湖县"
}
]
,
"7823": [
{
"_districtid":7824,
"_cityid":7823,
"_districtname": "阿克苏市"
}
,{
"_districtid":7825,
"_cityid":7823,
"_districtname": "温宿县"
}
,{
"_districtid":7826,
"_cityid":7823,
"_districtname": "库车县"
}
,{
"_districtid":7827,
"_cityid":7823,
"_districtname": "沙雅县"
}
,{
"_districtid":7828,
"_cityid":7823,
"_districtname": "新和县"
}
,{
"_districtid":7829,
"_cityid":7823,
"_districtname": "拜城县"
}
,{
"_districtid":7830,
"_cityid":7823,
"_districtname": "乌什县"
}
,{
"_districtid":7831,
"_cityid":7823,
"_districtname": "阿瓦提县"
}
,{
"_districtid":7832,
"_cityid":7823,
"_districtname": "柯坪县"
}
]
,
"7833": [
{
"_districtid":7834,
"_cityid":7833,
"_districtname": "阿图什市"
}
,{
"_districtid":7835,
"_cityid":7833,
"_districtname": "阿克陶县"
}
,{
"_districtid":7836,
"_cityid":7833,
"_districtname": "阿合奇县"
}
,{
"_districtid":7837,
"_cityid":7833,
"_districtname": "乌恰县"
}
]
,
"7838": [
{
"_districtid":7839,
"_cityid":7838,
"_districtname": "喀什市"
}
,{
"_districtid":7840,
"_cityid":7838,
"_districtname": "疏附县"
}
,{
"_districtid":7841,
"_cityid":7838,
"_districtname": "疏勒县"
}
,{
"_districtid":7842,
"_cityid":7838,
"_districtname": "英吉沙县"
}
,{
"_districtid":7843,
"_cityid":7838,
"_districtname": "泽普县"
}
,{
"_districtid":7844,
"_cityid":7838,
"_districtname": "莎车县"
}
,{
"_districtid":7845,
"_cityid":7838,
"_districtname": "叶城县"
}
,{
"_districtid":7846,
"_cityid":7838,
"_districtname": "麦盖提县"
}
,{
"_districtid":7847,
"_cityid":7838,
"_districtname": "岳普湖县"
}
,{
"_districtid":7848,
"_cityid":7838,
"_districtname": "伽师县"
}
,{
"_districtid":7849,
"_cityid":7838,
"_districtname": "巴楚县"
}
,{
"_districtid":7850,
"_cityid":7838,
"_districtname": "塔什库尔干塔吉克自治县"
}
]
,
"7851": [
{
"_districtid":7852,
"_cityid":7851,
"_districtname": "和田市"
}
,{
"_districtid":7853,
"_cityid":7851,
"_districtname": "和田县"
}
,{
"_districtid":7854,
"_cityid":7851,
"_districtname": "墨玉县"
}
,{
"_districtid":7855,
"_cityid":7851,
"_districtname": "皮山县"
}
,{
"_districtid":7856,
"_cityid":7851,
"_districtname": "洛浦县"
}
,{
"_districtid":7857,
"_cityid":7851,
"_districtname": "策勒县"
}
,{
"_districtid":7858,
"_cityid":7851,
"_districtname": "于田县"
}
,{
"_districtid":7859,
"_cityid":7851,
"_districtname": "民丰县"
}
]
,
"7860": [
{
"_districtid":7861,
"_cityid":7860,
"_districtname": "伊宁市"
}
,{
"_districtid":7862,
"_cityid":7860,
"_districtname": "奎屯市"
}
,{
"_districtid":7863,
"_cityid":7860,
"_districtname": "伊宁县"
}
,{
"_districtid":7864,
"_cityid":7860,
"_districtname": "察布查尔锡伯自治县"
}
,{
"_districtid":7865,
"_cityid":7860,
"_districtname": "霍城县"
}
,{
"_districtid":7866,
"_cityid":7860,
"_districtname": "巩留县"
}
,{
"_districtid":7867,
"_cityid":7860,
"_districtname": "新源县"
}
,{
"_districtid":7868,
"_cityid":7860,
"_districtname": "昭苏县"
}
,{
"_districtid":7869,
"_cityid":7860,
"_districtname": "特克斯县"
}
,{
"_districtid":7870,
"_cityid":7860,
"_districtname": "尼勒克县"
}
]
,
"7871": [
{
"_districtid":7872,
"_cityid":7871,
"_districtname": "塔城市"
}
,{
"_districtid":7873,
"_cityid":7871,
"_districtname": "乌苏市"
}
,{
"_districtid":7874,
"_cityid":7871,
"_districtname": "额敏县"
}
,{
"_districtid":7875,
"_cityid":7871,
"_districtname": "沙湾县"
}
,{
"_districtid":7876,
"_cityid":7871,
"_districtname": "托里县"
}
,{
"_districtid":7877,
"_cityid":7871,
"_districtname": "裕民县"
}
,{
"_districtid":7878,
"_cityid":7871,
"_districtname": "和布克赛尔蒙古自治县"
}
]
,
"7879": [
{
"_districtid":7880,
"_cityid":7879,
"_districtname": "阿勒泰市"
}
,{
"_districtid":7881,
"_cityid":7879,
"_districtname": "布尔津县"
}
,{
"_districtid":7882,
"_cityid":7879,
"_districtname": "富蕴县"
}
,{
"_districtid":7883,
"_cityid":7879,
"_districtname": "福海县"
}
,{
"_districtid":7884,
"_cityid":7879,
"_districtname": "哈巴河县"
}
,{
"_districtid":7885,
"_cityid":7879,
"_districtname": "青河县"
}
,{
"_districtid":7886,
"_cityid":7879,
"_districtname": "吉木乃县"
}
]
,
"7887": [
]
,
"7888": [
]
,
"7889": [
]
}
    }
})(jQuery);