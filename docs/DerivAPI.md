<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [DerivAPI][1]
    -   [Parameters][2]
    -   [Examples][3]
    -   [tickStream][4]
        -   [Parameters][5]
    -   [candleStream][6]
        -   [Parameters][7]
    -   [contract][8]
        -   [Parameters][9]
    -   [underlying][10]
        -   [Parameters][11]
    -   [account][12]
        -   [Parameters][13]
    -   [assets][14]
-   [DerivAPIBasic][15]
    -   [Parameters][16]
    -   [Examples][17]
    -   [subscribeWithCallback][18]
        -   [Parameters][19]
        -   [Examples][20]
    -   [subscribe][21]
        -   [Parameters][22]
        -   [Examples][23]
    -   [onClose][24]
-   [Cache][25]
    -   [Parameters][26]
    -   [Examples][27]
-   [Underlying][28]
    -   [Parameters][29]
-   [Immutable][30]
-   [Account][31]
    -   [Parameters][32]
    -   [siblings][33]
    -   [openContracts][34]
    -   [closedContracts][35]
    -   [switch][36]
-   [Assets][37]
    -   [Parameters][38]
-   [CandlesParam][39]
    -   [Properties][40]
-   [CandleStream][41]
    -   [Parameters][42]
    -   [history][43]
        -   [Parameters][44]
-   [Range][45]
    -   [Properties][46]
-   [TicksParam][47]
    -   [Properties][48]
-   [TickStream][49]
    -   [Parameters][50]
    -   [onUpdate][51]
    -   [list][52]
    -   [history][53]
        -   [Parameters][54]
-   [defaultRange][55]
-   [Stream][56]
-   [Tick][57]
    -   [Properties][58]
-   [Tick][59]
    -   [Parameters][60]
-   [CustomDate][61]
-   [MarketValue][62]
    -   [Parameters][63]
    -   [pipSize][64]
    -   [pipSized][65]
-   [ContractsParam][66]
    -   [Properties][67]
-   [Contract][68]
    -   [Parameters][69]

## DerivAPI

**Extends DerivAPIBasic**

The main class of the DerivAPI module. This class extends the minimum
functionality provided by the [DerivAPIBasic][15] adding abstract objects
that can be used to read data and interact with the API.

### Parameters

-   `options` **[Object][70]** For options details see: [DerivAPIBasic][15]

### Examples

```javascript
// Returns an abstract ticks object
const ticks = api.ticks('R_100');

// Subscribe to updates on the ticks object
ticks.onUpdate().subscribe(console.log);

// Read the history of ticks from the ticks object
const ticksHistory = ticks.history();
```

### tickStream

Provides a ticks stream and a history of last 1000 ticks available

#### Parameters

-   `options` **([String][71] \| [TicksParam][72])** symbol or a ticks parameter object

Returns **[TickStream][73]** 

### candleStream

Provides 1-minute candles stream and a history of last 1000 candles

#### Parameters

-   `options` **([String][71] \| [CandlesParam][74])** symbol or a candles parameter object

Returns **[CandleStream][75]** 

### contract

A contract object with latest status and ability to buy/sell

#### Parameters

-   `options` **[ContractsParam][76]** parameters defining the contract

Returns **[Contract][77]** 

### underlying

An underlying object, including contract groups, pip size, etc.

#### Parameters

-   `symbol` **[String][71]** The underlying symbol

Returns **[Underlying][78]** 

### account

An account object, including loginid, balance, contracts, etc.

#### Parameters

-   `token` **[String][71]** Token to create the account with

Returns **[Account][79]** 

### assets

Trading assets including multiple underlyings and trading times

Returns **[Assets][80]** 

## DerivAPIBasic

**Extends DerivAPICalls**

The minimum functionality provided by DerivAPI, provides direct calls to the
API.
`api.cache` is available if you want to use the cached data (see [Cache][25])

### Parameters

