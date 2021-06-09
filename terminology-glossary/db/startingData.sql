INSERT INTO users
(firstName, lastName, email, password, admin_key, is_admin, picture)
VALUES
('K', 'B', 'kyle@kyle.com', 'pass', 'lastJediSucked', true, 'https://www.exoffender.org/wp-content/uploads/2016/09/empty-profile.png');

INSERT INTO unit
(name)
VALUES
('Unit 1'), ('Unit 2'),  ('Unit 3'), 
('Unit 4'), ('Unit 5'), ('Unit 6');

-- Unit 1 Starting Data: GitHub, HTML, CSS, JS, Data Types, If Statements, Functions, Scope,
-- Needs Lecture 4 - Arrays, Objects, Looping, Callbacks, Ternaries
-- (37, '', '', 1),

INSERT INTO glossary
(created_by, name, definition, unit_id)
VALUES
(37, 'Git/GitHub', 'Git is a version control system used to track the progress of our projects. It allows us to commit changes at various points in the development process.', 1),
(37, 'git add .', 'tells git to track any changes that have been made. This is the command you can run to start the process of pushing your code to github.', 1),
(37, 'git commit -m "message about changes goes here"', 'After staging yoru code using "git add ." we now need to commit those changes. This is the final step before pushing our code to GitHub. Think of these commits as checkpoints or save points in your code. You will want to write a quick message after the "-m" flag to explain the changes to your code.', 1),
(37, 'git push', 'After adding and commiting your files, run "git push" to push your code to GitHub', 1),
(37, 'git clone "URL GOES HERE"', 'Use the "git clone" command to download a copy of an existing GitHub repository onto your device. Paste the copied URL from the GitHub website after your "git clone" to start the process.', 1),
(37, 'HTML', 'HTML stands for Hyper Text Markup Language. HTML is used to create the infrastructure of a webpage.', 1),
(37, 'HTML Elements', 'HTML Elements are how we define our infrastructure withing our HTML document. Each Element uses Tags to open and close the Element. These tags are signified with angle bracket characters ("<>") . The name of the Tag is defined within the angle brackets. Most Elements have an opening and closing tag, and the data stored between those tags is called the Content. The Content matched with the Tags allows creates the HTML Element (ex. <thisisatag>This is the content</thisisatag>)', 1),
(37, 'HTML Semantics', 'Semantic HTML is HTML that introduces context or meaning to the structure of a webpage, instead of using elements simply for display. Appropriate usage of semantic HTML is critical for accessibility issues and Search Engine Optimization (SEO). Use semantic HTML whenever possible. More details can be found at https://www.w3schools.com/html/html5_semantic_elements.asp', 1),
(37, 'HTML Tag Attributes', 'Attributes are used in HTML to provide extra information or features to a tag. All tags can have attributes, and attributes should always be placed in the opening tag. More info can be found at https://www.w3schools.com/tags/ref_attributes.asp', 1),
(37, 'HTML Box Model', 'All HTML elements can be thought of as boxes. In CSS, the "box model" is used when talking about the design and layout of elements, and it can be thought of essentially as a 4 part box that wraps around every element. MARGIN - The white space that separates one element from the other. BORDER - The border of the box that separates the padding from the margin. PADDING - The "padding" or buffer space between the content of an element and its border. CONTENT - The space allocated to the actual content of the element (text, images, etc.)' , 1),
(37, 'CSS', 'CSS, which stands for Cascading Style Sheets, is another building block language of the web. CSS is a presentational language that is used only for the styling and layout of a page. CSS files are files that have the .css extension.', 1),
(37, 'Inline CSS', 'Inline CSS is created per element by using the style attribute on the element. Inline CSS is not considered best-practice as it bloats files, it makes it difficult to make broad styling changes, and it can become difficult to pin point where the styling of a page is coming from. (ex. <button style="color:blue;font-size:12px">Button Text</button>', 1),
(37, 'Internal CSS', 'Internal CSS is when CSS written inside of the <style> tag of an HTML document. This <style> tag should be written inside of the <head> tag of the html. Internal CSS can bloat a file and make it more difficult to comprehend, and is consequently not considered best-practice.', 1),
(37, 'External CSS', ' External CSS is when CSS is brought in via an external stylesheet separate to the HTML file, and then brought in using a <link> tag in the <head> of an HTML document. The href attribute of the <link should point to the stylesheet, and the type attribute should specify that the file is a stylesheet. External CSS is is considered good practice, as it enables isolation and clarity of code. (ex.   <link rel="stylesheet" type="text/css" href="stylesheet.css" />)', 1),
(37, 'CSS Selectors', 'Selectors are patterns used to select the elements to be styled. Selectors are followed by a set of curly braces called "declaration blocks", which contain individual semi-colon separated style declarations. The individual style declarations are comprised of two main parts, a property and a value for that property. More info can be found at https://www.w3schools.com/cssref/css_selectors.asp', 1),
(37, 'CSS Text and Font Properties', 'Text on a web page can be manipulated through various properties in CSS. Here are a few: font-size, font-weight, color, text-align, font-family. More details can be found at https://www.w3schools.com/cssref/pr_font_font.asp', 1),
(37, 'CSS Background Properties', 'These are properties that we can use to modify the background appearance of an element. Colors as well as images can be used as backgrounds for elements.', 1),
(37, 'JavaScript', 'JavaScript is a programming language that allows you to impolement complex/dynamic features on  your web page. We use JavaScript alongside HTML and CSS to structure, design, and utilize the conent on our web pages.', 1),
(37, 'Variables', 'Variables are the primary mechanism for storing data in JavaScript. Once a variable has been declared, it can be referenced later in the file. Variables will typically be used with "var", "let", or "const". The "var" and "let" can be edited later in the code, but "const" is, well, "constant". Knowing how you will use the variable will help you know which version to use. (ex. "let age = 25" OR "const birthYear = 1995" ', 1),
(37, 'JavaScript Data Types', 'In JavaScript, data is represented using the following data types: Number, String, Boolean, Undefined, Null, Array, and Object. More info can be found at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures.', 1),
(37, 'JavaScript String', 'Strings are usually used to hold words, sentances, or other predefined data. They are defined by data contained with single or double quotes (ex. "This is a string")', 1),
(37, 'Boolean', 'A Boolean is a value of either True or False', 1),
(37, 'Undefined', 'Undefined indicates that a variable has been initialized, but has not yet been given a value', 1),
(37, 'Null', 'Similar to "Undefined", Null indicates that there is no value on a variable. The difference is that Null is a value representing nothing, where Undefined means no value was provided.', 1),
(37, 'Array', 'An Array can be thought of as a list. These lists can be made up of all data types, and any combination of data types. The lists are signified by square brackets "[]" with the values separated by a comma (examples "let numberArray = [1, 2, 3, 4, 5]", "let stringArray = ["cats", "dogs", "chuppacabras"]", "let mixedTypeArray = [1, "dogs", {schoolBooks}, [arrayWithinArray]]".', 1),
(37, 'Object', 'A collection of Key Value Pairs with each Key (or property) representing the name of a piece of data and the Value being the value of that key. Objects are contained within curly brackets "{}" with the Key/Value Pairs separated by a comma ",". Key/Value Pairs are listed with the Key on the left and the Value on the right, separated by a colon ":". Much like Arrays, the Values can be any data type as well (ex. "let myObject = {dogName: "Sparky", dogAge: 6, dogToys: ["ball", "rope", "bone"]}.', 1),
(37, 'If Statements', 'If statement and functions allow us to execute code in sections referred to as Code Blocks. A Code Block is defined by the use of curly brackets "{}". The most common If Statements are used for comparing pieces of data, and then delivering a response based on the result of the comparison (ex. "if(dogAge > 0){return "They are a good dog") " More info can be found at https://www.w3schools.com/js/js_if_else.asp', 1),
(37, 'Functions', 'Functions are reusable pieces of code that we can use to execute code blocks whenever they are invoked. Functions can be written using either a function declaration or an expression. Functions are invoked by referencing the function name and pairing it with a pair of parentheses "()". Think of these parentheses as the button you are pushing to invoke the function. Functions can be set up to receive parameters, or values that will change depending on when the function is invoked. For example, to write a simple function that will add two numbers together we can do the following: function addTwo(num1,num2){return num1+num2). If we wanted to use the function, we would Invoke the function and pass in the variables we want to use in the function. If we wanted to add 2 and 3, we would run addTwo(2,3). 2 and 3 take the place of "num1" and "num2" in our function, so the function knows what data to add together.' , 1),
(37, 'Declaration Function', 'A Declaration Function uses this format: let nameOfFunction() {//Code to execute}', 1),
(37, 'Expression Function', 'An Expression Function uses this format: let nameOfFunction = function(){//Code to execute}', 1),
(37, 'Scope', 'Scope is an incredibly important topic in Javascript because it determines what has access to the variables we delcare. The rule of thumb is that code blocks are able to look up in scope but not down. Check this article for more info: https://www.w3schools.com/js/js_scope.asp', 1)
;


-- TOPICS --
INSERT INTO topics
(unit_id, topic_name)
VALUES
(1, 'GitHub'), (1, 'HTML'), (1, 'CSS'), (1, 'Intro to JavaScript'), (1, 'Data Types'), (1, 'If Statements'), (1, 'Intro to Functions'), (1, 'Scope'),
(2, 'Objects'), (2, 'Array Methods'), (2, 'Arrow Functions'), (2, 'Callback Functions'), (2, 'Spread Operator'), (2, 'NESTING')
;
