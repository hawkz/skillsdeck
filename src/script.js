$('button').on("click", function(e) {
  e.preventDefault();
});

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return typeof sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

$(document).ready(function () {
  $("#select_social, #rank_social, #activity_select, #activity_rank").hide();
  
  var name = getUrlParameter("name");
  var email = getUrlParameter("email");
  var job = getUrlParameter("job");
  var group = getUrlParameter("group");

  if (name) {
    $("#name").attr("value", name).hide();
    $("label[for=name]").hide();
  }
  if (email) {
    $("#email").attr("value", email).hide();
  }
  if (job) {
    $("#occupation").attr("value", job).hide();
  }
  if (group) {
    $("#group").attr("value", group);
  }
});

$("#enter_details button").on("click", function (e) {
  $("#enter_details").hide();
  $("#select_social").show();
});

$("#select_social input[type=checkbox]").on("change", function (e) {
  if ($("input[type=checkbox]:checked").length > 3) {
    $(this).prop("checked", false);
    alert("Please only pick 3");
  }
  switch ($("input[type=checkbox]:checked").length) {
    case 1:
      $("#select_social .progress").removeClass("on");
      $("#select_social #one").addClass("on");
      break;
    case 2:
      $("#select_social .progress").removeClass("on");
      $("#select_social #one, #select_social #two").addClass("on");
      break;
    case 3:
      $("#select_social .progress").addClass("on");
      break;
    default:
      $("#select_social .progress").removeClass("on");
  }
});

$("#select_social button").on("click", function (e) {
  if ($("input[type=checkbox]:checked").length === 3) {
    $("#select_social").hide();
    a = $("input[type=checkbox]:checked:eq(0)").val();
    b = $("input[type=checkbox]:checked:eq(1)").val();
    c = $("input[type=checkbox]:checked:eq(2)").val();

    $("#rank_1, #rank_4, #rank_7").each(function () {
      $(this).attr("value", a);
    });

    $("label[for=rank_1], label[for=rank_4], label[for=rank_7]").each(
      function () {
        $(this).text(a);
      }
    );

    $("#rank_2, #rank_5, #rank_8").each(function () {
      $(this).attr("value", b);
    });

    $("label[for=rank_2], label[for=rank_5], label[for=rank_8]").each(
      function () {
        $(this).text(b);
      }
    );

    $("#rank_3, #rank_6, #rank_9").each(function () {
      $(this).attr("value", c);
    });

    $("label[for=rank_3], label[for=rank_6], label[for=rank_9]").each(
      function () {
        $(this).text(c);
      }
    );

    $("#rank_social").show();
    $("#rank_social .set2, #rank_social .set3").hide();
  }
});

$("#rank_social label").on("click", function (e) {
  val = $("#" + $(this).attr("for")).attr("value");

  switch ($(this).attr("for")) {
    case "rank_1":
      $("label[for=rank_2], label[for=rank_3]").hide();
      if ($("#rank_social input[name=rank_social_2]:checked").length < 1) {
        $("label.set2").show();
        $("label[for=rank_4]").hide();
      }
      break;
    case "rank_2":
      $("label[for=rank_1], label[for=rank_3]").hide();
      if ($("#rank_social input[name=rank_social_2]:checked").length < 1) {
        $("label.set2").show();
        $("label[for=rank_5]").hide();
      }
      break;
    case "rank_3":
      $("label[for=rank_1], label[for=rank_2]").hide();
      if ($("#rank_social input[name=rank_social_2]:checked").length < 1) {
        $("label.set2").show();
        $("label[for=rank_6]").hide();
      }
      break;

    case "rank_4":
      $("label[for=rank_5], label[for=rank_6]").hide();
      if ($("#rank_social input[name=rank_social_3]:checked").length < 1) {
        $("label.set3").show();
        $("label[for=rank_7]").hide();
      }
      break;
    case "rank_5":
      $("label[for=rank_4], label[for=rank_6]").hide();
      if ($("#rank_social input[name=rank_social_3]:checked").length < 1) {
        $("label.set3").show();
        $("label[for=rank_8]").hide();
      }
      break;
    case "rank_6":
      $("label[for=rank_4], label[for=rank_5]").hide();
      if ($("#rank_social input[name=rank_social_3]:checked").length < 1) {
        $("label.set3").show();
        $("label[for=rank_9]").hide();
      }
      break;
    case "rank_7":
      $("label[for=rank_8], label[for=rank_9]").hide();
      break;
    case "rank_8":
      $("label[for=rank_7], label[for=rank_9]").hide();
      break;
    case "rank_9":
      $("label[for=rank_7], label[for=rank_8]").hide();
      break;
  }
  $("#rank_social input:checked").each(function () {
    $("#rank_social input[value='" + $(this).attr("value") + "']:not(:checked)")
      .next()
      .hide();
  });
  $(this).show();
});

