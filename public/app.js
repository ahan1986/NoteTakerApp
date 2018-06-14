
getResults = () => {
    $("#results").empty();
    $.getJSON("/all", (data) => {
        JSONResults(data);
    });
}

getResults();

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
    
})