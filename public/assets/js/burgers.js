$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newBurger = $(this).data("newburger");

        var burgerState = {
            devoured: newBurger
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgerState
        }).then(
            function() {
                console.log("changed devoured to", newBurger);
                location.reload();
            }
        );
    });
  
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var new
    })
})