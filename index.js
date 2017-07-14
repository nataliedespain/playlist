$(document).ready(function() {


  function randomImgs() {
    $.ajax({url: 'https://baroque-chaise-16357.herokuapp.com/api', success: function(result) {

      var randomIndexes = []
      while(randomIndexes.length < 3){
          var randomnumber = Math.ceil(Math.random()*result.results.length) - 1;
          if(randomIndexes.indexOf(randomnumber) > -1) continue;
          randomIndexes[randomIndexes.length] = randomnumber;
      }

      for (var index of randomIndexes) {
        var div = $("<div></div>").css({'background': `url('images/${result.results[index].cover_art}')`, 'background-size': 'cover'});
        $('.right-container').append(div);
      }

    }});
  }

  randomImgs();





})
