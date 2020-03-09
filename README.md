# Autocomplete

Given a list of words, indexes them for autocomplete. Implemented using a directed acyclic word graph.

### Usage

```
const Autocomplete = require("./autcomplete")

const completer = new Autocomplete();
// insert() takes a payload as a second parameter if you want startsWith
// to return a list of payloads
completer
    .insert("Back to the Future", "some-primary-key")
    .insert("Back to the Future 2")
    .insert("Rocky")
    .insert("12 Angry Men");

// returns ["some-primary-key", "Back to the Future 2"]
completer.startsWith("Back");
```
