# joi-enum-extension

A Joi extension that allows for Enum validation.

```
const BaseJoi = require('joi');
const EnumExtension = require('joi-extension-enum');
const Joi = BaseJoi.extend(EnumExtension);

const schema = Joi.object({
  number: Joi.any().enum({ ONE: 1, TWO: 2 }),
});

await expect(schema.validate({ number: 'TWO' })).resolves.toEqual({ number: 2 })
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
