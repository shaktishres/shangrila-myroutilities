

//Setting for the report///////////////////////////////////////////////////////////////////////////////////////////
//@groupFields: Key fields by which grouping will be done. Eg. groupingOpts.groupFields = ["Anchal", "District"];//
//@valueFields: Fields to do aggragate. supported groupTypes are: sum,count,min,max,avg.  Eg.
//   groupingOpts.valueFields = [{
//     field: "Population",
//     groupType: "sum"
//   }, {
//     field: "Income",
//     groupType: "count"
//   }];
//@showGroupTypeLabel: true if required to group lable else false
// Then call var a = getGroupReport(items, options); return a;////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sortObj=require('./sortJs');

 groupingOpts = {
  groupFields: [],
  valueFields: [],
  showGroupTypeLabel: false,
  showSubTotal:true,
  subTotalLabel: "Sub Total",
  grandTotalLabel: "Grand Total"
};

//Main function to call for group report///
function getGroupReport(data, options) {
  groupFieldArr = groupingOpts.groupFields;
  valueFieldArr = groupingOpts.valueFields;

  //console.log(groupingOpts);


  // if (!isArray(groupFieldArr) || !isArray(valueFieldArr)) {
  //   return "Must pass array.";
  // }
  var gfLen = groupFieldArr.length,
    gf = 0;
  var vfLen = valueFieldArr.length,
    vf = 0;
	sortObj.sortData(data,groupFieldArr);
  //data.sort(sort_by(groupFieldArr));

  var totalObj = {};
  var out = "",
    nxt = 0,
    i;
  for (i = 0, l = data.length; i < l; i++) {
    data[i]["__index"] = i + 1;
    getGroupTotalObject(totalObj, groupFieldArr, 0, valueFieldArr, data[i]);
  }

  finalData = [];
  if (gfLen > 0) {
    if (groupingOpts.showGroupTypeLabel) {
      var gh = {};
      for (v = 0; v < vfLen; v++) {
        gh[[valueFieldArr[v].field]] = '(' + valueFieldArr[v].groupType + ')';
      }
    out = out + options.fn(gh);
      //finalData.push(gh);
    }
  }

  for (var a = 0; a < data.length; a++) {
    out = out + options.fn(data[a]);
    //finalData.push(data[a]);
	if(groupingOpts.showSubTotal)
	{
    nxt = a + 1;
    for (gf = gfLen - 1; gf >= 0; gf--) {
      //NOTE : don't use === here, eg. data[nxt] == null
      if (isEmpty(data[nxt]) ||
        data[nxt][groupFieldArr[gf]] != data[a][groupFieldArr[gf]]) {
        var dt = {
          total_class: "sub-total"
        };
        var tmp = totalObj;
        for (var g = 0; g <= gf; g++) {
          tmp = tmp[data[a][groupFieldArr[g]]];
        }
        var lbl = "";
        lbl = data[a][groupFieldArr[gf]];
        for (var t = (gf - 1); t >= 0; t--) {
          lbl = data[a][groupFieldArr[t]] + " > " + lbl;
        }
        dt[groupFieldArr[gfLen - 1]] = groupingOpts.subTotalLabel + "(" + lbl + ")";
        for (var v = 0; v < vfLen; v++) {
          dt[[valueFieldArr[v].field]] = tmp.__grouping[valueFieldArr[v].groupType][valueFieldArr[v].field]; //tmp.__grouping[[valueFieldArr[v].field]];
        }
       // finalData.push(dt);
        out = out + options.fn(dt);
      }
    }
	}
  }
  if (totalObj.__grouping) {
    dt = {
      total_class: "grand-total"
    };
    dt[groupFieldArr[gfLen - 1]] = groupingOpts.grandTotalLabel;
    for (v = 0; v < vfLen; v++) {
      dt[[valueFieldArr[v].field]] = totalObj.__grouping[valueFieldArr[v].groupType][valueFieldArr[v].field]; // totalObj.__grouping[[valueFieldArr[v].field]];
    }
    //finalData.push(dt);
    out=out + options.fn(dt);
  }

  //document.write(JSON.stringify(finalData));
 return out;
  //return finalData;
}

//If you need final data only call this function///
//It returns grouped data with total filds//////
function getGroupReportFinalData(data, options) {
  groupFieldArr = groupingOpts.groupFields;
  valueFieldArr = groupingOpts.valueFields;

  //console.log(groupingOpts);


  // if (!isArray(groupFieldArr) || !isArray(valueFieldArr)) {
  //   return "Must pass array.";
  // }
  var gfLen = groupFieldArr.length,
    gf = 0;
  var vfLen = valueFieldArr.length,
    vf = 0;
	
	sortObj.sortData(data,groupFieldArr);
  //data.sort(sort_by(groupFieldArr));

  var totalObj = {};
  var out = "",
    nxt = 0,
    i;
  for (i = 0, l = data.length; i < l; i++) {
    data[i]["__index"] = i + 1;
    getGroupTotalObject(totalObj, groupFieldArr, 0, valueFieldArr, data[i]);
  }

  var finalObj = [data, totalObj];
  //document.write(JSON.stringify(finalObj));
  return finalObj;
}