-   `options` **[Object][70]**  (optional, default `{}`)
    -   `options.connection` **[WebSocket][81]?** A ready to use connection
    -   `options.endpoint` **[String][71]** API server to connect to (optional, default `'blue.binaryws.com'`)
    -   `options.appId` **[Number][82]** Application ID of the API user (optional, default `1`)
    -   `options.lang` **[String][71]** Language of the API communication (optional, default `'EN'`)

### Examples

```javascript
const apiFromOpenConnection = new DerivAPI({ connection });
const apiFromEndpoint = new DerivAPI({ endpoint: 'ws.binaryws.com', appId: 1234 });
```

### subscribeWithCallback

Subscribe and call the given callback on each response

#### Parameters

-   `request` **[Object][70]** A request object acceptable by the API
-   `callback` **[Function][83]** A callback to call on every new response

#### Examples

```javascript
await api.subscribeWithCallback({ ticks: 'R_100' }, console.log)
```

Returns **[Promise][84]** Resolves to the first response or is rejected with an error

### subscribe

Subscribe to a given request, returns a stream of new responses,
Errors should be handled by the user of the stream

#### Parameters

-   `request` **[Object][70]** A request object acceptable by the API

#### Examples

```javascript
const ticks = api.subscribe({ ticks: 'R_100' });
ticks.subscribe(console.log) // Print every new tick
```

Returns **Observable** An RxJS Observable

### onClose

Reconnects to the API in case of connection error, unless connection is
passed as an argument, in that case reconnecting should be handled in the
API user side.

## Cache

**Extends DerivAPICalls**

Cache - An in-memory cache used to prevent sending redundant requests to the
API

### Parameters

-   `api` **[DerivAPI][85]** API instance to get data that is not cached

### Examples

```javascript
// Read the latest active symbols
const symbols = await api.activeSymbols();

// Read the data from cache if available
const cachedSymbols = await api.cache.activeSymbols();
```

## Underlying

**Extends Immutable**

Abstract class for an underlying

### Parameters

-   `api` **[DerivAPI][85]** 
-   `symbol` **[String][71]** 

## Immutable

An abstract class for immutable objects

## Account

**Extends Immutable**

Abstract class for user accounts

### Parameters

-   `api` **[DerivAPI][85]** 
-   `token` **[String][71]** 

### siblings

Returns **[Account][79]** all the sibling accounts

### openContracts

Returns **[Array][86]&lt;[Contract][77]>** A list of all open contracts

### closedContracts

Returns **[Array][86]&lt;[Contract][77]>** A list of all closed contracts

### switch

Switches to this account

## Assets

**Extends Immutable**

Abstract class for trading assets

### Parameters

-   `api` **[DerivAPI][85]** 

## CandlesParam

Type: [Object][70]

### Properties

-   `granularity` **[Number][82]** Granularity in seconds
-   `count` **[Number][82]** Number of candles returned by history
-   `symbol` **[String][71]** Symbol of the candles

## CandleStream

**Extends Stream**

An abstract class for Candles information

### Parameters

-   `api` **[DerivAPI][85]** 
-   `options` **[CandlesParam][74]?** 

### history

#### Parameters

-   `options` **[CandlesParam][74]?** 

Returns **[Array][86]&lt;Candle>** 

## Range

Type: [Object][70]

### Properties

-   `start` **([Number][82] \| [Date][87])** An epoch in seconds or a Date object
-   `end` **([Number][82] \| [Date][87])**  An epoch in seconds or a Date object
-   `count` **[Number][82]** Number of ticks returned by history

## TicksParam

Type: [Object][70]

### Properties

-   `range` **[Range][88]** A chunk of history to return with start and end time
-   `symbol` **[String][71]** The ticks symbol

## TickStream

**Extends Stream**

Abstract class for ticks

### Parameters

-   `api` **[DerivAPI][85]** 
-   `options` **[TicksParam][72]**  (optional, default `{}`)

### onUpdate

Called with every new tick in the stream

### list

A list of Tick objects

### history

#### Parameters

-   `range` **[Range][88]?** 

Returns **[Array][86]&lt;[Tick][89]>** 

