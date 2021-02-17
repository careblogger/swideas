$('form').submit(function (e) {

    if (typeof this.onsubmit == 'function') {
        return this.onsubmit.toString();
    }
    else {
        if (checkForm(e)) {
            PreventExitSplash = true;
            return true;
        }
        PreventExitSplash = false;
        return false;
    }

});

var deliverySelect = getElement('deliveryForm');
if (deliverySelect) {
    deliverySelect.onchange = function (e) {
        var form = findParent(e.target, 'form');
        inpost(this.value == 'inpostMachine', form);
    };
}
else {
    var deliveryRadio = $('[name="deliveryForm"]');
    if (deliveryRadio.length) {
        deliveryRadio.on('change', function (e) {
            var form = findParent(e.target, 'form');
            inpost(this.value == 'inpostMachine', form);
        });
    }
}

function findParent(e, tag, attr) {
    var parent = e.parentNode;
    if (!parent) {
        return null;
    }
    var parentTag = parent.tagName.toLowerCase();
    if (parentTag == 'html') {
        return false;
    } else {
        if (parentTag == tag) {
            if (attr) {
                if (attr == parent.getAttribute('id')) {
                    return parent;
                } else {
                    return findParent(parent, tag, attr);
                }
            } else {
                return parent;
            }
        }
        else {
            if (attr) {
                return findParent(parent, tag, attr);
            } else {
                return findParent(parent, tag);
            }
        }
    }
}

function inpost(show, form) {
    var inpost_map = document.getElementById('easypack-map');
    console.log(inpost_map)
    if (show) {
        if (!inpost_map) {
            var inpost_map = document.createElement('div');
            var inpost_map_frame = document.createElement('div');
            var inpost_map_close = document.createElement('span');
            inpost_map.setAttribute('id', 'easypack-map');
            inpost_map_close.setAttribute('class', 'close');
            inpost_map_close.setAttribute('onclick', 'return inpostMap(false);');
            inpost_map_close.innerText = 'x';
            inpost_map_frame.setAttribute('class', 'easypack-map-frame');
            inpost_map_frame.setAttribute('style', 'display:none;');
            inpost_map_frame.appendChild(inpost_map_close);
            inpost_map_frame.appendChild(inpost_map);
            document.body.appendChild(inpost_map_frame);
            var inpost_script = document.createElement('script');
            var inpost_link = document.createElement('link');
            inpost_script.setAttribute('src', 'https://geowidget.easypack24.net/js/sdk-for-javascript.js');
            inpost_link.setAttribute('href', 'https://geowidget.easypack24.net/css/easypack.css');
            inpost_link.setAttribute('rel', 'stylesheet');
            inpost_link.setAttribute('type', 'text/css');
            document.head.appendChild(inpost_script);
            document.head.appendChild(inpost_link);
            inpost_script.addEventListener("load", function (e) {
                window.easyPackAsyncInit = function () {
                    easyPack.init({});
                    var map = easyPack.mapWidget('easypack-map', function (point) {
                        var note = false;
                        Object.values(form.getElementsByTagName('input')).forEach(function (e) {
                            if (e.getAttribute('name') == 'note') {
                                note = e;
                            }
                        });
                        var inpost_val = '[INPOST-' + point.name + '; ]';
                        if (note) {
                            var noteValue = note.getAttribute('value');
                            if (noteValue) {
                                if (/\[INPOST-.*?\]/.test(noteValue)) {
                                    note.setAttribute('value', noteValue.replace(/\[INPOST-.*?\]/, inpost_val));
                                } else {
                                    note.setAttribute('value', noteValue + ' ' + inpost_val);
                                }
                            } else {
                                note.setAttribute('value', inpost_val);
                            }
                        } else {
                            var input = document.createElement('input');
                            input.setAttribute('name', 'note');
                            input.setAttribute('id', 'note');
                            input.setAttribute('type', 'hidden');
                            input.setAttribute('value', inpost_val);
                            form.appendChild(input);
                        }
                        inpostSetText(form, point.name);
                        inpostMap(false);
                    });
                };
            });

            document.body.addEventListener('click', function (e) {
                var frame = findParent(e.target, 'div', 'easypack-map');
                if (e.target.tagName.toLowerCase() !== 'button' && frame === false) {
                    inpostMap(false);
                }
            });
        }

        Object.values(document.getElementsByClassName('inpost')).forEach(function (x) {
            if (x.style.display != 'block') {
                x.style.display = 'block';
            }
        });

    } else {

        Object.values(document.getElementsByClassName('inpost')).forEach(function (x) {
            if (x.style.display != 'none') {
                x.style.display = 'none';
            }
        });

    }


}


