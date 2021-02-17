var input_errors;

var array_form1 = ['name', 'phone'];

function html_decode(arr) {

    var map = {
        '&amp;': '&',
        '&#038;': "&",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "’",
        '&#8216;': "‘",
        '&#8211;': "–",
        '&#8212;': "—",
        '&#8230;': "…",
        '&#8221;': '”'
    };


    for (var i  in arr) {

        arr[i] = arr[i].replace(/\&[\w\d\#]{2,5}\;/g, function (m) {
            return map[m];
        });


    }

    return arr

}


function formSubmit() {
    var a = 0;
    var error = 0;
    while (a < array_form1.length) {
        if (validate(array_form1[a]) == false) {
            error++;
        }
        a++;
    }
    if (error == 0) {
        return true;
    } else {
        alert(document.getElementById('error').value);
        return false;
    }
}

function validate(elem) {
    switch (elem) {
        case 'phone':
            var phone = document.getElementById(elem).value;
            var reg = /\d{9,}/g;
            return reg.test(phone);
            break;
        default:
            var prom = document.getElementById(elem).value;
            if (prom.length > 2) {
                return true;
            } else {
                return false;
            }
    }
}

var iFields = new Array("name", "surname", "address", "pcode", "city", "phone", "email");
var eFields = new Array("email");
var nFields = new Array("phone");

function isNotEmpty(elem) {
    var delem = document.getElementById(elem);
    var str = delem.value;
    var tpe = delem.type;

    if (tpe == "checkbox" && delem.checked) {
        return true;
    }
    else if (tpe == "checkbox" && !delem.checked) {
        alert(input_errors._checkbox);
    }
    var re = /.+/;
    if (!str.match(re)) {

        return false;
    }
    else {
        return true;
    }
}

function isNumericVal(elem) {
    return isValidPhone(document.getElementById(elem).value)
}

function isValidPhone(str) {
    if (!str || !/^[\d\(\)\s\+-]+$/.test(str)) {
        return false
    }

    var len = str.replace(/[^\d]/g, "").length
    return len >= 5 && len <= 33
}

function isEMailAddr(elem) {
    var delem = document.getElementById(elem);
    var str = delem.value;
    var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,7}$/;
    var re = /^[^ ]+@[^ ]+\.[^ ]{2,7}$/;
    if (!str.match(re)) {
        return false;
    }
    else {
        return true;
    }
}

function isPcodeval(elem) {
    var delem = document.getElementById(elem).value;
    var test = delem.replace(/[^a-zA-Z0-9]/g, "");
    if (test.length > 2) {
        return true;
    }
    else {
        return false;
    }
}

function submitForm() {

    var eCounter = 0;

    for (var i = 0; i < iFields.length; i++) {
        if (!isNotEmpty(iFields[i]))
            eCounter++;
    }

    if (eCounter > 0) {
        alert(input_errors._count);
        return false;
    }
    else {
        for (var i = 0; i < eFields.length; i++) {
            if (!isEMailAddr(eFields[i])) {
                alert(input_errors._mail);
                return false;
            }
        }

        for (var i = 0; i < nFields.length; i++) {
            if (!isNumericVal(nFields[i])) {
                alert(input_errors._nan);
                return false;
            }
        }
        for (i = 0; i < iFields.length; i++) {
            if (iFields[i] == "pcode" && !isPcodeval(iFields[i])) {
                alert(input_errors._pcode);
                return false;
            }
        }
    }

    return true;

}