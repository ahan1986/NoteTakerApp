
getResults = () => {
    $("#results").empty();
    $.getJSON("/all", (data) => {
        JSONResults(data);
    });
}

// getResults();

JSONResults = (data) => {
    for (let i = 0; i < data.length; i++) {
        $("#results").prepend(`<p class="data-entry" data-id="${data[i]._id}"><span class="dataTitle" data-id="${data[i]._id}"></span><span class="delete">X</span></p> `);
    }

}

$(document).on("click", "#submit", () => {

    $.ajax({
        type: "POST",
        url: "/submit",
        dataType: "json",
        data: {
            title: $("#title").val().trim(),
            note: $("#note").val().trim(),
            created: Date.now()
        }
    })
        .then((data) => {
            JSONResults(data);
            $("#title").val("");
            $("#note").val("");
        });
});

$("#clear-all").on("click", () => {
    $.ajax({
        type: "GET",
        url: "/clearall",
        dataType: "json",
        success: (response) => {
            $("#results").empty();
        }
    });
});

// we want to have a upper element such as the document to be given the instructions to delegate the click event to the .delete button.  Because .delete is being created in the future, the click event will not be registered unless you give it to an upper element to follow up with that instruction/click event
$("#results").on("click", ".delete", () => {

    let selected = $(this).parent();

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/delete/" + selected.attr("data-id"),
        success: (response) => {
            selected.remove();
            $("#note").val("");
            $("#title").val("");

            $("#action-button").html("<button id='submit'>Submit</button>")
        }
    });

});