// Ensure the DOM is ready
$(function() {
    
    loadItem();    

    // If local storage is available, load previously 
    // saved tasks
    function loadItem() {
        if (window.localStorage) {
            // First clear everything out
            var ul = document.querySelector('ul');
            var li = document.getElementsByTagName('li');       
            var remainingLi;

            while(remainingLi = li.length > 0) {
                ul.removeChild(li[0]);           
            }
       
            // For each record returned from local storage retrieve the data
            // and create the elements to store the data returned in
            for(var i = 0; i < localStorage.length; i++) {
                var newElement = document.createElement('li');
            
                var savedTask = localStorage.getItem(i);                                                
           
                var newInput = createInputElement();
                newInput.value = savedTask;
             
                var newRadio = createRadioElement();

                // Add the input and radio to the li element
                newElement.appendChild(newInput);
                newElement.appendChild(newRadio);
                        
                // get the place where the new element is going to be added
                var position = document.getElementsByTagName('ul')[0];

                // Add the li entry including the input field to the ul elemet
                position.appendChild(newElement);
            }
        
            setCountOfItems();
        }    
    } 

    function createInputElement() {
        var newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('name', 'task');

        return newInput;
    }

    function createRadioElement() {
        var newRadio = document.createElement('input');
        newRadio.setAttribute('type', 'radio');
        newRadio.setAttribute('name', 'selected');
        newRadio.setAttribute('checked', 'checked');

        return newRadio;
    }

    // Add a new task
    function addItem() {    
        // Create the elements required, li, text input field and radio button
        var newElement = document.createElement('li');            
        var newInput = createInputElement();
        var newRadio = createRadioElement();

        // Add the input and radio to the li element
        newElement.appendChild(newInput);
        newElement.appendChild(newRadio);
    
        // get the place where the new element is going to be added
        var position = document.getElementsByTagName('ul')[0];

        // Add the li entry including the input field to the ul elemet
        position.appendChild(newElement);

        // Update the count
        setCountOfItems();
    }

    // Removes an item from the to do list and local storage
    function removeItem() {
        // Get all the radio buttons
        var selectedRadio = document.getElementsByName('selected');

       // Go through them looking for the one that is selected (checked)
       for (var i = 0; i < selectedRadio.length; i++) {        
           // Remove the selected 
           if (selectedRadio[i].checked) {
               var removeEl = document.getElementsByTagName('li')[i];            
               var containerEl = removeEl.parentNode;
               containerEl.removeChild(removeEl);
            
               // Remove the item from local storage
               if (window.localStorage) {
                   localStorage.removeItem(i);
               }
            }    
        }

       setCountOfItems();            
    }

    // Save the tasks to local storage
    function saveItem() {
        if (window.localStorage) {       
            var tasks = document.getElementsByName('task');        
            
            for(var i = 0; i < tasks.length; i++) {            
                localStorage.setItem(i, tasks[i].value);
            }                
        }
    }

    function setCountOfItems() {
        var ul = document.querySelector('ul');
        var count = document.getElementById('Count');           
        count.textContent = ul.childElementCount;
    }

    $('#add').click(function() { addItem() }) ;
    $('#remove').click(function() { removeItem() });
    $('#save').click(function() { saveItem() });
    $('#load').click(function() { loadItem() });

});   