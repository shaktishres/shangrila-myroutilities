var groupjs = require('./lib/groupreportjs');
var numword = require('./lib/spellamount');
var dollword = require('./lib/dollar_to_words');
var sortdt = require('./lib/sortJs');
var nepaliword = require('./lib/number_to_word_nepali');
var nepalinumformat = require('./lib/nepali_number_format');
var areaConversion = require('./lib/area_conversion');

//module.exports ={
//	getGroupReport:function(data,options){
//		return getGroupReport(data,options);
//	},
//	groupingOpts:groupingOpts
//};


module.exports = {
	groupingOpts: groupjs.groupingOpts,
	getGroupReport: groupjs.getGroupReport,
	getGroupReportFinalData: groupjs.getGroupReportFinalData,
	getnumberInWords: numword.numbertowords,
	getdollarInWords: dollword.dollartowords,
	getnumberInNepaliWords: nepaliword.nepali_number_to_word,
	formatNumberInNepali: nepalinumformat.format_number_nepali,
	sortData: sortdt.sortData,
	areaConversion: areaConversion.LandAreaConvert
}