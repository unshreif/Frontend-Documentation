# DOM Manipulation Basics

## What is the DOM?

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page structure as a tree of objects.

## Selecting Elements

### getElementById
```javascript
const element = document.getElementById("myId");
```

### querySelector (CSS Selectors)
```javascript
const element = document.querySelector(".my-class");
const firstP = document.querySelector("p");
const specificElement = document.querySelector("#myId .my-class");
```

### querySelectorAll
```javascript
const allParagraphs = document.querySelectorAll("p");
const allButtons = document.querySelectorAll("button");

// Convert NodeList to Array for array methods
const buttonArray = Array.from(allButtons);
```

### Other Selection Methods
```javascript
const elements = document.getElementsByClassName("my-class");
const elements = document.getElementsByTagName("p");
```

## Modifying Content

### textContent vs innerHTML
```javascript
const element = document.querySelector("#myElement");

// Safe - only text, no HTML
element.textContent = "Hello World";

// Can include HTML (be careful with user input)
element.innerHTML = "<strong>Hello World</strong>";

// Get content
const text = element.textContent;
const html = element.innerHTML;
```

## Modifying Attributes

```javascript
const link = document.querySelector("a");
const image = document.querySelector("img");

// Get attributes
const href = link.getAttribute("href");
const src = image.src; // Direct property access

// Set attributes
link.setAttribute("href", "https://example.com");
image.src = "new-image.jpg";

// Remove attributes
link.removeAttribute("target");

// Check if attribute exists
if (link.hasAttribute("target")) {
    console.log("Link opens in new window");
}
```

## Modifying Styles

### Direct Style Property
```javascript
const element = document.querySelector("#myElement");

element.style.color = "red";
element.style.backgroundColor = "blue";
element.style.fontSize = "20px";
element.style.display = "none";

// CSS properties with hyphens become camelCase
element.style.borderRadius = "10px"; // border-radius
```

### CSS Classes
```javascript
const element = document.querySelector("#myElement");

// Add class
element.classList.add("active");

// Remove class
element.classList.remove("hidden");

// Toggle class
element.classList.toggle("visible");

// Check if class exists
if (element.classList.contains("active")) {
    console.log("Element is active");
}

// Replace class
element.classList.replace("old-class", "new-class");
```

## Creating and Adding Elements

### createElement
```javascript
// Create new element
const newDiv = document.createElement("div");
newDiv.textContent = "This is a new div";
newDiv.classList.add("my-class");

// Add to DOM
const container = document.querySelector("#container");
container.appendChild(newDiv);
```

### insertAdjacentHTML
```javascript
const container = document.querySelector("#container");

container.insertAdjacentHTML("beforebegin", "<p>Before container</p>");
container.insertAdjacentHTML("afterbegin", "<p>Start of container</p>");
container.insertAdjacentHTML("beforeend", "<p>End of container</p>");
container.insertAdjacentHTML("afterend", "<p>After container</p>");
```

## Removing Elements

```javascript
const element = document.querySelector("#myElement");

// Modern way
element.remove();

// Older way (still works)
element.parentNode.removeChild(element);
```

## Practical Examples

### Change Button Text on Click
```html
<button id="myButton">Click me</button>
```

```javascript
const button = document.querySelector("#myButton");
button.addEventListener("click", function() {
    if (button.textContent === "Click me") {
        button.textContent = "Clicked!";
    } else {
        button.textContent = "Click me";
    }
});
```

### Show/Hide Element
```html
<button id="toggleButton">Toggle</button>
<div id="content" class="hidden">This content can be toggled</div>
```

```css
.hidden {
    display: none;
}
```

```javascript
const toggleButton = document.querySelector("#toggleButton");
const content = document.querySelector("#content");

toggleButton.addEventListener("click", function() {
    content.classList.toggle("hidden");
});
```

### Dynamic List Creation
```javascript
const fruits = ["Apple", "Banana", "Orange", "Grape"];
const list = document.querySelector("#fruitList");

fruits.forEach(fruit => {
    const listItem = document.createElement("li");
    listItem.textContent = fruit;
    list.appendChild(listItem);
});
```

## Best Practices

1. Cache DOM queries when used multiple times
2. Use event delegation for dynamic content
3. Prefer `textContent` over `innerHTML` for security
4. Use CSS classes instead of inline styles when possible
5. Be careful with user input to prevent XSS attacks

```javascript
// Good - cache the query
const button = document.querySelector("#myButton");
button.addEventListener("click", handleClick);

function handleClick() {
    button.textContent = "Clicked!";
    button.classList.add("active");
}

// Avoid - querying DOM repeatedly
document.querySelector("#myButton").addEventListener("click", function() {
    document.querySelector("#myButton").textContent = "Clicked!";
    document.querySelector("#myButton").classList.add("active");
});
```

## Exercise

Create an interactive todo list:
1. HTML with input field and button
2. JavaScript to add new todos
3. Ability to mark todos as complete
4. Delete functionality for todos
5. Use DOM manipulation techniques covered