$("#rank_social button").on("click", function (e) {
  if ($("#rank_social input:checked").length === 3) {
    $("#rank_social").hide();
    $("#activity_select").show();
  } else {
    alert("Please pick 3");
  }
});

document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
      p = $('#activity_select p:not(.no):not(.maybe):not(.yes)').last();
      p.removeClass("yes").removeClass("no").removeClass("maybe").addClass("maybe");
      v = p.attr("for");
      $('#activity_select input[name=' + v + '][value=maybe]').prop("checked", true);
      $("#activity_select input[name=" + v + "]").next().hide();
    }
    else if (e.keyCode == '37') {
       // left arrow
      p = $('#activity_select p:not(.no):not(.maybe):not(.yes)').last();
      p.removeClass("yes").removeClass("no").removeClass("maybe").addClass("no");
      v = p.attr("for");
      $('#activity_select input[name=' + v + '][value=no]').prop("checked", true);
      $("#activity_select input[name=" + v + "]").next().hide();
    }
    else if (e.keyCode == '39') {
       // right arrow
      p = $('#activity_select p:not(.no):not(.maybe):not(.yes)').last();
      p.removeClass("yes").removeClass("no").removeClass("maybe").addClass("yes");
      v = p.attr("for");
      $('#activity_select input[name=' + v + '][value=yes]').prop("checked", true);
      $("#activity_select input[name=" + v + "]").next().hide();
    }
}

$("#activity_select label").on("click", function () {
  p = $("p[for=" + $("#" + $(this).attr("for")).attr("name") + "]");
  v = $("#" + $(this).attr("for")).attr("value");
  $(
    "#activity_select  input[name=" +
      $("#" + $(this).attr("for")).attr("name") +
      "]"
  )
    .next()
    .hide();
  p.removeClass("yes").removeClass("no").removeClass("maybe").addClass(v);
});

$("#activity_select button").on("click", function () {
  // alert($('#activity_select input[value=yes]:checked').length);
  len = $('#activity_select input[value=yes]:checked').length;
  if (len <=12 && len >= 1) {
    $("#activity_select").hide();
    
    $('#activity_select input[value=yes]:checked').each(function(i){
      h = $('#activity_select p[for='+$(this).attr('name')+']').html();
      $('#activity_rank input[name=rank_activity_1]').eq(i).attr('value',h).next().html(h);
      $('#activity_rank input[name=rank_activity_2]').eq(i).attr('value',h).next().html(h);
      $('#activity_rank input[name=rank_activity_3]').eq(i).attr('value',h).next().html(h);
      $('#activity_rank input[name=rank_activity_4]').eq(i).attr('value',h).next().html(h);
      $('#activity_rank input[name=rank_activity_5]').eq(i).attr('value',h).next().html(h);
    });
    $('#activity_rank input[value="a"]').next().remove();
    $('#activity_rank input[value="a"]').remove();
    
    $("#activity_rank").show();
  }
  else if (len > 12) {
    alert('You have too many "yes" choices, lets review them');
    document.getElementById("activity_tries").value = parseInt(document.getElementById("activity_tries").value) + 1;
    $('#activity_select input[value=yes]:checked').each(function(){
      $('#activity_select input[name='+$(this).attr('name')+']').prop("checked", false).next().show();
      $('#activity_select p[for='+$(this).attr('name')+']').removeClass("yes");
    });
  }
});