function inpostMap(show) {
    if (show) {
        Object.values(document.getElementsByClassName('easypack-map-frame')).forEach(function (x) {
            if (x.style.display != 'block') {
                x.style.display = 'block';
            }
        });
    } else {
        Object.values(document.getElementsByClassName('easypack-map-frame')).forEach(function (x) {
            if (x.style.display != 'none') {
                x.style.display = 'none';
            }
        });
    }
    return false;
}

function inpostSetText(form, txt) {
    element = false;
    Object.values(form.getElementsByTagName('div')).forEach(function (e) {
        if (e.getAttribute('class') && e.getAttribute('class') == 'inpostInfo') {
            element = e;
        }
    });
    if (element) {
        element.innerHTML = 'Wybrałeś paczkomat ' + txt;
    }
}

$('#inpostButtonShow button').on('click', function () {
    inpostMap(true);
});

$('#deliveryForm').on('change', function () {

    if ($(this).val() == 'inpostMachine') {

        $('#inpostButtonShow, .inpostInfo').show();

    } else {

        $('input[name=note]').val("");
        $('.inpostInfo div').remove();
        $('.inpostInfo').text("");

        $('.inpostInfo')
            .append('<div class="chooseNo">Nie wybrano paczkomatu</div>');
        $('#inpostButtonShow, .inpostInfo').hide();

    }
});


function elem(id) {
    return document.getElementById(id)
}

function getElement(name) {
    var elements = getElements(name);
    var element = false;
    var tr;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i]) {
            tr = findParent(elements[i], 'tr');
            if (tr !== false) {
                element = elements[i];
            }
        }
    }
    return element;
}

function getElements(name) {
    return document.getElementsByName(name);
}

function checkForm(e) {
    if (typeof addressSplit == 'function') {
        addressSplit();
    }
    if (typeof markFormFields == 'function') {
        markFormFields();
    }
    var paczkomat = $('#deliveryForm').val() == 'inpostMachine';

    if (paczkomat) {
        if (!/INPOST/.test($('input[name="note"]').val())) {
            alert('Proszę wybrać paczkomat');
            return false;
        }
    }
    if (!elem('mx_validation') === false && !elem('mx_pick_up_point') === true) {
        if (to_phone() !== true) {
            return false;
        }
    }
    if (!elem('mx_pick_up_point') === false) {
        if (formCheck() !== true) {
            return false;
        }
        if (is_pick_up_point_selected() !== true) {
            return false;
        }
    }
    if (!elem('ro_validation') === false) {
        Romania.collectAddress();
    }
    if (!elem('ve_validation') === false) {
        if (validateForm() !== true) {
            return false;
        }
    }
    if (!elem('focus_invalid') === false) {
        if (focusInvalid() !== true) {
            return false;
        }
    }
    if (submitForm() === true) {
        if (!elem('ver2') === false) {
            upNote2(e);
        }
        if (!elem('bonus100-note') === false) {
            $('input[name=note]').val($('input[name=note]').val() + " " + $('#bonus100-note').text());
        }

        if (typeof markFormFields == 'function') {
            if (markFormFields() !== true) {
                return false;
            }
        }
        return true;
    }

    return false;
}