function groupedListex(data, groupingOpts, options) {}



function getGroupTotalObject(totalObj, groupFieldArr, groupFieldIdx, valueFieldArr, dataRow) {
  getGroupTotalObjectHelper(totalObj, groupFieldArr, groupFieldIdx, valueFieldArr, dataRow);
  var v = 0,
    vlen = valueFieldArr.length;
  var obj = totalObj.__grouping = totalObj.__grouping || {
    min: {},
    max: {},
    sum: {},
    avg: {},
    count: {}
  };
  for (v = 0; v < vlen; v++) {
    performGrouping(obj, v, valueFieldArr, dataRow);
  }
}


function getGroupTotalObjectHelper(totalObj, groupFieldArr, groupFieldIdx, valueFieldArr, dataRow) {
  var fldName = groupFieldArr[groupFieldIdx],
    groupFldData = dataRow[fldName];
  var v = 0,
    obj,
    vlen = valueFieldArr.length;
  if (groupFieldIdx < (groupFieldArr.length - 1)) {

    totalObj[groupFldData] = totalObj[groupFldData] || {};
    getGroupTotalObjectHelper(totalObj[groupFldData], groupFieldArr, groupFieldIdx + 1, valueFieldArr, dataRow);
    obj = totalObj[groupFldData].__grouping = totalObj[groupFldData].__grouping || {
      min: {},
      max: {},
      sum: {},
      avg: {},
      count: {}
    };

    for (v = 0; v < vlen; v++) {
      performGrouping(obj, v, valueFieldArr, dataRow);
    }
    return;
  } else {

    totalObj[groupFldData] = totalObj[groupFldData] || {
      "__grouping": {
        min: {},
        max: {},
        sum: {},
        avg: {},
        count: {}
      }
    };

    obj = totalObj[groupFldData].__grouping;
    for (v = 0; v < vlen; v++) {
      performGrouping(obj, v, valueFieldArr, dataRow);
    }
    return true;
  }
}

function performGrouping(obj, v, valueFieldArr, dataRow) {

  switch (valueFieldArr[v].groupType) {
    case "sum":
      obj.sum[valueFieldArr[v].field] = obj.sum[valueFieldArr[v].field] || 0;
      obj.sum[valueFieldArr[v].field] += dataRow[valueFieldArr[v].field];
      break;
    case "count":
      obj.count[valueFieldArr[v].field] = obj.count[valueFieldArr[v].field] || 0;
      obj.count[valueFieldArr[v].field] += 1;
      break;
    case "min":
      if (((dataRow[valueFieldArr[v].field] < obj.min[valueFieldArr[v].field]) || (obj.min[valueFieldArr[v].field] == null))) {
        obj.min[valueFieldArr[v].field] = dataRow[valueFieldArr[v].field];
      } else {
        obj.min[valueFieldArr[v].field] = obj.min[valueFieldArr[v].field];
      }
      break;
    case "max":
      obj.max[valueFieldArr[v].field] = obj.max[valueFieldArr[v].field] || 0;
      if (dataRow[valueFieldArr[v].field] > obj.max[valueFieldArr[v].field]) {
        obj.max[valueFieldArr[v].field] = dataRow[valueFieldArr[v].field];
      } else {
        obj.max[valueFieldArr[v].field] = obj.max[valueFieldArr[v].field];
      }
      break;
    case "avg":
      obj.sum[valueFieldArr[v].field] = obj.sum[valueFieldArr[v].field] || 0;
      obj.sum[valueFieldArr[v].field] += dataRow[valueFieldArr[v].field];

      obj.count[valueFieldArr[v].field] = obj.count[valueFieldArr[v].field] || 0;
      obj.count[valueFieldArr[v].field] += 1;
      var avgVal = (obj.sum[valueFieldArr[v].field] / obj.count[valueFieldArr[v].field]);
      obj.avg[valueFieldArr[v].field] = parseFloat(avgVal).toFixed(2);
      break;
  }


  return true;
}


/// array[continent, country, city]
function multiFieldCompare() {

}

function isArray(obj) {
  if (obj.constructor == Array)
    return true;
  return false;
}

function isEmpty(x) {
  for (var i in x) {
    return false;
  }
  return true;
}


 module.exports.groupingOpts=groupingOpts;
 module.exports.getGroupReport=getGroupReport;
 module.exports.getGroupReportFinalData=getGroupReportFinalData;
