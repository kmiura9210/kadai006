let input = '';
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=backlinks&bllimit=50&bltitle='
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=alllinks&allimit=50&alfrom='
// const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&list=alllinks&titles=50&alunique=1&allimit=10&alfrom='
const searchUrl = 'https://ja.wikipedia.org/w/api.php?action=query&format=json&prop=links&formatversion=2&plnamespace=0&pllimit=30&titles='

function setup() {
  noCanvas();
  input = select('#input');
  input.changed(search);
}

function search() {
  let url = searchUrl + input.value();
  loadJSON(url, show, 'jsonp');
}

function show(data) {
    console.log(data)
  //  let links = data.query.pages.0.links
  let links = data['query']['pages']['0']['links']
    console.log(links)
  links.forEach(link => {
    createDiv(link.title);
  });

}