**Mail script to send form data. Support file sending**

----------

 - Homepage: https://github.com/khudia/formjs/ 
 - Version:  0.1
 - Dependecies:  jQuery
 - Author: Georgy Khudiakov
 - Mail: me@regesh.ru

----------

**Information**

 1. To create custom fileinput buttons, add class "hidden" to
    input[type=file] field 
 2. To bind custom submit button, create any
    element with "submit" id (by default) and add attr "hidden" to
  input[type=submit]

----------
**Init examples**
 1. Default
		  - `formjs.init('#formid');`
 2. With options
		 - `formjs.init('#testForm', {options});` 
      

----------
**List of options**

 - **submit** - Add link with any placed id to replace default submit. Default submit must have "hidden" attr.
 -  **info** - Id of element where messeges will be placed
 - **infotext** - Text after form sending completed succesfully
 -  **infotextdelay** - How long success message will be shown
 - **loadingtext** - Mess when form is sending
 - **filetext** - Text for custom fileinput button
 - **filename** - Class for custom fileinput buttons
 
 **Remote include**
 https://cdn.rawgit.com/khudia/formjs/7780772b/formjs.js
