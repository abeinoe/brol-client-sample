var Observable = require("data/observable").Observable;
var SocketIO = require('nativescript-socketio');
const server = "chat.kodekreatif.co.id";

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function getSocketMessage(isAuthenticated) {
  if (isAuthenticated) {
    return "connected to server";
  } else {
    return "connection to server denied";
  }
}

function createViewModel() {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);
    viewModel.sockmessage = "not connected";
    viewModel.socketIO = new SocketIO( server, {});
    viewModel.socketIO.on('authenticated', function() {
      this.set("sockmessage", getSocketMessage(true));
    });
    viewModel.socketIO.on('unauthorized', function() {
      this.set("sockmessage", getSocketMessage(false));
    });

    viewModel.onTap = function() {
        this.counter--;
        this.set("message", getMessage(this.counter));
        this.socketIO.connect();
        this.socketIO.emit('authentication', {username: 'abe', password : 'eba'});
    }

    return viewModel;
}

exports.createViewModel = createViewModel;