// $("#activity_social label").on("click", function (e) {
//   val = $("#" + $(this).attr("for")).attr("value");

//   switch ($(this).attr("for")) {
//     case "rank_1":
//       $("label[for=rank_2], label[for=rank_3]").hide();
//       if ($("#rank_activity input[name=rank_activity_2]:checked").length < 1) {
//         $("label.set2").show();
//         $("label[for=rank_4]").hide();
//       }
//       break;
//     case "rank_2":
//       $("label[for=rank_1], label[for=rank_3]").hide();
//       if ($("#rank_activity input[name=rank_activity_2]:checked").length < 1) {
//         $("label.set2").show();
//         $("label[for=rank_5]").hide();
//       }
//       break;
//     case "rank_3":
//       $("label[for=rank_1], label[for=rank_2]").hide();
//       if ($("#rank_activity input[name=rank_activity_2]:checked").length < 1) {
//         $("label.set2").show();
//         $("label[for=rank_6]").hide();
//       }
//       break;

//     case "rank_4":
//       $("label[for=rank_5], label[for=rank_6]").hide();
//       if ($("#rank_activity input[name=rank_activity_3]:checked").length < 1) {
//         $("label.set3").show();
//         $("label[for=rank_7]").hide();
//       }
//       break;
//     case "rank_5":
//       $("label[for=rank_4], label[for=rank_6]").hide();
//       if ($("#rank_activity input[name=rank_activity_3]:checked").length < 1) {
//         $("label.set3").show();
//         $("label[for=rank_8]").hide();
//       }
//       break;
//     case "rank_6":
//       $("label[for=rank_4], label[for=rank_5]").hide();
//       if ($("#rank_activity input[name=rank_activity_3]:checked").length < 1) {
//         $("label.set3").show();
//         $("label[for=rank_9]").hide();
//       }
//       break;
//     case "rank_7":
//       $("label[for=rank_8], label[for=rank_9]").hide();
//       break;
//     case "rank_8":
//       $("label[for=rank_7], label[for=rank_9]").hide();
//       break;
//     case "rank_9":
//       $("label[for=rank_7], label[for=rank_8]").hide();
//       break;
//   }
//   $("#rank_activity input:checked").each(function () {
//     $(
//       "#rank_activity input[value='" +
//         $(this).attr("value") +
//         "']:not(:checked)"
//     )
//       .next()
//       .hide();
//   });
//   $(this).show();
// });

$("#activity_rank label").on("click", function (e) {
  lab = $(this);
  inp = $("#" + $(this).attr("for"));
  forid = $(this).attr("for");
  val = inp.attr("value");
  nom = inp.attr('name');
  
  $("#activity_rank input[name='"+nom+"']:not(#"+forid+") + label").hide();
  
  $("#activity_rank input[value='"+val+"']:not(:checked):not(#"+forid+") + label").hide();
  
  if( $("#activity_rank input:not(:checked) + label:not(:hidden)").length === 1) {
    $("#activity_rank button").attr("style", "display: block !important");
  };
  
});

// $("#skills_deck").submit(function(e) {
  $("#activity_rank button").on("click", function(e) {
  e.preventDefault();
  $.ajax({
    url: "https://hooks.zapier.com/hooks/catch/9631616/on9v0ix/",
    type: "post",
    data: $("#skills_deck").serialize(),
    success: function() {
      // Redirect to another success page
      window.location = "https://google.com";
    }
  });
});