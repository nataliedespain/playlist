$(document).ready(function() {



  $.ajax({url: 'https://baroque-chaise-16357.herokuapp.com/api', success: function(result) {

    // APPEND IMGS TO SLIDER
    for (var i = 0; i < result.results.length; i++) {
      var div = $(`<div id="${result.results[i].id}" class="scrollImg"></div>`).css({'background': `url('images/${result.results[i].cover_art}')`, 'background-size': 'cover'});
      $('.content').append(div);
    }


    // // ADD TEXT ON CLICK
    // $('.scrollImg').click(function(e){
    //   var id = Number(e.target.id);
    //
    //   for (var item of result.results) {
    //     if (item.id === id) {
    //       var text = $(`<h6>${item.artist}: ${item.title}</h6>`);
    //       $('.box').append(text);
    //     }
    //   }
    //
    // })

    // CHANGE CURRENT SELECTION
    $('.scrollImg').click(function(e){
      $('.album-tracks').empty();
      var id = Number(e.target.id);

      for (var item of result.results) {
        if (item.id === id) {
          $('#current-album').text(`${item.artist}: ${item.title}`);
          $('.current-album-image').css({'background': `url('images/${item.cover_art}')`, 'background-size': 'cover'})
          for (var i = 0; i < item.tracks.length; i++) {
            var track = $(`<h6>${item.tracks[i].title} - ${item.tracks[i].length}</span></h6>`);
            $('.album-tracks').append(track);
          }
        }
      }

    })

    // ADD SONG TO PLAYLIST
    $('.album-tracks').click(function(e){
      if (e.target.localName === 'h6') {
        var song = $(`<h6>${e.target.innerText}</span></h6>`);
        $('.playlist-tracks').append(song);
      }
    })

  }});



  // CLEAR PLAYLIST
  $('#clear').click(function() {
    $('.playlist-tracks').empty();
  })


  // SUBMIT AND POST
  $('#submit').click(function() {

    var collection = {};
    var htmlCollection = $('.playlist-tracks').children();
    for (var i = 0; i < htmlCollection.length; i++) {
      var split = htmlCollection[i].innerHTML.split(" - ");
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



  // $('#submit').click(function() {
  //
  //   var collection = {};
  //   var htmlCollection = $('.box').children();
  //   for (var i = 0; i < htmlCollection.length; i++) {
  //     var split = htmlCollection[i].innerHTML.split(": ");
  //     collection[split[0]] = split[1];
  //   }
  //
  //   var jsonData = JSON.stringify(collection)
  //   console.log(jsonData)
  //
  //   $.ajax({
  //     type: "POST",
  //     url: "https://lit-fortress-6467.herokuapp.com/post",
  //     data: jsonData,
  //     success: function(msg) {
  //       console.log(msg);
  //     }
  //   });
  //
  // })





})
