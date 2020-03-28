const test = require('ava');
const patternPresent = require('./lib/spotPattern.js');
// TODO: Finish tests for extracting ID strings and correct outputs
// const extractVideoId = require('./lib/extractMatches.js');
// const buildEmbedCodeString = require('./lib/buildEmbed.js');

const validStrings = [
  {type: 'Standard', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With http', str: 'http://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'Without protocol', str: 'www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With https, without www', str: 'https://youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With http, without www', str: 'http://youtube.com/watch?v=hIs5StN8J-0'},
  // note this isn’t actually a valid YouTube URL, but works with the plugin
  {type: 'Without “v” param', str: 'youtube.com/hIs5StN8J-0'},
  {type: 'With youtu.be', str: 'youtu.be/hIs5StN8J-0'},
  {type: 'With youtu.be, with “v” param', str: 'youtu.be/watch?v=hIs5StN8J-0'},
  {type: 'With arbitrary params', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0&foo=bar&baz'},
]

const invalidStrings = [
  {type: 'With prepended text', str: 'foo https://www.youtube.com/watch?v=hIs5StN8J-0'},
  {type: 'With prepended text, with link', str: 'foo <a href="">https://www.youtube.com/watch?v=hIs5StN8J-0</a>'},
  {type: 'With appended text', str: 'https://www.youtube.com/watch?v=hIs5StN8J-0 bar'},
  {type: 'With appended text, with link', str: '<a href="">https://www.youtube.com/watch?v=hIs5StN8J-0</a> bar'},
  {type: 'Playlist URL', str: 'https://www.youtube.com/playlist?list=PLv0jwu7G_DFVP0SGNlBiBtFVkV5LZ7SOU'},

]

validStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.truthy(patternPresent(idealCase));
  });
  test(`${obj.type} with links`, t => {
    let withLinks = `<p><a href="">${obj.str}</a></p>`;
    t.truthy(patternPresent(withLinks));
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.truthy(patternPresent(withWhitespace));
  });
  test(`${obj.type} with links and whitespace`, t => {
    let withLinksAndWhitespace = `<p>
      <a href="">
        ${obj.str}
      </a>
    </p>`;
    t.truthy(patternPresent(withLinksAndWhitespace));
  });
});

invalidStrings.forEach(function(obj){
  test(`${obj.type} ideal case`, t => {
    let idealCase = `<p>${obj.str}</p>`;
    t.falsy(patternPresent(idealCase));
  });
  test(`${obj.type} with whitespace`, t => {
    let withWhitespace = `<p>
      ${obj.str}
    </p>`;
    t.falsy(patternPresent(withWhitespace));
  });
});