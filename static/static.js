// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to buttons
    var clothingButton = document.getElementById("clothingButton");
    if (clothingButton) {
        clothingButton.addEventListener("click", function() {
            window.location.href = "/clothing"; // Redirect to the clothing page
        });
    }

    var accessoriesButton = document.getElementById("accessoriesButton");
    if (accessoriesButton) {
        accessoriesButton.addEventListener("click", function() {
            window.location.href = "/accessories"; // Redirect to the accessories page
        });
    }
});
