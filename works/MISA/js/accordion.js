/* Name: Kanza Alam
* Student Number: 400528885
* Date created: April 12 2025
* Description: JavaScript file to toggle the visibility of additional information sections when buttons
*              are clicked in the index.html file.
*/

// select all elements with the class "accordion"
const accordion = document.querySelectorAll(".accordion");

// click event listener added to each accordion button using a loop
accordion.forEach((button) => {
  button.addEventListener("click", function () {

    // add "active" class when clicked
    if (!this.classList.contains("active")) {
      this.classList.add("active");
    } else {
      this.classList.remove("active");
    }

    // get the panel (next sibling) that is associated with the clicked button
    const panel = this.nextElementSibling;

    // change panel's visibility by adjusting the maxHeight
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});