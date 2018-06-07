////////////Sorting function starts here///////////////////////////////////////////////////

function sortData(data,sortFieldArray)
{
	data.sort(sort_by(sortFieldArray));

	return data;
}

var sort_by;

(function() {
  // utility functions
  var default_cmp = function(a, b) {
      if (a == b) return 0;
      return a < b ? -1 : 1;
    },
    getCmpFunc = function(primer, reverse) {
      var dfc = default_cmp, // closer in scope
        cmp = default_cmp;
      if (primer) {
        cmp = function(a, b) {
          return dfc(primer(a), primer(b));
        };
      }
      if (reverse) {
        return function(a, b) {
          return -1 * cmp(a, b);
        };
      }
      return cmp;
    };

  // actual implementation
  sort_by = function(groupFields) {
    var fields = [],
      n_fields = groupFields.length,
      field, name, reverse, cmp;

    // preprocess sorting options
    for (var i = 0; i < n_fields; i++) {
      field = groupFields[i];
      if (typeof field === 'string') {
        name = field;
        cmp = default_cmp;
      } else {
        name = field.name;
        cmp = getCmpFunc(field.primer, field.reverse);
      }
      fields.push({
        name: name,
        cmp: cmp
      });
    }

    // final comparison function
    return function(A, B) {
      var a, b, name, result;
      for (var i = 0; i < n_fields; i++) {
        result = 0;
        field = fields[i];
        name = field.name;

        result = field.cmp(A[name], B[name]);
        if (result !== 0) break;
      }
      return result;
    }
  }
}());
/////////End of sorting function//////////////////////////////////////////////////////////

 module.exports.sortData=sortData;