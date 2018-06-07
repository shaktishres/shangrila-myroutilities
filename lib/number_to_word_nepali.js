
//This module cann be used to convert numbers in Nepali unicoded words//
//Author: Sharad///
function getBelowHundred(t) {
	return teens[t]
}

function nepali_number_to_word(t) {
	if (isNaN(t) || "" == t) return "N/A";
	var n = "रु. ",
		e = 0,
		t = t.toString();
	if (-1 != t.indexOf(".") && (number_parts = t.split("."), t = number_parts[0], e = number_parts[1], decimal_tens = e.substring(0, 2).toString(), 1 == decimal_tens.length && (decimal_tens = decimal_tens.toString() + "0"), decimal_words = teens[parseInt(decimal_tens)].toString() + " पैसा"), t.length > 13) return void alert("Number greater than kharab not supported");
	var r = Math.floor(t % 100);
	if (t.toString().length > 2) var s = t.toString().substring(t.toString().length - 3, t.toString().length - 2);
	var i = Math.floor(t % 1e5);
	i = i.toString(), i = i.substring(0, i.length - 3);
	var a = Math.floor(t % 1e7);
	a = a.toString(), a = a.substring(0, a.length - 5);
	var o = Math.floor(t % 1e9);
	o = o.toString(), o = o.substring(0, o.length - 7);
	var g = Math.floor(t % 1e11);
	g = g.toString(), g = g.substring(0, g.length - 9);
	var l = Math.floor(t % 1e13);
	return l = l.toString(), l = l.substring(0, l.length - 11), l > 0 && (n += teens[l] + " खरब"), g > 0 && (n += " " + teens[g] + " अरब"), o > 0 && (n += " " + teens[o] + " करोड"), a > 0 && (n += " " + teens[a] + " लाख"), i > 0 && (n += " " + teens[i] + " हजार"), s > 0 && (n += " " + units[s] + " सय"), r > 0 && (n += " " + teens[r]), e > 0 && (n += " र " + decimal_words), n+" मात्र "
}
var units = ["सुन्य", "एक", "दुई", "तीन", "चार", "पाँच", "छ", "सात", "आठ", "नौ", "दस"],
	teens = ["सुन्य", "एक", "दुई", "तीन", "चार", "पाँच", "छ", "सात", "आठ", "नौ", "दस", "एघार", "बाह्र", "तेह्र", "चौध", "पन्ध्र ", "सोह्र", "सत्र", "अठाह्र", "उन्नाइस", "बीस", "एक्काइस", "बाइस", "तेइस", "चौबीस", "पच्चिस", "छब्बीस", "सत्ताइस", "अठ्ठाइस", "उनन्तीस", "तीस", "एकतीस", "बतीस", "तेत्तीस", "चौतीस", "पैतीस", "छत्तीस", "सैँतिस", "अठतीस", "उनन्चालिस", "चालीस", "एकचालीस", "बयालिस", "त्रिचालीस", "चौवालिस", "पैंतालीस", "छयालीस", "सतचालीस", "अठचालीस", "उनान्चास", "पचास", "एकाउन्न", "बाउन्न", "त्रिपन्न", "चौवन्न", "पचपन्न", "छपन्न", "सन्ताउन्न", "अन्ठाउन्न", "उनन्साठी", "साठी", "एकसट्ठी", "बयसट्ठी", "त्रिसट्ठी", "चौसट्ठी", "पैँसट्ठी", "छयसट्ठी", "सतसट्ठी", "अठसट्ठी", "उनन्सत्तरी", "सत्तरी", "एकहत्तर", "बहत्तर", "त्रिहत्तर", "चौहत्तर", "पचहत्तर", "छयहत्तर", "सतहत्तर", "अठहत्तर", "उनासी", "असी", "एकासी", "बयासी", "त्रियासी", "चौरासी", "पचासी", "छयासी", "सतासी", "अठासी", "उनान्नब्बे", "नब्बे", "एकानब्बे", "बयानब्बे", "त्रियानब्बे", "चौरानब्बे", "पन्चानब्बे", "छयानब्बे", "सन्तानब्बे ", "अन्ठानब्बे", "उनान्सय"],
	tens = ["", "दस", "बीस", "तीस", "चालीस", "पचास", "साठी", "सत्तरी", "असी", "नब्बे"];
	
module.exports.nepali_number_to_word = nepali_number_to_word;