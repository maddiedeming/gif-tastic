var gifTastic = {
    topics: [],
    playGif: function(gifSelected){
        var dataType = gifSelected.getAttribute("data-type");
        if(dataType === "still"){
            gifSelected.setAttribute("src",gifSelected.getAttribute("data-animate"));
            gifSelected.setAttribute("data-type","animate");
        }
        else{
            gifSelected.setAttribute("src",gifSelected.getAttribute("data-still"));
            gifSelected.setAttribute("data-type","still");
        }
    },
    generateGifs: function(topic){
        $("#gifs").empty();
        topic = topic.value.replace(/\s/g, "+");
        var apiKey = "&apikey=C5d75scOHxPnli61nvl3JPjObqAnq7Ub&limit=10";
        var query = "https://api.giphy.com/v1/gifs/search?q=" + topic + apiKey;
        $.ajax(this.href, {
            url: query,
            method: "GET"
        }).done(function(response) {
            var rowNum;
            for(i = 0; i < response.data.length; i++){
                var src = response.data[i].images.fixed_height_still.url;
                var rating = response.data[i].rating.toUpperCase();
                var datastill = response.data[i].images.fixed_height_still.url;
                var dataAnimate = response.data[i].images.fixed_height.url;
                $("#gifs").append('<figure id="figure' + i + '" class="mx-2" style="display:inline-block"></figure>');
                $("#figure" + i).append('<figcaption class="figure-caption">Rating: ' + rating + '</figcaption>');
                $("#figure" + i).append('<img id="gif' + i + '" class="figure-img img-fluid rounded" onclick="gifTastic.playGif(this)">');
                $("#gif" + i).attr({"src":src,"data-still":datastill,"data-animate":dataAnimate,"data-type":"still"})
            }
        });
    },
    addTopic: function(){
        var newTopic = ($("input").val());
        this.topics.push(newTopic);
        var i = this.topics.indexOf(newTopic);
        $("#topics").append('<button value="' + this.topics[i] + '" class="btn btn-info m-1" onclick="gifTastic.generateGifs(this)">' + this.topics[i] + '</button>');
        ($("input").val(""));
    }
}