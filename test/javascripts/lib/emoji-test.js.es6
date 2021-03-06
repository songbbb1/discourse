
module('emoji');

var testUnescape = function(input, expected, description) {
  var unescaped = Discourse.Emoji.unescape(input);
  equal(unescaped, expected, description);
};

test("Emoji.unescape", function(){

  const v = Discourse.Emoji.ImageVersion;

  testUnescape("Not emoji :O) :frog) :smile)", "Not emoji :O) :frog) :smile)", "title without emoji");
  testUnescape("Not emoji :frog :smile", "Not emoji :frog :smile", "end colon is not optional");
  testUnescape("emoticons :)", "emoticons <img src='/images/emoji/emoji_one/slight_smile.png?v=2' title='slight_smile' alt='slight_smile' class='emoji'>", "emoticons are still supported");
  testUnescape("With emoji :O: :frog: :smile:",
    `With emoji <img src='/images/emoji/emoji_one/o.png?v=${v}' title='O' alt='O' class='emoji'> <img src='/images/emoji/emoji_one/frog.png?v=${v}' title='frog' alt='frog' class='emoji'> <img src='/images/emoji/emoji_one/smile.png?v=${v}' title='smile' alt='smile' class='emoji'>`,
    "title with emoji");
  testUnescape("a:smile:a", "a:smile:a", "word characters not allowed next to emoji");
  testUnescape("(:frog:) :)", `(<img src='/images/emoji/emoji_one/frog.png?v=${v}' title='frog' alt='frog' class='emoji'>) <img src='/images/emoji/emoji_one/slight_smile.png?v=${v}' title='slight_smile' alt='slight_smile' class='emoji'>`, "non-word characters allowed next to emoji");
  testUnescape(":smile: hi", `<img src='/images/emoji/emoji_one/smile.png?v=${v}' title='smile' alt='smile' class='emoji'> hi`, "start of line");
  testUnescape("hi :smile:", `hi <img src='/images/emoji/emoji_one/smile.png?v=${v}' title='smile' alt='smile' class='emoji'>`, "end of line");

});

test("Emoji.search", function(){

  // able to find an alias
  equal(Discourse.Emoji.search("+1").length, 1);

  // able to find middle of line search
  equal(Discourse.Emoji.search("check", {maxResults: 3}).length, 3);

});
