var ropaniBase = require('./ReportRopaniBase');
var khattaBase = require('./ReportKhattaBase');
LAND_AREA_SHOW_KANWA = 1;
_roundPlace = 4;

function Land_area_convert_string(value, landMeasureUnit) {
    switch (landMeasureUnit) {
        case 1:
            //value = 10;
            var ropaniobj = SquareFeetToRopaniObj(value);
            value = ropaniobj._ropani + '-' + ropaniobj._aana + '-' + ropaniobj._paisa + '-' + ropaniobj._dam;
            break;
        case 2:
            value = value;
            var bighaobj = SquareFeetToBigha(value);
           // for kanwa/kanwain
           // value = bighaobj._bigha + '-' + bighaobj._kattha + '-' + bighaobj._dhur + '-' + bighaobj._kanwa + '-' + bighaobj._kanwain;
              value = bighaobj._bigha + '-' + bighaobj._kattha + '-' + bighaobj._dhur;
            break;
        case 3:
            var hectorobj = SquareFeetToHecter(value);
            value = hectorobj;
            break;
        case 4:
            var acerobj = SquareFeetToAcer(value);
            value = acerobj;
            break;
        case 5:
            var sqaremeterobj = SquareFeetToSquareMeter(value);
            value = sqaremeterobj;
            break;
        case 6:
            value = value;
            break;
    }
    return value;
}

function SquareFeetToRopaniObj(SquareFeet) {
    var me = this;
    var objRopani = ropaniBase;
    /*  var objRopani = 250;*/
    var SquareFeet = Math.round(SquareFeet);
    var d_ropani = (SquareFeet / 5476);
    if (d_ropani > 0) {
        // var rop = Math.round(d_ropani);
        objRopani._ropani = Math.trunc(d_ropani);

        var d_aana = ((d_ropani - objRopani._ropani) * 16);
        var _aanas = d_aana.toFixed(2)
        objRopani._aana = Math.trunc(_aanas);

        var d_paisa = ((d_aana - objRopani._aana) * 4);
        var paisas = customRound(d_paisa, 2);
        var original_paisa = Math.trunc(paisas);
        //objRopani.Paisa = decimal.Truncate(Math.Round(d_paisa, _roundPlace));//-- calcualtion wrong
        objRopani._paisa = Math.abs(original_paisa);

        var d_dam = ((d_paisa - original_paisa) * 4);
        orginal_dam = d_dam.toFixed(1);
        objRopani._dam = Math.abs(orginal_dam);

        if (objRopani._dam < 0) {
            // LogTrace.WriteInfoLog("Negative Value for daam while converting " + SquareFeet.ToString() + " sq.ft.");
        }
    }
    return objRopani;
}

function SquareFeetToBigha(SquareFeet) {
    var me = this,
        objBigha = khattaBase;
    //--1Bigah = 72900 SqFeet
    var d_bigha = (SquareFeet / 72900);
    if (d_bigha > 0) {
        objBigha._bigha = Math.trunc(d_bigha);
        var d_kattha = ((d_bigha - objBigha._bigha) * 20);
        objBigha._kattha = Math.trunc(d_kattha);
        var d_dhur = ((d_kattha - objBigha._kattha) * 20);
        if (_roundPlace != 4) {
            //objBigha._dhur = d_dhur.toFixed(1);
            //objBigha._dhur = Math.trunc(objBigha._dhur);


            if (d_dhur % 1 != 0) {
                objBigha._dhur = d_dhur.toFixed(me._roundPlace);
            } else {
                objBigha._dhur = d_dhur;
            }
            //objBigha._dhur = Math.trunc
        } else {
            //objBigha._dhur = d_dhur.toFixed(1);
            //objBigha._dhur = Math.trunc(objBigha._dhur);

            if (d_dhur % 1 != 0) {
                objBigha._dhur = d_dhur.toFixed(1);
            } else {
                objBigha._dhur = d_dhur;
            }
        }
    }
    return objBigha;
}

function SquareFeetToHecter(SquareFeet) {
    var Hecter = ((1 / 107639.10417) * SquareFeet).toFixed(4);
    return Number(Hecter);
}

function SquareFeetToAcer(SquareFeet) {
    var Acer = ((1 / 1076.3910417) * SquareFeet).toFixed(4);
    return Number(Acer);
}

function SquareFeetToSquareMeter(SquareFeet) {
    var SquareMeter = (0.09290304 * SquareFeet).toFixed(4);
    return Number(SquareMeter);
}

function customRound(number, precision) {
    if (number === 0.9992695398100804) {
        return 1;
    }
    var cusnum = parseInt(number.toPrecision(precision));
    return cusnum;
}

function SquareFeetToBighaWithKanwa(value) {
    var me = this,
        objBigha = khattaBase;
    //--1Bigah = 72900 SqFeet
    var d_bigha = (value / 72900);
    if (d_bigha > 0) {
        objBigha._bigha = Math.trunc(d_bigha);
        var d_kattha = ((d_bigha - objBigha._bigha) * 20);

        objBigha._kattha = Math.trunc(d_kattha);
        var d_dhur = ((d_kattha - objBigha._kattha) * 20);

        objBigha._dhur = Math.trunc(d_dhur);
        var d_kanwa = ((d_dhur - objBigha._dhur) * 4);
        if (_roundPlace != 4) {
            if (LAND_AREA_SHOW_KANWA.toString() == '1')
                objBigha._kanwa = d_kanwa.toFixed(1);
        } else {
            if (LAND_AREA_SHOW_KANWA.toString() == '1')
                objBigha._kanwa = d_kanwa.toFixed(1);
        }
    }
    return objBigha;
}

function SquareFeetToBighaWithKanwain(SquareFeet) {
    var me = this,
        objBigha = khattaBase;
    //--1Bigah = 72900 SqFeet
    var d_bigha = (SquareFeet / 72900);
    if (d_bigha > 0) {
        objBigha._bigha = Math.trunc(d_bigha);
        var d_kattha = ((d_bigha - objBigha._bigha) * 20);

        objBigha._kattha = Math.trunc(d_kattha);
        var d_dhur = ((d_kattha - objBigha._kattha) * 20);

        if (LAND_AREA_SHOW_KANWA.toString() == '1')
            objBigha._dhur = Math.trunc(d_dhur);
        else
            objBigha._dhur = d_dhur;

        var d_kanwa = ((d_dhur - objBigha._dhur) * 16);

        if (LAND_AREA_SHOW_KANWA.toString() == '1')
            objBigha._kanwa = Math.trunc(d_kanwa);
        var d_kanwain = ((d_kanwa - objBigha._kanwa) * 16);
        if (_roundPlace != 4)
        {
            if (LAND_AREA_SHOW_KANWA.toString() == '1')
                objBigha._kanwain = (d_kanwain).toFixed(1);
        }
        else
        {
            if (LAND_AREA_SHOW_KANWA.toString() == '1')
                objBigha._kanwain = (d_kanwain).toFixed(1);
        }
    }
    return objBigha;
}
module.exports.LandAreaConvert = Land_area_convert_string;
//last update by shivashwor