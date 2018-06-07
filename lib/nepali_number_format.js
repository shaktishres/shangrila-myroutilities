function format_number_nepali(numb) {

	var numbparts, mainpart, decpart;

	var numb = numb.toString();

	if (-1 != numb.indexOf(".")) {
		numbparts = numb.split('.')
		mainpart = numbparts[0];
		decpart = numbparts[1];
	} else {
		numbparts = numb;
		mainpart = numb;
		decpart = '00';
	}
	var lastthreedigit, initialdigits, final_formattedVal;

	//If the value contains more than three digits before decimal//
	if (mainpart.length > 3) {
		lastthreedigit = mainpart.substr(mainpart.length - 3, 3);

		initialdigits = mainpart.substr(0, mainpart.length - 3);
	} else {
		lastthreedigit = mainpart;

		initialdigits = '';
	}

	//Add comma between each consucitive two digits///
	var initial_format_with_two_digs = addcommabytwodigs(initialdigits);

	//Finally concat all fragmented parts to form complete converted value//
	if (mainpart.length > 3) {
		final_formattedVal = initial_format_with_two_digs + ',' + lastthreedigit + '.' + decpart;
	} else {
		final_formattedVal = lastthreedigit + '.' + decpart;
	}

	return final_formattedVal;

}

//Function to add comma between every consucitive two digits//
function addcommabytwodigs(inputText) {
	var commaPattern = /(\d+)(\d{2})(\.\d{3})*$/;
	var callback = function(match, p1, p2, p3) {
		return p1.replace(commaPattern, callback) + ',' + p2 + (p3 || '');
	};
	return inputText.replace(commaPattern, callback);
}

module.exports.format_number_nepali = format_number_nepali;