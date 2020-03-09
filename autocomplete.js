const getSuffixes = function(root, suffix, maxResults) {
  const nodes = Object.keys(root);
  if (nodes.length === 0) {
    return [suffix];
  }
  let ret = [];
  for (let i = 0; i < nodes.length; i++) {
    if (maxResults <= 0) {
      break;
    }
    if (nodes[i] === "id") {
      ret.push(root["id"]);
      maxResults--;
    } else {
      const suffixes = getSuffixes(root[nodes[i]], suffix + nodes[i], maxResults);
      Array.prototype.push.apply(ret, suffixes);
      maxResults -= suffixes.length;
    }
  }
  return ret;
};

class DAWG {
  constructor() {
    this.edges = {};
  }

  insert(word, id) {
    let prev = this.edges;
    let edges = this.edges;
    let lcWord = word.toLowerCase();
    for (let i = 0; i < lcWord.length; i++) {
      const ch = lcWord.charAt(i);
      if (edges[ch] === undefined) {
        edges[ch] = {};
      }
      prev = edges;
      edges = edges[ch];
    }
    prev[lcWord.charAt(lcWord.length - 1)]["id"] = id || word;
    return this;
  }

  startsWith(prefix, maxResults) {
    const lcPrefix = prefix.toLowerCase();
    maxResults = maxResults || 10;
    let edges = this.edges;
    let words = [];
    for (let i = 0; i < lcPrefix.length; i++) {
      const ch = lcPrefix.charAt(i);
      if (edges[ch] === undefined) {
        return words;
      }
      edges = edges[ch];
    }

    const nodes = Object.keys(edges);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === "id") {
        words.push(prefix);
      } else {
        const suffixes = getSuffixes(edges[nodes[i]], nodes[i], maxResults - words.length);
        Array.prototype.push.apply(words, suffixes);
      }
      if (words.length >= maxResults) break;
    }
    return words.slice(0, maxResults + 1);
  }
}

module.exports = DAWG;
