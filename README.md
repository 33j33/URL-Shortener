# URL-Shortener
A URL shortener using Node, Express and MongoDB


### Mongoose Functions

`Model.create()` - Shortcut for saving one or more documents to the database. 

Alternative to using Model constructor and then saving the document using `save()`

```javascript
// Insert one new `Character` document
await Character.create({ name: 'Jean-Luc Picard' });
```