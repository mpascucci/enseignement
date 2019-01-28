$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "notes.csv",
    dataType: "text",
    success: function(data) {
      processData(data);
      populateList();
    }
  });
});

exclude_list = ["Nom", "Prenom"];

function processData(allText) {
  let SEP = ",";
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(SEP);
  lines = [];

  for (var i=1; i<allTextLines.length; i++) {
    var data = allTextLines[i].split(SEP);
    if (data.length == headers.length) {
      var tarr = {};
      for (var j=0; j<headers.length; j++) {
        tarr[headers[j]]=data[j];
      }
      lines.push(tarr);
    }
  }
  // populate table headers
  var select = document.getElementById("selectNom"); 
  var tbH = document.getElementById("tableHeader"); 
  for (var property in lines[0]) {
    if (exclude_list.indexOf(property)>=0) {continue};
    if (lines[0].hasOwnProperty(property)) {
      var newH = document.createElement("th");
      newH.innerHTML = property;
      tbH.appendChild(newH);
    }
  }
}

function populateList() {
  var select = document.getElementById("selectNom"); 
  options = [];
  options = []
  for (var i=0; i<lines.length;i++) {
    options.push(lines[i].Nom + " " + lines[i].Prenom);
  }


  options = options.sort();
  for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}

function updateLine() {
  var prenomSpan = document.getElementById("prenom"); 
  var select = document.getElementById("selectNom"); 
  for (var i=0; i<lines.length;i++) {
    if (lines[i].Nom + " " + lines[i].Prenom==select.value) {
      selected = lines[i];
      // prenomSpan.innerHTML = selected.Prenom;
      break;
    }
  }
  var tbC = document.getElementById("tableContent");

  while (tbC.firstChild) {
    tbC.removeChild(tbC.firstChild);
  }
  
  console.log(selected);
  for (var property in selected) {
    if (selected.hasOwnProperty(property)) {
      if (exclude_list.indexOf(property)<0) {
        var newC = document.createElement("td");
        newC.innerHTML = selected[property];
        tbC.appendChild(newC);
      }
    }
  }
}
