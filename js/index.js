// Ensure the DOM is ready
$(function() {
    
    loadItem();    

    // If local storage is available, load previously 
    // saved tasks
    function loadItem() {
        if (window.localStorage) {
            
            var $ul = removeUnsavedChanges();
            
            var savedRecordsArray = getLocalStorageAsArray();
            
            if(savedRecordsArray.length > 0 ) {
                loadLocalStorage($ul, savedRecordsArray);
            }
                
            setCountOfItems();
        }    
    } 

    // Remove any unsaved tasks
    function removeUnsavedChanges() {        
        var $ul = $('ul');                        
        $ul.empty();
        return $ul;   
    }


    // Return the contents of local storage as an array
    function getLocalStorageAsArray() {
        // get what has been previously saved. 
        var savedRecordsString;  
        savedRecordsString = localStorage.getItem('iancJQueryToDoList');

        var savedRecordsArray = [];

        // convert the string back to an array    
        try {
            savedRecordsArray = savedRecordsString.split(',');
        } catch(e) {        
            if (savedRecordsString === null) {            
            // Fine, no entries found in localStorage
            } else {
                throw(e);
            }
        } finally {
            return savedRecordsArray;
        }                    
    } 

    function loadLocalStorage($ul, savedRecordsArray ) {
        // For each record returned from local storage retrieve the data
        // and create the elements to store the data returned in
        for(var i = 0; i < savedRecordsArray.length; i++) {    
            var $newLi = $('<li>');                            
            
            var $newTextInput = createInputElement();            
            $newTextInput.val(savedRecordsArray[i]);            
            
            var $newRadio = createRadioElement();            
                    
            $newTextInput.appendTo($newLi);
            $newRadio.appendTo($newLi);
            $newLi.appendTo($ul);                                                                                           
        }
    }
    
    function createInputElement() {
        
        var $newInput = $('<input/>')
                        .attr('type', 'text') 
                        .attr('name', 'task');

        return $newInput;
    }

    function createRadioElement() {
        
        var $newRadio = $('<input>')
                        .attr('type', 'radio')
                        .attr('name', 'selected')
                        .attr('checked', 'checked');

        return $newRadio;
        
    }

    // Add a new task
    function addItem() {    
        
        var $ul = $('ul');  
        var $newLi = $('<li>');                            
        var $newTextInput = createInputElement();        
        var $newRadio = createRadioElement();            
            
        $newTextInput.appendTo($newLi);
        $newRadio.appendTo($newLi);
        $newLi.appendTo($ul);    
        
        setCountOfItems();
    }

    // Removes an item from the to do list and local storage
    function removeItem() {
        
        // Get all the radio buttons
        var $selectedRadio = $('input[name="selected"]');
               
        $selectedRadio.each(function(index) {
            if( $(this).is(':checked')) { 
                $(this).parent().remove();                
            }            
        });      

       setCountOfItems();            
    }

    // Save the tasks to local storage
    function saveItem() {
     
       if (window.localStorage) {
                      
           var $tasks = $('input[name="task"]');                   
           
           var tasksToBeSaved = [];
                      
           $tasks.each(function() {
               tasksToBeSaved.push($(this).val());
           });
           
           const localStorageKey = 'iancJQueryToDoList';
           
           // if there are tasks to be saved - save them
           if (tasksToBeSaved.length > 0) {
               localStorage.setItem(localStorageKey, tasksToBeSaved.toString());
           } else {
               // otherwise remove the key from local storage
               localStorage.removeItem(localStorageKey);
           }                       
       }

    }

    function setCountOfItems() {
      
        var $countOfItems = $('li').length;
        
        $('#Count').text($countOfItems);
    }

    $('#add').click(function() { addItem() }) ;
    $('#remove').click(function() { removeItem() });
    $('#save').click(function() { saveItem() });
    $('#load').click(function() { loadItem() });

});   