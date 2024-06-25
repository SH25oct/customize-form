let btn = document.querySelector("#add-field");

btn.addEventListener('click', function addField(event) {
    event.preventDefault();
    var container = document.getElementById('fields-container');
    var inputType = prompt("Enter input type (e.g., text, number, checkbox, radio):");
    var label = prompt("Enter label for the field:");
    var radioValues = [];
    if (inputType === 'checkbox' || inputType === 'radio') {
        var valuesInput = prompt('Enter comma-separated values for labels:');
        radioValues = valuesInput ? valuesInput.split(',') : [];
    }
    var value = inputType === 'checkbox' ? [] : (inputType === 'radio' ? '' : prompt("Enter the value:"));

    var field = document.createElement('div');
    field.className = 'field';
    
    var html = '';
    if (inputType === 'checkbox' || inputType === 'radio') {
        radioValues.forEach(function (elem, index) {
            var id = label + '_' + index;
            html += '<input type="' + inputType + '" id="' + id + '" name="' + label + '" value="' + elem + '">';
            html += '<label for="' + id + '">' + elem + '</label>';
        });
    } else {
        html = '<input type="' + inputType + '" id="' + label + '" name="' + label + '" value="' + value + '">';
    }
    field.innerHTML = '<label>' + label + '</label>' + html +
        '<div class="field-actions">' +
        '<button class="edit-btn">Edit</button>' +
        '<button class="delete-btn">Delete</button>' +
        '<button class="swap-up-btn">↑</button>' +
        '<button class="swap-down-btn">↓</button>' +
        '</div>';

    container.appendChild(field);

    var editBtn = field.querySelector('.edit-btn');
    editBtn.addEventListener('click', function(event) {
        event.preventDefault();
        var inputField = field.querySelector('input[type="' + inputType + '"]');
        if (inputField) {
            inputField.focus();
        }
    });

    var deleteBtn = field.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault();
        container.removeChild(field);
    });

    var swapUpBtn = field.querySelector('.swap-up-btn');
    swapUpBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (field.previousElementSibling) {
            container.insertBefore(field, field.previousElementSibling);
        }
    });

    var swapDownBtn = field.querySelector('.swap-down-btn');
    swapDownBtn.addEventListener('click', function(event) {
        event.preventDefault();
        if (field.nextElementSibling) {
            container.insertBefore(field.nextElementSibling, field);
        }
    });

    if (inputType === 'checkbox') {
        var checkboxes = field.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    checkboxes.forEach(function(cb) {
                        if (cb !== checkbox) {
                            cb.checked = false;
                        }
                    });
                }
            });
        });
    }
});