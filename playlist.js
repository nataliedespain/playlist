$(document).ready(function() {



  $.ajax({url: 'https://baroque-chaise-16357.herokuapp.com/api', success: function(result) {

    // APPEND IMGS TO SLIDER
    for (var i = 0; i < result.results.length; i++) {
      var div = $(`<div id="${result.results[i].id}" class="scrollImg"></div>`).css({'background': `url('images/${result.results[i].cover_art}')`, 'background-size': 'cover'});
      $('.content').append(div);
    }


    // ADD TEXT ON CLICK
    $('.scrollImg').click(function(e){
      var id = Number(e.target.id);

      for (var item of result.results) {
        if (item.id === id) {
          var text = $(`<h6>${item.artist}: ${item.title}</h6>`);
          $('.box').append(text);
        }
      }

    })

  }});



  // CLEAR PLAYLIST
  $('#clear').click(function() {
    $('.box').empty();
  })


  // SUBMIT AND POST
  $('#submit').click(function() {

    var collection = {};
    var htmlCollection = $('.box').children();
    for (var i = 0; i < htmlCollection.length; i++) {
      var split = htmlCollection[i].innerHTML.split(": ");
      collection[split[0]] = split[1];
    }

    var jsonData = JSON.stringify(collection)
    console.log(jsonData)

    $.ajax({
      type: "POST",
      url: "https://lit-fortress-6467.herokuapp.com/post",
      data: jsonData,
      success: function(msg) {
        console.log(msg);
      }
    });

  })





})
