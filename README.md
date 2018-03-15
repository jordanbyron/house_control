House Control
=============

My first react-native app. Built to replace the sometimes painfully slow web
interface of [alarm_keypad][ak].

__DISCLAIMER__: This was a learning project and as a result it's pretty rough
around the edges, especially the code in `app/components/house_keypad.js`. 
While it may be helpful for reference please do not use this as an example of
a "well structured" react-native app. At least not yet :heart:

![Screenshot of app](http://i.imgur.com/wKTfCpR.png)

## Setup

```bash
$ git clone https://github.com/jordanbyron/house_control
$ cd house_control
$ npm install --save
```

Rename `server_url.js.example` to just `server_url.js` and change the url so it
points to your [alarm_keypad][ak] endpoint.

## Running

1. Open `HouseControl.xcodeproj` in XCode
2. Build the project
3. Profit :money_with_wings:

## TODO

- ~~Add Panic Button (Slide to Panic)~~
- ~~Restore nice garage door graphic~~
- Animate garage door opening / closing
- ~~Indicate when connection to the server is lost~~

## License

Copyright (c) 2015 Jordan Byron (http://github.com/jordanbyron/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[ak]: https://github.com/jordanbyron/alarm_keypad