## defaultRange

Default range of ticks: 1000 latest ticks

## Stream

An abstract class for stream objects

## Tick

Type: [Object][70]

### Properties

-   `time` **[CustomDate][90]** 
-   `quote` **[MarketValue][91]** 
-   `ask` **[MarketValue][91]** 
-   `bid` **[MarketValue][91]** 

## Tick

A wrapper class for Tick

### Parameters

-   `$0` **[Object][70]** 
    -   `$0.epoch`  
    -   `$0.quote`  
    -   `$0.ask`  
    -   `$0.bid`  
-   `pip`  

## CustomDate

**Extends Date**

A custom date object to provide more flexibility to dates

## MarketValue

Keeps a market value and pip size

### Parameters

-   `value`  
-   `pip`  

### pipSize

Returns the pip size

### pipSized

Returns the pipsized value

## ContractsParam

Type: [Object][70]

### Properties

-   `contractType` **[String][71]** 
-   `amount` **[Number][82]** 
-   `barrier` **[String][71]** 
-   `barrier2` **[String][71]** 
-   `dateExpiry` **([Number][82] \| [Date][87])** epoch in seconds or [Date][92]
-   `dateStart` **([Number][82] \| [Date][87])** epoch in seconds or [Date][92]
-   `Currency` **[String][71]?** Default is the account currency
-   `basis` **[String][71]** stake or payout
-   `duration` **([Number][82] \| [String][71])** duration with unit or duration in number
-   `durationUnit` **[String][71]?** duration unit, required if duration is number
-   `productType` **[String][71]?** 'multi_barrier' or 'basic'

## Contract

**Extends Stream**

Abstract class for contracts

### Parameters

-   `api` **[DerivAPI][85]** 
-   `options` **[ContractsParam][76]** 

[1]: #derivapi

[2]: #parameters

[3]: #examples

[4]: #tickstream

[5]: #parameters-1

[6]: #candlestream

[7]: #parameters-2

[8]: #contract

[9]: #parameters-3

[10]: #underlying

[11]: #parameters-4

[12]: #account

[13]: #parameters-5

[14]: #assets

[15]: #derivapibasic

[16]: #parameters-6

[17]: #examples-1

[18]: #subscribewithcallback

[19]: #parameters-7

[20]: #examples-2

[21]: #subscribe

[22]: #parameters-8

[23]: #examples-3

[24]: #onclose

[25]: #cache

[26]: #parameters-9

[27]: #examples-4

[28]: #underlying-1

[29]: #parameters-10

[30]: #immutable

[31]: #account-1

[32]: #parameters-11

[33]: #siblings

[34]: #opencontracts

[35]: #closedcontracts

[36]: #switch

[37]: #assets-1

[38]: #parameters-12

[39]: #candlesparam

[40]: #properties

[41]: #candlestream-1

[42]: #parameters-13

[43]: #history

[44]: #parameters-14

[45]: #range

[46]: #properties-1

[47]: #ticksparam

[48]: #properties-2

[49]: #tickstream-1

[50]: #parameters-15

[51]: #onupdate

[52]: #list

[53]: #history-1

[54]: #parameters-16

[55]: #defaultrange

[56]: #stream

[57]: #tick

[58]: #properties-3

[59]: #tick-1

[60]: #parameters-17

[61]: #customdate

[62]: #marketvalue

[63]: #parameters-18

[64]: #pipsize

[65]: #pipsized

[66]: #contractsparam

[67]: #properties-4

[68]: #contract-1

[69]: #parameters-19

[70]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[72]: #ticksparam

[73]: #tickstream

[74]: #candlesparam

[75]: #candlestream

[76]: #contractsparam

[77]: #contract

[78]: #underlying

[79]: #account

[80]: #assets

[81]: https://developer.mozilla.org/docs/WebSockets

[82]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[83]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[84]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[85]: #derivapi

[86]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[87]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date

[88]: #range

[89]: #tick

[90]: #customdate

[91]: #marketvalue

[92]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date