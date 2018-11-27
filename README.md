# afm-helpers

## Current

```javascript
expect(
  MeasureBuilder("local_identifier")
    .withSimpleMeasureDefinition("gd_identifier")
    .build()
).toEqual(
  {
    localIdentifier: "local_identifier",
    definition: {
      measure: {
        item: {
          identifier: "gd_identifier"
        }
      }
    }
  }
)
```

## Proposed

* Consider renaming to gdc-afm-helpers to comply with [gdc-afm-connect](https://www.npmjs.com/package/@gooddata/gdc-afm-connect)
* Consider using TypeScript
* Automatically distinguish between uri and identifier
* Generate localIdentifiers automatically if not supplied

> Do not confuse `<Visualization measures={…} />` with `execution.afm.measures`!

Q: Is it planned to have builders for both afm and bucket-interface as well?

### Measures

#### Simple measure using uri

```javascript
expect(
  AFMBuilder.measure('/gdc/md/abcd/obj/123')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'm1',
          definition: {
            measure: {
              item: {
                uri: '/gdc/md/abcd/obj/123'
              }
            }
          }
        }]
      }
    }
  }
)
```

#### Simple measure using identifier

```javascript
expect(
  AFMBuilder.measure('abcdefghi')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'm1',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          }
        }]
      }
    }
  }
)
```

#### Simple measure with custom localIdentifier

```javascript
expect(
  AFMBuilder
    .measure('abcdefghi')
    .localIdentifier('myLocalIdentifier')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'myLocalIdentifier',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          }
        }]
      }
    }
  }
)
```

#### Simple measure with alias

```javascript
expect(
  AFMBuilder
    .measure('abcdefghi')
    .alias('My Measure')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'm1',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          },
          alias: 'My Measure'
        }]
      }
    }
  }
)
```

#### Simple measure with format

```javascript
expect(
  AFMBuilder
    .measure('abcdefghi')
    .format('#,##0.00')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'myLocalIdentifier',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          },
          format('#,##0.00')
        }]
      }
    }
  }
)
```

#### Two simple measures with formats and aliases

```javascript
expect(
  AFMBuilder
    .measure('abcdefghi')
    .alias('My First Measure')
    .format('0.00')
    .measure('/gdc/md/abcd/obj/123')
    .format('#,##')
    .alias('My Other Measure')
).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'm1',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          },
          alias: 'My First Measure',
          format: '0.00'
        }, {
          localIdentifier: 'm2',
          definition: {
            measure: {
              item: {
                uri: '/gdc/md/abcd/obj/123'
              }
            }
          },
          alias: 'My Other Measure',
          format: '#,##'
        }]
      }
    }
  }
)
```

#### Two simple measures with aliases from an array

```javascript
const measures = [{
  uri: '/gdc/md/abcd/obj/123',
  alias: 'My First Measure'
}, {
  uri: '/gdc/md/abcd/obj/456',
  alias: 'My Other Measure'
}];

const afm = AFMBuilder();

measures.forEach(measure => {
  afm.measure(measure.uri).alias(measure.alias);
});

expect(afm).toEqual(
  {
    execution: {
      afm: {
        measures: [{
          localIdentifier: 'm1',
          definition: {
            measure: {
              item: {
                identifier: 'abcdefghi'
              }
            }
          },
          alias: 'My First Measure'
        }, {
          localIdentifier: 'm2',
          definition: {
            measure: {
              item: {
                uri: '/gdc/md/abcd/obj/123'
              }
            }
          },
          alias: 'My Other Measure'
        }]
      }
    }
  }
)
```

### Attributes

TODO

### Filters

TODO
