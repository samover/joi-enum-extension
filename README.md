# joi-enum-extension

A Joi extension that allows for Enum validation.

The `enum()` type extends on the `Joi.any()` type. The `enum` type takes an object:

```
const BaseJoi = require('joi');
const EnumExtension = require('joi-extension-enum');
const Joi = BaseJoi.extend(EnumExtension);

const schema = Joi.object({
  number: Joi.any().enum({ ONE: 1, TWO: 2 }),
});

schema.validate({ number: 'TWO' }); // value: ({ number: 2 })
schema.validate({ number: 'THREE' }); // ValidationError: "numbers" must be one of [ONE, TWO]
```

You can also allow some extra *allowed* values:

```
const schema = Joi.object({
  number: Joi.any().allow(null, 4).enum({ ONE: 1, TWO: 2 }),
});

schema.validate({ number: null }); // value: ({ number: null })
schema.validate({ number: 5 }); // ValidationError: "numbers" must be one of [ONE, TWO, 4]
```

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
