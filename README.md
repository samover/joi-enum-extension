# joi-enum-extension

A Joi extension that allows for Enum validation.

The `enum()` type extends on the `Joi.any()` type. The `enum` type takes an object:

```
const BaseJoi = require('joi');
const EnumExtension = require('joi-extension-enum');
const Joi = BaseJoi.extend(EnumExtension);

const schema = Joi.any().enum({ ONE: 1, TWO: 2 });

schema.validate('TWO'); // value: 2
schema.validate('THREE'); // ValidationError: "value" must be one of [ONE, TWO]
```

You can also allow some extra *allowed* values:

```
const schema = Joi.any().allow(null, 4).enum({ ONE: 1, TWO: 2 });

schema.validate(null); // value: null
schema.validate(5); // ValidationError: "value" must be one of [ONE, TWO, 4]
```

For more examples, have a peek at the [tests](test/enum.test.js).

### Installing

```
const BaseJoi = require('joi');
const EnumExtension = require('joi-extension-enum');
const Joi = BaseJoi.extend(EnumExtension);
```

## Running the tests

`npm install && npm test`

## Authors

* [samover](https://github.com/samover)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
