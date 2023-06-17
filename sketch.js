let input = "";
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=backlinks&bllimit=50&bltitle='
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=alllinks&allimit=50&alfrom='
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=alllinks&titles=50&alunique=1&allimit=10&alfrom='
const searchUrl =
  "https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=links&formatversion=2&plnamespace=0&pllimit=max&titles=";

function setup() {
  noCanvas();
  input = select("#input");
  input.changed(search);
}

function search() {
  let url = searchUrl + input.value();
  $(".words").append(input.value() + "<br>");
  $("#input").val("");
  loadJSON(url, show, "jsonp");
}

function show(data) {
  console.log(data);
  //  let links = data.query.pages.0.links
  let links = data["query"]["pages"]["0"]["links"];
  console.log(links);
  links.forEach((link) => {
    // createDiv(link.title);

    if (localStorage.hasOwnProperty(link.title)) {
      let currentValue = Number(localStorage.getItem(link.title));
      console.log(currentValue, "current value");
      let setValue = currentValue + 1;
      console.log(setValue, "set value");
      localStorage.setItem(link.title, setValue);
    } else {
      localStorage.setItem(link.title, 1);
    }
  });
  favPage();
}

function favPage() {
  let firstValue = 0;
  let firstWords = [];
  let secondValue = 0;
  let secondWords = [];
  let thirdValue = 0;
  let thirdWords = [];

  for (i = 0; i < localStorage.length; i++) {
    const lsKey = localStorage.key(i);
    const lsValue = Number(localStorage.getItem(lsKey));

    if (lsValue > firstValue) {
      firstValue = Number(lsValue);
    } else if (lsValue > secondValue && firstValue != lsValue) {
      secondValue = Number(lsValue);
    } else if (
      lsValue > thirdValue &&
      firstValue != lsValue &&
      secondValue != lsValue
    ) {
      thirdValue = Number(lsValue);
    }
  }

  console.log(firstValue, "first value");
  console.log(secondValue, "second value");
  console.log(thirdValue, "third value");

  for (i = 0; i < localStorage.length; i++) {
    const lsKey = localStorage.key(i);
    const lsValue = localStorage.getItem(lsKey);

    if (lsValue == firstValue) {
      firstWords.push(lsKey);
    } else if (lsValue == secondValue) {
      secondWords.push(lsKey);
    } else if (lsValue == thirdValue) {
      thirdWords.push(lsKey);
    }
  }

  console.log(firstWords, "first words");
  console.log(secondWords, "second words");
  console.log(thirdWords, "third words");

  $("#firstWords").empty();
  $("#secondWords").empty();
  $("#thirdWords").empty();

  for (var i = 0; i < firstWords.length; i++) {
    var word = document.createElement("li");
    // word.textContent = firstWords[i];
    word.innerHTML = '<a href="https://ja.wikipedia.org/wiki/'+firstWords[i]+'" target="_blank">'+firstWords[i]+'</a>'
    document.getElementById("firstWords").appendChild(word);
  }

  for (var i = 0; i < secondWords.length; i++) {
    var word = document.createElement("li");
    word.innerHTML = '<a href="https://ja.wikipedia.org/wiki/'+secondWords[i]+'" target="_blank">'+secondWords[i]+'</a>'
    document.getElementById("secondWords").appendChild(word);
  }

  for (var i = 0; i < thirdWords.length; i++) {
    var word = document.createElement("li");
    word.innerHTML = '<a href="https://ja.wikipedia.org/wiki/'+thirdWords[i]+'" target="_blank">'+thirdWords[i]+'</a>' 
    document.getElementById("thirdWords").appendChild(word);
  }
}
