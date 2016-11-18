var Observable = require("data/observable").Observable;
var SocketIO = require('nativescript-socket.io');
const server = "http://chat.kodekreatif.co.id";

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
    viewModel.socketIO = SocketIO.connect( server, {});
    viewModel.socketIO.on('authenticated', function() {
      alert(getSocketMessage(true));
    });
    viewModel.socketIO.on('unauthorized', function() {
      alert(getSocketMessage(false));
    });

    viewModel.onTap = function() {
        this.socketIO.connect(server);
        this.socketIO.emit('authentication', {username: 'abe', password : 'eba'});
    }

    return viewModel;
}

exports.createViewModel = createViewModel;
